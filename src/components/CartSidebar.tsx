"use client";

import React, { useEffect } from "react";
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

type CartSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const cartItems = [
  {
    id: 1,
    name: "Care Leo Salmon Recipe Dog Food - 2kg",
    price: 29.99,
    qty: 2,
    image: "",
  },
  {
    id: 2,
    name: "Care Leo Dental Chew Treats",
    price: 11.99,
    qty: 1,
    image: "",
  },
];

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[400px] max-w-[90vw] bg-white dark:bg-gray-950 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-line)] dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--brand-primary)]" />
            <h2 className="text-lg font-black text-[var(--foreground)] dark:text-white">
              Your Cart
            </h2>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-accent)] text-xs font-bold text-white">
              {cartItems.reduce((sum, i) => sum + i.qty, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--brand-line)] dark:border-gray-700 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 bg-[var(--brand-surface-soft)] dark:bg-gray-900 p-4"
            >
              <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                <ShoppingBag size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[var(--foreground)] dark:text-white truncate">
                  {item.name}
                </h4>
                <p className="mt-1 text-sm font-black text-[var(--brand-primary)]">
                  ${item.price.toFixed(2)}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-700 transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-[var(--foreground)] dark:text-white">
                      {item.qty}
                    </span>
                    <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--brand-line)] dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-700 transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-950 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length === 0 && (
            <div className="py-20 text-center">
              <ShoppingBag size={48} className="mx-auto text-gray-300 dark:text-gray-700" />
              <p className="mt-4 text-sm font-bold text-gray-500">Your cart is empty</p>
              <p className="mt-1 text-xs text-gray-400">Start shopping to add items</p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-[var(--brand-line)] dark:border-gray-800 p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-black text-[var(--foreground)] dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-bold text-green-600 dark:text-green-400">Free</span>
          </div>
          <div className="flex justify-between border-t border-[var(--brand-line)] dark:border-gray-800 pt-3">
            <span className="text-base font-black text-[var(--foreground)] dark:text-white">Total</span>
            <span className="text-base font-black text-[var(--foreground)] dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button className="brand-primary-button flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold">
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
