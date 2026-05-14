"use client";

import { Sparkles, Calendar, Package, Check, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function SubscriptionsTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-6">Care Leo+ Subscription</h2>
      
      <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-3xl p-1 relative overflow-hidden mb-8 shadow-lg shadow-[var(--brand-shadow)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-[22px] p-6 md:p-8 relative z-10 h-full w-full">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-[var(--brand-line)] dark:border-gray-800 pb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-bold mb-4">
                <Sparkles size={14} /> Active Subscription
              </div>
              <h3 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-2">Monthly Essentials Box</h3>
              <p className="text-[var(--brand-ink-soft)] dark:text-gray-400 max-w-md">
                You are currently saving 20% on all these items and enjoying free express delivery.
              </p>
            </div>
            
            <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 p-4 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 min-w-[200px]">
              <div className="text-xs font-bold text-[var(--brand-ink-soft)] uppercase tracking-wider mb-1">Next Delivery</div>
              <div className="text-lg font-black text-[var(--foreground)] dark:text-white flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-[var(--brand-primary)]" /> May 24, 2026
              </div>
              <button className="w-full brand-secondary-button py-2 rounded-xl text-sm font-bold">
                Skip Delivery
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-[var(--foreground)] dark:text-white flex items-center gap-2">
              <Package size={18} className="text-[var(--brand-primary)]" /> Items in your subscription
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Item 1 */}
              <div className="flex gap-4 p-4 border border-[var(--brand-line)] dark:border-gray-800 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                  <Image src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&q=80" alt="Dog Food" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-[var(--foreground)] dark:text-white line-clamp-1">Pawly Salmon Recipe Adult Dog Food - 12kg</h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[var(--brand-ink-soft)]">Qty: 1</span>
                    <span className="text-sm font-black text-[var(--brand-primary)]">$45.99</span>
                  </div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex gap-4 p-4 border border-[var(--brand-line)] dark:border-gray-800 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                  <Image src="https://images.unsplash.com/photo-1623366302587-bca23fc9e422?w=300&q=80" alt="Treats" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-[var(--foreground)] dark:text-white line-clamp-1">Greenies Original Regular Dental Treats</h5>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[var(--brand-ink-soft)]">Qty: 2</span>
                    <span className="text-sm font-black text-[var(--brand-primary)]">$33.98</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] flex items-center gap-1">
              Add more items <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--brand-line)] dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-[var(--brand-ink-soft)]" />
              <span className="text-sm font-medium text-[var(--foreground)] dark:text-gray-300">Visa ending in •••• 4242</span>
            </div>
            <div className="flex gap-3">
              <button className="text-sm font-bold text-red-500 hover:text-red-600 px-4 py-2">Cancel Subscription</button>
              <button className="brand-primary-button px-6 py-2 rounded-xl text-sm font-bold">Manage Billing</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}