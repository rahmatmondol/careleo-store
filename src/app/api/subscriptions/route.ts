import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function GET() {
  const result = await apiFetch<{ subscriptions: unknown[] }>(`${SHOP_BASE}/subscriptions`);
  if (!result.ok) return NextResponse.json({ subscriptions: [], error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { subscriptions: [] });
}
