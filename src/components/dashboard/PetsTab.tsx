"use client";

import { Heart, Plus, Edit2, Trash2 } from "lucide-react";

const MOCK_PETS = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 Years",
    weight: "28 kg",
    emoji: "🐶",
    bg: "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    age: "1 Year",
    weight: "4.5 kg",
    emoji: "🐱",
    bg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
  }
];

export default function PetsTab() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white">My Pets</h2>
        <button className="brand-primary-button px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
          <Plus size={18} /> Add New Pet
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_PETS.map((pet) => (
          <div key={pet.id} className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 shadow-sm relative overflow-hidden group">
            
            {/* Decorative background blur */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-60 ${pet.bg.split(' ')[0]}`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${pet.bg}`}>
                  {pet.emoji}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-[var(--brand-ink-soft)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-[var(--brand-ink-soft)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-[var(--foreground)] dark:text-white mb-1">{pet.name}</h3>
              <p className="text-sm font-medium text-[var(--brand-ink-soft)] dark:text-gray-400 mb-6">{pet.breed}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 p-3 rounded-xl border border-[var(--brand-line)] dark:border-gray-800">
                  <div className="text-[10px] font-bold text-[var(--brand-ink-soft)] uppercase tracking-wider mb-1">Age</div>
                  <div className="font-bold text-[var(--foreground)] dark:text-white">{pet.age}</div>
                </div>
                <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 p-3 rounded-xl border border-[var(--brand-line)] dark:border-gray-800">
                  <div className="text-[10px] font-bold text-[var(--brand-ink-soft)] uppercase tracking-wider mb-1">Weight</div>
                  <div className="font-bold text-[var(--foreground)] dark:text-white">{pet.weight}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}