import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Stethoscope,
  Zap,
  PawPrint,
  Lock,
  Sparkles,
  Camera,
  Utensils,
  Activity,
  Bell,
  FileText,
  MessageCircle,
  ArrowRight,
  Check,
  Download,
  Trash2,
  ChevronDown,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Pet Health — Symptom Checks, Care Plans & Vet Escalation | Care Leo",
  description:
    "Leo checks your pet's symptoms, builds a daily care plan, and tells you when it's time to see a vet. Personalized nutrition, behavior insights and smart reminders — built for dogs and cats.",
  alternates: { canonical: "/ai-care" },
  openGraph: {
    title: "AI Pet Health — Symptom Checks, Care Plans & Vet Escalation | Care Leo",
    description:
      "Leo checks your pet's symptoms, builds a daily care plan, and tells you when it's time to see a vet.",
    url: "/ai-care",
    type: "website",
  },
};

const trustRow = [
  {
    icon: Stethoscope,
    label: "Vet-Reviewed Logic",
    caption: "Escalation rules built with practicing vets",
  },
  {
    icon: Zap,
    label: "Answers in Seconds",
    caption: "No appointment, no waiting room",
  },
  {
    icon: PawPrint,
    label: "Breed-Aware",
    caption: "300+ dog & cat breeds",
  },
  {
    icon: Lock,
    label: "Private by Default",
    caption: "Your pet's data is never sold",
  },
];

const careLoop = [
  {
    step: "01",
    title: "Symptom Check",
    body: "Tell Leo what you're seeing in plain language: “He's been licking his paw all morning.” Leo asks targeted follow-ups — duration, appetite, energy, any bleeding — the same triage questions a vet nurse would ask on the phone.",
    output:
      "A plain-English assessment with an urgency level — Monitor at Home, Book a Vet, or Urgent — Go Now.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Care Plan",
    body: "Leo turns the assessment into a daily plan: what to feed, what to watch for, how long to monitor, which symptoms mean things are getting worse. The plan updates as you check in.",
    output:
      "A day-by-day schedule with feeding times, medication reminders, and a watchlist.",
    icon: Activity,
  },
  {
    step: "03",
    title: "Vet Escalation",
    body: "When symptoms cross the threshold, Leo doesn't hedge. It tells you clearly, hands you a symptom summary you can read out to the vet, and helps you book from inside the app.",
    output: "A one-page visit summary — timeline, symptoms, feeding changes, photos.",
    icon: Stethoscope,
  },
];

const dailyCards = [
  {
    icon: Camera,
    title: "Breed & Body Detection",
    body: "Snap a photo. Leo identifies the breed, estimates body condition score, and flags the health risks that breed is prone to — hip dysplasia in retrievers, breathing issues in flat-faced breeds, kidney concerns in older cats.",
  },
  {
    icon: Utensils,
    title: "AI Nutrition Engine",
    body: "Calorie targets calculated from real inputs — species, breed, weight, age, activity level, spay status, and any conditions. Leo tells you exactly how much to feed, not a vague range.",
  },
  {
    icon: Activity,
    title: "Behavior & Mood Analysis",
    body: "Sudden hiding, pacing, aggression, or a change in sleep can be the first sign of pain. Leo tracks behavior patterns over time and tells you when a shift is worth a closer look.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    body: "Vaccinations, deworming, flea and tick, medication doses, weight check-ins. Timed to your pet's actual schedule, not a generic calendar.",
  },
  {
    icon: FileText,
    title: "Health Timeline",
    body: "Every symptom check, weight entry, photo and vet visit in one chronological record. Export it as a PDF before an appointment.",
  },
  {
    icon: MessageCircle,
    title: "Daily Check-ins",
    body: "Leo asks how your pet is doing, learns from your answers, and quietly builds a picture of what “normal” looks like for your pet — so it can spot when normal changes.",
  },
];

