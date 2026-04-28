import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const response = await api.post('api/auth/login', body);

    const cookiesStore = await cookies();
    const setCookies = response.headers['set-cookie'];
    if (!setCookies)
      return NextResponse.json('smth going wrong', {
        status: 400,
      });

    const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];

    for (const item of cookieArray) {
      const parsedItem = parse(item);
      const options = {
        expires: parsedItem.Expires ? new Date(parsedItem.Expires) : undefined,
        path: parsedItem.Path,
        maxAge: Number(parsedItem['Max-Age']),
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
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('REGISTER ROUTE ERROR:', error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
