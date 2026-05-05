import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { getServerApi } from '@/lib/api/serverApi';

export async function GET() {
  try {
    const api = await getServerApi();

    const res = await api.get('api/diaries', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const api = await getServerApi();

    const body = await request.json();

    const res = await api.post('api/diaries', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
