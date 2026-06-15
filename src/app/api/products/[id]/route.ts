import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { mapStoreProduct } from '@/lib/mappers';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  let res: Response;
  try {
    res = await fetch(`${SHOP_BASE}/products/${id}`, { cache: 'no-store' });
  } catch {
    return NextResponse.json({ product: null, error: 'Backend unreachable' }, { status: 502 });
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ product: null }, { status: res.status });
  }

  const raw = json?.product ?? json;
  return NextResponse.json({ product: raw ? mapStoreProduct(raw) : null });
}
