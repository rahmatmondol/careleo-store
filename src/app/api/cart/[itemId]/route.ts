import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> },
) {
  const { itemId } = await context.params;
  const body = await request.json().catch(() => ({}));
  const result = await apiFetch(`${SHOP_BASE}/cart/${itemId}`, {
    method: 'PUT',
    body: { quantity: body?.quantity ?? 1 },
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { ok: true });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ itemId: string }> },
) {
  const { itemId } = await context.params;
  const result = await apiFetch(`${SHOP_BASE}/cart/${itemId}`, { method: 'DELETE' });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { ok: true });
}
