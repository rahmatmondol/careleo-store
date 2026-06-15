"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Bone, Cat, Dog, ShoppingBag, Scissors, Pill, Camera, Activity, 
  ChevronRight, Sparkles, Heart, Search, ArrowRight, MousePointerClick, Star
} from "lucide-react";
import { useCategories } from "@/lib/useStore";

// Visual presets cycled across real categories
const CATEGORY_STYLES = [
  { icon: <Bone size={28} />, color: "bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] border-[var(--brand-line)]", hoverBg: "hover:bg-[var(--brand-primary)] hover:text-white hover:border-transparent" },
  { icon: <Cat size={28} />, color: "bg-[#fff0f7] text-[#c2397f] border-[rgba(255,91,167,0.18)]", hoverBg: "hover:bg-[#ff5ba7] hover:text-white hover:border-transparent" },
  { icon: <Dog size={28} />, color: "bg-[#f4f0ff] text-[#6d45d1] border-[#d8ccff]", hoverBg: "hover:bg-[#8f5cff] hover:text-white hover:border-transparent" },
  { icon: <ShoppingBag size={28} />, color: "bg-[var(--brand-warm-soft)] text-[#8c5a16] border-[rgba(245,216,170,0.4)]", hoverBg: "hover:bg-[#f5d8aa] hover:text-[#8c5a16] hover:border-transparent" },
  { icon: <Scissors size={28} />, color: "bg-[#f7ebff] text-[#9146d8] border-[#ebd1ff]", hoverBg: "hover:bg-[#b575ea] hover:text-white hover:border-transparent" },
  { icon: <Pill size={28} />, color: "bg-[#effbfa] text-[#0d9488] border-[#ccfbf1]", hoverBg: "hover:bg-[#14b8a6] hover:text-white hover:border-transparent" },
  { icon: <Activity size={28} />, color: "bg-[#f3edff] text-[var(--brand-secondary)] border-[var(--brand-line)]", hoverBg: "hover:bg-[var(--brand-secondary)] hover:text-white hover:border-transparent" },
  { icon: <Camera size={28} />, color: "bg-[#f8f5ff] text-[#53358d] border-[#e8dcff]", hoverBg: "hover:bg-[#53358d] hover:text-white hover:border-transparent" },
  { icon: <Heart size={28} />, color: "bg-[#fff5f5] text-[#e11d48] border-[#ffe4e6]", hoverBg: "hover:bg-[#fb7185] hover:text-white hover:border-transparent" },
  { icon: <MousePointerClick size={28} />, color: "bg-[#f0fdf4] text-[#0f766e] border-[#ccfbf1]", hoverBg: "hover:bg-[#2dd4bf] hover:text-white hover:border-transparent" },
  { icon: <ArrowRight size={28} />, color: "bg-[#fdf4ff] text-[#a21caf] border-[#fae8ff]", hoverBg: "hover:bg-[#e879f9] hover:text-white hover:border-transparent" },
  { icon: <Star size={28} />, color: "bg-[#fffbeb] text-[#b45309] border-[#fef3c7]", hoverBg: "hover:bg-[#fbbf24] hover:text-white hover:border-transparent" },
];

const PET_TYPES = [
  { name: "Dogs", image: "🐶", color: "bg-orange-100 text-orange-600" },
  { name: "Cats", image: "🐱", color: "bg-pink-100 text-pink-600" },
  { name: "Fish", image: "🐠", color: "bg-blue-100 text-blue-600" },
  { name: "Birds", image: "🦜", color: "bg-cyan-100 text-cyan-600" },
  { name: "Small Pets", image: "🐹", color: "bg-amber-100 text-amber-600" },
  { name: "Reptiles", image: "🦎", color: "bg-emerald-100 text-emerald-600" }
];

export default function CategoriesPage() {
  const { categories, loading } = useCategories();
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main className="pt-12 pb-24">
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          
          {/* Shop by Pet */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black text-gray-900">Shop by Pet</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PET_TYPES.map((pet) => (
                <Link href={`/categories/${pet.name.toLowerCase()}`} key={pet.name}>
                  <div className="group bg-white border border-gray-100 rounded-[15px] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_30px_rgba(90,49,213,0.08)] hover:-translate-y-2 hover:border-[var(--brand-line)] cursor-pointer">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-[15px] ${pet.color} flex items-center justify-center text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                        {pet.image}
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[var(--brand-primary)] transition-colors">{pet.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Categories Grid */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">All Categories</h2>
                <p className="text-gray-500 font-medium">Find exactly what you need in our curated collections.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-48 animate-pulse rounded-[15px] bg-[var(--brand-surface-soft)]" />
                ))
              ) : categories.length === 0 ? (
                <p className="col-span-full py-12 text-center text-gray-500">No categories available yet.</p>
              ) : (
                categories.map((cat, idx) => {
                  const style = CATEGORY_STYLES[idx % CATEGORY_STYLES.length];
                  return (
                    <Link href={`/categories/${cat.slug}`} key={cat.id}>
                      <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-[15px] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(90,49,213,0.12)] hover:-translate-y-2 cursor-pointer relative overflow-hidden">

                        {/* Hover Background Tint */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-surface-soft)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"></div>

                        <div className="relative z-10 flex justify-between items-start mb-6">
                          <div className={`w-16 h-16 rounded-[15px] flex items-center justify-center transition-all duration-300 ${style.color} ${style.hoverBg} group-hover:-rotate-6 group-hover:scale-110 shadow-sm`}>
                            {style.icon}
                          </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                          <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[var(--brand-primary)] transition-colors">{cat.name}</h3>
                          <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-2">{cat.description || `Explore ${cat.name}`}</p>

                          <div className="flex items-center text-sm font-bold text-[var(--brand-primary)] group-hover:text-[var(--brand-primary-strong)]">
                            Explore Category <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Bottom Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#fff0f7] to-[#f5efff] rounded-[32px] p-8 md:p-12 border border-white flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 shadow-sm">
             <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Can&apos;t find what you&apos;re looking for?</h3>
                <p className="text-gray-600 font-medium max-w-lg">Our AI assistant is here to help you find the perfect product for your pet&apos;s specific needs.</p>
             </div>
             <button className="shrink-0 bg-[var(--brand-primary)] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[var(--brand-primary-strong)] hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                <Sparkles size={18} /> Ask Care Leo AI
             </button>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}