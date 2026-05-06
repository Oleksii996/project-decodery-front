import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken');
    const refreshToken = cookiesStore.get('refreshToken');

    if (accessToken) {
      return NextResponse.json({
        success: true,
      });
    }

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: 'No refresh token' },
        { status: 401 }
      );
    }

    const response = await api.post('api/auth/refresh', null, {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    const setCookies = response.headers['set-cookie'];
    if (!setCookies)
      return NextResponse.json(
        { success: false, error: 'No cookies received from server' },
        { status: 502 }
      );

    const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];

    for (const item of cookieArray) {
      const parsedItem = parse(item);
      const options = {
        expires: parsedItem.Expires ? new Date(parsedItem.Expires) : undefined,
        path: parsedItem.Path,
        maxAge: parsedItem['Max-Age']
          ? Number(parsedItem['Max-Age'])
          : undefined,
      };

      if (parsedItem.refreshToken) {
        cookiesStore.set('refreshToken', parsedItem.refreshToken, options);
      }

      if (parsedItem.accessToken) {
        cookiesStore.set('accessToken', parsedItem.accessToken, options);
      }

      if (parsedItem.sessionId) {
        cookiesStore.set('sessionId', parsedItem.sessionId, options);
      }
    }

    return NextResponse.json({
      success: true,
      ...response.data,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
