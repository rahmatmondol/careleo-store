import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Truck, Bot, ShieldCheck, Clock, Tag, Package, Activity } from "lucide-react";
import BrandLogo from "./BrandLogo";

const badges = [
  {
    delay: "0.3s",
    icon: <Tag size={18} className="text-[var(--brand-secondary)]" fill="currentColor" />,
    title: "20%",
    subtitle: "Subscriber Discount",
  },
  {
    delay: "0.45s",
    icon: <Package size={18} className="text-[var(--brand-accent)]" fill="currentColor" />,
    title: "Next delivery",
    subtitle: "in 3 days",
  },
  {
    delay: "0.6s",
    icon: <Activity size={18} className="text-emerald-500" />,
    title: "AI Nutrition Score",
    subtitle: "94/100",
    valueStyle: "text-emerald-600",
  },
];

export default function HeroSection() {
  return (
    <div className="px-3 sm:px-4 md:px-6 mt-3 sm:mt-4 md:mt-6">
      {/*
        banner.png is 1792x878 (2:1 landscape). On a phone this card is a tall
        portrait box, so `bg-cover` scaled the photo to the height and showed a
        heavily zoomed slice of its centre — unreadable, and a 1.5 MB download to
        show it. The photo is therefore gated behind `sm:`, which also means
        phones never fetch it: browsers skip background images whose rule doesn't
        match. Mobile gets the brand gradient instead.
      */}
      <section className="relative mx-auto max-w-[1230px] overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#f3ecff_0%,#ffffff_48%,#ffe9f4_100%)] shadow-[0_18px_40px_rgba(90,49,213,0.16)] sm:rounded-[32px] sm:bg-[url('/banner.png')] sm:bg-cover sm:bg-center sm:bg-no-repeat sm:shadow-[0_24px_60px_rgba(90,49,213,0.18)]">
        {/* Washes exist to lift text off the photo — only needed where it shows. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/95 via-white/68 to-[#f7f1ff]/28 sm:block" />
        <div className="absolute inset-y-0 right-0 hidden w-[32%] bg-[radial-gradient(circle_at_top,rgba(143,92,255,0.38),transparent_65%)] sm:block" />

        <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
          {/*
            `min-w-0` is load-bearing: grid items default to `min-width: auto`,
            so they refuse to shrink below their content's min-content width. Any
            wide nowrap child (a badge row, a long unbroken string) would push
            this column past the viewport and `overflow-hidden` above would then
            clip the text mid-word instead of wrapping it.
          */}
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
            <div className="min-w-0 max-w-2xl animate-slide-up">
              <div className="mb-4 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--brand-line)] bg-white/90 px-3 py-2 shadow-[0_10px_28px_rgba(67,33,175,0.08)] sm:gap-3">
                <BrandLogo className="h-8 w-8 shrink-0 sm:h-10 sm:w-10" priority />
                <span className="text-[11px] font-semibold leading-snug text-[var(--brand-primary)] sm:text-xs">
                  The all-in-one Care Leo pet ecosystem
                </span>
              </div>

              {/*
                At 26px "Everything Your Pet Needs." is ~350px wide but a 360px
                phone only leaves ~296px of content width, so the forced break
                produced three ragged lines. Smaller type below 400px, and the
                <br> only applies once there's room for it.
              */}
              <h1 className="text-[22px] font-bold leading-[1.25] tracking-tight text-gray-900 min-[400px]:text-[26px] sm:text-[30px] sm:leading-[1.2] md:text-[32px]">
                Everything Your Pet Needs.{" "}
                <br className="hidden sm:inline" />
                <span className="brand-text-gradient">Delivered Smarter with Care Leo+</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-gray-600 sm:mt-4 md:text-base">
                Premium products, AI-powered care, expert services and a loving community — all in one place.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/shop"
                  className="brand-primary-button group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0 sm:py-3"
                >
                  Shop Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/subscription"
                  className="brand-secondary-button group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0 sm:py-3"
                >
                  Join Care Leo+
                  <Star size={14} className="text-[var(--brand-accent)] transition-transform group-hover:rotate-12" />
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 md:mt-10">
                <MiniTrust icon={<Truck size={18} />} title="Free Delivery" subtitle="On all orders" />
                <MiniTrust icon={<Bot size={18} />} title="AI Nutrition" subtitle="Personalized plans" />
                <MiniTrust icon={<ShieldCheck size={18} />} title="Vet Approved" subtitle="Trusted care" />
                <MiniTrust icon={<Clock size={18} />} title="Cancel Anytime" subtitle="No lock-in" />
              </div>
            </div>

            {/* Decorative stat badges — desktop garnish. Adding them to the phone
                layout only made an already tall hero taller. */}
            <div className="relative hidden h-[400px] lg:block">
              <div className="absolute right-0 top-0 flex flex-col gap-3">
                {badges.map(({ delay, icon, title, subtitle, valueStyle }) => (
                  <div
                    key={subtitle}
                    className="animate-badge-pop flex items-center gap-3 rounded-xl border border-white/20 bg-white/92 p-3 shadow-lg backdrop-blur-md"
                    style={{ animationDelay: delay, animationFillMode: "forwards", opacity: 0 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-surface-soft)]">
                      {icon}
                    </div>
                    <div>
                      <p className={`text-base font-bold leading-tight ${valueStyle ?? "text-gray-900"}`}>
                        {title}
                      </p>
                      <p className="whitespace-nowrap text-[11px] font-semibold text-gray-500">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
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
    <div className="flex flex-col items-start gap-1 transition-all duration-300 hover:-translate-y-1">
      <div className="text-[var(--brand-primary)]">{icon}</div>
      <p className="text-xs font-semibold text-gray-900">{title}</p>
      <p className="text-[11px] font-medium leading-snug text-gray-500">{subtitle}</p>
    </div>
  );
}
