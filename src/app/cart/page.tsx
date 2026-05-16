"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  Trash2, Plus, Minus, ArrowLeft, Lock, ShieldCheck, 
  Sparkles, Truck, RotateCcw, HeadphonesIcon, Star,
  ChevronRight, ChevronLeft, Package, Apple, ShoppingCart
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const initialCartItems = [
  {
    id: 1,
    name: "Care Leo Salmon Recipe Adult Dog Food – 2kg",
    image: "Package",
    badges: [{ text: "Care Leo+ Deal", type: "primary" }, { text: "Save 20% with Care Leo+", type: "text" }],
    description: "For Adult Dogs • Rich in Omega-3",
    price: 24.99,
    originalPrice: 31.24,
    discount: "20% OFF",
    quantity: 1,
  },
  {
    id: 2,
    name: "Greenies Original Regular Dental Treats – 340g",
    image: "Package",
    badges: [{ text: "Care Leo+ Deal", type: "primary" }, { text: "Save 20% with Care Leo+", type: "text" }],
    description: "Daily dental care • For All Dogs",
    price: 16.99,
    originalPrice: 21.24,
    discount: "20% OFF",
    quantity: 1,
  },
  {
    id: 3,
    name: "Care Leo Octopus Plush Toy for Dogs",
    image: "Package",
    badges: [{ text: "Best Toy", type: "warning" }, { text: "Soft & Squeaky", type: "text" }],
    description: "Durable • Interactive Play",
    price: 12.99,
    originalPrice: 12.99,
    discount: null,
    quantity: 1,
  }
];

