import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote, Package, Cpu, Calendar, HeadphonesIcon, ShoppingCart, Star } from "lucide-react";
import SubscriptionPlans from "@/components/SubscriptionPlans";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="mb-20">
            <SubscriptionPlans />
          </div>

          {/* Benefits Grid Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              <div className="flex flex-col items-center col-span-2 md:col-span-1 md:items-start md:text-left justify-center">
                <h3 className="font-bold text-gray-900 text-lg">Care Leo+ Benefits</h3>
                <p className="text-sm text-gray-500 mt-1">More benefits. More love.<br/>Only with Care Leo+</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 p-4 rounded-full mb-3 text-orange-500">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Save More</h4>
                <p className="text-xs text-gray-500 mt-1 text-center">Up to 20% off on every order</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-50 p-4 rounded-full mb-3 text-green-500">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Free Delivery</h4>
                <p className="text-xs text-gray-500 mt-1 text-center">Free shipping on all orders</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-purple-50 p-4 rounded-full mb-3 text-purple-500">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">AI Pet Care</h4>
                <p className="text-xs text-gray-500 mt-1 text-center">AI health, nutrition & behavior insights</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-orange-50 p-4 rounded-full mb-3 text-orange-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Smart Reminders</h4>
                <p className="text-xs text-gray-500 mt-1 text-center">Never miss vaccines, meds & refills</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-pink-50 p-4 rounded-full mb-3 text-pink-500">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Priority Support</h4>
                <p className="text-xs text-gray-500 mt-1 text-center">Faster help from our pet care experts</p>
              </div>
            </div>
          </div>

          {/* Lower Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Auto-Delivery Promo */}
            <div className="bg-orange-50 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Auto-Delivery with Care Leo+</h3>
                <p className="text-gray-600 text-sm mb-6 max-w-[200px]">
                  Never run out of essentials again. Set up auto-orders and get the right products, at the right time.
                </p>
                <button className="bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm hover:bg-orange-600 transition-colors w-max">
                  Learn More
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-48 h-48 opacity-80 group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Pet Box" 
                  fill
                  className="object-cover rounded-tl-full"
                />
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4 flex-1">
                <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-gray-100 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-gray-800 text-sm">Can I cancel or pause anytime?</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    Yes! You can easily pause, skip, or cancel your subscription at any time from your dashboard without any hidden fees.
                  </p>
                </details>
                <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-gray-100 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-gray-800 text-sm">Is there a free trial?</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    We offer a 14-day free trial on our Premium plan so you can experience the AI features and benefits before committing.
                  </p>
                </details>
                <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-gray-100 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-gray-800 text-sm">How does auto-delivery work?</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    Simply select auto-delivery at checkout on eligible items. We will ship them to you on your preferred schedule.
                  </p>
                </details>
                <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-gray-100 pb-4">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-gray-800 text-sm">Can I change my plan later?</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                    Absolutely. You can upgrade or downgrade your plan at any time. Changes will reflect in your next billing cycle.
                  </p>
                </details>
              </div>
              <Link href="/faq" className="text-orange-500 text-sm font-semibold flex items-center mt-6 hover:text-orange-600">
                View all FAQs <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col justify-center text-center relative">
              <Quote className="w-10 h-10 text-orange-100 mx-auto mb-4" />
              <div className="flex justify-center text-orange-400 mb-4">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-gray-700 font-medium mb-6 leading-relaxed italic">
                "Care Leo+ has made pet parenting so much easier! The AI nutrition plan and reminders are amazing, and the savings are just the best."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Sarah J." 
                    width={40} 
                    height={40} 
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm">Sarah J.</h4>
                  <p className="text-xs text-gray-500">Dog Mom to Bruno</p>
                </div>
              </div>
              <div className="flex justify-center gap-1.5 mt-8">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Badges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Cancel Anytime</h4>
                <p className="text-xs text-gray-500 mt-1">No questions asked</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514M9 11l-4 4" /></svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">100% Satisfaction</h4>
                <p className="text-xs text-gray-500 mt-1">We care about your pet</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Secure Payments</h4>
                <p className="text-xs text-gray-500 mt-1">Safe & encrypted</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Trusted by 50K+ Parents</h4>
                <p className="text-xs text-gray-500 mt-1">Join the Care Leo family</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
