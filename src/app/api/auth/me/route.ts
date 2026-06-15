import { NextResponse } from 'next/server';
import { API_V1 } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/session';

export async function GET() {
  const token = await getToken();
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const result = await apiFetch(`${API_V1}/auth/me`);
  if (!result.ok) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({ user: result.data });
}
