import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export const POST = async (req: NextRequest) => {
  const cookiesStore = await cookies();
  try {
    const response = await api.post('api/auth/logout', {
      headers: {
        Cookie: cookiesStore.toString(),
      },
    });

    cookiesStore.delete('accessToken');
    cookiesStore.delete('refreshToken');
    cookiesStore.delete('sessionId');
    return NextResponse.json({ success: true });
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
