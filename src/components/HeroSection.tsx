import React from "react";
import { ArrowRight, Star, Truck, Bot, ShieldCheck, Clock, Tag, Package, Activity } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function HeroSection() {
  return (
    <div className="px-4 md:px-6 mt-4 md:mt-6">
      <section className="relative mx-auto max-w-[1230px] overflow-hidden rounded-[32px] bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat shadow-[0_24px_60px_rgba(90,49,213,0.18)]">
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/68 to-[#f7f1ff]/28" />
        <div className="absolute inset-y-0 right-0 w-[32%] bg-[radial-gradient(circle_at_top,rgba(143,92,255,0.38),transparent_65%)]" />

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12 items-center">
            <div className="max-w-2xl animate-slide-up">
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[var(--brand-line)] bg-white/90 px-3 py-2 shadow-[0_10px_28px_rgba(67,33,175,0.08)]">
                <BrandLogo className="h-10 w-10" priority />
                <span className="text-xs font-semibold text-[var(--brand-primary)]">
                  The all-in-one Care Leo pet ecosystem
                </span>
              </div>

              <h1 className="text-[28px] leading-tight font-bold tracking-tight text-gray-900 sm:text-[30px] md:text-[32px]">
                Everything Your Pet Needs.
                <br />
                <span className="brand-text-gradient">Delivered Smarter with Care Leo+</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm md:text-base leading-relaxed text-gray-600 font-medium">
                Premium products, AI-powered care, expert services and a loving community — all in one place.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="brand-primary-button group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0">
                  Shop Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <button className="brand-secondary-button group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0">
                  Join Care Leo+
                  <Star size={14} className="text-[var(--brand-accent)] transition-transform group-hover:rotate-12" />
                </button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <MiniTrust icon={<Truck size={18} />} title="Free Delivery" subtitle="On all orders" />
                <MiniTrust icon={<Bot size={18} />} title="AI Nutrition" subtitle="Personalized plans" />
                <MiniTrust icon={<ShieldCheck size={18} />} title="Vet Approved" subtitle="Trusted care" />
                <MiniTrust icon={<Clock size={18} />} title="Cancel Anytime" subtitle="No lock-in" />
              </div>
            </div>

            <div className="hidden lg:block relative h-[400px]">
              <div className="absolute top-0 right-0 flex flex-col gap-3">
                <FloatingBadge
                  delay="0.3s"
                  icon={<Tag size={18} className="text-[var(--brand-secondary)]" fill="currentColor" />}
                  title="20%"
                  subtitle="Subscriber Discount"
                />
                <FloatingBadge
                  delay="0.45s"
                  icon={<Package size={18} className="text-[var(--brand-accent)]" fill="currentColor" />}
                  title="Next delivery"
                  subtitle="in 3 days"
                />
                <FloatingBadge
                  delay="0.6s"
                  icon={<Activity size={18} className="text-emerald-500" />}
                  title="AI Nutrition Score"
                  subtitle="94/100"
                  valueStyle="text-emerald-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniTrust({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-start gap-1 transition-all hover:-translate-y-1 duration-300">
      <div className="text-[var(--brand-primary)]">{icon}</div>
      <p className="text-xs font-semibold text-gray-900">{title}</p>
      <p className="text-[11px] font-medium text-gray-500">{subtitle}</p>
    </div>
  );
}

function FloatingBadge({ icon, title, subtitle, valueStyle = "text-gray-900", delay = "0s" }: { icon: React.ReactNode; title: string; subtitle: string; valueStyle?: string; delay?: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/92 p-3 shadow-lg backdrop-blur-md animate-badge-pop"
      style={{ animationDelay: delay, animationFillMode: "forwards", opacity: 0 }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-surface-soft)]">
        {icon}
      </div>
      <div>
        <p className={`text-base font-bold leading-tight ${valueStyle}`}>{title}</p>
        <p className="text-[11px] font-semibold text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
