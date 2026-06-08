import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get('accessToken');
  const refreshToken = cookiesStore.get('refreshToken');
  return NextResponse.json({
    authenticated: Boolean(accessToken || refreshToken),
  });
};
