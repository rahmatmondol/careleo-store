"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Lock, User, Phone, Mail, MapPin, Building, Hash, Map,
  Truck, RotateCcw, ShieldCheck, HeadphonesIcon,
  Check, Info, Package, Edit2, ArrowLeft, ChevronDown, Sparkles, CreditCard, Banknote
} from "lucide-react";

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveAddress, setSaveAddress] = useState(true);
  const [addCareLeoPlus, setAddCareLeoPlus] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900 transition-colors duration-300 font-sans">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Title & Stepper */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                Checkout <Lock size={20} className="text-orange-500" />
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Almost there! Just a few details to get your pet's goodies home.</p>
            </div>
            
            <div className="flex items-center w-full lg:w-[400px]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">1</div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Information</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-bold flex items-center justify-center">2</div>
                <span className="text-sm font-medium text-gray-400 hidden sm:block">Shipping</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-bold flex items-center justify-center">3</div>
                <span className="text-sm font-medium text-gray-400 hidden sm:block">Payment</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1 mx-4"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-400 text-xs font-bold flex items-center justify-center">4</div>
                <span className="text-sm font-medium text-gray-400 hidden sm:block">Review</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Forms */}
            <div className="flex-1 flex flex-col gap-8">
              
              {/* Delivery Information */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">1. Delivery Information</h2>
                <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">Full Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="John Doe" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="tel" placeholder="+1 (555) 123-4567" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-xs text-gray-500">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" placeholder="john.doe@email.com" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">Address</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="123 Care Leo Street, Downtown" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">Apartment, suite, etc. (optional)</label>
                      <div className="relative">
                        <Building size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Apt 4B" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">City</label>
                      <div className="relative">
                        <Map size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="New York" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">State</label>
                      <div className="relative">
                        <Map size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select className="w-full appearance-none border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900 cursor-pointer">
                          <option>New York</option>
                          <option>California</option>
                          <option>Texas</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-gray-500">ZIP Code</label>
                      <div className="relative">
                        <Hash size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="10001" className="w-full border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all bg-white dark:bg-gray-900" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 cursor-pointer w-fit" onClick={() => setSaveAddress(!saveAddress)}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${saveAddress ? 'bg-orange-500 border-none' : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'}`}>
                      {saveAddress && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Save this address for next time</span>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">2. Shipping Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Standard */}
                  <div 
                    onClick={() => setShippingMethod("standard")}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${shippingMethod === 'standard' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${shippingMethod === 'standard' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Standard Delivery</h4>
                          <span className="text-[10px] font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded">FREE</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">3-5 business days</p>
                        <p className="text-[10px] text-gray-400">Free on orders over $29</p>
                      </div>
                    </div>
                  </div>

                  {/* Express */}
                  <div 
                    onClick={() => setShippingMethod("express")}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${shippingMethod === 'express' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${shippingMethod === 'express' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Express Delivery</h4>
                          <span className="font-bold text-gray-900 dark:text-white text-sm">$4.99</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">1-2 business days</p>
                        <p className="text-[10px] text-gray-400">Get it sooner</p>
                      </div>
                    </div>
                  </div>

                  {/* Same Day */}
                  <div 
                    onClick={() => setShippingMethod("sameday")}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${shippingMethod === 'sameday' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${shippingMethod === 'sameday' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {shippingMethod === 'sameday' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Same Day Delivery</h4>
                          <span className="font-bold text-gray-900 dark:text-white text-sm">$9.99</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order within 2h 15m</p>
                        <p className="text-[10px] text-gray-400">Available in select areas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">3. Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* Card */}
                  <div 
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-center gap-3 h-28 ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-sm">Credit / Debit Card</span>
                    </div>
                    {/* Dummy logos */}
                    <div className="flex gap-2 pl-7">
                      <div className="w-8 h-5 bg-blue-700 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                      <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center relative overflow-hidden">
                        <div className="w-3 h-3 bg-red-500 rounded-full absolute left-1 mix-blend-multiply"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full absolute right-1 mix-blend-multiply"></div>
                      </div>
                      <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center text-[8px] text-white font-bold">AMEX</div>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div 
                    onClick={() => setPaymentMethod("paypal")}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-center gap-3 h-28 ${paymentMethod === 'paypal' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'paypal' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                    </div>
                    <span className="font-black text-[#003087] dark:text-[#0079C1] text-lg italic tracking-tight">PayPal</span>
                  </div>

                  {/* Apple Pay */}
                  <div 
                    onClick={() => setPaymentMethod("apple")}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-center gap-3 h-28 ${paymentMethod === 'apple' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'apple' ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'}`}>
                      {paymentMethod === 'apple' && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                    </div>
                    <span className="font-black text-black dark:text-white text-xl flex items-center gap-1"> Pay</span>
                  </div>

                  {/* COD */}
                  <div 
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-center gap-1 h-28 ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/30 dark:bg-orange-900/10' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote size={20} className="text-green-600" />
                      <span className="font-bold text-gray-900 dark:text-white text-sm">Cash on Delivery</span>
                    </div>
                    <p className="text-[10px] text-gray-500">Pay when you receive</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                  <Lock size={12} className="text-gray-400" /> Your payment information is encrypted and secured.
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link href="/cart" className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors order-2 sm:order-1">
                    <ArrowLeft size={16} /> Continue Shopping
                  </Link>
                  <button className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors order-1 sm:order-2">
                    <Lock size={18} /> Continue to Payment
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 sticky top-28 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary (3 items)</h2>
                  <Link href="/cart" className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <Edit2 size={12} /> Edit Cart
                  </Link>
                </div>
                
                {/* Items list */}
                <div className="flex flex-col gap-5 mb-6">
                  {/* Item 1 */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800">
                      <Package size={24} className="text-gray-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 mb-1">Care Leo Salmon Recipe Adult Dog Food – 2kg</h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-900 w-fit px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                        Qty: 1 <ChevronDown size={10} />
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      $24.99
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800">
                      <Package size={24} className="text-gray-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 mb-1">Greenies Original Regular Dental Treats – 340g</h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-900 w-fit px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                        Qty: 1 <ChevronDown size={10} />
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      $16.99
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800">
                      <Package size={24} className="text-gray-300" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 mb-1">Care Leo Octopus Plush Toy for Dogs</h4>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 dark:bg-gray-900 w-fit px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                        Qty: 1 <ChevronDown size={10} />
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      $12.99
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full mb-5"></div>

                <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400 mb-5">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900 dark:text-white">$54.97</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-green-600 dark:text-green-500">
                    <span>Care Leo+ Discount (20%)</span>
                    <span className="font-bold">-$10.50</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span>Shipping</span> <Info size={12} className="text-gray-400" />
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-500 uppercase">Free</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <span>Estimated Tax</span> <Info size={12} className="text-gray-400" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">$3.90</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">$48.37</span>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium p-3 rounded-lg flex items-center gap-2 mb-6">
                  <Sparkles size={14} /> You're saving $10.50 with Care Leo+ 🎉
                </div>

                {/* Upsell / Subscribe Box */}
                <div className="border border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-orange-600 dark:text-orange-500 flex items-center gap-1.5 text-sm">
                      <RotateCcw size={14} /> Subscribe & Save with Care Leo+
                    </h4>
                    <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Best Value</span>
                  </div>
                  
                  <div className="flex gap-4 mb-5">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 border border-orange-100 dark:border-orange-900/50 rounded-lg flex items-center justify-center shrink-0">
                      <Package size={24} className="text-orange-400" />
                    </div>
                    
                    <ul className="text-[11px] text-gray-600 dark:text-gray-400 flex flex-col gap-1.5 flex-1 justify-center">
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-orange-500 shrink-0" /> <span className="font-bold">20% OFF</span> every eligible order</li>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-orange-500 shrink-0" /> <span className="font-bold">Free delivery</span> on all orders</li>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-orange-500 shrink-0" /> Skip or cancel anytime</li>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-orange-500 shrink-0" /> Exclusive member deals</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-orange-200 dark:border-orange-900/50">
                    <span className="text-sm font-bold text-orange-600 dark:text-orange-500">Add Care Leo+ to my order</span>
                    <div 
                      className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${addCareLeoPlus ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                      onClick={() => setAddCareLeoPlus(!addCareLeoPlus)}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${addCareLeoPlus ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
