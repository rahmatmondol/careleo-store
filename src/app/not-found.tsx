import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundSearch from "@/components/NotFoundSearch";
import { ShoppingBag, Sparkles, Stethoscope, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Care Leo",
  description:
    "We couldn't find that page. Browse the Care Leo shop, AI Care, services or community instead.",
};

const destinations = [
  {
    href: "/shop",
    icon: ShoppingBag,
    title: "Shop",
    body: "Food, treats, supplements and toys — delivered.",
  },
  {
    href: "/ai-care",
    icon: Sparkles,
    title: "AI Care",
    body: "Symptom checks, care plans and vet escalation with Leo.",
  },
  {
    href: "/services",
    icon: Stethoscope,
    title: "Services",
    body: "Vetted vets, walkers, groomers, trainers and sitters.",
  },
  {
    href: "/community",
    icon: Users,
    title: "Community",
    body: "Breed groups, vet Q&As and real advice from pet parents.",
  },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-primary)]">
              Error 404
            </p>
            <h1 className="mt-4 pb-1 text-4xl font-black leading-[1.15] text-[var(--foreground)] sm:text-5xl">
              This Page Went{" "}
              <span className="brand-text-gradient">Walkies.</span>
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-[var(--brand-ink-soft)]">
              The link is broken or the page has moved. Search for what you need, or pick
              up from one of these.
            </p>

            <div className="mt-8">
              <NotFoundSearch />
            </div>

            <Link
              href="/"
              className="brand-primary-button mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Back to home <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {destinations.map(({ href, icon: Icon, title, body }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-2xl border border-[var(--brand-line)] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-primary)] hover:shadow-[0_16px_36px_rgba(90,49,213,0.10)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-bold text-[var(--foreground)]">
                    {title}
                    <ArrowRight
                      size={14}
                      className="text-[var(--brand-primary)] transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                    {body}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
