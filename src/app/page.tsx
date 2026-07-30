import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SubscriptionPlans from "../components/SubscriptionPlans";
import ShopByCategory from "../components/ShopByCategory";
import TrendingProducts from "../components/TrendingProducts";
import AICareSection from "../components/AICareSection";
import FeaturesSection from "../components/FeaturesSection";
import TrustBadges from "../components/TrustBadges";
import Testimonials from "../components/Testimonials";
import BottomBanner from "../components/BottomBanner";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[var(--foreground)] font-sans selection:bg-[var(--brand-accent-soft)]">
      <Navbar />
      <HeroSection />
      
      <section className="mx-auto max-w-[var(--container-width)] px-4 py-10 sm:px-6 md:py-20">
        <SubscriptionPlans />
      </section>

      <ShopByCategory />
      <TrendingProducts />
      <AICareSection />
      <FeaturesSection />
      <TrustBadges />
      <Testimonials />
      <BottomBanner />
      <Footer />
    </main>
  );
}
