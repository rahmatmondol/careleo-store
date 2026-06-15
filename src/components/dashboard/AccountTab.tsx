"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Lock, Save, Camera } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

export default function AccountTab() {
  const { user } = useAuth();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U"
    : "U";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl">
      <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-6">Account Details</h2>
      
      <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 md:p-8 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white mb-6">Profile Information</h3>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 font-black text-3xl relative group">
              {initials}
              <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} />
              </button>
            </div>
            <button className="text-xs font-bold text-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)]">
              Change Photo
            </button>
          </div>
          
          <form className="flex-1 space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                  <input 
                    type="text" 
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                  <input 
                    type="text" 
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
                <input 
                  type="tel" 
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="brand-primary-button px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white mb-6">Change Password</h3>
        
        <form className="space-y-5 max-w-md" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">Current Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--brand-ink-soft)] dark:text-gray-400">New Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--brand-ink-soft)] opacity-70" />
              <input 
                type="password" 
                placeholder="Create new password"
                className="w-full border border-[var(--brand-line)] dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--foreground)] dark:text-white focus:outline-none focus:border-[var(--brand-primary)] focus:ring-1 focus:ring-[var(--brand-primary)] transition-all bg-[var(--background)] dark:bg-gray-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="brand-secondary-button w-full py-2.5 rounded-xl text-sm font-bold flex justify-center items-center gap-2">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}