import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { getServerApi } from '@/lib/api/serverApi';
type Props = {
   params: { entryId: string };
};
function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}
export async function GET(request: Request, { params }: Props) {
  try {
    const { entryId } =  params;
    const api = await getServerApi();

    const res = await api(`/diaries/${entryId}`, {
      headers: {
        'Content-Type': 'applicaton/json',
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { entryId } =  params;
    const api = await getServerApi();
    const res = await api.delete(`/diaries/${entryId}`, {
      headers: {
        'Content-Type': 'applicaton/json',
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const { entryId } =  params;
    const api = await getServerApi();
    const body = await request.json();

    const res = await api.patch(`/diaries/${entryId}`, body, {
      headers: {
    'Content-Type': 'aplication/json',
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
