import React from "react";
import { PawPrint, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-20 relative">
      <div className="mb-4 flex items-center gap-2 font-bold text-[var(--brand-primary)]">
        <PawPrint size={18} fill="currentColor" /> What Pet Parents Say
      </div>
      
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="flex gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* The cards are absolutely positioned visually in the original design, but let's use a grid to simulate the carousel */}
      <div className="grid md:grid-cols-3 gap-6 -mt-20">
        <TestimonialCard 
          text="Care Leo+ has made pet parenting so much easier! The auto-delivery and AI nutrition plans are a game changer."
          name="Sarah J."
          role="Dog Mom"
        />
        <TestimonialCard 
          text="The products are amazing and my cat loves the treats! Plus the discounts with Care Leo+ are super worth it."
          name="Mike T."
          role="Cat Dad"
        />
        <TestimonialCard 
          text="Finally, a one-stop solution for everything my pet needs. The AI assistant is like having a vet in my pocket!"
          name="Priya K."
          role="Pet Parent"
        />
      </div>
    </section>
  );
}

function TestimonialCard({ text, name, role }: { text: string, name: string, role: string }) {
  // Generate a random hue for the avatar
  const hue = name.length * 20 % 360;

  return (
    <div className="mt-20 flex flex-col rounded-[32px] border border-[var(--brand-line)] bg-white p-8 shadow-xl shadow-[rgba(90,49,213,0.08)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(90,49,213,0.12)]">
      <div className="h-8 text-5xl font-serif leading-none text-[#d8c4ff]">&quot;</div>
      <p className="text-gray-700 font-medium leading-relaxed flex-1 mb-8">
        {text}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold shadow-inner"
            style={{ background: `linear-gradient(135deg, hsl(${hue}, 80%, 65%), hsl(${hue + 40}, 80%, 55%))` }}
          >
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">{name}</p>
            <p className="text-xs font-bold text-gray-500">{role}</p>
          </div>
        </div>
        <div className="flex gap-0.5 text-yellow-400">
          {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
        </div>
      </div>
    </div>
  );
}
