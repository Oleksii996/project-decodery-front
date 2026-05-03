import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { getServerApi } from '@/lib/api/serverApi';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const api = await getServerApi();
    const { data, status } = await api.patch('/api/users/current', body);

    return NextResponse.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
