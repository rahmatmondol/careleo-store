import React from "react";
import { ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--brand-line)] bg-white/80 px-6 py-16 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[var(--container-width)] gap-12 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <BrandLogo variant="full" className="h-24 w-24" />
          </div>
          <p className="text-base font-medium text-gray-500 max-w-xs">
            Everything your pet needs, delivered with love.
          </p>
        </div>

        <div>
          <h4 className="font-black text-gray-900 mb-6">Shop</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-500">
            <li><a href="#" className="hover:text-[var(--brand-primary)]">All Products</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Best Sellers</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">New Arrivals</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Subscription Deals</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-gray-900 mb-6">AI Care</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-500">
            <li><a href="#" className="hover:text-[var(--brand-primary)]">AI Assistant</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Health Analysis</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Nutrition Plans</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Smart Reminders</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-gray-900 mb-6">Services</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-500">
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Vet Near You</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Pet Walkers</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Grooming</a></li>
            <li><a href="#" className="hover:text-[var(--brand-primary)]">Other Services</a></li>
          </ul>
        </div>

        <div className="lg:col-span-1">
          <h4 className="font-black text-gray-900 mb-6">Stay in the loop</h4>
          <p className="text-sm font-medium text-gray-500 mb-4">
            Get exclusive offers, pet tips and Care Leo updates.
          </p>
          <div className="brand-input-shell flex items-center rounded-full p-1">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-transparent px-4 text-sm outline-none font-medium placeholder:text-gray-400"
            />
            <button className="brand-primary-button flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
