import { NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { mapStoreCategory } from '@/lib/mappers';

export async function GET() {
  let res: Response;
  try {
    res = await fetch(`${SHOP_BASE}/categories`, { cache: 'no-store' });
  } catch {
    return NextResponse.json({ categories: [], error: 'Backend unreachable' }, { status: 502 });
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return NextResponse.json({ categories: [] }, { status: res.status });
  }

  const categories = Array.isArray(json?.categories) ? json.categories.map(mapStoreCategory) : [];
  return NextResponse.json({ categories });
}
