CareLeo — Website Build Doc
Part 0: existing bugs · Part 1–3: /ai-care · /services · /community
Single source for this round of work. Site audited 29 Jul 2026 at https://careleo.care/

How to use this doc: every > quoted block is final copy — paste as-is. Everything else is build instruction for the dev.

Design system (already on site — reuse, don't reinvent):

Purple → violet gradient primary (Join Care Leo+ button), white cards, soft rounded corners (~16px), generous whitespace
Section rhythm: big left-aligned headline + supporting paragraph, then card grid
Accent chips: Most Popular, Bestseller, Save 20% style pills
Icon + label + micro-caption trust rows (like homepage: Free Delivery / AI Nutrition / Vet Approved / Cancel Anytime)




Part 0 — Bugs & Gaps on the Live Site
Fix these alongside the new pages. Several are prerequisites — building /ai-care is pointless while the navbar link to it 404s.
P0 — Blocker
1. Navbar links 404 /ai-care, /services, /community all return 404. They sit in the top navigation, so any visitor clicking them hits a dead page. Parts 1–3 of this doc fix this.

2. 404 page is unbranded Default Next.js black screen (404 | This page could not be found) — no navbar, no "Back to home", no branding. Anyone who mistypes a URL sees a page that looks like the site is broken. Build a branded 404 with header, search, and links to Shop / AI Care / Community.

3. Product route ignores the slug /product/Care Leo Probiotics for Dogs & Cats loads the Salmon Dog Food page. Every product slug resolves to the same hardcoded product — so every "Add to Cart" from a product page is potentially the wrong item.

4. Product URLs are raw product names Spaces and & in the path (/product/Care Leo Probiotics for Dogs & Cats). Breaks when shared, bad for search. Move to clean slugs: /product/probiotics-dogs-cats.

5. All 4 Trending Product images are broken The product cards on the homepage render <img> elements that fail to load (naturalWidth = 0). The most commercially important block on the front page shows empty boxes.

6. Cart holds hardcoded demo data The cart loads pre-filled with 2 items / $71.97 on every visit. localStorage is completely empty, so a real customer's cart is never persisted — add items, refresh, everything resets to the demo state.
P1 — Trust & legal (required before taking payments)
7. All 12 footer links are href="#" Shop, AI Care, Services columns — every link is dead.

8. No Privacy Policy, Terms, Refund/Return policy, or Contact page /privacy, /terms, /contact all 404. Payment processors and both app stores require these. Privacy Policy is also referenced from the /ai-care copy in Part 1.

9. No company information anywhere No business address, support email, phone number, or social links in the footer. Customers about to enter card details look for exactly this.
P2 — Content accuracy
10. Subscription pricing differs between pages Site shows Basic $4.99 / Premium $9.99 / Family $14.99; other materials say $9.99 / $29.99. On the product page the headline reads $19.99 while the 2kg option below reads $24.99. Pick the real numbers, serve every page from one source.

11. Testimonials look fabricated Sarah J. / Mike T. / Priya K. with initial avatars and no photos. Either replace with real customers who've given written consent, or remove the section until you have them.

12. Product photos are generic stock The Salmon Dog Food page shows five stock photos of random dogs — no packaging, no actual product. Customers can't see what they're buying.

13. "1,842 reviews · 2.1k sold" isn't backed by data Unsubstantiated review counts are an FTC exposure for US e-commerce. Show real counts or show none.
P3 — Search & sharing
14. No og:image or og:title — sharing any careleo.care link on WhatsApp, LinkedIn or Twitter produces a blank preview 15. No canonical tag 16. No robots.txt (404) 17. No sitemap.xml (404)
P4 — Polish
18. Homepage heading clips — "Save More. Care Better." has "Better." cut off at the bottom (line-height / overflow) 19. Auth flow incomplete — /login exists, but /signup, /account and /orders all 404
Suggested fix order
Navbar 404s → build the three pages in Parts 1–3 of this doc
Branded 404 page
Product slug routing + broken images + cart persistence
Privacy / Terms / Refund / Contact
og:image, robots.txt, sitemap.xml, canonical
Reconcile pricing to a single source
Replace or remove fabricated testimonials and review counts




1. AI Care — /ai-care
Page goal: convince a worried pet parent that Leo will actually help them — that this is a real health tool, not a chatbot gimmick.

Meta title: AI Pet Health — Symptom Checks, Care Plans & Vet Escalation | Care Leo Meta description: Leo checks your pet's symptoms, builds a daily care plan, and tells you when it's time to see a vet. Personalized nutrition, behavior insights and smart reminders — built for dogs and cats. og:image: Leo mascot + phone mockup showing a live health score card


Section 1 — Hero
Layout: split. Left = copy. Right = phone mockup showing the Leo chat with a symptom check in progress and a Health Score ring.

Eyebrow: AI-Powered Pet Health

H1: Your Pet Can't Explain What Hurts. Leo Can.

Sub: Describe what you're seeing — Leo asks the right follow-up questions, tells you how urgent it is, and builds a care plan around your pet's breed, age and history.

Primary CTA: Start a Free Symptom Check Secondary CTA: See How Leo Works

Trust row under CTAs (icon + label + caption):

🩺 Vet-Reviewed Logic — Escalation rules built with practicing vets ⚡ Answers in Seconds — No appointment, no waiting room 🐾 Breed-Aware — 300+ dog & cat breeds 🔒 Private by Default — Your pet's data is never sold


Section 2 — The Care Loop (the core differentiator)
Layout: horizontal 3-step flow with connecting arrows. Each step is a card with a number, icon, title, body, and a small example.

H2: From "Something's Off" to a Clear Next Step

Sub: Most pet apps stop at information. Leo runs a full loop — check, plan, and escalate when it matters.

Step 01 — Symptom Check

Tell Leo what you're seeing in plain language: "He's been licking his paw all morning." Leo asks targeted follow-ups — duration, appetite, energy, any bleeding — the same triage questions a vet nurse would ask on the phone.

Output: a plain-English assessment with an urgency level — Monitor at Home, Book a Vet, or Urgent — Go Now.

Step 02 — Care Plan

Leo turns the assessment into a daily plan: what to feed, what to watch for, how long to monitor, which symptoms mean things are getting worse. The plan updates as you check in.

Output: a day-by-day schedule with feeding times, medication reminders, and a watchlist.

Step 03 — Vet Escalation

When symptoms cross the threshold, Leo doesn't hedge. It tells you clearly, hands you a symptom summary you can read out to the vet, and helps you book from inside the app.

Output: a one-page visit summary — timeline, symptoms, feeding changes, photos.

Closing line under the flow:

Every escalation rule is written against veterinary triage guidance and reviewed before it ships. Leo is built to send you to a vet early, not to keep you in the app.

Dev note: don't cut this line. "We'd rather send you to a vet than keep you in the app" is the single most trust-building sentence on the page.


Section 3 — What Leo Does Every Day
Layout: 2×3 card grid. Icon, title, 2-line body, and a "See it in action" text link that opens a short inline demo modal or GIF.

H2: Six Things Leo Handles So You Don't Have To

Card 1 — Breed & Body Detection

Snap a photo. Leo identifies the breed, estimates body condition score, and flags the health risks that breed is prone to — hip dysplasia in retrievers, breathing issues in flat-faced breeds, kidney concerns in older cats.

Card 2 — AI Nutrition Engine

Calorie targets calculated from real inputs — species, breed, weight, age, activity level, spay status, and any conditions. Leo tells you exactly how much to feed, not a vague range.

Card 3 — Behavior & Mood Analysis

Sudden hiding, pacing, aggression, or a change in sleep can be the first sign of pain. Leo tracks behavior patterns over time and tells you when a shift is worth a closer look.

Card 4 — Smart Reminders

Vaccinations, deworming, flea and tick, medication doses, weight check-ins. Timed to your pet's actual schedule, not a generic calendar.

Card 5 — Health Timeline

Every symptom check, weight entry, photo and vet visit in one chronological record. Export it as a PDF before an appointment.

Card 6 — Daily Check-ins

Leo asks how your pet is doing, learns from your answers, and quietly builds a picture of what "normal" looks like for your pet — so it can spot when normal changes.


Section 4 — How It Actually Works
Layout: dark or tinted band (visual break). Left = short numbered explanation. Right = simple architecture diagram: Your input → Pet profile & history → Care model → Safety layer → Response + escalation.

H2: Under the Hood

Sub: For the people who want to know what's actually running.

1. Your pet's profile is the context. Leo doesn't answer generic questions. Every response is conditioned on your pet's species, breed, age, weight, medical history, current diet, and everything you've logged before.

2. Structured tools, not free-form guessing. Leo doesn't just generate text — it calls dedicated functions to pull your pet's records, recalculate nutrition targets, set reminders, and write to the health timeline. That's why the answers stay consistent between sessions.

3. A safety layer sits on top. Red-flag symptoms — laboured breathing, seizure, bloat signs, suspected poisoning, prolonged vomiting — bypass the conversation entirely and trigger an immediate escalation card.

4. It remembers. Facts Leo learns about your pet get saved to the profile. Tell it once that your dog is allergic to chicken and it will never recommend a chicken-based food again.


Section 5 — What Leo Won't Do
Layout: bordered callout card, calm tone, not alarming. Slightly muted background.

H2: Where Leo Stops

Leo is a triage and care-planning tool, not a substitute for a veterinarian. It does not diagnose disease, prescribe medication, or read lab results. It's designed to help you decide whether and how urgently to see a vet — and to make that visit more useful when you get there.

In an emergency, go to a vet or an emergency clinic immediately. Leo will always tell you to.

Dev note: this section raises conversion, it doesn't lower it. Being honest about limits is what makes people trust the parts you do claim.


Section 6 — Privacy
Layout: compact 3-column icon row.

H2: Your Pet's Data Stays Yours

🔐 Never sold. We don't sell or share your pet's health data with advertisers, insurers, or third parties. 📤 Export anytime. Download your pet's full health record as a PDF whenever you want. 🗑️ Delete anytime. Remove a pet profile and its history is permanently deleted.

Link: Read our full Privacy Policy →


Section 7 — Free vs Care Leo+
Layout: 2-column comparison table. Highlight the paid column.

H2: How Much of Leo Is Free?

Sub: Symptom checks and basic care are free, forever. Care Leo+ unlocks the deeper tools.



Free
Care Leo+
Pet profile + breed detection
✓
✓
Symptom checks
✓
✓
Basic care reminders
✓
✓
AI Nutrition Engine
—
✓
Full care plans & daily check-ins
—
✓
Health timeline + PDF export
—
✓
Behavior analysis
—
✓
Priority vet booking
—
✓


CTA: Compare Care Leo+ Plans →

Dev note: pull plan names and prices from the same source as /subscription so they can never drift apart. A price that differs between two pages is the fastest way to lose a sale.


Section 8 — FAQ
Layout: accordion, 6 items.

Is Leo a replacement for my vet? No. Leo helps you decide when to see one and prepares you for the visit. For diagnosis, prescriptions and treatment, you need a licensed veterinarian.

Which pets does Leo support? Dogs and cats today, across 300+ breeds and mixed breeds. More species are in development.

How accurate is the breed detection? Leo identifies breed from a photo and will tell you when it isn't confident — including when a pet is clearly mixed. It's a starting point for risk profiling, not a DNA test.

What happens to my data if I cancel? Nothing is deleted automatically. Your pet's history stays available and exportable. You can delete it permanently at any time from your account.

Does Leo work offline? Reminders and your saved care plan work offline. Symptom checks need a connection.

Can I add more than one pet? Yes. Free accounts support one pet profile; Care Leo+ Family supports up to five.


Section 9 — Closing CTA
Layout: full-width gradient band.

H2: Start With One Question

Sub: Open Leo, describe what you're seeing, and get a straight answer in under a minute. No card required.

Primary CTA: Try Leo Free Secondary CTA: Explore Care Leo+

Micro-copy: Free forever plan · No credit card · Cancel anytime




2. Services — /services
Page goal: get a pet parent to book their first service without hesitating — and give good providers a reason to join.

Meta title: Vets, Walkers, Groomers & Pet Sitters Near You | Care Leo Services Meta description: Book vetted vets, dog walkers, groomers, trainers and sitters through Care Leo. Every provider is background-checked and rated. Book in the app, pay securely, covered by our care guarantee. og:image: provider card grid with rating badges


Section 1 — Hero
Layout: copy left, provider-card mockup right (a vet card with photo, rating, distance, next slot).

Eyebrow: Care Leo Services

H1: The Right Care, Booked in Two Taps.

Sub: Vets, walkers, groomers, trainers and sitters — all vetted, all rated by real Care Leo members, all bookable without a single phone call.

Search bar (functional, not decorative): What does your pet need? + ZIP code + Find Care

Quick chips under search: Vet Visit · Dog Walking · Grooming · Boarding · Training · Emergency

Trust row:

✅ Background-Checked — Every provider verified before listing ⭐ Member-Rated — Reviews only from completed bookings 💳 Pay in App — No cash, no awkward invoices 🛡️ Care Guarantee — We make it right if something goes wrong


Section 2 — Service Categories
Layout: 6 cards, 3×2. Each: illustration, title, one-line promise, "from" price, and a Browse → link.

H2: Every Kind of Care, One App

Veterinary Appointments

General checkups, vaccinations, dental, and follow-ups with licensed clinics near you. Bring your Leo health summary — your vet gets the full picture in seconds. From $45 · Same-day slots available

Dog Walking

Insured, GPS-tracked walks with photo updates. Book a one-off or set a recurring schedule. From $18 / walk

Grooming

Full groom, bath and brush, nail trim and de-shedding — at a salon or at your door. From $35

Boarding & Pet Sitting

Overnight stays and in-home sitting with vetted hosts. Daily photo and activity updates. From $30 / night

Training & Behavior

Certified trainers for puppy basics, leash work, reactivity and separation anxiety. In-person or virtual. From $60 / session

Emergency & Urgent Care

24/7 emergency clinics near you, with directions and open-now status. One tap from any Leo escalation. Availability varies by area


Section 3 — How Booking Works
Layout: 4-step horizontal timeline with icons.

H2: No Phone Tag. No Guesswork.

1. Tell us what you need — Pick a service and your ZIP. We show only providers who serve your area and your pet's species.

2. Compare on what matters — Real ratings from completed bookings, distance, price, next available slot, and specialities. No paid placement.

3. Book and pay in-app — Pick a slot, confirm, done. Your pet's profile and health summary go to the provider automatically.

4. Rate and re-book — Rate the visit, save your favourites, and re-book in one tap next time.


Section 4 — How We Vet Providers
Layout: checklist card, two columns. This is the section that converts skeptical users.

H2: Nobody Gets Listed Without Clearing This

☑ Identity verified — Government ID confirmed for every individual provider ☑ Licence and credentials checked — Vet licences, grooming certifications and trainer accreditations verified against issuing bodies ☑ Background screened — Criminal background check on all in-home and pet-handling providers ☑ Insurance confirmed — Active liability coverage required and re-checked annually ☑ Rating floor enforced — Providers who drop below 4.0 are reviewed; below 3.5 are removed ☑ Reviews are booking-gated — Only members who completed and paid for a booking can review. No anonymous reviews, ever.


Section 5 — Care Guarantee
Layout: single wide card, badge/shield visual.

H2: The Care Leo Guarantee

If a provider doesn't show, cancels late, or the service isn't what was described, tell us within 48 hours. We'll rebook you at no extra cost or refund you in full. If your pet is injured due to provider negligence, we'll help you file against their insurance and cover the gap up to your booking value.

Link: Read the full guarantee terms →


Section 6 — Connected to Leo
Layout: tinted band. Copy left, small flow diagram right: Leo escalation → Vet card → Booked → Visit summary back into health timeline.

H2: Booking That Knows Your Pet

Sub: This is the part other booking apps can't do.

When Leo escalates a symptom, it doesn't just tell you to see a vet — it filters for clinics that handle that issue, near you, with an open slot. Your symptom timeline, feeding log and photos travel with the booking. After the visit, the diagnosis and any prescriptions come back into your pet's health record, and Leo adjusts the care plan around them.

CTA: See how Leo works →

Dev note: this is the reason someone books through Care Leo instead of calling a clinic directly. Give it full visual weight.


Section 7 — Coverage
Layout: map or state grid + ZIP checker input.

H2: Available in Your Area?

Sub: We're expanding city by city so we can vet every provider properly.

Input: Enter your ZIP code → Check Availability

Result state (no coverage): We're not in your area yet — leave your email and you'll be first to know when we launch nearby.


Section 8 — For Providers
Layout: contrasting band, clearly a different audience.

H2: Are You a Vet, Walker, Groomer or Trainer?

Sub: Join Care Leo and get booked by pet parents who already know their pet's history.

Three benefits: 💼 Qualified bookings — Members arrive with a full health profile. No more guessing at intake. 📅 Fill your calendar — Set your availability, radius and rates. We handle discovery and scheduling. 💰 Get paid on time — Automatic payouts after every completed booking. No chasing invoices.

CTA: Apply as a Provider


Section 9 — FAQ
How do you choose which providers to show me? By distance, availability, rating and relevance to your pet. Providers cannot pay for higher placement.

What if I need to cancel? Free cancellation up to 24 hours before the booking. Inside 24 hours, the provider's cancellation policy applies — always shown before you confirm.

Can I use my own vet? Yes. Add your existing vet to your pet's profile, and Leo will prepare visit summaries for them even if the booking happens outside Care Leo.

Is my payment secure? Payments are processed by a PCI-compliant provider. Care Leo never stores your full card details.

Do Care Leo+ members get priority? Yes — priority access to booking slots and member pricing on selected services.


Section 10 — Closing CTA
H2: Care Your Pet Deserves, Without the Phone Calls

Primary CTA: Find Care Near You Secondary CTA: Join Care Leo+ for Priority Booking




3. Community — /community
Page goal: give people a reason to open the app on days they aren't buying anything — and somewhere to turn when they're worried at 2am.

Meta title: The Care Leo Community — Pet Parents, Real Advice, Real Support Meta description: Join thousands of dog and cat parents sharing advice, wins and worries. Breed groups, vet Q&As, lost pet alerts and monthly challenges — all inside Care Leo. og:image: collage of member posts + pet photos


Section 1 — Hero
Layout: copy left, live-feed mockup right (3 stacked post cards with pet photos, likes, replies).

Eyebrow: Care Leo Community

H1: Pet Parenting Is Easier When Nobody Does It Alone.

Sub: Ask the question you're embarrassed to ask. Post the win nobody else would understand. Find someone whose dog has exactly the same problem as yours.

Primary CTA: Join the Community Secondary CTA: Browse Posts

Live counters row (pull from real data — see note at the bottom of this doc):

Members · Posts this week · Questions answered · Breed groups


Section 2 — What's Inside
Layout: 6-card grid.

H2: More Than a Comment Section

The Feed

Photos, progress updates, questions and small wins from pet parents near you and around the world. Follow the pets you like, mute what you don't.

Breed & Species Groups

200+ groups — from Golden Retrievers to Bengal cats to senior-pet parents to first-time puppy owners. The advice actually applies to your pet.

Ask a Vet

Weekly live Q&A sessions with licensed veterinarians. Submit a question in advance or drop in live. Every session is archived and searchable.

Lost & Found

Post a lost pet and alert every Care Leo member within a 10-mile radius instantly. Sightings, photos and safe-return updates in one thread.

Monthly Challenges

Walk streaks, weight-goal check-ins, training milestones, adoption anniversaries. Join, track progress with your pet's profile, earn badges.

Expert Corner

Trainers, nutritionists and behaviourists posting practical breakdowns — not blog filler. Verified expert badges so you know who's actually qualified.


Section 3 — How It Works
Layout: 3-step, lightweight.

H2: Three Minutes to Your First Post

1. Create your pet's profile — Name, species, breed, a photo. That's it. 2. Join the groups that fit — We suggest groups based on your pet's breed, age and location. 3. Post, ask or just read — Lurking is completely fine. Most people start there.


Section 4 — House Rules
Layout: clean bordered card. Short, human, non-corporate.

H2: How We Keep This a Good Place

Be kind first. Someone asking a basic question is someone trying to do better by their pet. Treat them that way.

No medical diagnosis from strangers. Share your experience, not a prescription. For anything urgent, Leo and a vet come first.

No selling. No dropshipping, no MLM, no breeder ads, no unlicensed rehoming.

Real accounts only. One person, one account. Verified experts carry a badge — nobody else may claim credentials.

Reported posts are reviewed by a human within 24 hours. Moderation decisions can be appealed.

Link: Read the full Community Guidelines →

Dev note: a published, enforceable moderation policy is required for App Store review of any user-generated content feature. Don't ship the feed without this page.


Section 5 — Member Stories
Layout: 3 story cards — photo, pet name, member first name + city, 2–3 sentence story, outcome tag.

H2: What Happens Here

Content requirement: use real members with written consent, real photos, and first name + city only. Placeholder structure below — replace before launch, do not ship invented names.

[Pet name] · [Breed] [2–3 sentences in the member's own words about a specific problem and what the community helped with.] Tag: Found in 6 hours / Allergy solved / 12kg → 9kg


Section 6 — Meet the Experts
Layout: avatar row with name, credential, speciality.

H2: The People Answering Your Questions

Sub: Every expert badge on Care Leo is verified against a licence or accreditation body before it's issued.

Content requirement: real, contracted or partnered professionals only. Include credential (DVM, CPDT-KA, etc.), speciality and a link to their posts.


Section 7 — Recognition
Layout: badge grid.

H2: Earn Your Stripes

🏅 Helpful — Your answers get marked helpful by other members 🔥 Streak Keeper — Complete a monthly challenge with your pet 🧭 Guide — Welcome and answer new members in your first 90 days ❤️ Good Samaritan — Help reunite a lost pet with their family

Badges show on your profile and unlock member perks in the Care Leo store.


Section 8 — Closing CTA
H2: Your Pet's Best Days Start With Better Answers

Sub: Free to join. No pressure to post.

Primary CTA: Join the Community Secondary CTA: Download the App




Cross-page requirements
Navigation
All three pages get the standard header and footer. Add each to the footer sitemap columns (currently all 12 footer links are href="#" — fix as part of this work).
Internal linking (do this properly — it's most of the SEO win)
/ai-care → /services from the escalation section, → /subscription from the comparison table
/services → /ai-care from "Connected to Leo", → /subscription from priority booking
/community → /ai-care from "Ask a Vet", → /shop from badge perks
Homepage "AI-Powered Care" section → /ai-care
Homepage "Expert Care Nearby" → /services, "Join Pet Lovers" → /community
Structured data (schema.org)
/ai-care → FAQPage on the FAQ block, SoftwareApplication on the page
/services → Service per category, AggregateRating only if backed by real reviews
/community → FAQPage where applicable
Per-page technical checklist
Unique <title> and meta description (copy above)
og:title, og:description, og:image (currently missing site-wide)
Canonical tag
Added to sitemap.xml (doesn't exist yet — create it)
H1 appears exactly once
All images have alt text
Mobile: hero headline must not clip (same bug as the homepage "Save More. Care Better." heading)
Every CTA points to a real route — no href="#"
Analytics events to fire
ai_care_symptom_check_start, ai_care_plan_view, service_search, service_booking_start, service_booking_complete, community_join, community_first_post, provider_application_start

Four numbers tell you whether these pages are working: free → paid conversion, 30-day return rate, booking completion rate, and posts per active member. Instrument them from day one so you're improving the pages on evidence, not guesses.


Numbers that need a real source
A few figures in this copy are placeholders: member counts, "300+ breeds", "200+ groups", provider "from" prices, the homepage's "50k+ Happy Pets", and the product page's "1,842 reviews · 2.1k sold".

Wire each to real data or replace it with a claim you can back up. In the US, unsubstantiated review counts and testimonials are an FTC issue for e-commerce — and beyond the legal side, a customer who catches one inflated number stops believing the rest of the page.

Same for the pricing mismatch: the site shows $4.99 / $9.99 / $14.99 while other materials say $9.99 / $29.99. Pick the real numbers and make one source of truth feed every page.

