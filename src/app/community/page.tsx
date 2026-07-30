import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  MessageSquare,
  Users,
  Stethoscope,
  MapPin,
  Trophy,
  GraduationCap,
  Heart,
  ArrowRight,
  BadgeCheck,
  Medal,
  Flame,
  Compass,
  HeartHandshake,
  PawPrint,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Care Leo Community — Pet Parents, Real Advice, Real Support",
  description:
    "Join thousands of dog and cat parents sharing advice, wins and worries. Breed groups, vet Q&As, lost pet alerts and monthly challenges — all inside Care Leo.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "The Care Leo Community — Pet Parents, Real Advice, Real Support",
    description:
      "Breed groups, vet Q&As, lost pet alerts and monthly challenges — all inside Care Leo.",
    url: "/community",
    type: "website",
  },
};

/**
 * Live counters. These must come from real data before launch — see edits.md
 * ("Numbers that need a real source"). Until the community API is wired, we
 * render the labels without invented figures rather than shipping fake numbers.
 */
const counters = [
  { label: "Members" },
  { label: "Posts this week" },
  { label: "Questions answered" },
  { label: "Breed groups" },
];

const insideCards = [
  {
    icon: MessageSquare,
    title: "The Feed",
    body: "Photos, progress updates, questions and small wins from pet parents near you and around the world. Follow the pets you like, mute what you don't.",
  },
  {
    icon: Users,
    title: "Breed & Species Groups",
    body: "200+ groups — from Golden Retrievers to Bengal cats to senior-pet parents to first-time puppy owners. The advice actually applies to your pet.",
  },
  {
    icon: Stethoscope,
    title: "Ask a Vet",
    body: "Weekly live Q&A sessions with licensed veterinarians. Submit a question in advance or drop in live. Every session is archived and searchable.",
  },
  {
    icon: MapPin,
    title: "Lost & Found",
    body: "Post a lost pet and alert every Care Leo member within a 10-mile radius instantly. Sightings, photos and safe-return updates in one thread.",
  },
  {
    icon: Trophy,
    title: "Monthly Challenges",
    body: "Walk streaks, weight-goal check-ins, training milestones, adoption anniversaries. Join, track progress with your pet's profile, earn badges.",
  },
  {
    icon: GraduationCap,
    title: "Expert Corner",
    body: "Trainers, nutritionists and behaviourists posting practical breakdowns — not blog filler. Verified expert badges so you know who's actually qualified.",
  },
];

const steps = [
  {
    title: "Create your pet's profile",
    body: "Name, species, breed, a photo. That's it.",
  },
  {
    title: "Join the groups that fit",
    body: "We suggest groups based on your pet's breed, age and location.",
  },
  {
    title: "Post, ask or just read",
    body: "Lurking is completely fine. Most people start there.",
  },
];

const houseRules = [
  {
    title: "Be kind first.",
    body: "Someone asking a basic question is someone trying to do better by their pet. Treat them that way.",
  },
  {
    title: "No medical diagnosis from strangers.",
    body: "Share your experience, not a prescription. For anything urgent, Leo and a vet come first.",
  },
  {
    title: "No selling.",
    body: "No dropshipping, no MLM, no breeder ads, no unlicensed rehoming.",
  },
  {
    title: "Real accounts only.",
    body: "One person, one account. Verified experts carry a badge — nobody else may claim credentials.",
  },
  {
    title: "Reported posts are reviewed by a human within 24 hours.",
    body: "Moderation decisions can be appealed.",
  },
];

