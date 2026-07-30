"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function NotFoundSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        router.push(term ? `/shop?search=${encodeURIComponent(term)}` : "/shop");
      }}
      className="brand-input-shell mx-auto flex max-w-xl items-center rounded-full p-1.5"
    >
      <label className="flex flex-1 items-center gap-2 px-4">
        <Search size={18} className="shrink-0 text-[var(--brand-primary)]" />
        <span className="sr-only">Search Care Leo</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, care topics, services…"
          className="w-full bg-transparent py-2.5 text-sm font-medium outline-none placeholder:text-gray-400"
        />
      </label>
      <button
        type="submit"
        className="brand-primary-button shrink-0 rounded-full px-6 py-2.5 text-sm font-bold"
      >
        Search
      </button>
    </form>
  );
}
