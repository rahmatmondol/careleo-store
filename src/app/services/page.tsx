import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceSearch from "./ServiceSearch";
import CoverageChecker from "./CoverageChecker";
import { SERVICE_CATEGORIES, matchCategories } from "./categories";
import {
  BadgeCheck,
  Star,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronDown,
  ArrowRight,
  Briefcase,
  CalendarDays,
  Wallet,
  Stethoscope,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vets, Walkers, Groomers & Pet Sitters Near You | Care Leo Services",
  description:
    "Book vetted vets, dog walkers, groomers, trainers and sitters through Care Leo. Every provider is background-checked and rated. Book in the app, pay securely, covered by our care guarantee.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Vets, Walkers, Groomers & Pet Sitters Near You | Care Leo Services",
    description:
      "Book vetted vets, dog walkers, groomers, trainers and sitters through Care Leo. Every provider is background-checked and rated.",
    url: "/services",
    type: "website",
  },
};

const trustRow = [
  {
    icon: BadgeCheck,
    label: "Background-Checked",
    caption: "Every provider verified before listing",
  },
  {
    icon: Star,
    label: "Member-Rated",
    caption: "Reviews only from completed bookings",
  },
  {
    icon: CreditCard,
    label: "Pay in App",
    caption: "No cash, no awkward invoices",
  },
  {
    icon: ShieldCheck,
    label: "Care Guarantee",
    caption: "We make it right if something goes wrong",
  },
];

const bookingSteps = [
  {
    title: "Tell us what you need",
    body: "Pick a service and your ZIP. We show only providers who serve your area and your pet's species.",
  },
  {
    title: "Compare on what matters",
    body: "Real ratings from completed bookings, distance, price, next available slot, and specialities. No paid placement.",
  },
  {
    title: "Book and pay in-app",
    body: "Pick a slot, confirm, done. Your pet's profile and health summary go to the provider automatically.",
  },
  {
    title: "Rate and re-book",
    body: "Rate the visit, save your favourites, and re-book in one tap next time.",
  },
];

const vettingChecklist = [
  {
    title: "Identity verified",
    body: "Government ID confirmed for every individual provider",
  },
  {
    title: "Licence and credentials checked",
    body: "Vet licences, grooming certifications and trainer accreditations verified against issuing bodies",
  },
  {
    title: "Background screened",
    body: "Criminal background check on all in-home and pet-handling providers",
  },
  {
    title: "Insurance confirmed",
    body: "Active liability coverage required and re-checked annually",
  },
  {
    title: "Rating floor enforced",
    body: "Providers who drop below 4.0 are reviewed; below 3.5 are removed",
  },
  {
    title: "Reviews are booking-gated",
    body: "Only members who completed and paid for a booking can review. No anonymous reviews, ever.",
  },
];

const providerBenefits = [
  {
    icon: Briefcase,
    title: "Qualified bookings",
    body: "Members arrive with a full health profile. No more guessing at intake.",
  },
  {
    icon: CalendarDays,
    title: "Fill your calendar",
    body: "Set your availability, radius and rates. We handle discovery and scheduling.",
  },
  {
    icon: Wallet,
    title: "Get paid on time",
    body: "Automatic payouts after every completed booking. No chasing invoices.",
  },
];

