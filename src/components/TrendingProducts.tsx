"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useProducts, formatPrice } from "@/lib/useStore";
import { useCart } from "@/lib/CartContext";

type Tab = "best-sellers" | "new-arrivals" | "subscription-deals";

const tabs: { key: Tab; label: string; sort: string }[] = [
  { key: "best-sellers", label: "Best Sellers", sort: "best-selling" },
  { key: "new-arrivals", label: "New Arrivals", sort: "newest" },
  { key: "subscription-deals", label: "Subscription Deals", sort: "deals" },
];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("best-sellers");
  const activeSort = tabs.find((t) => t.key === activeTab)?.sort;
  // Real catalogue only. The previous hardcoded fallback list had no product ids,
  // so its cards linked to /product/<product name> and every one of those URLs
  // resolved to the same hardcoded detail page.
  const { products, loading } = useProducts({ limit: 4, sort: activeSort });
  const { addItem } = useCart();

  return (
    <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1.5 sm:mb-2">
            Trending Products
          </h2>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Top picks loved by pets and parents.
          </p>
        </div>
        {/* Three full-width pills overflow a 375px viewport, so the strip scrolls
            horizontally on phones and only becomes a fixed row from sm up. */}
        <div className="no-scrollbar edge-strip -mb-1 overflow-x-auto pb-1 md:overflow-visible">
          <div className="inline-flex w-max gap-1 rounded-full border border-white/50 bg-[var(--brand-surface-soft)] p-1.5 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 sm:px-6 py-2.5 text-[13px] sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-white text-[var(--brand-primary)] shadow-[0_4px_12px_rgba(90,49,213,0.12)]"
                    : "text-gray-500 hover:text-[var(--brand-primary)] hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 sm:h-80 animate-pulse rounded-[15px] bg-[var(--brand-surface-soft)]"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="rounded-2xl border border-[var(--brand-line)] bg-white p-8 text-center text-sm font-medium text-gray-500">
          Our trending picks are being restocked. Browse the full catalogue in the
          meantime.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={formatPrice(product.price)}
              old={product.compareAtPrice ? formatPrice(product.compareAtPrice) : ""}
              badge={product.brand || "Care Leo"}
              badgeColor="bg-[var(--brand-primary)]"
              rating={product.rating}
              imageUrl={product.imageUrl || undefined}
              onAddToCart={() => {
                void addItem(product.id, 1);
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/shop"
          className="brand-secondary-button w-full sm:w-auto justify-center rounded-full px-8 py-3.5 text-sm font-bold flex items-center gap-2 group"
        >
          View All Trending{" "}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
