"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import type { StoreProduct } from "@/lib/useStore";
import { useCart } from "@/lib/CartContext";
import { 
  ChevronRight, ChevronLeft, Star, Check, ChevronDown, Package, ShieldCheck, Truck, 
  RotateCcw, Lock, Clock, Droplets, Leaf, Activity, Camera 
} from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const sizes = [
  { id: "2kg", price: 24.99, oldPrice: 31.24, save: null },
  { id: "6kg", price: 59.99, oldPrice: 71.41, save: "16%" },
  { id: "12kg", price: 99.99, oldPrice: 124.99, save: "20%" }
];

const DUMMY_REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    timeAgo: "2 days ago",
    content: "My dog loves this food! His coat is shinier and he has so much more energy.",
    hasImage: true
  },
  {
    name: "John D.",
    rating: 5,
    timeAgo: "1 week ago",
    content: "Great ingredients and no fillers. Highly recommend!",
    hasImage: true
  },
  {
    name: "Priya K.",
    rating: 5,
    timeAgo: "2 weeks ago",
    content: "Perfect for my picky eater. He cleans the bowl every time!",
    hasImage: true
  },
  {
    name: "Mike T.",
    rating: 5,
    timeAgo: "1 month ago",
    content: "Best value for money. Delivery is always on time with the subscription.",
    hasImage: true
  }
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productId = String(params?.id || "");
  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [activeImage, setActiveImage] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [adding, setAdding] = useState(false);
  const sliderRef = useRef<any>(null);

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    const ok = await addItem(product.id, quantity);
    setAdding(false);
    if (!ok) router.push("/login");
  };

  useEffect(() => {
    if (!productId) return;
    fetch(`/api/products/${productId}`)
      .then((r) => r.json())
      .then((json) => setProduct(json?.product ?? null))
      .catch(() => {});
  }, [productId]);

  // Real images from backend, falling back to placeholders for layout
  const fallbackImages = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
    "https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80",
    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80",
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=80",
  ];
  const productImages =
    product && (product.galleryImages?.length || product.imageUrl)
      ? (product.galleryImages?.length ? product.galleryImages : [product.imageUrl]).filter(Boolean)
      : fallbackImages;
  const productName = product?.name || "Care Leo Salmon Recipe Adult Dog Food";
  
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const basePrice = product ? product.price : Number(selectedSize.price);
  const baseOldPrice = product
    ? (product.compareAtPrice ?? product.price)
    : Number(selectedSize.oldPrice);
  const currentPrice = isSubscribed ? (basePrice * 0.8).toFixed(2) : basePrice.toFixed(2);
  const currentOldPrice = baseOldPrice.toFixed(2);

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="pt-10 pb-16">
        {/* Container */}
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link href="/" className="hover:text-[var(--brand-primary)] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--brand-primary)] transition-colors">Shop</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[var(--brand-primary)] transition-colors">Dog Food</Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-gray-900 dark:text-gray-200">{productName}</span>
          </nav>

          {/* Product Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-16">
            
            {/* Left: Gallery */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 h-full">
              {/* Thumbnails */}
              <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 lg:w-24 shrink-0 scrollbar-hide pb-1 sm:pb-0">
                {productImages.map((imgSrc, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i + 1)}
                    className={`relative flex items-center justify-center w-14 h-14 sm:w-full sm:h-20 lg:h-24 rounded-xl border-2 transition-all shrink-0 bg-white dark:bg-gray-800 overflow-hidden ${activeImage === i + 1 ? 'border-[var(--brand-primary)] shadow-sm' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                  >
                    <img src={imgSrc} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 bg-[var(--brand-surface-soft)] dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-0 flex items-center justify-center relative h-[360px] sm:h-[480px] lg:h-[540px] xl:h-[600px] transition-all overflow-hidden border border-[var(--brand-line)] dark:border-gray-700 group">
                <div className="animate-fade-in relative w-full h-full" key={activeImage}>
                  <img 
                    src={productImages[activeImage - 1] || productImages[0]}
                    alt={productName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <button className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-full p-2 sm:p-2.5 shadow-sm text-gray-700 dark:text-gray-300 hover:text-[var(--brand-primary)] hover:scale-110 transition-all z-10">
                  <Camera size={18} className="sm:hidden" />
                  <Camera size={20} className="hidden sm:block" />
                </button>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <div className="mb-4 sm:mb-6 inline-flex items-center px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wide w-fit">
                Bestseller
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 dark:text-white leading-[1.1] mb-4 sm:mb-5 tracking-tight">
                {productName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[var(--brand-line)] dark:border-gray-800">
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-lg">
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">4.9</span>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span className="hover:text-[var(--brand-primary)] hover:underline cursor-pointer transition-colors">(1,842 reviews)</span> 
                  <span className="mx-2 text-gray-300 dark:text-gray-700">•</span> 
                  2.1k sold
                </div>
              </div>
              
              <div className="flex flex-wrap items-end gap-3 sm:gap-4 mb-4">
                <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white transition-all">${Number(currentPrice).toFixed(2)}</span>
                <span className="text-base sm:text-lg font-bold text-gray-400 line-through transition-all pb-0.5">${Number(currentOldPrice).toFixed(2)}</span>
                {isSubscribed && (
                  <span className="brand-accent-chip px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-bold animate-fade-in mb-1 sm:mb-1.5">
                    Save 20% with Care Leo+
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                Made with real salmon, wholesome ingredients and essential nutrients to support your dog's overall health, shiny coat and strong immunity.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-sm gap-1.5"><Activity size={16} className="text-[var(--brand-primary)]" /> Real Salmon</div>
                  <div className="text-xs text-gray-500">#1 Ingredient</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-sm gap-1.5"><Droplets size={16} className="text-orange-400" /> Omega-3</div>
                  <div className="text-xs text-gray-500">Skin & Coat</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-sm gap-1.5"><Leaf size={16} className="text-green-500" /> No Artificial</div>
                  <div className="text-xs text-gray-500">Preservatives</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center text-gray-900 dark:text-white font-bold text-sm gap-1.5"><ShieldCheck size={16} className="text-blue-500" /> Vet</div>
                  <div className="text-xs text-gray-500">Approved</div>
                </div>
              </div>

              {/* Options */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Choose Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {sizes.map((size) => (
                    <button 
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 text-center transition-all ${
                        selectedSize.id === size.id 
                          ? 'border-[var(--brand-primary)] bg-[var(--brand-surface-soft)] dark:bg-[var(--brand-primary)]/10' 
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className="font-bold text-gray-900 dark:text-white">{size.id}</span>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">${Number(size.price).toFixed(2)}</span>
                      {size.save && (
                        <span className="text-[10px] font-bold text-pink-500 bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-full mt-1">
                          Save {size.save}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe & Save Box */}
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`w-full text-left border-2 rounded-3xl p-4 sm:p-5 mb-6 transition-all ${
                  isSubscribed 
                    ? 'border-orange-300 dark:border-orange-800 bg-orange-50/80 dark:bg-orange-900/20' 
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-orange-200 dark:hover:border-orange-900/40'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isSubscribed ? 'bg-[var(--brand-primary)] text-white' : 'border-2 border-gray-300 dark:border-gray-600'
                  }`}>
                    {isSubscribed && <Check size={14} strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">Subscribe & Save with Care Leo+</h4>
                      <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Best Value</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2">
                      <div className="flex items-center gap-1"><span className="text-[var(--brand-primary)]">20% OFF</span> every order</div>
                      <div className="flex items-center gap-1"><Truck size={12} /> Free delivery</div>
                      <div className="flex items-center gap-1"><RotateCcw size={12} /> Skip or cancel anytime</div>
                    </div>
                  </div>
                </div>
                
                {isSubscribed && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white dark:bg-gray-900/80 p-3 rounded-2xl border border-orange-100 dark:border-gray-800 animate-fade-in">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Deliver every</span>
                    <div className="relative flex-1 w-full" onClick={(e) => e.stopPropagation()}>
                      <select className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-bold rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] cursor-pointer">
                        <option>4 Weeks (Recommended)</option>
                        <option>6 Weeks</option>
                        <option>8 Weeks</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                )}
              </button>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6">
                <div className="flex items-center justify-between w-full sm:w-auto bg-[var(--brand-surface-soft)] dark:bg-gray-800 rounded-full h-12 sm:h-14 border border-gray-200 dark:border-gray-700 px-2 sm:px-0">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="text-xl sm:text-2xl font-medium">-</span>
                  </button>
                  <span className="w-8 sm:w-10 text-center font-bold text-gray-900 dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span className="text-xl sm:text-2xl font-medium">+</span>
                  </button>
                </div>
                <button onClick={handleAddToCart} disabled={adding || !product} className="w-full sm:flex-1 h-12 sm:h-14 bg-[var(--brand-primary)] hover:bg-orange-600 text-white rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 px-4 disabled:opacity-60">
                  <Package size={18} className="sm:hidden" />
                  <Package size={20} className="hidden sm:block" />
                  <span className="truncate">{adding ? "Adding..." : `Add to Cart - $${(parseFloat(currentPrice) * quantity).toFixed(2)}`}</span>
                </button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-2 border-t border-gray-200 dark:border-gray-800 pt-6">
                <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-2 text-center sm:text-left">
                  <Truck size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Free Delivery</div>
                    <div className="text-[10px] text-gray-500">On all orders</div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-2 text-center sm:text-left">
                  <RotateCcw size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Easy Returns</div>
                    <div className="text-[10px] text-gray-500">Hassle free</div>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-2 text-center sm:text-left">
                  <Lock size={20} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">Secure Payment</div>
                    <div className="text-[10px] text-gray-500">100% secure</div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Banner */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Clock size={32} className="text-[var(--brand-primary)]" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-1">Never run out again!</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Set up auto-order and get free delivery plus extra savings.</p>
              </div>
            </div>
            {/* Using a simple placeholder for the dog image */}
            <div className="hidden md:flex w-48 h-32 bg-[var(--brand-surface-soft)] dark:bg-gray-800 rounded-2xl items-center justify-center text-gray-400">
              <Camera size={32} />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Why choose */}
            <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Why Care Leo Salmon Recipe?</h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center shrink-0 text-orange-500">
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">Real salmon <span className="font-normal text-gray-600 dark:text-gray-400">for high-quality protein to build strong muscles</span></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-500">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">Omega-3 & 6 <span className="font-normal text-gray-600 dark:text-gray-400">for healthy skin and shiny coat</span></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0 text-green-500">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">Probiotics & fiber <span className="font-normal text-gray-600 dark:text-gray-400">for healthy digestion</span></div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0 text-purple-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm mb-1">Antioxidants <span className="font-normal text-gray-600 dark:text-gray-400">for strong immunity support</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feeding Guide */}
            <div className="bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Feeding Guide</h3>
              <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-bold text-xs">
                    <tr>
                      <th className="px-4 py-3">Dog Weight</th>
                      <th className="px-4 py-3 text-right">Daily Feeding Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="px-4 py-3">1 - 5 kg</td>
                      <td className="px-4 py-3 text-right">25 - 85 g</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">5 - 10 kg</td>
                      <td className="px-4 py-3 text-right">85 - 145 g</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">10 - 20 kg</td>
                      <td className="px-4 py-3 text-right">145 - 240 g</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">20 - 30 kg</td>
                      <td className="px-4 py-3 text-right">240 - 325 g</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">30 - 40 kg</td>
                      <td className="px-4 py-3 text-right">325 - 405 g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-4 text-[var(--brand-primary)] font-bold text-sm flex items-center gap-1 hover:underline">
                View full feeding guide <ChevronRight size={14} />
              </button>
            </div>

            {/* Ingredients & Analysis */}
            <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-md transition-shadow">
              <div className="mb-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">Ingredients</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Salmon, Salmon Meal, Brown Rice, Peas, Sweet Potato, Chicken Fat, Flaxseed, Beet Pulp, Natural Flavors, Minerals, Vitamins, Probiotics and Antioxidants.
                </p>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Guaranteed Analysis</h3>
                <div className="flex flex-col gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                    <span>Crude Protein (min.)</span>
                    <span>24%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                    <span>Crude Fat (min.)</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                    <span>Crude Fiber (max.)</span>
                    <span>4%</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                    <span>Moisture (max.)</span>
                    <span>10%</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>Omega-3 Fatty Acids (min.)</span>
                    <span>0.4%</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 text-[var(--brand-primary)] font-bold text-sm flex items-center gap-1 hover:underline self-start">
                View full details <ChevronRight size={14} />
              </button>
            </div>

          </div>

          <ProductReviews 
            reviews={DUMMY_REVIEWS} 
            averageRating={4.9} 
            totalReviews={1842} 
          />

          {/* You may also like */}
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">You may also like</h2>
              <div className="flex items-center gap-2">
                <Link href="/shop" className="text-sm font-bold text-[var(--brand-primary)] flex items-center gap-1 hover:underline mr-2">
                  View all <ChevronRight size={14} />
                </Link>
                <div className="hidden lg:flex gap-2">
                  <button onClick={handlePrev} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all bg-white dark:bg-gray-800 shadow-sm">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={handleNext} className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)] transition-all bg-white dark:bg-gray-800 shadow-sm">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="relative group/slider -mx-4 sm:mx-0 px-4 sm:px-0">
              <Swiper
                ref={sliderRef}
                modules={[Navigation, FreeMode]}
                spaceBetween={12}
                slidesPerView={1.2}
                freeMode={true}
                breakpoints={{
                  480: { slidesPerView: 2, spaceBetween: 16 },
                  768: { slidesPerView: 3, spaceBetween: 24 },
                  1024: { slidesPerView: 4, spaceBetween: 24 }
                }}
                className="pb-6 !px-4 sm:!px-0"
              >
                <SwiperSlide>
                  <ProductCard
                    name="Care Leo Chicken Recipe Adult Dog Food - 2kg"
                    price="$22.99"
                    old="$28.74"
                    badge="Top Rated"
                    badgeColor="bg-blue-500"
                    rating={4.8}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard
                    name="Care Leo Lamb Recipe Adult Dog Food - 2kg"
                    price="$24.99"
                    old="$31.24"
                    badge="New Arrival"
                    badgeColor="bg-green-500"
                    rating={4.9}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard
                    name="Care Leo Puppy Chicken Recipe - 2kg"
                    price="$23.99"
                    old="$29.99"
                    badge="Bestseller"
                    badgeColor="bg-[var(--brand-primary)]"
                    rating={4.8}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCard
                    name="Care Leo Grain Free Salmon - 2kg"
                    price="$27.99"
                    old="$34.99"
                    badge="Premium"
                    badgeColor="bg-purple-500"
                    rating={4.9}
                  />
                </SwiperSlide>
                {/* Additional dummy cards to demonstrate carousel */}
                <SwiperSlide>
                  <ProductCard
                    name="Care Leo Senior Dog Food - 2kg"
                    price="$21.99"
                    old="$26.99"
                    badge="Sale"
                    badgeColor="bg-red-500"
                    rating={4.7}
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
