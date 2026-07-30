import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function BottomBanner() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-[40px] bg-gradient-to-r from-[#efe6ff] via-white to-[#ffe3ef] px-5 py-10 sm:px-8 sm:py-16 text-center shadow-[0_18px_48px_rgba(90,49,213,0.12)]">
        {/* Decorations crowd the copy at phone widths. */}
        <div className="absolute left-10 bottom-0 hidden opacity-50 sm:block">
          <div className="h-40 w-40 rounded-t-full bg-[#d8c4ff]"></div>
        </div>
        <div className="absolute right-10 bottom-0 hidden opacity-50 sm:block">
          <div className="h-32 w-32 rounded-t-full bg-[#ffd2e6]"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-[26px] sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-[1.18] pb-1">Smarter Pet Parenting Starts Here</h2>
          <p className="mx-auto max-w-xl text-base sm:text-lg font-medium text-gray-700 mb-8 sm:mb-10">
            Shop the best products, get expert care and save more with Care Leo+.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/shop" className="brand-primary-button flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold">
              Start Shopping <ArrowRight size={18} />
            </Link>
            <Link href="/subscription" className="brand-secondary-button flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold">
              Join Care Leo+ Today <Star size={18} className="text-[var(--brand-accent)]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
