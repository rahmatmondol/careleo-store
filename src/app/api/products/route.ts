import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { mapStoreProduct } from '@/lib/mappers';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.search || '';

  let res: Response;
  try {
    res = await fetch(`${SHOP_BASE}/products${search}`, { cache: 'no-store' });
  } catch {
    return NextResponse.json({ products: [], total: 0, error: 'Backend unreachable' }, { status: 502 });
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ products: [], total: 0 }, { status: res.status });
  }

  const products = Array.isArray(json?.products) ? json.products.map(mapStoreProduct) : [];
  return NextResponse.json({
    products,
    total: json?.total ?? products.length,
    page: json?.page ?? 1,
    limit: json?.limit ?? products.length,
  });
}
