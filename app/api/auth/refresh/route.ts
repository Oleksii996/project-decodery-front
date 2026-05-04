import { api } from '@/lib/api/api';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const cookisStore = await cookies();
  const accessToken = cookisStore.get('accessToken');
  const refreshToken = cookisStore.get('refreshToken');

  if (accessToken) {
    return NextResponse.json({
      success: true,
    });
  }

  if (!refreshToken) {
    return NextResponse.json({
      success: false,
    });
  }

  const response = await api.post('/auth/refresh', null, {
    headers: {
      Cookie: cookisStore.toString(),
    },
  });

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
      cookisStore.set('refreshToken', parsedItem.refreshToken, options);
    }

    if (parsedItem.accessToken) {
      cookisStore.set('accessToken', parsedItem.accessToken, options);
    }

    if (parsedItem.sessionId) {
      cookisStore.set('sessionId', parsedItem.sessionId, options);
    }
  }

  return NextResponse.json({
    success: true,
    ...response.data,
  });
};
