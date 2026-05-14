import React from "react";
import { ArrowRight, Bone, Cat, Dog, ShoppingBag, Scissors, Pill, Camera, Activity, ChevronRight } from "lucide-react";

const CATEGORIES = [
  { 
    name: "Dog Food", 
    desc: "Premium nutrition",
    icon: <Bone size={28} />, 
    color: "bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] border-[var(--brand-line)]",
    hoverBg: "group-hover:bg-[var(--brand-primary)] group-hover:text-white"
  },
  { 
    name: "Cat Food", 
    desc: "Healthy & tasty",
    icon: <Cat size={28} />, 
    color: "bg-[#fff0f7] text-[#c2397f] border-[rgba(255,91,167,0.18)]",
    hoverBg: "group-hover:bg-[#ff5ba7] group-hover:text-white"
  },
  { 
    name: "Toys", 
    desc: "Fun & interactive",
    icon: <Dog size={28} />, 
    color: "bg-[#f4f0ff] text-[#6d45d1] border-[#d8ccff]",
    hoverBg: "group-hover:bg-[#8f5cff] group-hover:text-white"
  },
  { 
    name: "Treats", 
    desc: "Training rewards",
    icon: <ShoppingBag size={28} />, 
    color: "bg-[var(--brand-warm-soft)] text-[#8c5a16] border-[rgba(245,216,170,0.4)]",
    hoverBg: "group-hover:bg-[#f5d8aa] group-hover:text-[#8c5a16]"
  },
  { 
    name: "Grooming", 
    desc: "Spa essentials",
    icon: <Scissors size={28} />, 
    color: "bg-[#f7ebff] text-[#9146d8] border-[#ebd1ff]",
    hoverBg: "group-hover:bg-[#b575ea] group-hover:text-white"
  },
  { 
    name: "Health", 
    desc: "Vitamins & meds",
    icon: <Pill size={28} />, 
    color: "bg-[#effbfa] text-[#0d9488] border-[#ccfbf1]",
    hoverBg: "group-hover:bg-[#14b8a6] group-hover:text-white"
  },
  { 
    name: "Accessories", 
    desc: "Collars & leashes",
    icon: <Activity size={28} />, 
    color: "bg-[#f3edff] text-[var(--brand-secondary)] border-[var(--brand-line)]",
    hoverBg: "group-hover:bg-[var(--brand-secondary)] group-hover:text-white"
  },
  { 
    name: "Smart Gear", 
    desc: "Tech for pets",
    icon: <Camera size={28} />, 
    color: "bg-[#f8f5ff] text-[#53358d] border-[#e8dcff]",
    hoverBg: "group-hover:bg-[#53358d] group-hover:text-white"
  },
];

export default function ShopByCategory() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-500 font-medium text-sm md:text-base">Find exactly what your pet needs, faster.</p>
        </div>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] transition-colors group bg-[var(--brand-surface-soft)] px-5 py-2.5 rounded-full">
          View all categories <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {CATEGORIES.map((item) => (
          <div
            key={item.name}
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
