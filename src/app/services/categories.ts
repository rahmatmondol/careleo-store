import {
  Stethoscope,
  PawPrint,
  Scissors,
  House,
  GraduationCap,
  Siren,
} from "lucide-react";

export type ServiceCategory = {
  key: string;
  chip: string;
  title: string;
  body: string;
  price: string;
  icon: typeof Stethoscope;
  keywords: string[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: "vet",
    chip: "Vet Visit",
    title: "Veterinary Appointments",
    body: "General checkups, vaccinations, dental, and follow-ups with licensed clinics near you. Bring your Leo health summary — your vet gets the full picture in seconds.",
    price: "From $45 · Same-day slots available",
    icon: Stethoscope,
    keywords: [
      "vet",
      "vet visit",
      "veterinary",
      "checkup",
      "vaccination",
      "dental",
      "clinic",
      "doctor",
    ],
  },
  {
    key: "walking",
    chip: "Dog Walking",
    title: "Dog Walking",
    body: "Insured, GPS-tracked walks with photo updates. Book a one-off or set a recurring schedule.",
    price: "From $18 / walk",
    icon: PawPrint,
    keywords: ["walk", "walking", "dog walking", "walker", "exercise"],
  },
  {
    key: "grooming",
    chip: "Grooming",
    title: "Grooming",
    body: "Full groom, bath and brush, nail trim and de-shedding — at a salon or at your door.",
    price: "From $35",
    icon: Scissors,
    keywords: ["groom", "grooming", "bath", "nail", "shedding", "salon", "haircut"],
  },
  {
    key: "boarding",
    chip: "Boarding",
    title: "Boarding & Pet Sitting",
    body: "Overnight stays and in-home sitting with vetted hosts. Daily photo and activity updates.",
    price: "From $30 / night",
    icon: House,
    keywords: ["board", "boarding", "sitting", "sitter", "overnight", "kennel"],
  },
  {
    key: "training",
    chip: "Training",
    title: "Training & Behavior",
    body: "Certified trainers for puppy basics, leash work, reactivity and separation anxiety. In-person or virtual.",
    price: "From $60 / session",
    icon: GraduationCap,
    keywords: [
      "train",
      "training",
      "trainer",
      "behavior",
      "behaviour",
      "puppy",
      "leash",
      "anxiety",
    ],
  },
  {
    key: "emergency",
    chip: "Emergency & Urgent Care",
    title: "Emergency & Urgent Care",
    body: "24/7 emergency clinics near you, with directions and open-now status. One tap from any Leo escalation.",
    price: "Availability varies by area",
    icon: Siren,
    keywords: ["emergency", "urgent", "urgent care", "poison", "injury"],
  },
];

/** Match a free-text query against the category list. Empty query -> everything. */
export function matchCategories(query: string): ServiceCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return SERVICE_CATEGORIES;
  const hits = SERVICE_CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.chip.toLowerCase().includes(q) ||
      c.keywords.some((k) => q.includes(k) || k.includes(q)),
  );
  return hits.length > 0 ? hits : SERVICE_CATEGORIES;
}

export const SERVICE_CHIPS = [
  "Vet Visit",
  "Dog Walking",
  "Grooming",
  "Boarding",
  "Training",
  "Emergency",
];
