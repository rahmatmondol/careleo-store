import { NextRequest, NextResponse } from 'next/server';
import { SHOP_BASE } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const result = await apiFetch(`${SHOP_BASE}/addresses/${id}`, { method: 'PUT', body });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? {});
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await apiFetch(`${SHOP_BASE}/addresses/${id}`, { method: 'DELETE' });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data ?? {});
}
