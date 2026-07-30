"use client";

import React, { useRef } from "react";
import { PawPrint, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const REVIEWS = [
  {
    text: "Care Leo+ has made pet parenting so much easier! The auto-delivery and AI nutrition plans are a game changer.",
    name: "Sarah J.",
    role: "Dog Mom"
  },
  {
    text: "The products are amazing and my cat loves the treats! Plus the discounts with Care Leo+ are super worth it.",
    name: "Mike T.",
    role: "Cat Dad"
  },
  {
    text: "Finally, a one-stop solution for everything my pet needs. The AI assistant is like having a vet in my pocket!",
    name: "Priya K.",
    role: "Pet Parent"
  },
  {
    text: "My golden retriever has a sensitive stomach, but the recommended food here completely solved the issue. Highly recommended!",
    name: "David L.",
    role: "Dog Dad"
  },
  {
    text: "The delivery is always on time, and customer service is outstanding. I wouldn't shop anywhere else for my bunnies.",
    name: "Emma W.",
    role: "Bunny Mom"
  }
];

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6 py-10 md:py-16 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-black text-gray-900">
          <PawPrint size={24} className="shrink-0 text-[var(--brand-primary)] sm:h-7 sm:w-7" fill="currentColor" /> What Pet Parents Say
        </h2>

        {/* Arrows are a pointer affordance — the carousel is swipeable on touch. */}
        <div className="hidden gap-4 sm:flex">
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors z-10"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--brand-line)] bg-white text-gray-500 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors z-10"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="mt-2 sm:mt-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="!py-6 !px-2 !-mx-2"
        >
          {REVIEWS.map((review, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <TestimonialCard 
                text={review.text}
                name={review.name}
                role={review.role}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function TestimonialCard({ text, name, role }: { text: string, name: string, role: string }) {
  // Generate a random hue for the avatar
  const hue = name.length * 20 % 360;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-[var(--brand-line)] bg-white p-6 shadow-sm transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(90,49,213,0.12)] sm:rounded-[32px] sm:p-8">
      <div className="h-8 text-5xl font-serif leading-none text-[#d8c4ff]">&quot;</div>
      <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed flex-1 mb-6 sm:mb-8">
        {text}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold shadow-inner shrink-0"
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