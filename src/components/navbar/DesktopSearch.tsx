import React from "react";
import { Search, X, ChevronRight } from "lucide-react";
import NextLink from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  type: string;
}

interface DesktopSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  searchResults: Product[];
}

export default function DesktopSearch({
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
  searchResults
}: DesktopSearchProps) {
  return (
    <div className="hidden lg:flex flex-1 max-w-2xl px-4 xl:px-8 relative">
      <div className={`brand-input-shell w-full flex items-center gap-2 rounded-full px-5 py-2.5 transition-all ${isSearchFocused ? 'ring-2 ring-[var(--brand-primary)]/20 border-[var(--brand-primary)]' : ''}`}>
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          placeholder="Search products, brands, and categories..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 font-medium text-[var(--foreground)]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Live Search Dropdown */}
      {isSearchFocused && searchQuery.trim().length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-4 right-4 xl:left-8 xl:right-8 bg-white rounded-2xl shadow-[0_20px_50px_rgba(90,49,213,0.12)] border border-[var(--brand-line)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 max-h-[400px] overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-wider">Products</div>
            {searchResults.length > 0 ? (
              searchResults.map(result => (
                <NextLink key={result.id} href={`/product/${result.id}`} className="flex items-center justify-between px-3 py-2.5 hover:bg-[var(--brand-surface-soft)] rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0 border border-gray-100 group-hover:bg-white group-hover:border-[var(--brand-line)] transition-colors">
                      <Search size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--foreground)] line-clamp-1">{result.name}</p>
                      <p className="text-xs text-[var(--brand-ink-soft)] font-medium mt-0.5">{result.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-[var(--brand-primary)] shrink-0 pl-4">{result.price}</span>
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
          </div>
          {searchResults.length > 0 && (
            <div className="bg-[var(--brand-surface-soft)] px-4 py-3 border-t border-[var(--brand-line)]">
              <button className="text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] flex items-center justify-center w-full gap-1">
                View all {searchResults.length} results <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}