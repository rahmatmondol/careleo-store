"use client";

import { useEffect, useState } from "react";

export type StoreUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  role: string;
};

export function useAuth() {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json) => active && setUser(json?.user ?? null))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };

  return { user, loading, logout };
}
