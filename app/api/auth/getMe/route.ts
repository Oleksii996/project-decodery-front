import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { api } from '@/lib/api/api';

export const GET = async () => {
  try {
    const cookieStore = await cookies();

    const response = await api.get('api/auth/me', {
      headers: {
        cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data.user);
  } catch (error) {
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
