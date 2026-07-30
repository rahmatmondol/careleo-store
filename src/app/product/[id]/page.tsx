"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import type { StoreProduct } from "@/lib/useStore";
import { formatPrice } from "@/lib/useStore";
import { useCart } from "@/lib/CartContext";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Check,
  ChevronDown,
  Package,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Clock,
  Camera,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

type LoadState = "loading" | "ready" | "not-found";

type SizeOption = { id: string; price: number; oldPrice: number | null };

/**
 * Build the size selector from the product's own attributes/variations.
 * Previously this was a hardcoded 2kg/6kg/12kg salmon-food list, which meant
 * every product in the catalogue showed dog-food sizes and dog-food prices.
 */
function deriveSizeOptions(product: StoreProduct | null): SizeOption[] {
  if (!product) return [];

  const variations = Array.isArray(product.variations) ? product.variations : [];
  const fromVariations = variations
    .map((v: Record<string, unknown>) => {
      const label = String(
        v?.name ?? v?.size ?? v?.title ?? v?.option ?? v?.value ?? "",
      ).trim();
      const price = Number(v?.price);
      if (!label || !Number.isFinite(price)) return null;
      const compare = Number(v?.compareAtPrice);
      return {
        id: label,
        price,
        oldPrice: Number.isFinite(compare) && compare > price ? compare : null,
      } satisfies SizeOption;
    })
    .filter((v): v is SizeOption => v !== null);

  if (fromVariations.length > 0) return fromVariations;

  // Fall back to a size/weight attribute, priced at the base product price.
  const sizeAttr = (product.attributes || []).find((a) =>
    ["size", "weight", "pack size"].includes(String(a?.name || "").toLowerCase()),
  );
  if (sizeAttr && Array.isArray(sizeAttr.values) && sizeAttr.values.length > 0) {
    return sizeAttr.values.map((value) => ({
      id: String(value),
      price: product.price,
      oldPrice: product.compareAtPrice,
    }));
  }

  return [];
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productKey = String(params?.id || "");
  // `loadedFor` records which URL key the product in state belongs to, so a
  // client-side hop between two product pages doesn't briefly render the old one.
  const [loaded, setLoaded] = useState<{
    key: string;
    product: StoreProduct | null;
  } | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const product = loaded?.key === productKey ? loaded.product : null;
  const [relatedProducts, setRelatedProducts] = useState<StoreProduct[]>([]);
  const [activeImage, setActiveImage] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [adding, setAdding] = useState(false);
  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (!productKey) {
      setLoaded({ key: productKey, product: null });
      setState("not-found");
      return;
    }

    let active = true;

    fetch(`/api/products/${encodeURIComponent(productKey)}`)
      .then((r) => r.json())
      .then((json) => {
        if (!active) return;
        const p: StoreProduct | null = json?.product ?? null;
        if (!p) {
          setLoaded({ key: productKey, product: null });
          setState("not-found");
          return;
        }
        setLoaded({ key: productKey, product: p });
        setState("ready");

        if (p.categoryId) {
          fetch(`/api/products?categoryId=${p.categoryId}&limit=6`)
            .then((r) => r.json())
            .then((data) => {
              if (!active) return;
              const related = (data?.products || [])
                .filter((r: StoreProduct) => r.id !== p.id)
                .slice(0, 5);
              setRelatedProducts(related);
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        if (!active) return;
        setLoaded({ key: productKey, product: null });
        setState("not-found");
      });

    return () => {
      active = false;
    };
  }, [productKey]);

  const sizeOptions = deriveSizeOptions(product);
  const selectedSize =
    sizeOptions.find((s) => s.id === selectedSizeId) ?? sizeOptions[0] ?? null;

  const productImages = product
    ? (product.galleryImages?.length
        ? product.galleryImages
        : [product.imageUrl]
      ).filter(Boolean)
    : [];

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    const ok = await addItem(product.id, quantity);
    setAdding(false);
    if (!ok) router.push("/login");
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handlePrev = useCallback(() => sliderRef.current?.swiper.slidePrev(), []);
  const handleNext = useCallback(() => sliderRef.current?.swiper.slideNext(), []);

  const isStale = loaded?.key !== productKey;

  /* ---------------------------------------------------------------- loading */
  if (state === "loading" || isStale) {
    return (
      <div className="min-h-screen bg-[var(--brand-surface)] dark:bg-gray-900">
        <Navbar />
        <main className="mx-auto w-full max-w-[var(--container-width)] px-4 pt-10 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="h-[360px] animate-pulse rounded-3xl bg-[var(--brand-surface-soft)] sm:h-[480px]" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 animate-pulse rounded-xl bg-[var(--brand-surface-soft)]" />
              <div className="h-6 w-1/3 animate-pulse rounded-xl bg-[var(--brand-surface-soft)]" />
              <div className="h-24 animate-pulse rounded-xl bg-[var(--brand-surface-soft)]" />
              <div className="h-14 animate-pulse rounded-full bg-[var(--brand-surface-soft)]" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* -------------------------------------------------------------- not found */
  if (state === "not-found" || !product) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--brand-surface)] dark:bg-gray-900">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-2xl px-4 py-24 text-center sm:px-6">
            <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
              <Search size={28} />
            </span>
            <h1 className="pb-1 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
              We couldn&apos;t find that product
            </h1>
            <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400">
              The link may be out of date, or the item is no longer stocked. Nothing has
              been added to your cart.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="brand-primary-button rounded-full px-8 py-3.5 text-sm font-bold"
              >
                Browse the shop
              </Link>
              <Link
                href="/categories"
                className="brand-secondary-button rounded-full px-8 py-3.5 text-sm font-bold"
              >
                Shop by category
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ------------------------------------------------------------------ ready */
  const basePrice = selectedSize ? selectedSize.price : product.price;
  const baseOldPrice = selectedSize
    ? (selectedSize.oldPrice ?? basePrice)
    : (product.compareAtPrice ?? product.price);
  const currentPrice = isSubscribed ? basePrice * 0.8 : basePrice;
  const hasDiscount = baseOldPrice > currentPrice;
  const badge = product.tags?.[0] ? String(product.tags[0]) : product.brand || "Care Leo";
  const highlights = (product.attributes || []).slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="pt-10 pb-16">
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="scrollbar-hide mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 text-sm text-gray-500 dark:text-gray-400 sm:mb-8"
          >
            <Link href="/" className="transition-colors hover:text-[var(--brand-primary)]">
              Home
            </Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link
              href="/shop"
              className="transition-colors hover:text-[var(--brand-primary)]"
            >
              Shop
            </Link>
            {product.category && (
              <>
                <ChevronRight size={14} aria-hidden="true" />
                <span>{product.category}</span>
              </>
            )}
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {product.name}
            </span>
          </nav>

          {/* Product top section */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <div className="flex h-full flex-col-reverse gap-3 sm:flex-row sm:gap-4">
              {productImages.length > 1 && (
                <div className="scrollbar-hide flex shrink-0 gap-2 overflow-x-auto pb-1 sm:w-20 sm:flex-col sm:gap-3 sm:overflow-y-auto sm:pb-0 lg:w-24">
                  {productImages.map((imgSrc, i) => (
                    <button
                      key={imgSrc}
                      onClick={() => setActiveImage(i + 1)}
                      aria-label={`Show image ${i + 1} of ${productImages.length}`}
                      className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white transition-all dark:bg-gray-800 sm:h-20 sm:w-full lg:h-24 ${
                        activeImage === i + 1
                          ? "border-[var(--brand-primary)] shadow-sm"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <ProductImage
                        src={imgSrc}
                        alt={`${product.name} — view ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="group relative flex h-[360px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[var(--brand-line)] bg-[var(--brand-surface-soft)] transition-all dark:border-gray-700 dark:bg-gray-800 sm:h-[480px] sm:rounded-3xl lg:h-[540px] xl:h-[600px]">
                {productImages.length > 0 ? (
                  <div className="animate-fade-in relative h-full w-full" key={activeImage}>
                    <ProductImage
                      src={productImages[activeImage - 1] || productImages[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Camera size={40} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Photo coming soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-4 inline-flex w-fit items-center rounded-full bg-[var(--brand-surface-soft)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[var(--brand-primary)] sm:mb-6 sm:text-xs">
                {badge}
              </div>

              <h1 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white sm:mb-5 sm:text-4xl lg:text-[42px]">
                {product.name}
              </h1>

              {/* Rating renders only when the catalogue supplies a real value.
                  Invented review counts are an FTC exposure for US e-commerce. */}
              {product.rating > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-3 border-b border-[var(--brand-line)] pb-6 dark:border-gray-800 sm:mb-8 sm:gap-4 sm:pb-8">
                  <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2.5 py-1 dark:bg-yellow-900/20">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  {product.stock > 0 ? (
                    <span className="text-sm font-medium text-emerald-600">In stock</span>
                  ) : (
                    <span className="text-sm font-medium text-gray-500">Out of stock</span>
                  )}
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-end gap-3 sm:gap-4">
                <span className="text-2xl font-black text-gray-900 transition-all dark:text-white sm:text-3xl">
                  {formatPrice(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="pb-0.5 text-base font-bold text-gray-400 line-through transition-all sm:text-lg">
                    {formatPrice(baseOldPrice)}
                  </span>
                )}
                {isSubscribed && (
                  <span className="brand-accent-chip animate-fade-in mb-1 rounded-full px-2.5 py-1 text-[10px] font-bold sm:mb-1.5 sm:px-3 sm:text-xs">
                    Save 20% with Care Leo+
                  </span>
                )}
              </div>

              {(product.shortDescription || product.description) && (
                <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
                  {product.shortDescription || product.description}
                </p>
              )}

              {highlights.length > 0 && (
                <dl className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {highlights.map((attr) => (
                    <div key={attr.name} className="flex flex-col gap-1">
                      <dt className="text-xs text-gray-500">{attr.name}</dt>
                      <dd className="text-sm font-bold text-gray-900 dark:text-white">
                        {(attr.values || []).join(", ")}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* Sizes — only when the product actually has them */}
              {sizeOptions.length > 1 && (
                <div className="mb-6">
                  <h2 className="mb-3 font-bold text-gray-900 dark:text-white">
                    Choose Size
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 text-center transition-all ${
                          selectedSize?.id === size.id
                            ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)] dark:bg-[var(--brand-primary)]/10"
                            : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
                        }`}
                      >
                        <span className="font-bold text-gray-900 dark:text-white">
                          {size.id}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {formatPrice(size.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscribe & Save */}
              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                aria-pressed={isSubscribed}
                className={`mb-6 w-full rounded-3xl border-2 p-4 text-left transition-all sm:p-5 ${
                  isSubscribed
                    ? "border-[var(--brand-primary)] bg-[var(--brand-surface-soft)]"
                    : "border-gray-200 bg-white hover:border-[var(--brand-line)] dark:border-gray-800 dark:bg-gray-900"
                }`}
              >
                <div className="mb-4 flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${
                      isSubscribed
                        ? "bg-[var(--brand-primary)] text-white"
                        : "border-2 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {isSubscribed && <Check size={14} strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        Subscribe &amp; Save with Care Leo+
                      </h3>
                      <span className="brand-accent-chip rounded-full px-2 py-0.5 text-[10px] font-bold">
                        Best Value
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--brand-primary)]">20% OFF</span> every
                        order
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck size={12} /> Free delivery
                      </div>
                      <div className="flex items-center gap-1">
                        <RotateCcw size={12} /> Skip or cancel anytime
                      </div>
                    </div>
                  </div>
                </div>

                {isSubscribed && (
                  <div className="animate-fade-in flex flex-col items-start gap-3 rounded-2xl border border-[var(--brand-line)] bg-white p-3 dark:border-gray-800 dark:bg-gray-900/80 sm:flex-row sm:items-center">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Deliver every
                    </span>
                    <div
                      className="relative w-full flex-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="sr-only" htmlFor="delivery-cadence">
                        Delivery frequency
                      </label>
                      <select
                        id="delivery-cadence"
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      >
                        <option>4 Weeks (Recommended)</option>
                        <option>6 Weeks</option>
                        <option>8 Weeks</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                    </div>
                  </div>
                )}
              </button>

              {/* Add to cart */}
              <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <div className="flex h-12 w-full items-center justify-between rounded-full border border-gray-200 bg-[var(--brand-surface-soft)] px-2 dark:border-gray-700 dark:bg-gray-800 sm:h-14 sm:w-auto sm:px-0">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    aria-label="Decrease quantity"
                    className="flex h-full w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="text-xl font-medium sm:text-2xl">-</span>
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900 dark:text-white sm:w-10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                    className="flex h-full w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="text-xl font-medium sm:text-2xl">+</span>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="brand-primary-button flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-base font-bold transition-all active:scale-95 disabled:opacity-60 sm:h-14 sm:flex-1 sm:text-lg"
                >
                  <Package size={20} />
                  <span className="truncate">
                    {adding
                      ? "Adding..."
                      : `Add to Cart - ${formatPrice(currentPrice * quantity)}`}
                  </span>
                </button>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
                {[
                  { icon: Truck, title: "Free Delivery", sub: "On all orders" },
                  { icon: RotateCcw, title: "Easy Returns", sub: "Hassle free" },
                  { icon: Lock, title: "Secure Payment", sub: "100% secure" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:text-left"
                  >
                    <Icon size={20} className="text-gray-400" />
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-white">
                        {title}
                      </div>
                      <div className="text-[10px] text-gray-500">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-order banner */}
          <div className="mb-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface-soft)] p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:h-20 sm:w-20">
                <Clock size={32} className="text-[var(--brand-primary)]" />
              </div>
              <div>
                <h2 className="mb-1 text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  Never run out again!
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                  Set up auto-order and get free delivery plus extra savings.
                </p>
              </div>
            </div>
            <Link
              href="/subscription"
              className="brand-primary-button shrink-0 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              See Care Leo+ plans
            </Link>
          </div>

          {/* Product detail — driven entirely by catalogue data. The old salmon
              "Why choose", feeding guide, ingredients and guaranteed-analysis
              blocks were hardcoded and rendered on every single product. */}
          {(product.description || (product.attributes || []).length > 0) && (
            <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {product.description && (
                <div className="rounded-3xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950 sm:p-8 lg:col-span-2">
                  <h2 className="mb-4 text-xl font-black text-gray-900 dark:text-white">
                    About this product
                  </h2>
                  <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>
              )}

              {(product.attributes || []).length > 0 && (
                <div className="rounded-3xl border border-gray-100 bg-[var(--brand-surface-soft)] p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                  <h2 className="mb-4 text-lg font-black text-gray-900 dark:text-white">
                    Specifications
                  </h2>
                  <dl className="flex flex-col gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {(product.attributes || []).map((attr) => (
                      <div
                        key={attr.name}
                        className="flex justify-between gap-4 border-b border-[var(--brand-line)] pb-2 last:border-0 dark:border-gray-800"
                      >
                        <dt className="text-gray-500">{attr.name}</dt>
                        <dd className="text-right">{(attr.values || []).join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          )}

          {/* Reviews: this block returns once real, booking-backed reviews exist in
              the catalogue API. It previously rendered four invented testimonials
              plus "1,842 reviews · 2.1k sold" on every product. */}

          {/* You may also like */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="mb-6 flex items-center justify-between sm:mb-8">
                <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  You may also like
                </h2>
                <div className="flex items-center gap-2">
                  <Link
                    href="/shop"
                    className="mr-2 flex items-center gap-1 text-sm font-bold text-[var(--brand-primary)] hover:underline"
                  >
                    View all <ChevronRight size={14} />
                  </Link>
                  <div className="hidden gap-2 lg:flex">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous products"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] dark:border-gray-700 dark:bg-gray-800"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next products"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] dark:border-gray-700 dark:bg-gray-800"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="group/slider relative -mx-4 px-4 sm:mx-0 sm:px-0">
                <Swiper
                  ref={sliderRef}
                  modules={[Navigation, FreeMode]}
                  spaceBetween={12}
                  slidesPerView={1.2}
                  freeMode={true}
                  breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                  className="pb-6 !px-4 sm:!px-0"
                >
                  {relatedProducts.map((rp) => (
                    <SwiperSlide key={rp.id}>
                      <ProductCard
                        id={rp.id}
                        slug={rp.slug}
                        name={rp.name}
                        price={formatPrice(rp.price)}
                        old={rp.compareAtPrice ? formatPrice(rp.compareAtPrice) : ""}
                        badge={rp.brand || "Care Leo"}
                        badgeColor="bg-[var(--brand-primary)]"
                        rating={rp.rating}
                        imageUrl={rp.imageUrl || undefined}
                        onAddToCart={() => {
                          void addItem(rp.id, 1);
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center gap-2 text-xs font-medium text-gray-400">
            <ShieldCheck size={14} /> Secure checkout · Care Leo never stores your full
            card details
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
