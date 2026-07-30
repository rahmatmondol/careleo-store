import React from "react";
import Link from "next/link";
import { Package, ArrowRight, Heart, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Why Choose Care Leo?</h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">We go beyond just delivering pet supplies. We are building a complete ecosystem to help your pet live their best life.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="brand-soft-panel flex flex-col items-start rounded-[40px] p-10 transition-transform duration-500 hover:-translate-y-2">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[var(--brand-primary)]">
            <Package size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">Never Run Out Again</h3>
          <p className="text-gray-600 font-medium mb-8">
            Smart recurring orders for food, treats & essentials. Skip or modify anytime with zero fees.
          </p>
          <div className="mt-auto pt-8 w-full border-t border-[var(--brand-line)]">
            <Link href="/subscription" className="flex items-center gap-2 text-sm font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)] group">
              Setup Auto-Order <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start rounded-[40px] border border-[rgba(255,91,167,0.12)] bg-[#fff7fc] p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,91,167,0.08)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#c2397f]">
            <Heart size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">Join Pet Lovers</h3>
          <p className="text-gray-600 font-medium mb-8">
            Share moments, get expert tips, and connect with a loving, verified pet parent community.
          </p>
          <div className="mt-auto pt-8 w-full border-t border-[rgba(255,91,167,0.1)]">
            <Link href="/community" className="flex items-center gap-2 text-sm font-bold text-[#c2397f] hover:text-[#9e2b65] group">
              Explore Community <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start rounded-[40px] border border-[rgba(245,216,170,0.28)] bg-[#fff9ef] p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(245,216,170,0.15)]">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-[#8c5a16]">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4">Expert Care Nearby</h3>
          <p className="text-gray-600 font-medium mb-8">
            Book top-rated vet appointments, pet walkers and other trusted services right in the app.
          </p>
          <div className="mt-auto pt-8 w-full border-t border-[rgba(245,216,170,0.2)]">
            <Link href="/services" className="flex items-center gap-2 text-sm font-bold text-[#8c5a16] hover:text-[#6b420d] group">
              Explore Services <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
