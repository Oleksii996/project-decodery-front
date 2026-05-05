import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { getServerApi } from '@/lib/api/serverApi';
type Props = {
  params: Promise<{ entryId: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const { entryId } = await params;
    const api = await getServerApi();

    const res = await api(`api/diaries/${entryId}`, {
      headers: {
        'Content-Type': 'applicaton/json',
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

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { entryId } = await params;
    const api = await getServerApi();
    const res = await api.delete(`api/diaries/${entryId}`, {
      headers: {
        'Content-Type': 'applicaton/json',
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

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { entryId } = await params;
    const api = await getServerApi();
    const body = await request.json();

    const res = await api.patch(`api/diaries/${entryId}`, body, {
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
