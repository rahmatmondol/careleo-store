import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Best Sellers", href: "/shop?sort=best-selling" },
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Subscription Deals", href: "/subscription" },
    ],
  },
  {
    heading: "AI Care",
    links: [
      { label: "AI Assistant", href: "/ai-care" },
      { label: "Health Analysis", href: "/ai-care#care-loop" },
      { label: "Nutrition Plans", href: "/ai-care#care-loop" },
      { label: "Smart Reminders", href: "/ai-care#care-loop" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Vet Near You", href: "/services?service=Vet%20Visit" },
      { label: "Pet Walkers", href: "/services?service=Dog%20Walking" },
      { label: "Grooming", href: "/services?service=Grooming" },
      { label: "Other Services", href: "/services" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "The Feed", href: "/community" },
      { label: "Breed Groups", href: "/community#whats-inside" },
      { label: "Ask a Vet", href: "/community#whats-inside" },
      { label: "About Care Leo", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--brand-line)] bg-white/80 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[var(--container-width)] gap-12 lg:grid-cols-7">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <BrandLogo variant="full" className="h-24 w-24" />
          </div>
          <p className="max-w-xs text-base font-medium text-gray-500">
            Everything your pet needs, delivered with love.
          </p>
        </div>

        {columns.map(({ heading, links }) => (
          <div key={heading}>
            <h4 className="mb-6 font-black text-gray-900">{heading}</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-500">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[var(--brand-primary)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-1">
          <h4 className="mb-6 font-black text-gray-900">Stay in the loop</h4>
          <p className="mb-4 text-sm font-medium text-gray-500">
            Get exclusive offers, pet tips and Care Leo updates.
          </p>
          <form className="brand-input-shell flex items-center rounded-full p-1">
            <label className="w-full">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 text-sm font-medium outline-none placeholder:text-gray-400"
              />
            </label>
            <button
              type="submit"
              aria-label="Subscribe to the Care Leo newsletter"
              className="brand-primary-button flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
