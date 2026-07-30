"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Bone, Cat, Dog, ShoppingBag, Scissors, Pill, Camera, Activity, ChevronRight } from "lucide-react";
import { useCategories } from "@/lib/useStore";

// Static style ring — cycled over real API categories
const CAT_STYLE = [
  { color: "bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] border-[var(--brand-line)]", hoverBg: "group-hover:bg-[var(--brand-primary)] group-hover:text-white", iconKey: "bone", icon: <Bone size={28} /> },
  { color: "bg-[#fff0f7] text-[#c2397f] border-[rgba(255,91,167,0.18)]", hoverBg: "group-hover:bg-[#ff5ba7] group-hover:text-white", iconKey: "cat", icon: <Cat size={28} /> },
  { color: "bg-[#f4f0ff] text-[#6d45d1] border-[#d8ccff]", hoverBg: "group-hover:bg-[#8f5cff] group-hover:text-white", iconKey: "dog", icon: <Dog size={28} /> },
  { color: "bg-[var(--brand-warm-soft)] text-[#8c5a16] border-[rgba(245,216,170,0.4)]", hoverBg: "group-hover:bg-[#f5d8aa] group-hover:text-[#8c5a16]", iconKey: "shopping", icon: <ShoppingBag size={28} /> },
  { color: "bg-[#f7ebff] text-[#9146d8] border-[#ebd1ff]", hoverBg: "group-hover:bg-[#b575ea] group-hover:text-white", iconKey: "scissors", icon: <Scissors size={28} /> },
  { color: "bg-[#effbfa] text-[#0d9488] border-[#ccfbf1]", hoverBg: "group-hover:bg-[#14b8a6] group-hover:text-white", iconKey: "pill", icon: <Pill size={28} /> },
  { color: "bg-[#f3edff] text-[var(--brand-secondary)] border-[var(--brand-line)]", hoverBg: "group-hover:bg-[var(--brand-secondary)] group-hover:text-white", iconKey: "activity", icon: <Activity size={28} /> },
  { color: "bg-[#f8f5ff] text-[#53358d] border-[#e8dcff]", hoverBg: "group-hover:bg-[#53358d] group-hover:text-white", iconKey: "camera", icon: <Camera size={28} /> },
];

const FALLBACK_CATEGORIES = [
  { name: "Dog Food", desc: "Premium nutrition", slug: "dog-food", color: CAT_STYLE[0].color, hoverBg: CAT_STYLE[0].hoverBg, icon: CAT_STYLE[0].icon },
  { name: "Cat Food", desc: "Healthy & tasty", slug: "cat-food", color: CAT_STYLE[1].color, hoverBg: CAT_STYLE[1].hoverBg, icon: CAT_STYLE[1].icon },
  { name: "Toys", desc: "Fun & interactive", slug: "toys", color: CAT_STYLE[2].color, hoverBg: CAT_STYLE[2].hoverBg, icon: CAT_STYLE[2].icon },
  { name: "Treats", desc: "Training rewards", slug: "treats", color: CAT_STYLE[3].color, hoverBg: CAT_STYLE[3].hoverBg, icon: CAT_STYLE[3].icon },
  { name: "Grooming", desc: "Spa essentials", slug: "grooming", color: CAT_STYLE[4].color, hoverBg: CAT_STYLE[4].hoverBg, icon: CAT_STYLE[4].icon },
  { name: "Health", desc: "Vitamins & meds", slug: "health", color: CAT_STYLE[5].color, hoverBg: CAT_STYLE[5].hoverBg, icon: CAT_STYLE[5].icon },
  { name: "Accessories", desc: "Collars & leashes", slug: "accessories", color: CAT_STYLE[6].color, hoverBg: CAT_STYLE[6].hoverBg, icon: CAT_STYLE[6].icon },
  { name: "Smart Gear", desc: "Tech for pets", slug: "smart-gear", color: CAT_STYLE[7].color, hoverBg: CAT_STYLE[7].hoverBg, icon: CAT_STYLE[7].icon },
];

export default function ShopByCategory() {
  const router = useRouter();
  const { categories } = useCategories();

  const items = categories.length > 0
    ? categories.slice(0, 8).map((cat, idx) => {
        const s = CAT_STYLE[idx % CAT_STYLE.length];
        return { name: cat.name, desc: cat.description?.slice(0, 30) || 'Shop now', slug: cat.slug, color: s.color, hoverBg: s.hoverBg, icon: s.icon };
      })
    : FALLBACK_CATEGORIES;

  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-500 font-medium text-sm md:text-base">Find exactly what your pet needs, faster.</p>
        </div>
        <Link href="/categories" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] transition-colors group bg-[var(--brand-surface-soft)] px-5 py-2.5 rounded-full">
          View all categories <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(`/categories/${item.slug}`)}
            className="group cursor-pointer relative overflow-hidden rounded-[15px] border border-[var(--brand-line)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(90,49,213,0.08)] hover:border-transparent"
          >
            {/* Hover Tint Background */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${item.hoverBg} group-hover:opacity-[0.03]`} />

            <div className="flex items-center gap-4 relative z-10">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[15px] border transition-all duration-300 ${item.color} ${item.hoverBg} group-hover:scale-110 group-hover:border-transparent group-hover:shadow-lg`}>
                <div className="transition-transform duration-300 group-hover:scale-90">
                  {item.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors line-clamp-1">{item.name}</h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5 line-clamp-1">{item.desc}</p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white group-hover:text-[var(--brand-primary)] group-hover:shadow-sm -translate-x-2 group-hover:translate-x-0">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
