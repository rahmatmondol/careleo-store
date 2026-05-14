"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  X,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

const categories = [
  { name: "All Products", icon: "🛍️" },
  { name: "Dog Food", icon: "🦴" },
  { name: "Cat Food", icon: "🐟" },
  { name: "Treats", icon: "🥨" },
  { name: "Toys", icon: "🧸" },
  { name: "Grooming", icon: "🧴" },
  { name: "Health", icon: "💊" },
  { name: "Accessories", icon: "📿" },
  { name: "Smart Products", icon: "📷" },
];

type Product = {
  name: string;
  price: string;
  old: string;
  badge: string;
  badgeColor: string;
  rating: number;
  imageUrl?: string;
  brand?: string;
  category?: string;
};

const products: Product[] = [
  {
    name: "Care Leo Chicken Recipe Adult Dog Food - 2kg",
    price: "$24.99",
    old: "$31.24",
    badge: "Bestseller",
    badgeColor: "bg-orange-500",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    brand: "Care Leo",
    category: "Dog Food",
  },
  {
    name: "Royal Canin Maxi Adult Dry Dog Food - 4kg",
    price: "$54.99",
    old: "$68.74",
    badge: "20% OFF",
    badgeColor: "bg-green-500",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961?w=500&q=80",
    brand: "Royal Canin",
    category: "Dog Food",
  },
  {
    name: "Care Leo Multivitamin Soft Chews - 60 pcs",
    price: "$19.99",
    old: "$24.99",
    badge: "New",
    badgeColor: "bg-purple-500",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&q=80",
    brand: "Care Leo",
    category: "Health",
  },
  {
    name: "Care Leo Salmon Recipe Cat Food - 1.5kg",
    price: "$21.59",
    old: "$26.99",
    badge: "Care Leo+ Deal",
    badgeColor: "bg-pink-500",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    brand: "Care Leo",
    category: "Cat Food",
  },
  {
    name: "Care Leo Octopus Plush Toy for Dogs",
    price: "$12.99",
    old: "$16.24",
    badge: "Best Toy",
    badgeColor: "bg-cyan-500",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80",
    brand: "Care Leo",
    category: "Toys",
  },
  {
    name: "Greenies Original Dental Treats - 340g",
    price: "$16.99",
    old: "$21.24",
    badge: "20% OFF",
    badgeColor: "bg-green-500",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1581888227599-779811939961?w=500&q=80",
    brand: "Greenies",
    category: "Treats",
  },
];

