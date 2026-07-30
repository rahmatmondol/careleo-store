"use client";

import React, { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import CartSidebar from "./CartSidebar";
import NextLink from "next/link";
import DesktopSearch from "./navbar/DesktopSearch";
import MobileSearch from "./navbar/MobileSearch";
import { useCart } from "@/lib/CartContext";

const navItems: { label: string; href: string; badge?: string }[] = [
  { label: "Shop", href: "/shop" },
  { label: "Subscription", href: "/subscription", badge: "Save More" },
  { label: "AI Care", href: "/ai-care" },
  { label: "Services", href: "/services" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

// Mock database for live search
const mockProducts = [
  { id: 1, name: "Care Leo Salmon Recipe Adult Dog Food", price: "$24.99", type: "Food" },
  { id: 2, name: "Greenies Original Regular Dental Treats", price: "$16.99", type: "Treats" },
  { id: 3, name: "Care Leo Octopus Plush Toy for Dogs", price: "$12.99", type: "Toy" },
  { id: 4, name: "Care Leo Multivitamin Soft Chews", price: "$19.99", type: "Supplement" },
  { id: 5, name: "Care Leo Skin & Coat Supplement", price: "$18.99", type: "Supplement" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchResults = searchQuery.trim().length > 0 
    ? mockProducts.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--brand-line)] bg-white/85 backdrop-blur-md">
        <div className="relative flex items-center justify-between mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-4 gap-4">
          
          {/* Left section: hamburger + logo + nav links */}
          <div className="flex items-center gap-6 xl:gap-8 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white hover:bg-[var(--brand-surface-soft)] transition-colors lg:hidden"
              >
                <Menu size={20} className="text-gray-700" />
              </button>

              <NextLink href="/" className="hidden lg:flex items-center gap-3 shrink-0">
                <BrandLogo className="h-10 w-10 sm:h-12 sm:w-12" priority />
              </NextLink>
            </div>

            {/* Nav links */}
            <nav className="hidden items-center gap-6 xl:gap-8 text-sm font-bold text-gray-700 lg:flex">
              {navItems.map((item) => (
                <NextLink
                  key={item.label}
                  href={item.href}
                  className="relative flex items-center whitespace-nowrap hover:text-[var(--brand-primary)] transition-colors"
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-3 -right-6 rounded-full bg-[var(--brand-accent)] px-1.5 py-0.5 text-[9px] font-black text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NextLink>
              ))}
            </nav>
          </div>

          {/* Center: logo (mobile only) */}
          <NextLink
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center lg:hidden"
          >
            <BrandLogo className="h-10 w-10" priority />
          </NextLink>

          {/* Center: Large Search Bar (Desktop) */}
          <DesktopSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
            searchResults={searchResults}
          />

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className={`flex lg:hidden h-11 w-11 items-center justify-center rounded-full border transition-colors ${isMobileSearchOpen ? 'bg-[var(--brand-surface-soft)] border-[var(--brand-primary)] text-[var(--brand-primary)]' : 'bg-white border-[var(--brand-line)] hover:bg-[var(--brand-surface-soft)] text-gray-700'}`}
            >
              {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white hover:bg-[var(--brand-surface-soft)] transition-colors"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[var(--brand-accent)] text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button className="hidden px-2 text-sm font-bold text-gray-700 hover:text-[var(--brand-primary)] transition-colors sm:block">
              Log In
            </button>

            <button className="brand-primary-button hidden items-center rounded-full px-5 xl:px-6 py-2.5 text-sm font-bold sm:flex whitespace-nowrap">
              Join Care Leo+
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <MobileSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isMobileSearchOpen={isMobileSearchOpen}
          setIsMobileSearchOpen={setIsMobileSearchOpen}
          searchResults={searchResults}
        />
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}