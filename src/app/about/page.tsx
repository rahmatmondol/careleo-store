import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Heart, Shield, Cpu, Users, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] text-xs font-bold mb-6 border border-[var(--brand-line)]">
                <Sparkles size={14} /> Our Story
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] mb-6 leading-tight">
                Reimagining Pet Care for the <span className="brand-text-gradient">Modern Parent.</span>
              </h1>
              <p className="text-[var(--brand-ink-soft)] text-lg mb-8 max-w-xl font-medium leading-relaxed">
                At Care Leo, we believe pets are family. That's why we've combined premium nutrition, AI-powered health insights, and expert support to give your furry friends the life they deserve.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="brand-primary-button px-8 py-3.5 rounded-xl font-bold flex items-center">
                  Shop Essentials <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/subscription" className="brand-secondary-button px-8 py-3.5 rounded-xl font-bold flex items-center">
                  Join Care Leo+
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Happy dogs" 
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 brand-soft-panel p-4 rounded-2xl flex items-center gap-4 animate-float z-10">
                <div className="bg-[var(--brand-accent-soft)] p-3 rounded-full text-[var(--brand-accent)]">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--foreground)]">50k+</p>
                  <p className="text-xs text-[var(--brand-ink-soft)] font-medium">Happy Pets</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="bg-[var(--brand-surface)] rounded-3xl p-8 md:p-12 border border-[var(--brand-line)] shadow-sm mb-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-accent)] to-[var(--brand-secondary)]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full bg-[var(--brand-primary)] inline-block"></span>
                  Our Mission
                </h3>
                <p className="text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  To empower pet parents with smart, accessible, and premium care solutions. We aim to remove the guesswork from pet health and nutrition, ensuring every pet lives their happiest, healthiest life.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full bg-[var(--brand-accent)] inline-block"></span>
                  Our Vision
                </h3>
                <p className="text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  A world where technology and deep affection merge, creating an ecosystem where proactive pet care is the standard, not a luxury. We are building the future of pet parenting.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">The Care Leo Difference</h2>
              <p className="text-[var(--brand-ink-soft)] font-medium max-w-2xl mx-auto">
                We are built on four core pillars that guide everything we do, from product sourcing to our AI algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Value 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--brand-line)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[var(--brand-surface-soft)] rounded-xl flex items-center justify-center text-[var(--brand-primary)] mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">Premium Quality</h4>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  We rigorously vet every ingredient and material. If it's not good enough for our pets, it's not good enough for yours.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--brand-line)] hover:border-[var(--brand-accent)] hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[var(--brand-accent-soft)] rounded-xl flex items-center justify-center text-[var(--brand-accent)] mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">AI-Powered Care</h4>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  Our Leo Assistant and health algorithms provide personalized nutrition plans and timely medical reminders.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--brand-line)] hover:border-emerald-400 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">Community First</h4>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  We're more than a store; we're a supportive community of pet lovers sharing experiences and advice.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white rounded-2xl p-6 border border-[var(--brand-line)] hover:border-[var(--brand-secondary)] hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-[var(--brand-surface-soft)] rounded-xl flex items-center justify-center text-[var(--brand-secondary)] mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[var(--foreground)] mb-2">Compassion</h4>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium leading-relaxed">
                  Everything we build stems from a deep, genuine love for animals. We care about your pet's happiness as much as you do.
                </p>
              </div>
            </div>
          </div>

          {/* Team / Mascots */}
          <div className="bg-[var(--brand-surface-soft)] rounded-3xl p-8 md:p-16 border border-[var(--brand-line)] mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-4">Meet the "Paw" Team</h2>
              <p className="text-[var(--brand-ink-soft)] font-medium max-w-2xl mx-auto">
                The real bosses behind Care Leo who test all our treats and toys.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Mascot 1 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-[var(--brand-line)] shadow-sm">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--brand-primary)] p-1">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image 
                      src="/Leo.png" 
                      alt="Leo" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[var(--foreground)]">Leo</h4>
                <p className="text-sm text-[var(--brand-primary)] font-bold mb-3">Chief Mascot & AI Avatar</p>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium">
                  Loves salmon treats, long walks, and answering your pet care questions in the chat!
                </p>
              </div>

              {/* Mascot 2 */}
              <div className="bg-white rounded-2xl p-6 text-center border border-[var(--brand-line)] shadow-sm">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[var(--brand-accent)] p-1">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image 
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" 
                      alt="Luna" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[var(--foreground)]">Luna</h4>
                <p className="text-sm text-[var(--brand-accent)] font-bold mb-3">Head of Naps</p>
                <p className="text-sm text-[var(--brand-ink-soft)] font-medium">
                  Expert at testing the softness of our pet beds and knocking things off desks.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="brand-soft-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-accent)]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--foreground)] mb-6">
                Ready to give your pet the <span className="brand-text-gradient">best care?</span>
              </h2>
              <p className="text-[var(--brand-ink-soft)] text-lg mb-8 font-medium">
                Join thousands of pet parents who have transformed their pet's lifestyle with Care Leo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register" className="brand-primary-button px-8 py-4 rounded-xl font-bold text-lg">
                  Create Free Account
                </Link>
                <Link href="/subscription" className="bg-white text-[var(--brand-primary-strong)] border border-[var(--brand-line)] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--brand-surface-soft)] transition-colors shadow-sm">
                  Explore Care Leo+
                </Link>
              </div>
              <ul className="flex flex-wrap justify-center gap-6 mt-8">
                <li className="flex items-center text-sm text-[var(--brand-ink-soft)] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Cancel anytime
                </li>
                <li className="flex items-center text-sm text-[var(--brand-ink-soft)] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Free shipping on orders over $35
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
