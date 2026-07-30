import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const shippingAddress = typeof body?.shippingAddress === 'string' ? body.shippingAddress : undefined;
  const paymentMethod = typeof body?.paymentMethod === 'string' ? body.paymentMethod : undefined;

  const payload: Record<string, string> = {};
  if (shippingAddress) payload.shippingAddress = shippingAddress;
  if (paymentMethod) payload.paymentMethod = paymentMethod;

  const result = await apiFetch(`${SHOP_BASE}/cart/checkout`, {
    method: 'POST',
    body: payload,
  });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? { ok: true });
}
