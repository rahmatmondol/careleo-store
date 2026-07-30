import { NextRequest, NextResponse } from 'next/server';
import { API_V1 } from '@/lib/gateway';
import { apiFetch } from '@/lib/api';
import { getToken } from '@/lib/session';

/**
 * Storefront AI chat proxy. Wires the floating "Leo" assistant to the
 * careleo-backend AI subsystem (general_chat purpose).
 *
 * Flow: the backend chat API is session-based and auth-gated. We reuse the
 * sessionId the client holds, or create one on first message, then post the
 * message and return the assistant reply + sessionId so the client can keep
 * the thread going.
 */
export async function POST(request: NextRequest) {
  const token = await getToken();
  if (!token) {
    return NextResponse.json(
      { reply: 'Please log in to chat with Leo about your pets and orders.', sessionId: null, requiresAuth: true },
      { status: 200 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const message: string = (body?.message ?? '').toString().trim();
  let sessionId: string | null = body?.sessionId ?? null;
  const petId: string | undefined = body?.petId;

  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  // Create a session on first turn.
  if (!sessionId) {
    const created = await apiFetch<{ session?: { id?: string } }>(`${API_V1}/ai/chat/sessions`, {
      method: 'POST',
      body: petId ? { petId } : {},
    });
    if (!created.ok || !created.data?.session?.id) {
      return NextResponse.json(
        { reply: "Leo is unavailable right now. Please try again in a moment.", sessionId: null },
        { status: 200 },
      );
    }
    sessionId = created.data.session.id;
  }

  const sent = await apiFetch<{ message?: string; sessionId?: string; toolsUsed?: string[] }>(
    `${API_V1}/ai/chat/sessions/${sessionId}/messages`,
    { method: 'POST', body: petId ? { message, petId } : { message } },
  );

  if (!sent.ok || !sent.data) {
    return NextResponse.json(
      { reply: "Leo couldn't process that just now. Please try again.", sessionId },
      { status: 200 },
    );
  }

  return NextResponse.json({
    reply: sent.data.message ?? '',
    sessionId: sent.data.sessionId ?? sessionId,
    toolsUsed: sent.data.toolsUsed ?? [],
  });
}