const faqs = [
  {
    q: "How do you choose which providers to show me?",
    a: "By distance, availability, rating and relevance to your pet. Providers cannot pay for higher placement.",
  },
  {
    q: "What if I need to cancel?",
    a: "Free cancellation up to 24 hours before the booking. Inside 24 hours, the provider's cancellation policy applies — always shown before you confirm.",
  },
  {
    q: "Can I use my own vet?",
    a: "Yes. Add your existing vet to your pet's profile, and Leo will prepare visit summaries for them even if the booking happens outside Care Leo.",
  },
  {
    q: "Is my payment secure?",
    a: "Payments are processed by a PCI-compliant provider. Care Leo never stores your full card details.",
  },
  {
    q: "Do Care Leo+ members get priority?",
    a: "Yes — priority access to booking slots and member pricing on selected services.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": SERVICE_CATEGORIES.map((c) => ({
    "@type": "Service",
    name: c.title,
    description: c.body,
    provider: { "@type": "Organization", name: "Care Leo" },
    areaServed: "US",
  })),
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const service = first(sp.service);
  const zip = first(sp.zip);

  const matches = matchCategories(service);
  const noExactMatch = !!service.trim() && matches.length === SERVICE_CATEGORIES.length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main>
        {/* Section 1 — Hero */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 pt-16 pb-12 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-3 py-1.5 text-xs font-bold text-[var(--brand-primary)]">
                <Sparkles size={14} /> Care Leo Services
              </span>

              <h1 className="mt-6 pb-1 text-4xl font-black leading-[1.15] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                The Right Care,{" "}
                <span className="brand-text-gradient">Booked in Two Taps.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                Vets, walkers, groomers, trainers and sitters — all vetted, all rated by
                real Care Leo members, all bookable without a single phone call.
              </p>

              <ServiceSearch initialService={service} initialZip={zip} />

              <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {trustRow.map(({ icon: Icon, label, caption }) => (
                  <li key={label}>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm font-bold text-[var(--foreground)]">{label}</p>
                    <p className="mt-1 text-xs font-medium text-[var(--brand-ink-soft)]">
                      {caption}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Provider card mockup */}
            <div className="relative mx-auto w-full max-w-[420px]">
              <div className="absolute -left-8 -top-8 h-56 w-56 rounded-full bg-[var(--brand-secondary)]/15 blur-3xl" />
              <div className="relative space-y-4">
                <div className="rounded-3xl border border-[var(--brand-line)] bg-white p-5 shadow-[0_30px_70px_var(--brand-shadow)]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                      <Stethoscope size={24} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-black text-[var(--foreground)]">
                          Riverside Animal Clinic
                        </p>
                        <BadgeCheck
                          size={16}
                          className="shrink-0 text-[var(--brand-primary)]"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="mt-0.5 text-xs font-semibold text-[var(--brand-ink-soft)]">
                        Dr. A. Whitfield, DVM · General practice
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold">
                        <span className="flex items-center gap-1 text-[var(--foreground)]">
                          <Star
                            size={13}
                            className="text-yellow-500"
                            fill="currentColor"
                            aria-hidden="true"
                          />
                          4.9
                          <span className="font-medium text-[var(--brand-ink-soft)]">
                            (212 bookings)
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-[var(--brand-ink-soft)]">
                          <MapPin size={13} aria-hidden="true" /> 1.4 mi
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-[var(--brand-surface-soft)] px-4 py-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--brand-ink-soft)]">
                        Next slot
                      </p>
                      <p className="text-sm font-black text-[var(--foreground)]">
                        Today, 4:30 PM
                      </p>
                    </div>
                    <span className="brand-primary-button rounded-full px-5 py-2 text-xs font-bold">
                      Book
                    </span>
                  </div>
                </div>

                <div className="ml-6 rounded-3xl border border-[var(--brand-line)] bg-white/80 p-4 shadow-sm">
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    Maple Street Grooming
                  </p>
                  <p className="mt-1 text-xs font-medium text-[var(--brand-ink-soft)]">
                    4.8 · 2.1 mi · Next slot tomorrow, 10:00 AM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Service Categories */}
        <section
          id="service-categories"
          className="mx-auto w-full max-w-[var(--container-width)] scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-black leading-tight text-[var(--foreground)] sm:text-4xl">
            Every Kind of Care, One App
          </h2>

          {service.trim() && (
            <p className="mt-4 text-sm font-semibold text-[var(--brand-ink-soft)]">
              {noExactMatch ? (
                <>
                  No exact match for &ldquo;{service}&rdquo; — here&apos;s everything we
                  cover{zip.trim() ? ` near ${zip.trim()}` : ""}.
                </>
              ) : (
                <>
                  Showing care for &ldquo;{service}&rdquo;
                  {zip.trim() ? ` near ${zip.trim()}` : ""}.{" "}
                  <Link
                    href="/services#service-categories"
                    className="font-bold text-[var(--brand-primary)] hover:underline"
                  >
                    Show all services
                  </Link>
                </>
              )}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map(({ key, title, body, price, icon: Icon }) => (
              <div
                key={key}
                className="group flex flex-col rounded-2xl border border-[var(--brand-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_20px_40px_rgba(90,49,213,0.10)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  {body}
                </p>
                <p className="mt-4 text-sm font-black text-[var(--foreground)]">{price}</p>
                <Link
                  href="/services#coverage"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
                >
                  Browse <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — How Booking Works */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black leading-tight text-[var(--foreground)] sm:text-4xl">
            No Phone Tag. No Guesswork.
          </h2>

          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map(({ title, body }, i) => (
              <li
                key={title}
                className="rounded-2xl border border-[var(--brand-line)] bg-white p-6"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-sm font-black text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-bold text-[var(--foreground)]">{title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Section 4 — How We Vet Providers */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--brand-line)] bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black leading-tight text-[var(--foreground)] sm:text-4xl">
              Nobody Gets Listed Without Clearing This
            </h2>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {vettingChecklist.map(({ title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold text-[var(--foreground)]">{title}</p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5 — Care Guarantee */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface-soft)]/60 p-8 sm:flex-row sm:items-start sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand-primary)] shadow-sm">
              <ShieldCheck size={26} />
            </span>
            <div>
              <h2 className="text-2xl font-black text-[var(--foreground)] sm:text-3xl">
                The Care Leo Guarantee
              </h2>
              <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                If a provider doesn&apos;t show, cancels late, or the service isn&apos;t
                what was described, tell us within 48 hours. We&apos;ll rebook you at no
                extra cost or refund you in full. If your pet is injured due to provider
                negligence, we&apos;ll help you file against their insurance and cover the
                gap up to your booking value.
              </p>
              <Link
                href="/terms"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
              >
                Read the full guarantee terms <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 6 — Connected to Leo */}
        <section className="bg-[#1f1637] py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Booking That Knows Your Pet
                </h2>
                <p className="mt-4 text-lg font-medium text-white/60">
                  This is the part other booking apps can&apos;t do.
                </p>
                <p className="mt-8 text-base font-medium leading-relaxed text-white/75">
                  When Leo escalates a symptom, it doesn&apos;t just tell you to see a vet
                  — it filters for clinics that handle that issue, near you, with an open
                  slot. Your symptom timeline, feeding log and photos travel with the
                  booking. After the visit, the diagnosis and any prescriptions come back
                  into your pet&apos;s health record, and Leo adjusts the care plan around
                  them.
                </p>
                <Link
                  href="/ai-care"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[var(--brand-primary-strong)]"
                >
                  See how Leo works <ArrowRight size={16} />
                </Link>
              </div>

              <div className="lg:pt-14">
                <ul className="space-y-3">
                  {[
                    "Leo escalation",
                    "Vet card — filtered & nearby",
                    "Booked, records attached",
                    "Visit summary back into health timeline",
                  ].map((node, i, arr) => (
                    <li key={node}>
                      <div
                        className={`rounded-2xl border px-5 py-4 text-sm font-bold ${
                          i === arr.length - 1
                            ? "border-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                            : "border-white/10 bg-white/5 text-white"
                        }`}
                      >
                        {node}
                      </div>
                      {i < arr.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="ml-6 flex h-5 items-center text-white/25"
                        >
                          <ChevronDown size={18} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 — Coverage */}
        <section
          id="coverage"
          className="mx-auto w-full max-w-[var(--container-width)] scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            Available in Your Area?
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--brand-ink-soft)]">
            We&apos;re expanding city by city so we can vet every provider properly.
          </p>
          <div className="mt-8 max-w-2xl">
            <CoverageChecker />
          </div>
        </section>

        {/* Section 8 — For Providers */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-warm-soft)] p-8 sm:p-12">
            <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
              Are You a Vet, Walker, Groomer or Trainer?
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--brand-ink-soft)]">
              Join Care Leo and get booked by pet parents who already know their
              pet&apos;s history.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {providerBenefits.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-2xl bg-white/70 p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm">
                    <Icon size={20} />
                  </span>
                  <p className="font-bold text-[var(--foreground)]">{title}</p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href="/register?role=provider"
              className="brand-primary-button mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold"
            >
              Apply as a Provider <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Section 9 — FAQ */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            Questions, Answered
          </h2>

          <div className="mt-10 max-w-3xl space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-[var(--brand-line)] bg-white px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[var(--foreground)]">
                  {q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-[var(--brand-primary)] transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 10 — Closing CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[var(--container-width)] overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Care Your Pet Deserves, Without the Phone Calls
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/services#coverage"
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-[var(--brand-primary-strong)] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Find Care Near You
              </Link>
              <Link
                href="/subscription"
                className="rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                Join Care Leo+ for Priority Booking
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </div>
  );
}
