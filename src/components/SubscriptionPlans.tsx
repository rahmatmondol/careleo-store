import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Check, User } from "lucide-react";

export default function SubscriptionPlans() {
  return (
    <div className="flex flex-col xl:flex-row gap-10 xl:gap-12 items-center xl:items-stretch">
      {/* Left Content */}
      <div className="w-full min-w-0 xl:w-[35%] flex flex-col justify-center text-left">
        <h2 className="text-[28px] sm:text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4 leading-[1.18] pb-1">
          Save More. Care Better.<br />
          Join <span className="text-orange-500">Care Leo+</span> Subscription
        </h2>
        <p className="text-[var(--brand-ink-soft)] text-base sm:text-lg mb-8 max-w-lg font-medium">
          Unlock exclusive discounts, AI-powered pet care tools, and premium services. Cancel anytime.
        </p>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-center text-[var(--foreground)] font-medium">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
            <span>Save up to 20% on every order</span>
          </li>
          <li className="flex items-center text-[var(--foreground)] font-medium">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
            <span>Free delivery on all orders</span>
          </li>
          <li className="flex items-center text-[var(--foreground)] font-medium">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
            <span>AI health & nutrition insights</span>
          </li>
          <li className="flex items-center text-[var(--foreground)] font-medium">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
            <span>Priority support & more</span>
          </li>
        </ul>
        
        <div className="flex items-center bg-orange-50 border border-orange-100 rounded-xl px-4 sm:px-6 py-4 w-full sm:w-max">
          <div className="bg-white rounded-full p-2 shadow-sm mr-4 shrink-0 text-orange-500">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Already a member?</p>
            <Link href="/dashboard" className="text-orange-600 font-bold flex items-center hover:text-orange-700 transition-colors">
              Manage Subscription <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Content - Pricing Cards */}
      <div className="w-full min-w-0 xl:w-[65%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:items-end pt-4 md:pt-0">
        {/* Basic Plan */}
        <div className="bg-white rounded-[15px] p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col hover:border-emerald-200 hover:shadow-md transition-all h-full">
          <div className="flex items-center mb-5">
            <div className="bg-emerald-50 p-3 rounded-full mr-4 text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Basic</h3>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">Perfect for pet parents<br/>who love to save.</p>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-black text-gray-900">$4.99</span>
              <span className="text-sm text-gray-500 font-medium mb-1">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Billed $59.88 annually</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-6 w-max">
            Save 10%
          </div>
          <ul className="space-y-3.5 mb-8 flex-1">
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>10% off on all products</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Free standard delivery</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Access to community</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Smart reminders</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Cancel anytime</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border-2 border-emerald-500 text-emerald-600 bg-white hover:bg-emerald-50 font-bold text-sm transition-colors">
            Choose Basic
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white rounded-[15px] p-5 sm:p-6 border-2 border-orange-500 shadow-xl relative flex flex-col h-full md:transform md:-translate-y-4 md:h-[calc(100%+1rem)] z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-md">
              Most Popular
            </span>
          </div>
          <div className="flex items-center mb-5 mt-2">
            <div className="bg-orange-50 p-3 rounded-full mr-4 text-orange-500">
              <div className="w-6 h-6 flex items-center justify-center text-xl">👑</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Premium</h3>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">Everything in Basic,<br/>plus premium benefits.</p>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-black text-gray-900">$9.99</span>
              <span className="text-sm text-gray-500 font-medium mb-1">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Billed $119.88 annually</p>
          </div>
          <div className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-6 w-max">
            Save 20%
          </div>
          <ul className="space-y-3.5 mb-8 flex-1">
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>20% off on all products</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Free express delivery</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>AI Pet Health Assistant</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>AI Nutrition Engine</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Vet appointment priority</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Early access to new products</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-orange-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Cancel anytime</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 shadow-lg shadow-orange-500/25 transition-all">
            Choose Premium
          </button>
        </div>

        {/* Ultimate Plan */}
        <div className="bg-white rounded-[15px] p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col hover:border-violet-200 hover:shadow-md transition-all h-full">
          <div className="flex items-center mb-5">
            <div className="bg-violet-50 p-3 rounded-full mr-4 text-violet-500">
              <div className="w-6 h-6 flex items-center justify-center text-xl">👥</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Family Plan</h3>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">For multi-pet families<br/>and pet lovers.</p>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-black text-gray-900">$14.99</span>
              <span className="text-sm text-gray-500 font-medium mb-1">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Billed $179.88 annually</p>
          </div>
          <div className="bg-violet-50 text-violet-600 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-6 w-max border border-violet-100">
            Save 20%
          </div>
          <ul className="space-y-3.5 mb-8 flex-1">
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Everything in Premium</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Manage up to 5 pets</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Share benefits with family</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Exclusive member deals</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Priority support (24/7)</span>
            </li>
            <li className="flex items-start text-sm text-gray-700 font-medium">
              <Check className="w-4 h-4 text-violet-500 mr-2.5 flex-shrink-0 mt-0.5" />
              <span>Cancel anytime</span>
            </li>
          </ul>
          <button className="w-full py-3 rounded-xl border-2 border-violet-200 text-violet-600 bg-white hover:bg-violet-50 hover:border-violet-300 font-bold text-sm transition-colors">
            Choose Family
          </button>
        </div>
      </div>
    </div>
  );
}