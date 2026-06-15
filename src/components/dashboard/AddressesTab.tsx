"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus, Trash2, CheckCircle2 } from "lucide-react";

type Address = {
  id: string;
  label?: string | null;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  isDefault: boolean;
};

export default function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/addresses")
      .then((r) => r.json())
      .then((json) => setAddresses(Array.isArray(json?.addresses) ? json.addresses : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const removeAddress = async (id: string) => {
    await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white">Saved Addresses</h2>
        <button className="brand-primary-button px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
          <Plus size={18} /> Add New Address
        </button>
      </div>

      {loading ? (
        <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">No saved addresses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className={`bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border p-6 shadow-sm relative transition-all ${
              addr.isDefault 
                ? 'border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]' 
                : 'border-[var(--brand-line)] dark:border-gray-800 hover:border-[var(--brand-primary)]/50'
            }`}>
              
              {addr.isDefault && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-[var(--brand-primary)] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle2 size={12} /> Default
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--brand-surface-soft)] dark:bg-gray-900 flex items-center justify-center text-[var(--brand-primary)] shrink-0">
                  <MapPin size={18} />
                </div>
                <h3 className="font-bold text-lg text-[var(--foreground)] dark:text-white">{addr.label || addr.fullName}</h3>
              </div>
              
              <div className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 space-y-1 mb-6">
                <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                <p>{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p className="text-xs">{addr.phone}</p>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-[var(--brand-line)] dark:border-gray-800">
                {!addr.isDefault && (
                  <button onClick={() => removeAddress(addr.id)} className="px-4 py-2 rounded-xl text-[var(--brand-ink-soft)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
