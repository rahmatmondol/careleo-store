"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { 
  ChevronRight, Filter, ChevronDown, SlidersHorizontal, 
  X, Check, Star, Search
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useProducts, useCategories, formatPrice } from "@/lib/useStore";
import { useCart } from "@/lib/CartContext";

export default function CategoryArchivePage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params.slug as string;

  const { categories } = useCategories();
  const matchedCategory = useMemo(
    () => categories.find((c) => c.slug === rawSlug),
    [categories, rawSlug],
  );

  // Format slug to readable name (e.g., "dog-food" -> "Dog Food")
  const categoryName = matchedCategory?.name
    ?? (rawSlug
      ? rawSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : "Category");

  const [page, setPage] = useState(1);
  const limit = 12;
  const { products, total, loading } = useProducts(
    matchedCategory ? { categoryId: matchedCategory.id, page, limit } : { page, limit },
  );
  const { addItem } = useCart();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleAddToCart = async (productId: string) => {
    try {
      await addItem(productId, 1);
    } catch {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main className="pb-16">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-[var(--brand-line)]">
          <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center text-sm font-medium text-gray-500">
              <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <Link href="/categories" className="hover:text-[var(--brand-primary)] transition-colors">Categories</Link>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <span className="text-gray-900 font-bold px-3 py-1 bg-[var(--brand-surface-soft)] rounded-full">{categoryName}</span>
            </nav>
          </div>
        </div>

        {/* Category Hero Banner */}
        <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-6 sm:py-8">
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] bg-[var(--brand-surface-soft)] p-6 sm:p-10 shadow-[0_20px_50px_rgba(90,49,213,0.12)] border border-[var(--brand-line)]">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[var(--brand-primary)]/10 to-transparent blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[var(--brand-accent)]/10 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h1 className="text-[28px] sm:text-[32px] md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                  {categoryName}
                </h1>
                <p className="text-gray-600 font-medium text-sm sm:text-lg leading-relaxed">
                  Discover premium {categoryName.toLowerCase()} products selected by experts. Explore our collection of {products.length} items tailored for your pet's needs.
                </p>
              </div>
              
              {/* Desktop Search */}
              <div className="hidden lg:flex relative w-80 shrink-0">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={`Search in ${categoryName}...`}
                  className="w-full bg-white border border-[var(--brand-line)] rounded-full py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/10 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Search */}
        <div className="px-4 sm:px-6 mb-6 lg:hidden max-w-[var(--container-width)] mx-auto">
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={`Search in ${categoryName}...`}
              className="w-full bg-white border border-[var(--brand-line)] rounded-full py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 pt-2">
          
          {/* Mobile Filter & Sort Controls */}
          <div className="flex items-center justify-between lg:hidden mb-6 gap-3">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-[var(--brand-line)] rounded-full py-2.5 text-sm font-bold text-gray-700 shadow-sm"
            >
              <Filter size={16} /> Filters
            </button>
            <div className="relative flex-1">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-[var(--brand-line)] rounded-full py-2.5 text-sm font-bold text-gray-700 shadow-sm"
              >
                <SlidersHorizontal size={16} /> Sort
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr] items-start">
            
            {/* Sidebar Filters (Desktop) & Mobile Drawer */}
            <aside className={`
              fixed inset-0 z-50 bg-black/50 transition-opacity lg:relative lg:inset-auto lg:bg-transparent lg:w-full lg:shrink-0 lg:block
              ${isFilterOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"}
            `}>
              <div className={`
                absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 transform lg:relative lg:w-full lg:h-auto lg:bg-white lg:shadow-sm lg:border lg:border-[var(--brand-line)] lg:rounded-3xl lg:translate-x-0
                ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
              `}>
                <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
                  <h2 className="text-lg font-black text-gray-900">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-65px)] lg:h-auto lg:overflow-visible">
                  
                  <div className="hidden lg:flex mb-6 items-center justify-between">
                    <h3 className="text-lg font-black text-gray-900">Filters</h3>
                    <button className="text-xs font-bold text-[var(--brand-primary)] hover:underline">
                      Clear all
                    </button>
                  </div>

                  {/* Category Sub-links */}
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Related Categories</h3>
                    <ul className="space-y-3">
                      {['Dry Food', 'Wet Food', 'Veterinary Diets', 'Human-Grade', 'Toppers'].map(item => (
                        <li key={item}>
                          <Link
                            href={`/shop?search=${encodeURIComponent(item)}`}
                            className="text-sm font-medium text-gray-600 hover:text-[var(--brand-primary)] transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Brand Filter */}
                  <div className="border-t border-[var(--brand-line)] pt-6">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Brands</h3>
                    <div className="space-y-3">
                      {['Purina', 'Royal Canin', 'Blue Buffalo', "Hill's", 'Pedigree'].map((brand, idx) => (
                        <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-[var(--brand-primary)] transition-colors">
                            <input type="checkbox" className="peer sr-only" defaultChecked={idx === 0 || idx === 2} />
                            <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 peer-checked:text-[var(--brand-primary)] transition-opacity absolute" />
                            <div className="absolute inset-0 rounded bg-[var(--brand-primary)]/10 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{brand}</span>
                        </label>
                      ))}
                    </div>
                    <button className="text-xs font-bold text-[var(--brand-primary)] mt-4 hover:underline">Show more brands</button>
                  </div>

                  {/* Price Filter */}
                  <div className="border-t border-[var(--brand-line)] pt-6">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                    <div className="space-y-3">
                      {['Under $15', '$15 to $25', '$25 to $50', 'Over $50'].map(price => (
                        <label key={price} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 bg-white group-hover:border-[var(--brand-primary)] transition-colors">
                            <input type="radio" name="price" className="peer sr-only" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="border-t border-[var(--brand-line)] pt-6">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Customer Rating</h3>
                    <div className="space-y-3">
                      {[4, 3, 2].map(rating => (
                        <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center w-5 h-5 rounded border border-gray-300 bg-white group-hover:border-[var(--brand-primary)] transition-colors">
                            <input type="checkbox" className="peer sr-only" />
                            <Check size={14} className="text-[var(--brand-primary)] opacity-0 peer-checked:opacity-100 transition-opacity absolute" />
                          </div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-gray-300" : ""} />
                            ))}
                            <span className="text-sm font-medium text-gray-700 ml-1">& Up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Apply Button */}
                <div className="p-4 border-t border-gray-100 lg:hidden">
                  <button onClick={() => setIsFilterOpen(false)} className="w-full bg-[var(--brand-primary)] text-white font-bold py-3 rounded-xl shadow-lg">
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 w-full">
              
              {/* Desktop Sort & Active Filters */}
              <div className="hidden lg:flex items-center justify-between mb-8 bg-white p-4 rounded-2xl border border-[var(--brand-line)] shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Active Filters:</span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] px-3 py-1 rounded-full text-xs font-bold border border-[var(--brand-line)]">
                      Purina <X size={12} className="cursor-pointer hover:text-red-500" />
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] px-3 py-1 rounded-full text-xs font-bold border border-[var(--brand-line)]">
                      Blue Buffalo <X size={12} className="cursor-pointer hover:text-red-500" />
                    </span>
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-900 ml-2 underline">Clear All</button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Sort by:</span>
                    <button 
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      {sortBy} <ChevronDown size={16} />
                    </button>
                  </div>
                  
                  {isSortOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                      {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest Arrivals', 'Customer Rating'].map(option => (
                        <button 
                          key={option}
                          onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors ${sortBy === option ? 'text-[var(--brand-primary)] bg-[var(--brand-surface-soft)]' : 'text-gray-700'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-80 animate-pulse rounded-[15px] bg-[var(--brand-surface-soft)]" />
                  ))
                ) : products.length === 0 ? (
                  <p className="col-span-full py-12 text-center text-gray-500">No products found in this category.</p>
                ) : (
                  products.map((product) => (
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
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-40"
                  >
                    <ChevronRight size={18} className="rotate-180" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${
                          pageNum === page
                            ? "bg-[var(--brand-primary)] text-white shadow-md"
                            : "border border-gray-200 text-gray-700 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 4 && <span className="text-gray-400 font-bold px-2">...</span>}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}