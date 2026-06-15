import { getToken } from './session';

type FetchOptions = {
  method?: string;
  body?: unknown;
  /** Attach the session bearer token if available. Defaults to true. */
  auth?: boolean;
  /** Next.js fetch cache control. Defaults to 'no-store'. */
  cache?: RequestCache;
  headers?: Record<string, string>;
};

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
};

/**
 * Unwrap the careleo response envelope.
 * careleo-backend returns { success, data, error }.
 * shop-service returns its own shapes ({ products }, { category }, ...).
 * We pass through whatever the upstream sends and let callers pick fields.
 */
function unwrap(json: any): { data: any; error: string | null } {
  if (json && typeof json === 'object' && 'success' in json) {
    return {
      data: json.data ?? null,
      error: json.success ? null : json.error?.message ?? json.error ?? 'Request failed',
    };
  }
  return { data: json, error: null };
}

/**
 * Server-side fetch against the gateway. Use only inside route handlers or
 * server components — it reads the httpOnly session cookie.
 */
export async function apiFetch<T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<ApiResult<T>> {
  const { method = 'GET', body, auth = true, cache = 'no-store', headers = {} } = options;

  const finalHeaders: Record<string, string> = { ...headers };
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json';

  if (auth) {
    const token = await getToken();
    if (token) finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache,
    });
  } catch {
    return { ok: false, status: 502, data: null, error: 'Backend unreachable' };
  }

  const raw = await res.json().catch(() => null);
  const { data, error } = unwrap(raw);

  return {
    ok: res.ok,
    status: res.status,
    data: res.ok ? (data as T) : null,
    error: res.ok ? null : error ?? `Request failed (${res.status})`,
  };
}
