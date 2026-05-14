"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

type Tab = "best-sellers" | "new-arrivals" | "subscription-deals";

const tabs: { key: Tab; label: string }[] = [
  { key: "best-sellers", label: "Best Sellers" },
  { key: "new-arrivals", label: "New Arrivals" },
  { key: "subscription-deals", label: "Subscription Deals" },
];

const productsByTab: Record<Tab, {
  name: string;
  price: string;
  old: string;
  badge: string;
  badgeColor: string;
  rating: number;
  imageUrl?: string;
}[]> = {
  "best-sellers": [
    {
      name: "Care Leo Salmon Recipe Dry Dog Food - 2kg",
      price: "$29.99",
      old: "$34.99",
      badge: "Bestseller",
      badgeColor: "bg-[var(--brand-primary)]",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    },
    {
      name: "Care Leo Dental Chew Treats For Dogs",
      price: "$11.99",
      old: "$14.99",
      badge: "Top Rated",
      badgeColor: "bg-yellow-500",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961?w=500&q=80",
    },
    {
      name: "Care Leo Probiotics for Dogs & Cats",
      price: "$15.99",
      old: "$19.99",
      badge: "Popular",
      badgeColor: "bg-blue-500",
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    },
    {
      name: "Premium Catnip Toy Set - 5 Pack",
      price: "$9.99",
      old: "$14.99",
      badge: "Bestseller",
      badgeColor: "bg-[var(--brand-primary)]",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    },
  ],
  "new-arrivals": [
    {
      name: "Interactive Treat Dispensing Ball Toy",
      price: "$19.99",
      old: "$24.99",
      badge: "New",
      badgeColor: "bg-[var(--brand-secondary)]",
      rating: 4.8,
    },
    {
      name: "Smart Pet Water Fountain Pro",
      price: "$39.99",
      old: "$49.99",
      badge: "New",
      badgeColor: "bg-[var(--brand-secondary)]",
      rating: 4.6,
    },
    {
      name: "Organic Paw Balm - Soothing Formula",
      price: "$8.99",
      old: "$12.99",
      badge: "New",
      badgeColor: "bg-[var(--brand-secondary)]",
      rating: 4.5,
    },
    {
      name: "Collapsible Travel Pet Bowl",
      price: "$14.99",
      old: "$18.99",
      badge: "Trending",
      badgeColor: "bg-cyan-500",
      rating: 4.7,
    },
  ],
  "subscription-deals": [
    {
      name: "Care Leo Salmon Recipe Dry Dog Food - 2kg",
      price: "$24.99",
      old: "$29.99",
      badge: "Subscriber Deal",
      badgeColor: "bg-pink-500",
      rating: 4.8,
    },
    {
      name: "Monthly Dental Chew Treats Box",
      price: "$9.99",
      old: "$14.99",
      badge: "20% OFF",
      badgeColor: "bg-green-500",
      rating: 4.7,
    },
    {
      name: "Auto-Delivery Probiotics Pack",
      price: "$12.99",
      old: "$19.99",
      badge: "Save 30%",
      badgeColor: "bg-red-500",
      rating: 4.9,
    },
    {
      name: "Care Leo+ Exclusive Toy Bundle",
      price: "$22.99",
      old: "$34.99",
      badge: "Subscriber Deal",
      badgeColor: "bg-pink-500",
      rating: 4.8,
    },
  ],
};

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState<Tab>("best-sellers");

  const currentProducts = productsByTab[activeTab];

  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Trending Products</h2>
          <p className="text-gray-500 font-medium text-sm md:text-base">Top picks loved by pets and parents.</p>
        </div>
        <div className="self-start rounded-full bg-[var(--brand-surface-soft)] p-1.5 flex gap-1 shadow-inner border border-white/50">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-white text-[var(--brand-primary)] shadow-[0_4px_12px_rgba(90,49,213,0.12)] scale-105"
                  : "text-gray-500 hover:text-[var(--brand-primary)] hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            price={product.price}
            old={product.old}
            badge={product.badge}
            badgeColor={product.badgeColor}
            rating={product.rating}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <button className="brand-secondary-button rounded-full px-8 py-3.5 text-sm font-bold flex items-center gap-2 group">
          View All Trending <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </section>
  );
}