const underTheHood = [
  {
    heading: "Your pet's profile is the context.",
    body: "Leo doesn't answer generic questions. Every response is conditioned on your pet's species, breed, age, weight, medical history, current diet, and everything you've logged before.",
  },
  {
    heading: "Structured tools, not free-form guessing.",
    body: "Leo doesn't just generate text — it calls dedicated functions to pull your pet's records, recalculate nutrition targets, set reminders, and write to the health timeline. That's why the answers stay consistent between sessions.",
  },
  {
    heading: "A safety layer sits on top.",
    body: "Red-flag symptoms — laboured breathing, seizure, bloat signs, suspected poisoning, prolonged vomiting — bypass the conversation entirely and trigger an immediate escalation card.",
  },
  {
    heading: "It remembers.",
    body: "Facts Leo learns about your pet get saved to the profile. Tell it once that your dog is allergic to chicken and it will never recommend a chicken-based food again.",
  },
];

const privacyItems = [
  {
    icon: Lock,
    title: "Never sold.",
    body: "We don't sell or share your pet's health data with advertisers, insurers, or third parties.",
  },
  {
    icon: Download,
    title: "Export anytime.",
    body: "Download your pet's full health record as a PDF whenever you want.",
  },
  {
    icon: Trash2,
    title: "Delete anytime.",
    body: "Remove a pet profile and its history is permanently deleted.",
  },
];

const comparison: { feature: string; free: boolean; plus: boolean }[] = [
  { feature: "Pet profile + breed detection", free: true, plus: true },
  { feature: "Symptom checks", free: true, plus: true },
  { feature: "Basic care reminders", free: true, plus: true },
  { feature: "AI Nutrition Engine", free: false, plus: true },
  { feature: "Full care plans & daily check-ins", free: false, plus: true },
  { feature: "Health timeline + PDF export", free: false, plus: true },
  { feature: "Behavior analysis", free: false, plus: true },
  { feature: "Priority vet booking", free: false, plus: true },
];