const badges = [
  {
    icon: Medal,
    title: "Helpful",
    body: "Your answers get marked helpful by other members",
  },
  {
    icon: Flame,
    title: "Streak Keeper",
    body: "Complete a monthly challenge with your pet",
  },
  {
    icon: Compass,
    title: "Guide",
    body: "Welcome and answer new members in your first 90 days",
  },
  {
    icon: HeartHandshake,
    title: "Good Samaritan",
    body: "Help reunite a lost pet with their family",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <main>
        {/* Section 1 — Hero */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-line)] bg-[var(--brand-surface-soft)] px-3 py-1.5 text-xs font-bold text-[var(--brand-primary)]">
                <Sparkles size={14} /> Care Leo Community
              </span>

              <h1 className="mt-6 pb-1 text-4xl font-black leading-[1.15] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                Pet Parenting Is Easier When{" "}
                <span className="brand-text-gradient">Nobody Does It Alone.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                Ask the question you&apos;re embarrassed to ask. Post the win nobody else
                would understand. Find someone whose dog has exactly the same problem as
                yours.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="brand-primary-button flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Join the Community <ArrowRight size={16} />
                </Link>
                <Link
                  href="#whats-inside"
                  className="brand-secondary-button flex items-center rounded-full px-7 py-3.5 text-sm font-bold"
                >
                  Browse Posts
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {counters.map(({ label }) => (
                  <div key={label}>
                    <dd className="text-2xl font-black text-[var(--brand-primary)]">—</dd>
                    <dt className="mt-1 text-xs font-bold text-[var(--brand-ink-soft)]">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[11px] font-medium text-[var(--brand-ink-soft)]">
                Live counters go here — wired to real community data before launch.
              </p>
            </div>

            {/* Live feed mockup */}
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full bg-[var(--brand-accent)]/15 blur-3xl" />
              <div className="relative space-y-4">
                {[
                  {
                    pet: "Milo",
                    meta: "Beagle · 3 yrs · Portland, OR",
                    text: "Week 6 of the walk streak and he finally stopped pulling on the leash. Whoever suggested the front-clip harness — thank you.",
                    likes: 128,
                    replies: 24,
                  },
                  {
                    pet: "Suki",
                    meta: "Bengal · 7 yrs · Austin, TX",
                    text: "She's been sleeping in the closet for two days. Not eating less, no other signs. Worth a vet visit or am I overthinking it?",
                    likes: 42,
                    replies: 31,
                  },
                  {
                    pet: "Bear",
                    meta: "Golden Retriever · 9 yrs · Denver, CO",
                    text: "Senior bloodwork came back clean. Nine years old and still acts like a puppy at the door.",
                    likes: 311,
                    replies: 47,
                  },
                ].map(({ pet, meta, text, likes, replies }) => (
                  <article
                    key={pet}
                    className="rounded-3xl border border-[var(--brand-line)] bg-white p-5 shadow-[0_20px_50px_var(--brand-shadow)]"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                        <PawPrint size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-black text-[var(--foreground)]">{pet}</p>
                        <p className="text-[11px] font-medium text-[var(--brand-ink-soft)]">
                          {meta}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                      {text}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-bold text-[var(--brand-ink-soft)]">
                      <span className="flex items-center gap-1.5">
                        <Heart size={14} aria-hidden="true" /> {likes}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageSquare size={14} aria-hidden="true" /> {replies}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — What's Inside */}
        <section
          id="whats-inside"
          className="mx-auto w-full max-w-[var(--container-width)] scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            More Than a Comment Section
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insideCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[var(--brand-line)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[var(--brand-primary)] hover:shadow-[0_20px_40px_rgba(90,49,213,0.10)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-primary)] transition-transform group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[var(--foreground)]">{title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  {body}
                </p>
                {title === "Ask a Vet" && (
                  <Link
                    href="/ai-care"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
                  >
                    Need an answer now? Ask Leo <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — How It Works */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            Three Minutes to Your First Post
          </h2>

          <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ title, body }, i) => (
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

        {/* Section 4 — House Rules */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--brand-line)] bg-white p-8 sm:p-10">
            <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
              How We Keep This a Good Place
            </h2>

            <ul className="mt-10 space-y-6">
              {houseRules.map(({ title, body }) => (
                <li key={title} className="border-l-2 border-[var(--brand-line)] pl-5">
                  <p className="font-bold text-[var(--foreground)]">{title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href="/community/guidelines"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand-primary)] hover:underline"
            >
              Read the full Community Guidelines <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Section 5 — Member Stories */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            What Happens Here
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-semibold text-[var(--brand-ink-soft)]">
            Story slots are reserved for real members with written consent, real photos,
            and first name + city only. Nothing invented ships here.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {["Found in 6 hours", "Allergy solved", "12kg → 9kg"].map((tag) => (
              <div
                key={tag}
                className="flex flex-col rounded-2xl border border-dashed border-[var(--brand-line)] bg-white/60 p-6"
              >
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-[var(--brand-surface-soft)] text-[var(--brand-ink-soft)]">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Member photo
                  </span>
                </div>
                <p className="font-bold text-[var(--foreground)]">[Pet name] · [Breed]</p>
                <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  [2–3 sentences in the member&apos;s own words about a specific problem
                  and what the community helped with.]
                </p>
                <span className="brand-accent-chip mt-4 self-start rounded-full px-3 py-1 text-xs font-bold">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Meet the Experts */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            The People Answering Your Questions
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--brand-ink-soft)]">
            Every expert badge on Care Leo is verified against a licence or accreditation
            body before it&apos;s issued.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            {["DVM", "CPDT-KA", "PhD Animal Nutrition", "CAAB"].map((credential) => (
              <div
                key={credential}
                className="flex items-center gap-4 rounded-2xl border border-dashed border-[var(--brand-line)] bg-white/60 p-5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                  <BadgeCheck size={22} />
                </span>
                <div>
                  <p className="font-bold text-[var(--foreground)]">[Expert name]</p>
                  <p className="mt-0.5 text-xs font-bold text-[var(--brand-primary)]">
                    {credential}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--brand-ink-soft)]">
                    [Speciality]
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold text-[var(--brand-ink-soft)]">
            Contracted or partnered professionals only — credential, speciality and a link
            to their posts, added as each one is signed.
          </p>
        </section>

        {/* Section 7 — Recognition */}
        <section className="mx-auto w-full max-w-[var(--container-width)] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[var(--foreground)] sm:text-4xl">
            Earn Your Stripes
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--brand-line)] bg-white p-6 text-center"
              >
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-surface-soft)] text-[var(--brand-primary)]">
                  <Icon size={24} />
                </span>
                <p className="font-bold text-[var(--foreground)]">{title}</p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--brand-ink-soft)]">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-base font-medium text-[var(--brand-ink-soft)]">
            Badges show on your profile and unlock member perks in the{" "}
            <Link
              href="/shop"
              className="font-bold text-[var(--brand-primary)] hover:underline"
            >
              Care Leo store
            </Link>
            .
          </p>
        </section>

        {/* Section 8 — Closing CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[var(--container-width)] overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Your Pet&apos;s Best Days Start With Better Answers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/80">
              Free to join. No pressure to post.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-4 text-base font-bold text-[var(--brand-primary-strong)] shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Join the Community
              </Link>
              {/* Doc copy is "Download the App" — swap this href for the real
                  App Store / Play Store link once they exist. Pointing at a live
                  route in the meantime rather than shipping a dead CTA. */}
              <Link
                href="/ai-care"
                className="rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                See What Leo Does
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