export default function ShopPage() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      {/* Hero Banner */}
      <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid items-center gap-6 sm:gap-8 rounded-[24px] sm:rounded-[36px] bg-gradient-to-br from-[#f1e7ff] via-white to-[#ffe5f0] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-6 sm:p-10 shadow-[0_20px_50px_rgba(90,49,213,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h1 className="text-[28px] leading-tight font-bold tracking-tight text-gray-900 dark:text-white sm:text-[32px] md:text-5xl">
              Shop Everything <br />
              <span className="text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]">Your Pet Loves</span>
            </h1>
            <p className="mt-4 sm:mt-5 max-w-lg text-sm sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
              Premium quality products handpicked for your pet&apos;s health,
              happiness, and well-being.
            </p>
          </div>

          <div className="rounded-[20px] sm:rounded-[32px] bg-[var(--brand-surface-soft)] dark:bg-gray-800 p-5 sm:p-6 border border-[var(--brand-line)] dark:border-gray-700">
            <p className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]">
              Care Leo+ Members
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">20%</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Save up to on every order
            </p>

            <div className="mt-5 flex items-center gap-3 border-t border-[var(--brand-line)] dark:border-gray-700 pt-5">
              <Truck className="text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Free delivery</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  On all subscription orders
                </p>
              </div>
            </div>

            <button className="brand-primary-button mt-6 w-full rounded-full py-3 sm:py-4 text-sm font-bold">
              Join Care Leo+
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <button className="text-xs sm:text-sm font-bold text-[var(--brand-primary)] dark:text-[var(--brand-secondary)] hover:underline">
            View all categories →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-5 lg:grid-cols-9">
          {categories.map((category, index) => (
            <button
              key={category.name}
              className={`flex flex-col items-center gap-2 rounded-2xl sm:rounded-3xl border p-3 sm:p-5 text-xs sm:text-sm font-bold shadow-sm transition hover:-translate-y-1 ${
                index === 0
                  ? "border-[var(--brand-primary)] dark:border-[var(--brand-secondary)] bg-[var(--brand-surface-soft)] dark:bg-gray-800 text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]"
                  : "border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
              }`}
            >
              <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#f2e9ff] dark:bg-gray-800 text-lg sm:text-2xl">
                {category.icon}
              </div>
              <span className="text-[11px] sm:text-sm leading-tight">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main content with filters */}
      <section className="mx-auto grid max-w-[var(--container-width)] gap-6 px-4 sm:px-6 py-4 sm:py-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop Filters sidebar */}
        <FiltersContent className="hidden lg:block h-fit rounded-3xl border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-950 p-6 shadow-sm" />

        {/* Mobile Filter Sidebar */}
        <FilterSidebar open={filterOpen} onClose={() => setFilterOpen(false)} />

        {/* Products area */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Showing 1–12 of 246 products
            </p>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filter
              </button>

              <select className="rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                <option>Sort by: Featured</option>
                <option>Best Selling</option>
                <option>Price Low to High</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {products.map((product) => (
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

          <div className="mt-10 flex justify-center gap-2 sm:gap-3">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full text-sm font-bold transition-colors ${
                  page === 1
                    ? "bg-[var(--brand-primary)] text-white shadow-sm"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-[var(--brand-line)] dark:border-gray-700 shadow-sm hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold shadow-sm hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 flex items-center justify-center">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-950 p-4 sm:p-6 shadow-sm md:grid-cols-4">
          <TrustItem icon={<Truck />} title="Free Delivery" text="On all orders" />
          <TrustItem icon={<RotateCcw />} title="Easy Returns" text="Hassle free" />
          <TrustItem icon={<ShieldCheck />} title="Secure Payments" text="100% safe & secure" />
          <TrustItem icon={<Headphones />} title="24/7 Support" text="We're here to help" />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FiltersContent({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-black text-gray-900 dark:text-white">Filters</h3>
        <button className="text-xs font-bold text-[var(--brand-primary)] dark:text-[var(--brand-secondary)] hover:underline">
          Clear all
        </button>
      </div>

      <FilterGroup
        title="Category"
        items={categories.slice(1, 6).map((c) => c.name)}
      />
      <FilterGroup
        title="Brand"
        items={["Care Leo", "Royal Canin", "Hill\u2019s Science Diet", "Pedigree", "Whiskas"]}
      />

      <div className="border-t border-[var(--brand-line)] dark:border-gray-700 py-5">
        <h4 className="mb-4 font-black text-gray-900 dark:text-white text-sm">Price Range</h4>
        <input
          type="range"
          className="w-full accent-[var(--brand-primary)] dark:accent-[var(--brand-secondary)]"
        />
        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>$0</span>
          <span>$200+</span>
        </div>
      </div>

      <div className="border-t border-[var(--brand-line)] dark:border-gray-700 py-5">
        <h4 className="mb-4 font-black text-gray-900 dark:text-white text-sm">
          Care Leo+ Benefits
        </h4>
        <label className="mb-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            className="accent-[var(--brand-primary)] dark:accent-[var(--brand-secondary)]"
          />
          Subscription Discount
          <span className="rounded-full bg-[var(--brand-surface-soft)] dark:bg-gray-800 px-2 py-0.5 text-xs font-bold text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]">
            20% OFF
          </span>
        </label>
        <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            className="accent-[var(--brand-primary)] dark:accent-[var(--brand-secondary)]"
          />
          Free Delivery
        </label>
      </div>

      <div className="border-t border-[var(--brand-line)] dark:border-gray-700 pt-5">
        <h4 className="mb-4 font-black text-gray-900 dark:text-white text-sm">Ratings</h4>
        {[5, 4, 3].map((rating) => (
          <label
            key={rating}
            className="mb-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              className="accent-[var(--brand-primary)] dark:accent-[var(--brand-secondary)]"
            />
            <span className="flex text-yellow-500">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </span>
            & up
          </label>
        ))}
      </div>
    </div>
  );
}

function FilterSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[300px] max-w-[85vw] bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-line)] dark:border-gray-800 shrink-0">
          <h3 className="text-lg font-black text-gray-900 dark:text-white">Filters</h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] dark:border-gray-700 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <FiltersContent />
        </div>
      </aside>
    </>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-t border-[var(--brand-line)] dark:border-gray-700 py-5 first:border-t-0 first:pt-0">
      <h4 className="mb-4 font-black text-gray-900 dark:text-white text-sm">{title}</h4>
      <div className="space-y-3">
        {items.map((item, index) => (
          <label
            key={item}
            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              defaultChecked={index === 0}
              className="accent-[var(--brand-primary)] dark:accent-[var(--brand-secondary)]"
            />
            {item}
          </label>
        ))}
      </div>
      <button className="mt-4 text-xs font-bold text-[var(--brand-primary)] dark:text-[var(--brand-secondary)] hover:underline">
        + View more
      </button>
    </div>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[var(--brand-surface-soft)] dark:bg-gray-800 text-[var(--brand-primary)] dark:text-[var(--brand-secondary)]">
        {icon}
      </div>
      <div>
        <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}