const faqs = [
  {
    q: "Is Leo a replacement for my vet?",
    a: "No. Leo helps you decide when to see one and prepares you for the visit. For diagnosis, prescriptions and treatment, you need a licensed veterinarian.",
  },
  {
    q: "Which pets does Leo support?",
    a: "Dogs and cats today, across 300+ breeds and mixed breeds. More species are in development.",
  },
  {
    q: "How accurate is the breed detection?",
    a: "Leo identifies breed from a photo and will tell you when it isn't confident — including when a pet is clearly mixed. It's a starting point for risk profiling, not a DNA test.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Nothing is deleted automatically. Your pet's history stays available and exportable. You can delete it permanently at any time from your account.",
  },
  {
    q: "Does Leo work offline?",
    a: "Reminders and your saved care plan work offline. Symptom checks need a connection.",
  },
  {
    q: "Can I add more than one pet?",
    a: "Yes. Free accounts support one pet profile; Care Leo+ Family supports up to five.",
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

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Leo — Care Leo AI Pet Health Assistant",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android, Web",
  description:
    "Leo checks your pet's symptoms, builds a daily care plan, and tells you when it's time to see a vet.",
};

export default function AiCarePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main>
        {/* Section 1 — Hero */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-3 py-1.5 text-xs font-bold text-[var(--brand-primary)]">
                <Sparkles size={14} /> AI-Powered Pet Health
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] pb-1 text-[var(--foreground)]">
                Your Pet Can&apos;t Explain What Hurts.{" "}
                <span className="brand-text-gradient">Leo Can.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                Describe what you&apos;re seeing — Leo asks the right follow-up
                questions, tells you how urgent it is, and builds a care plan around
                your pet&apos;s breed, age and history.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="brand-primary-button flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Start a Free Symptom Check <ArrowRight size={16} />
                </Link>
                <Link
                  href="#care-loop"
                  className="brand-secondary-button flex items-center rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  See How Leo Works
                </Link>
              </div>

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

            {/* Phone mockup: Leo chat mid symptom check + health score ring */}
            <div className="relative mx-auto w-full max-w-[360px]">
              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full bg-[var(--brand-secondary)]/15 blur-3xl" />
              <div className="relative rounded-[40px] border border-[var(--brand-line)] bg-white p-3 shadow-[0_30px_70px_var(--brand-shadow)]">
                <div className="rounded-[32px] bg-[var(--brand-surface-soft)] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--brand-primary)] shadow-sm">
                        <PawPrint size={16} />
                      </span>
                      <div>
                        <p className="text-sm font-black text-[var(--foreground)]">Leo</p>
                        <p className="text-[10px] font-bold text-emerald-600">
                          Symptom check in progress
                        </p>
                      </div>
                    </div>
                    <span className="brand-chip rounded-full px-2 py-0.5 text-[10px] font-bold">
                      Milo · Beagle
                    </span>
                  </div>

                  {/* Health score ring */}
                  <div className="mb-5 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        background:
                          "conic-gradient(var(--brand-primary) 0turn 0.78turn, var(--brand-line) 0.78turn 1turn)",
                      }}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-[var(--foreground)]">
                        78
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--brand-ink-soft)]">
                        Health Score
                      </p>
                      <p className="text-sm font-black text-[var(--foreground)]">
                        Monitor at Home
                      </p>
                      <p className="mt-0.5 text-[10px] font-medium text-[var(--brand-ink-soft)]">
                        Recheck in 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[var(--brand-primary)] px-3.5 py-2.5 text-xs font-medium text-white">
                      He&apos;s been licking his paw all morning.
                    </p>
                    <p className="max-w-[90%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-xs font-medium text-[var(--foreground)] shadow-sm">
                      Got it. Is there any redness, swelling or bleeding between the
                      toes? And is he still eating normally?
                    </p>
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[var(--brand-primary)] px-3.5 py-2.5 text-xs font-medium text-white">
                      A bit red. Eating fine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — The Care Loop */}
        <section
          id="care-loop"
          className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
        >
          <h2 className="max-w-3xl text-3xl sm:text-4xl font-black leading-tight text-[var(--foreground)]">
            From &ldquo;Something&apos;s Off&rdquo; to a Clear Next Step
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--brand-ink-soft)]">
            Most pet apps stop at information. Leo runs a full loop — check, plan, and
            escalate when it matters.
          </p>

          <ol className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {careLoop.map(({ step, title, body, output, icon: Icon }, i) => (
              <li key={step} className="relative">
                <div className="h-full rounded-2xl border border-[var(--brand-line)] bg-white p-6 shadow-[0_4px_20px_rgba(90,49,213,0.04)]">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--brand-ink-soft)]">
                      Step {step}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-black text-[var(--foreground)]">
                    {title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                    {body}
                  </p>
                  <p className="mt-5 rounded-xl bg-[var(--brand-surface-soft)] p-4 text-xs font-semibold leading-relaxed text-[var(--brand-primary)]">
                    <span className="font-black uppercase tracking-wide">Output: </span>
                    {output}
                  </p>
                </div>
                {i < careLoop.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-[var(--brand-line)] lg:block"
                  >
                    <ArrowRight size={24} />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl text-base font-semibold leading-relaxed text-[var(--foreground)]">
            Every escalation rule is written against veterinary triage guidance and
            reviewed before it ships. Leo is built to send you to a vet early, not to
            keep you in the app.
          </p>
        </section>

        {/* Section 3 — What Leo Does Every Day */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="max-w-3xl text-3xl sm:text-4xl font-black leading-tight text-[var(--foreground)]">
            Six Things Leo Handles So You Don&apos;t Have To
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dailyCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[var(--brand-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_20px_40px_rgba(90,49,213,0.10)]"
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
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — How It Actually Works */}
        <section className="bg-[#1f1637] py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Under the Hood
                </h2>
                <p className="mt-4 text-lg font-medium text-white/60">
                  For the people who want to know what&apos;s actually running.
                </p>

                <ol className="mt-10 space-y-8">
                  {underTheHood.map(({ heading, body }, i) => (
                    <li key={heading} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-black text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-white">{heading}</p>
                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/60">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Architecture diagram */}
              <div className="lg:pt-14">
                <ul className="space-y-3">
                  {[
                    "Your input",
                    "Pet profile & history",
                    "Care model",
                    "Safety layer",
                    "Response + escalation",
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

        {/* Section 5 — What Leo Won't Do */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-[var(--brand-line)] bg-[var(--brand-surface-soft)]/60 p-8 sm:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[var(--brand-primary)] shadow-sm">
              <TriangleAlert size={22} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)]">
              Where Leo Stops
            </h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-[var(--brand-ink-soft)]">
              Leo is a triage and care-planning tool, not a substitute for a
              veterinarian. It does not diagnose disease, prescribe medication, or read
              lab results. It&apos;s designed to help you decide whether and how urgently
              to see a vet — and to make that visit more useful when you get there.
            </p>
            <p className="mt-4 max-w-3xl text-base font-bold leading-relaxed text-[var(--foreground)]">
              In an emergency, go to a vet or an emergency clinic immediately. Leo will
              always tell you to.
            </p>
            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
            >
              Find emergency and urgent care near you <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Section 6 — Privacy */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)]">
            Your Pet&apos;s Data Stays Yours
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {privacyItems.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-bold text-[var(--foreground)]">{title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/privacy"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
          >
            Read our full Privacy Policy <ArrowRight size={14} />
          </Link>
        </section>

        {/* Section 7 — Free vs Care Leo+ */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)]">
            How Much of Leo Is Free?
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--brand-ink-soft)]">
            Symptom checks and basic care are free, forever. Care Leo+ unlocks the
            deeper tools.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--brand-line)] bg-white">
            <table className="w-full text-left">
              <caption className="sr-only">
                Feature comparison between the free Care Leo plan and Care Leo+
              </caption>
              <thead>
                <tr className="border-b border-[var(--brand-line)] text-sm font-black text-[var(--foreground)]">
                  <th scope="col" className="px-5 py-5 sm:px-8">
                    Feature
                  </th>
                  <th scope="col" className="w-28 px-4 py-5 text-center sm:w-40">
                    Free
                  </th>
                  <th
                    scope="col"
                    className="w-28 bg-[var(--brand-surface-soft)] px-4 py-5 text-center text-[var(--brand-primary)] sm:w-40"
                  >
                    Care Leo+
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--brand-line)]">
                {comparison.map(({ feature, free, plus }) => (
                  <tr key={feature}>
                    <th
                      scope="row"
                      className="px-5 py-4 text-sm font-semibold text-[var(--foreground)] sm:px-8"
                    >
                      {feature}
                    </th>
                    <td className="px-4 py-4 text-center">
                      {free ? (
                        <>
                          <Check
                            size={18}
                            className="mx-auto text-emerald-500"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Included</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true" className="text-gray-300">
                            —
                          </span>
                          <span className="sr-only">Not included</span>
                        </>
                      )}
                    </td>
                    <td className="bg-[var(--brand-surface-soft)]/60 px-4 py-4 text-center">
                      {plus ? (
                        <>
                          <Check
                            size={18}
                            className="mx-auto text-[var(--brand-primary)]"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Included</span>
                        </>
                      ) : (
                        <>
                          <span aria-hidden="true" className="text-gray-300">
                            —
                          </span>
                          <span className="sr-only">Not included</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/subscription"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
          >
            Compare Care Leo+ Plans <ArrowRight size={14} />
          </Link>
        </section>

        {/* Section 8 — FAQ */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--foreground)]">
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

        {/* Section 9 — Closing CTA */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto w-full max-w-[var(--container-width)] overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Start With One Question
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/80">
              Open Leo, describe what you&apos;re seeing, and get a straight answer in
              under a minute. No card required.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-[var(--brand-primary-strong)] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Try Leo Free
              </Link>
              <Link
                href="/subscription"
                className="rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                Explore Care Leo+
              </Link>
            </div>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} /> Free forever plan
              </span>
              <span aria-hidden="true">·</span>
              <span>No credit card</span>
              <span aria-hidden="true">·</span>
              <span>Cancel anytime</span>
            </p>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
    </div>
  );
}
