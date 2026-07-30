"use client";

import React from "react";
import { Star, PawPrint, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

import ProductImage from "./ProductImage";

type ProductCardProps = {
  id?: string;
  /** Clean URL slug from the catalogue. Preferred over the raw id for links. */
  slug?: string;
  name: string;
  price: string;
  old: string;
  badge: string;
  badgeColor: string;
  rating: number;
  imageUrl?: string;
  onAddToCart?: () => void;
};

export default function ProductCard({
  id,
  slug,
  name,
  price,
  old,
  badge,
  badgeColor,
  rating,
  imageUrl,
  onAddToCart,
}: ProductCardProps) {
  // Generate a pseudo-random hue based on product name for a unique gradient
  const hue = name.length * 15 % 360;
  // Never build a URL out of the product name — spaces and "&" break sharing and
  // used to resolve to whatever product the detail page had hardcoded.
  const key = slug || id;
  const href = key ? `/product/${encodeURIComponent(key)}` : null;

  return (
      <div className="group flex min-w-0 flex-col rounded-[15px] sm:rounded-[15px] border border-[var(--brand-line)] bg-white p-2.5 sm:p-5 shadow-[0_4px_20px_rgba(90,49,213,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(90,49,213,0.12)]">
        <div className="relative mb-2 sm:mb-4 flex h-36 sm:h-64 items-center justify-center rounded-[15px] sm:rounded-[15px] overflow-hidden bg-[var(--brand-surface-soft)]">
          
          <div 
            className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110"
            style={{ background: `radial-gradient(circle at center, hsl(${hue}, 80%, 60%), transparent 70%)` }}
          />
        <span
          className={`absolute top-2 left-2 sm:top-4 sm:left-4 z-10 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black text-white shadow-sm ${badgeColor}`}
        >
          {badge}
        </span>
        
        {/* Product Visual */}
        <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-[15px]">
          <ProductImage
            src={imageUrl}
            alt={name}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 text-yellow-400 mb-1 sm:mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={10}
            fill={i <= Math.floor(rating) ? "currentColor" : "none"}
            className={`sm:hidden ${i > Math.floor(rating) ? "text-gray-200" : ""}`}
          />
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            fill={i <= Math.floor(rating) ? "currentColor" : "none"}
            className={`hidden sm:block ${i > Math.floor(rating) ? "text-gray-200" : ""}`}
          />
        ))}
        <span className="ml-0.5 text-[10px] sm:text-xs font-bold text-gray-400">
          ({rating})
        </span>
      </div>

      {href ? (
        <Link href={href}>
          <h3 className="mb-1.5 sm:mb-4 flex-1 line-clamp-2 break-words text-xs sm:text-base font-bold leading-snug text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors">
            {name}
          </h3>
        </Link>
      ) : (
        <h3 className="mb-1.5 sm:mb-4 flex-1 line-clamp-2 break-words text-xs sm:text-base font-bold leading-snug text-gray-900">
          {name}
        </h3>
      )}

      <div className="mb-2 sm:mb-4 brand-accent-chip inline-flex items-center gap-1 self-start rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold shadow-sm">
        <PawPrint size={10} className="sm:hidden" />
        <PawPrint size={12} className="hidden sm:block" />
        Save 20% with Care Leo+
      </div>

      <div className="flex items-end gap-1.5 sm:gap-2 mt-auto">
        <p className="text-lg sm:text-2xl font-black text-gray-900">
          {price}
        </p>
        <p className="mb-0.5 sm:mb-1 text-[11px] sm:text-sm font-bold text-gray-400 line-through">
          {old}
        </p>
      </div>

      <div className="mt-2 sm:mt-4 flex gap-1.5 sm:gap-2">
        <button onClick={onAddToCart} className="flex flex-1 items-center justify-center gap-1 sm:gap-2 rounded-full border border-[var(--brand-line)] bg-white py-2 sm:py-3 text-[11px] sm:text-sm font-bold text-gray-700 shadow-sm transition-all hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-md active:scale-95">
          <ShoppingCart size={14} className="sm:hidden" />
          <ShoppingCart size={16} className="hidden sm:block" />
          Add to Cart
        </button>
        <button className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-gray-400 shadow-sm transition-all hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] hover:bg-pink-50 active:scale-95">
          <Heart size={14} className="sm:hidden" />
          <Heart size={18} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
}
