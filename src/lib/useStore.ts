"use client";

import { useEffect, useState } from "react";

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  brand: string;
  category: string;
  categoryId: string | null;
  shortDescription: string;
  description: string;
  stock: number;
  productType: string;
  tags: string[];
  attributes: { name: string; values: string[] }[];
  variations: any[];
};

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  imageUrl: string | null;
};

export function useProducts(query: Record<string, string | number | undefined> = {}) {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const qs = new URLSearchParams(
    Object.entries(query)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/products${qs ? `?${qs}` : ""}`)
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        setProducts(Array.isArray(json?.products) ? json.products : []);
        setTotal(json?.total ?? 0);
        setError(null);
      })
      .catch(() => active && setError("Failed to load products"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [qs]);

  return { products, total, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((json) => active && setCategories(Array.isArray(json?.categories) ? json.categories : []))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
