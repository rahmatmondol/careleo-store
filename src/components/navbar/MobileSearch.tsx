import React from "react";
import { Search, X, ChevronRight } from "lucide-react";
import NextLink from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
}

interface MobileSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (open: boolean) => void;
  searchResults: Product[];
}

export default function MobileSearch({
  searchQuery,
  setSearchQuery,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
  searchResults
}: MobileSearchProps) {
  if (!isMobileSearchOpen) return null;

  return (
    <div className="lg:hidden border-t border-[var(--brand-line)] bg-white px-4 py-4 animate-in slide-in-from-top-2 duration-200 shadow-md">
      <div className="brand-input-shell w-full flex items-center gap-2 rounded-full px-5 py-3 border border-[var(--brand-primary)] ring-2 ring-[var(--brand-primary)]/10">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, brands..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 font-medium text-[var(--foreground)]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Mobile Live Search Results */}
      {searchQuery.trim().length > 0 && (
        <div className="mt-4 max-h-[60vh] overflow-y-auto bg-white rounded-2xl border border-[var(--brand-line)] shadow-sm">
          <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-[var(--brand-line)]">Products</div>
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <NextLink 
                key={result.id} 
                href={`/product/${result.id}`} 
                onClick={() => setIsMobileSearchOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-[var(--brand-surface-soft)] border-b border-[var(--brand-line)] last:border-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0 border border-gray-100">
                    <Search size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--foreground)] line-clamp-1">{result.name}</p>
                    <p className="text-xs text-[var(--brand-ink-soft)] font-medium mt-0.5">{result.type}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-[var(--brand-primary)] shrink-0 pl-2">{result.price}</span>
              </NextLink>
            ))
          ) : (
            <div className="px-4 py-8 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                <Search size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-[var(--brand-ink-soft)] font-medium">
                No products found for "<span className="text-[var(--foreground)] font-bold">{searchQuery}</span>"
              </p>
            </div>
          )}
          {searchResults.length > 0 && (
            <div className="bg-[var(--brand-surface-soft)] px-4 py-3 text-center">
              <button 
                onClick={() => setIsMobileSearchOpen(false)}
                className="text-sm font-bold text-[var(--brand-primary)] hover:underline flex items-center justify-center w-full gap-1"
              >
                View all {searchResults.length} results <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}