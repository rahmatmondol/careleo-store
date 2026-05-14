"use client";

import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

const MOCK_ADDRESSES = [
  {
    id: 1,
    title: "Home",
    address: "123 Pawly Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    title: "Office",
    address: "456 Tech Avenue, Suite 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
    isDefault: false,
  }
];

export default function AddressesTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white">Saved Addresses</h2>
        <button className="brand-primary-button px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
          <Plus size={18} /> Add New Address
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ADDRESSES.map((addr) => (
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
              <h3 className="font-bold text-lg text-[var(--foreground)] dark:text-white">{addr.title}</h3>
            </div>
            
            <div className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 space-y-1 mb-6">
              <p>{addr.address}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
            </div>
            
            <div className="flex gap-3 pt-4 border-t border-[var(--brand-line)] dark:border-gray-800">
              <button className="flex-1 brand-secondary-button py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <Edit2 size={16} /> Edit
              </button>
              {!addr.isDefault && (
                <button className="px-4 py-2 rounded-xl text-[var(--brand-ink-soft)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}