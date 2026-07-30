"use client";

import { useState } from "react";
import { MapPin, Mail, Check } from "lucide-react";

export default function CoverageChecker() {
  const [zip, setZip] = useState("");
  const [checkedZip, setCheckedZip] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div className="rounded-3xl border border-[var(--brand-line)] bg-white p-6 sm:p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!zip.trim()) return;
          setCheckedZip(zip.trim());
          setJoined(false);
        }}
        className="brand-input-shell flex flex-col gap-2 rounded-3xl p-2 sm:flex-row sm:items-center sm:rounded-full"
      >
        <label className="flex flex-1 items-center gap-2 px-4 py-2">
          <MapPin size={18} className="shrink-0 text-[var(--brand-primary)]" />
          <span className="sr-only">Enter your ZIP code</span>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter your ZIP code"
            inputMode="numeric"
            className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
          />
        </label>
        <button
          type="submit"
          className="brand-primary-button shrink-0 rounded-full px-7 py-3 text-sm font-bold"
        >
          Check Availability
        </button>
      </form>

      {checkedZip && !joined && (
        <div className="mt-6 rounded-2xl bg-[var(--brand-surface-soft)] p-5">
          <p className="text-sm font-bold text-[var(--foreground)]">
            We&apos;re not in {checkedZip} yet — leave your email and you&apos;ll be first
            to know when we launch nearby.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              setJoined(true);
            }}
            className="brand-input-shell mt-4 flex flex-col gap-2 rounded-3xl p-2 sm:flex-row sm:items-center sm:rounded-full"
          >
            <label className="flex flex-1 items-center gap-2 px-4 py-2">
              <Mail size={18} className="shrink-0 text-[var(--brand-primary)]" />
              <span className="sr-only">Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
              />
            </label>
            <button
              type="submit"
              className="brand-secondary-button shrink-0 rounded-full px-6 py-3 text-sm font-bold"
            >
              Notify Me
            </button>
          </form>
        </div>
      )}

      {joined && (
        <p className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 p-5 text-sm font-bold text-emerald-700">
          <Check size={16} /> You&apos;re on the list for {checkedZip}. We&apos;ll email
          you the moment we launch nearby.
        </p>
      )}
    </div>
  );
}
