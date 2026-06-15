import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function POST() {
  const result = await apiFetch(`${SHOP_BASE}/cart/checkout`, { method: 'POST' });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { ok: true });
}
