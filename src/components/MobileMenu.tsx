"use client";

import NextLink from "next/link";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import BrandLogo from "./BrandLogo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};


const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Subscription", href: "/subscription", badge: "Save More" },
  { label: "AI Care", href: "/ai-care" },
  { label: "Services", href: "/services" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <nav
        className={`fixed top-0 left-0 z-50 h-full w-[300px] max-w-[85vw] bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-line)] dark:border-gray-800">
          <BrandLogo className="h-10 w-10" />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] dark:border-gray-700 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="px-4 py-4">

          <div className="space-y-1">
            {navItems.map((item) => (
              <NextLink
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 transition-colors"
              >
                {item.label}
                {item.badge && (
                  <span className="rounded-full bg-[var(--brand-accent)] px-2 py-0.5 text-[10px] font-black text-white">
                    {item.badge}
                  </span>
                )}
              </NextLink>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--brand-line)] dark:border-gray-800 p-6 space-y-3">
          <button className="w-full rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-900 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 transition-colors">
            Log In
          </button>
          <button className="brand-primary-button w-full rounded-full py-3 text-sm font-bold">
            Join Care Leo+
          </button>
        </div>
      </nav>
    </>
  );
}
