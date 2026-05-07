import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken');
  if (!accessToken) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        error: 'No access token',
      },
      { status: 401 }
    );
  }
  try {
    const res = await api.get('api/auth/me', {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          error: error.response?.data ?? error.message,
        },
        { status: error.response?.status ?? 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        user: null,
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
};
