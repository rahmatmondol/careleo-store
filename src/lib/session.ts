import { cookies } from 'next/headers';

/**
 * Storefront session helpers.
 *
 * The access token issued by careleo-backend is stored in an httpOnly cookie
 * so it is never exposed to client JavaScript. All authenticated calls to the
 * gateway happen server-side through the /api proxy route handlers.
 */
export const SESSION_COOKIE = 'careleo_token';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function setToken(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearToken(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
