import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function GET() {
  const result = await apiFetch(`${SHOP_BASE}/cart`);
  if (!result.ok) return NextResponse.json({ cart: [] }, { status: result.status });
  const data: any = result.data;
  return NextResponse.json({ cart: Array.isArray(data?.cart) ? data.cart : data ?? [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = await apiFetch(`${SHOP_BASE}/cart`, {
    method: 'POST',
    body: { productId: body?.productId, quantity: body?.quantity ?? 1 },
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.data ?? { ok: true });
}
