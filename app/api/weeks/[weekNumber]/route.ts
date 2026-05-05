import { NextResponse } from 'next/server';
import { getServerApi } from '@/lib/api/serverApi';

type RouteContext = {
  params: Promise<{
    weekNumber: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { weekNumber } = await params;

    const api = await getServerApi();

    const res = await api.get(`api/weeks/private/${weekNumber}`);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('GET /api/weeks/[weekNumber] error:', error);

    return NextResponse.json(
      { message: 'Помилка завантаження даних тижня' },
      { status: 500 }
    );
  }
}
