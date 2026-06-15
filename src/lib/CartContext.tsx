"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    brand: string | null;
    price: string | number;
    imageUrl: string | null;
  } | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<boolean>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  checkout: () => Promise<{ ok: boolean; error?: string }>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const json = await res.json().catch(() => ({}));
      setItems(Array.isArray(json?.cart) ? json.cart : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback(async (productId: string, quantity = 1) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (res.ok) {
      await refresh();
      return true;
    }
    return false;
  }, [refresh]);

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    } else {
      await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
    }
    await refresh();
  }, [refresh]);

  const removeItem = useCallback(async (itemId: string) => {
    await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    await refresh();
  }, [refresh]);

  const checkout = useCallback(async () => {
    const res = await fetch("/api/cart/checkout", { method: "POST" });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      await refresh();
      return { ok: true };
    }
    return { ok: false, error: json?.error || "Checkout failed" };
  }, [refresh]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.price ?? 0) * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, loading, refresh, addItem, updateItem, removeItem, checkout }}
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
