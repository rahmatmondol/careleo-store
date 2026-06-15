/**
 * Centralized API gateway base URLs for the storefront server routes.
 *
 * The hybrid stack exposes a single gateway that proxies:
 *   - /api/v1/shop/*   -> shop-service
 *   - /api/v1/media/*  -> media-service
 *   - /api/v1/*        -> careleo-backend (auth, etc.)
 *
 * API_GATEWAY_URL may be set with or without a trailing /api/v1 suffix;
 * we normalize to the gateway root so callers can compose paths safely.
 */
const RAW =
  process.env.API_GATEWAY_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8090';

export const GATEWAY_ROOT = RAW.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

/** Base for careleo-backend v1 endpoints (auth, me, etc.) */
export const API_V1 = `${GATEWAY_ROOT}/api/v1`;

/** Base for shop-service public + customer endpoints */
export const SHOP_BASE = `${GATEWAY_ROOT}/api/v1/shop`;

/** Base for media-service endpoints */
export const MEDIA_BASE = `${GATEWAY_ROOT}/api/v1/media`;
