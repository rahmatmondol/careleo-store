import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function GET() {
  const result = await apiFetch<{ orders: unknown[] }>(`${SHOP_BASE}/orders`);
  if (!result.ok) return NextResponse.json({ orders: [], error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { orders: [] });
}
