"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type CartProductSummary = {
  id: string;
  name: string;
  brand: string | null;
  price: string | number;
  imageUrl: string | null;
  slug?: string | null;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: CartProductSummary | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  /** false while the guest cart is in play — checkout needs an account. */
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<boolean>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: (opts?: {
    shippingAddress?: string;
    paymentMethod?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
};

const CartContext = createContext<CartContextValue | null>(null);

/* ------------------------------------------------------------------ guest cart */

const GUEST_KEY = "careleo_guest_cart";

type GuestLine = { productId: string; quantity: number };

function readGuestCart(): GuestLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GUEST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (l): l is GuestLine =>
          !!l && typeof l.productId === "string" && Number(l.quantity) > 0,
      )
      .map((l) => ({ productId: l.productId, quantity: Math.floor(Number(l.quantity)) }));
  } catch {
    return [];
  }
}

function writeGuestCart(lines: GuestLine[]) {
  if (typeof window === "undefined") return;
  try {
    if (lines.length === 0) window.localStorage.removeItem(GUEST_KEY);
    else window.localStorage.setItem(GUEST_KEY, JSON.stringify(lines));
  } catch {
    /* storage disabled — the cart just won't survive a refresh */
  }
}

/** Turn stored {productId, quantity} lines into displayable cart items. */
async function hydrateGuestCart(lines: GuestLine[]): Promise<CartItem[]> {
  const results = await Promise.all(
    lines.map(async (line): Promise<CartItem | null> => {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(line.productId)}`);
        const json = await res.json().catch(() => ({}));
        const p = json?.product;
        if (!p) return null;
        return {
          id: `guest:${line.productId}`,
          productId: line.productId,
          quantity: line.quantity,
          product: {
            id: p.id,
            name: p.name,
            brand: p.brand ?? null,
            price: p.price,
            imageUrl: p.imageUrl ?? null,
            slug: p.slug ?? null,
          },
        };
      } catch {
        return null;
      }
    }),
  );
  return results.filter((i): i is CartItem => i !== null);
}

/* ---------------------------------------------------------------------- provider */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const wasAuthenticated = useRef<boolean | null>(null);

  const loadServerCart = useCallback(async () => {
    const res = await fetch("/api/cart");
    const json = await res.json().catch(() => ({}));
    return Array.isArray(json?.cart) ? (json.cart as CartItem[]) : [];
  }, []);

  /** Move anything in the guest cart onto the account, then clear local state. */
  const mergeGuestCart = useCallback(async () => {
    const lines = readGuestCart();
    if (lines.length === 0) return;
    await Promise.all(
      lines.map((line) =>
        fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: line.productId, quantity: line.quantity }),
        }).catch(() => undefined),
      ),
    );
    writeGuestCart([]);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      // /api/auth/me always answers 200 — an anonymous visitor gets { user: null },
      // so the body is what decides, not the status code.
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json().catch(() => ({}));
      const authed = meRes.ok && !!me?.user;
      setIsAuthenticated(authed);

      if (authed) {
        // First authenticated load after being a guest: carry the cart over.
        if (wasAuthenticated.current === false) await mergeGuestCart();
        wasAuthenticated.current = true;
        setItems(await loadServerCart());
      } else {
        wasAuthenticated.current = false;
        setItems(await hydrateGuestCart(readGuestCart()));
      }
    } catch {
      setIsAuthenticated(false);
      setItems(await hydrateGuestCart(readGuestCart()));
    } finally {
      setLoading(false);
    }
  }, [loadServerCart, mergeGuestCart]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (productId: string, quantity = 1) => {
      if (!productId) return false;

      if (isAuthenticated) {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        if (res.ok) {
          setItems(await loadServerCart());
          return true;
        }
        // Session expired mid-visit — fall through to the guest cart so the
        // click isn't simply lost.
        if (res.status !== 401 && res.status !== 403) return false;
        setIsAuthenticated(false);
      }

      const lines = readGuestCart();
      const existing = lines.find((l) => l.productId === productId);
      if (existing) existing.quantity += quantity;
      else lines.push({ productId, quantity });
      writeGuestCart(lines);
      setItems(await hydrateGuestCart(lines));
      return true;
    },
    [isAuthenticated, loadServerCart],
  );

  const updateItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (itemId.startsWith("guest:")) {
        const productId = itemId.slice("guest:".length);
        let lines = readGuestCart();
        if (quantity <= 0) {
          lines = lines.filter((l) => l.productId !== productId);
        } else {
          const line = lines.find((l) => l.productId === productId);
          if (line) line.quantity = quantity;
        }
        writeGuestCart(lines);
        setItems(await hydrateGuestCart(lines));
        return;
      }

      if (quantity <= 0) {
        await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      } else {
        await fetch(`/api/cart/${itemId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        });
      }
      setItems(await loadServerCart());
    },
    [loadServerCart],
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      await updateItem(itemId, 0);
    },
    [updateItem],
  );

  const checkout = useCallback(
    async (opts?: { shippingAddress?: string; paymentMethod?: string }) => {
      if (!isAuthenticated) {
        return { ok: false, error: "Please sign in to complete your order." };
      }
      const payload: Record<string, string> = {};
      if (opts?.shippingAddress) payload.shippingAddress = opts.shippingAddress;
      if (opts?.paymentMethod) payload.paymentMethod = opts.paymentMethod;
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        await refresh();
        return { ok: true };
      }
      return { ok: false, error: json?.error || "Checkout failed" };
    },
    [isAuthenticated, refresh],
  );

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.price ?? 0) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        loading,
        isAuthenticated,
        refresh,
        addItem,
        updateItem,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
