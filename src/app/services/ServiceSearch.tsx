"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { SERVICE_CHIPS } from "./categories";

type Props = {
  initialService?: string;
  initialZip?: string;
};

export default function ServiceSearch({ initialService = "", initialZip = "" }: Props) {
  const router = useRouter();
  const [need, setNeed] = useState(initialService);
  const [zip, setZip] = useState(initialZip);

  const go = (service: string, zipCode: string) => {
    const params = new URLSearchParams();
    if (service.trim()) params.set("service", service.trim());
    if (zipCode.trim()) params.set("zip", zipCode.trim());
    const qs = params.toString();
    router.push(`/services${qs ? `?${qs}` : ""}#service-categories`, { scroll: true });
  };

  return (
    <div className="mt-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(need, zip);
        }}
        className="brand-input-shell flex flex-col gap-2 rounded-3xl p-2 sm:flex-row sm:items-center sm:rounded-full"
      >
        <label className="flex flex-1 items-center gap-2 px-4 py-2">
          <Search size={18} className="shrink-0 text-[var(--brand-primary)]" />
          <span className="sr-only">What does your pet need?</span>
          <input
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="What does your pet need?"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
          />
        </label>

        <span
          aria-hidden="true"
          className="hidden h-8 w-px bg-[var(--brand-line)] sm:block"
        />

        <label className="flex items-center gap-2 px-4 py-2 sm:w-40">
          <MapPin size={18} className="shrink-0 text-[var(--brand-primary)]" />
          <span className="sr-only">ZIP code</span>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP code"
            inputMode="numeric"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
          />
        </label>

        <button
          type="submit"
          className="brand-primary-button shrink-0 rounded-full px-7 py-3 text-sm font-bold"
        >
          Find Care
        </button>
      </form>

      <ul className="mt-4 flex flex-wrap gap-2">
        {SERVICE_CHIPS.map((chip) => (
          <li key={chip}>
            <button
              type="button"
              onClick={() => {
                setNeed(chip);
                go(chip, zip);
              }}
              className="brand-chip rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-[var(--brand-primary)] hover:text-white"
            >
              {chip}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
