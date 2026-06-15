import { NextRequest, NextResponse } from 'next/server';
import { API_V1 } from '@/lib/gateway';
import { setToken } from '@/lib/session';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  let res: Response;
  try {
    res = await fetch(`${API_V1}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: body?.email, password: body?.password }),
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.error?.message ?? json?.error ?? json?.message ?? 'Invalid email or password';
    return NextResponse.json({ error: message }, { status: res.status });
  }

  const payload = json?.data ?? json;
  const accessToken = payload?.accessToken ?? payload?.token;
  if (!accessToken) {
    return NextResponse.json({ error: 'No access token returned' }, { status: 502 });
  }

  await setToken(accessToken);
  return NextResponse.json({ user: payload?.user ?? null });
}
