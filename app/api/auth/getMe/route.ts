import { api } from '@/lib/api/api';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const cookiesStore = await cookies();
  const res = await api.get('api/auth/me', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });

  return NextResponse.json(res.data);
};
