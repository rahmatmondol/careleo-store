import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, Package, Heart, Bot, ArrowRight, Smile, Calendar } from "lucide-react";

export default function AICareSection() {
  return (
    <section className="mx-auto max-w-[var(--container-width)] px-6 py-12 md:py-16">
      <div className="relative grid items-center gap-12 overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#f5efff_0%,#fff7fc_100%)] p-8 md:p-16 lg:grid-cols-2">
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/4 rounded-full bg-[rgba(143,92,255,0.16)] blur-3xl"></div>

        <div className="relative z-10 hidden lg:block">
          <div className="relative mx-auto w-[320px] rounded-[40px] border-[8px] border-white bg-white shadow-[0_20px_60px_rgba(90,49,213,0.12)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="bg-gray-50 p-6 pt-12 pb-8 h-[600px] flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-14 w-14 rounded-full bg-white overflow-hidden shadow-sm border-2 border-white">
                  <Image src="/Leo.png" alt="Leo" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-xl">Leo</h4>
                  <p className="text-xs font-bold text-gray-500">Mascot • 2 yrs</p>
                </div>
              </div>
              
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-[var(--brand-line)] mb-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Health Score</p>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">+2 pts</span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-5xl font-black text-[var(--brand-primary)]">98</p>
                  <p className="text-sm font-bold text-emerald-500 mb-1">Excellent</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 mt-4">Today&apos;s Recommendations</p>
                
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-[var(--brand-line)] hover:-translate-y-1 transition-transform">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Add Omega-3</p>
                    <p className="text-xs font-medium text-gray-500">Good for joint health</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-[rgba(255,91,167,0.18)] hover:-translate-y-1 transition-transform">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent-soft)] text-[#c2397f]">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Nutrition Plan</p>
                    <p className="text-xs font-medium text-gray-500">1200 kcal / day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 -right-8 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--brand-accent)] shadow-[0_10px_30px_rgba(255,91,167,0.2)] animate-float">
            <Heart size={24} fill="currentColor" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="brand-chip mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
            <Bot size={16} /> AI-Powered Care
          </div>
          <h2 className="text-4xl font-black text-gray-900 md:text-5xl leading-tight">
            AI That Understands <br/> Your Pet
          </h2>
          <p className="mt-6 max-w-lg text-lg text-gray-600 font-medium leading-relaxed">
            Advanced AI tools to keep your pet healthy, happy, and thriving every day.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <AIFeature icon={<Activity />} title="AI Disease Detection" desc="Detect issues early" color="text-[var(--brand-accent)]" bg="bg-[var(--brand-accent-soft)]" />
            <AIFeature icon={<Bot />} title="AI Nutrition Engine" desc="Personalized diet plans" color="text-[var(--brand-primary)]" bg="bg-[var(--brand-surface-soft)]" />
            <AIFeature icon={<Smile />} title="Behavior Analysis" desc="Understand mood & stress" color="text-[var(--brand-secondary)]" bg="bg-[rgba(143,92,255,0.12)]" />
            <AIFeature icon={<Calendar />} title="Smart Reminders" desc="Never miss important care" color="text-[#53358d]" bg="bg-[var(--brand-warm-soft)]" />
          </div>

          <div className="mt-10">
            <Link href="/ai-care" className="brand-primary-button inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold">
              Try Care Leo AI <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIFeature({ icon, title, desc, color, bg }: { icon: React.ReactNode, title: string, desc: string, color: string, bg: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-base font-bold text-gray-900">{title}</h4>
        <p className="text-sm font-medium text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