const recommendations = [
  { id: 1, name: "Care Leo Multivitamin Soft Chews - 60 pcs", price: 19.99, old: 24.99, rating: 4.8 },
  { id: 2, name: "Care Leo Skin & Coat Supplement - 120ml", price: 18.99, old: 23.99, rating: 4.7 },
  { id: 3, name: "Care Leo Cotton Rope Tug Toy", price: 9.99, old: null, rating: 4.9 },
  { id: 4, name: "Care Leo Treat Dispenser Ball Toy", price: 11.99, old: null, rating: 4.8 },
  { id: 5, name: "Care Leo Probiotic Chews - 90 pcs", price: 22.99, old: 27.99, rating: 4.9 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const careLeoPlusDiscount = cartItems.reduce((sum, item) => {
    const itemDiscount = (item.originalPrice - item.price) * item.quantity;
    return sum + itemDiscount;
  }, 0);
  const discountedSubtotal = subtotal - careLeoPlusDiscount;
  const estimatedTax = discountedSubtotal * 0.08; // assuming 8% tax
  const total = discountedSubtotal + estimatedTax;

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                <span className="text-orange-300"><Sparkles size={28} /></span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Review your items and proceed to checkout</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/40 text-[var(--brand-primary)] rounded-full flex items-center justify-center shrink-0">
                <span className="font-black">%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">You're saving more with Care Leo+!</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">20% off on eligible items</p>
              </div>
              <button className="hidden sm:block ml-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0">
                View Benefits
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              <div className="bg-white dark:bg-gray-950 rounded-[32px] border border-gray-100 dark:border-gray-800 overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 dark:text-gray-400">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                  {cartItems.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                      <ShoppingCart size={48} className="text-gray-300 dark:text-gray-700 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                      <Link href="/shop" className="px-6 py-3 bg-[var(--brand-primary)] text-white rounded-full font-bold hover:bg-orange-600 transition-colors">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6 flex gap-4">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--brand-surface-soft)] dark:bg-gray-900 rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-gray-800">
                            <Package size={32} className="text-gray-300 dark:text-gray-600" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base leading-tight mb-2">
                              <Link href={`/product/${item.id}`} className="hover:text-[var(--brand-primary)] transition-colors">{item.name}</Link>
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {item.badges.map((badge, idx) => (
                                <span key={idx} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  badge.type === 'primary' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                  badge.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                  'text-green-600 dark:text-green-400'
                                }`}>
                                  {badge.text}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.description}</p>
                          </div>
                        </div>

                        {/* Mobile view adjustments for Price, Qty, Total */}
                        <div className="col-span-1 md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-4 items-center mt-2 md:mt-0">
                          {/* Price */}
                          <div className="col-span-1 md:col-span-2 flex flex-col md:items-center text-left md:text-center">
                            <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Price</span>
                            <span className="font-black text-gray-900 dark:text-white text-sm sm:text-base">${item.price.toFixed(2)}</span>
                            {item.originalPrice !== item.price && (
                              <span className="text-xs text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                            )}
                            {item.discount && (
                              <span className="text-[10px] font-bold text-pink-500 bg-pink-50 dark:bg-pink-900/20 px-1.5 py-0.5 rounded mt-1">{item.discount}</span>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                            <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Qty</span>
                            <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 h-9 w-24">
                              <button onClick={() => updateQuantity(item.id, -1)} className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <Minus size={14} />
                              </button>
                              <span className="text-sm font-bold w-6 text-center dark:text-white">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="flex-1 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <Plus size={14} />
                              </button>
                            </div>
                            <button className="text-[10px] font-bold text-orange-500 hover:text-orange-600 mt-2">Save for later</button>
                          </div>

                          {/* Total */}
                          <div className="col-span-1 md:col-span-2 flex flex-col md:items-end items-end text-right">
                            <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase mb-1">Total</span>
                            <span className="font-black text-gray-900 dark:text-white text-base sm:text-lg">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                            {item.originalPrice !== item.price && (
                              <span className="text-[10px] font-bold text-green-500 mt-1">You save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}</span>
                            )}
                            <button onClick={() => removeItem(item.id)} className="md:absolute md:-right-12 mt-3 md:mt-0 text-gray-400 hover:text-red-500 transition-colors w-8 h-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>

                {/* Footer Actions */}
                {cartItems.length > 0 && (
                  <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-900/30">
                    <Link href="/shop" className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[var(--brand-primary)] dark:hover:text-[var(--brand-primary)] transition-colors">
                      <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                    <button onClick={clearCart} className="flex items-center gap-2 text-sm font-bold px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-gray-300">
                      <Trash2 size={14} /> Clear Cart
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-950 rounded-[32px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 sticky top-28 shadow-sm">
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>
                
                <div className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-bold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {careLeoPlusDiscount > 0 && (
                    <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                      <span className="font-bold">Care Leo+ Discount</span>
                      <span className="font-bold">-${careLeoPlusDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span>Shipping</span>
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <Truck size={10} /> You're eligible for free shipping!
                      </span>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400 uppercase">Free</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-gray-900 dark:text-white">${estimatedTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-black text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>

                {careLeoPlusDiscount > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold p-3 rounded-xl flex items-center gap-2 mb-6 border border-green-100 dark:border-green-900/50">
                    <Sparkles size={14} /> Nice! You're saving ${careLeoPlusDiscount.toFixed(2)} with Care Leo+
                  </div>
                )}

                <div className="flex flex-col gap-3 mb-6">
                  <button className="w-full h-14 bg-[var(--brand-primary)] hover:bg-orange-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={cartItems.length === 0}>
                    <Lock size={18} /> Proceed to Checkout
                  </button>
                  <button className="w-full h-14 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled={cartItems.length === 0}>
                    Buy with <Apple size={20} fill="currentColor" /> Pay
                  </button>
                </div>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                  </div>
                  <div className="relative bg-white dark:bg-gray-950 px-4 text-xs font-bold text-gray-400 uppercase">OR</div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl">
                  <ShieldCheck size={20} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">Secure Checkout</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Your information is 100% safe and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* You might also need Section */}
          <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-[32px] p-6 sm:p-8 lg:p-10 border border-orange-100 dark:border-orange-900/30 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-orange-400 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">You might also need</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Handpicked recommendations for your pet</p>
                </div>
              </div>
              <Link href="/shop" className="text-sm font-bold text-[var(--brand-primary)] flex items-center gap-1 hover:underline">
                View all recommendations <ChevronRight size={14} />
              </Link>
            </div>

            <div className="-mx-6 sm:mx-0 px-6 sm:px-0 relative group/recs">
              <Swiper
                modules={[Navigation, FreeMode]}
                spaceBetween={16}
                slidesPerView={1.2}
                freeMode={true}
                navigation={{
                  prevEl: '.rec-prev',
                  nextEl: '.rec-next',
                }}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  768: { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 24 }
                }}
                className="pb-4 !px-0"
              >
                {recommendations.map((rec) => (
                  <SwiperSlide key={rec.id}>
                    <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 sm:p-5 flex flex-col h-full border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full aspect-square bg-[var(--brand-surface-soft)] dark:bg-gray-900 rounded-xl mb-4 flex items-center justify-center">
                        <Package size={40} className="text-gray-300 dark:text-gray-700" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-2 line-clamp-2">{rec.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={10} fill={i <= Math.round(rec.rating) ? "currentColor" : "none"} className={i > Math.round(rec.rating) ? "text-gray-300 dark:text-gray-600" : ""} />)}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">({rec.rating})</span>
                      </div>
                      <div className="flex items-end gap-2 mb-4 mt-auto">
                        <span className="font-black text-gray-900 dark:text-white">${rec.price.toFixed(2)}</span>
                        {rec.old && <span className="text-xs font-bold text-gray-400 line-through pb-0.5">${rec.old.toFixed(2)}</span>}
                      </div>
                      <button className="w-full py-2 rounded-full border border-[var(--brand-primary)] text-[var(--brand-primary)] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="rec-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-[var(--brand-primary)] transition-all z-10 hidden sm:flex opacity-0 group-hover/recs:opacity-100 disabled:opacity-0">
                <ChevronLeft size={20} />
              </button>
              <button className="rec-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-[var(--brand-primary)] transition-all z-10 hidden sm:flex opacity-0 group-hover/recs:opacity-100 disabled:opacity-0">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Trust Signals Footer Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="text-[var(--brand-primary)]"><Truck size={28} strokeWidth={1.5} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Free Delivery</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">On all orders over $29</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[var(--brand-primary)]"><RotateCcw size={28} strokeWidth={1.5} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hassle free returns</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[var(--brand-primary)]"><Sparkles size={28} strokeWidth={1.5} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Care Leo+ Benefits</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Save more every day</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-[var(--brand-primary)]"><HeadphonesIcon size={28} strokeWidth={1.5} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">We're here to help</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
