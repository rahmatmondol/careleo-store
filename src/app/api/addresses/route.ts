import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function GET() {
  const result = await apiFetch<{ addresses: unknown[] }>(`${SHOP_BASE}/addresses`);
  if (!result.ok) return NextResponse.json({ addresses: [], error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { addresses: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const result = await apiFetch(`${SHOP_BASE}/addresses`, { method: 'POST', body });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? {});
}
