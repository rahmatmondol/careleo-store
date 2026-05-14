import React from "react";
import { ArrowRight, Star } from "lucide-react";

export default function BottomBanner() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 pb-20">
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#efe6ff] via-white to-[#ffe3ef] px-8 py-16 text-center shadow-[0_18px_48px_rgba(90,49,213,0.12)]">
        <div className="absolute left-10 bottom-0 opacity-50">
          <div className="h-40 w-40 rounded-t-full bg-[#d8c4ff]"></div>
        </div>
        <div className="absolute right-10 bottom-0 opacity-50">
          <div className="h-32 w-32 rounded-t-full bg-[#ffd2e6]"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Smarter Pet Parenting Starts Here</h2>
          <p className="mx-auto max-w-xl text-lg font-medium text-gray-700 mb-10">
            Shop the best products, get expert care and save more with Care Leo+.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="brand-primary-button flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold">
              Start Shopping <ArrowRight size={18} />
            </button>
            <button className="brand-secondary-button flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold">
              Join Care Leo+ Today <Star size={18} className="text-[var(--brand-accent)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
