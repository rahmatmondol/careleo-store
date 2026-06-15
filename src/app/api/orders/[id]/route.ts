import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await apiFetch(`${SHOP_BASE}/orders/${id}`);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? {});
}
