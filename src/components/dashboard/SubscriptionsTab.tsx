"use client";

import { useEffect, useState } from "react";
import { Sparkles, Calendar, Package, RefreshCw } from "lucide-react";

type Subscription = {
  id: string;
  productId: string;
  frequencyDays: number;
  nextOrderDate: string | null;
  isActive: boolean;
};

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Not scheduled";

export default function SubscriptionsTab() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/subscriptions")
      .then((r) => r.json())
      .then((json) => setSubscriptions(Array.isArray(json?.subscriptions) ? json.subscriptions : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const cancel = async (id: string) => {
    await fetch(`/api/subscriptions/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-6">Care Leo+ Subscription</h2>

      {loading ? (
        <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">Loading subscriptions...</p>
      ) : subscriptions.length === 0 ? (
        <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-10 text-center shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-bold mb-4">
            <Sparkles size={14} /> No active subscriptions
          </div>
          <p className="text-[var(--brand-ink-soft)] dark:text-gray-400 max-w-md mx-auto">
            Subscribe to your favorite products and save 20% with free express delivery on every order.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-surface-soft)] dark:bg-gray-900 flex items-center justify-center text-[var(--brand-primary)] shrink-0">
                    <Package size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[var(--foreground)] dark:text-white">Subscription #{sub.id.slice(0, 8)}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sub.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30" : "bg-gray-100 text-gray-600 dark:bg-gray-800"}`}>
                        {sub.isActive ? "Active" : "Paused"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--brand-ink-soft)] dark:text-gray-400">
                      <span className="flex items-center gap-1"><RefreshCw size={12} /> Every {sub.frequencyDays} days</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> Next: {formatDate(sub.nextOrderDate)}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => cancel(sub.id)} className="text-sm font-bold text-red-500 hover:text-red-600 px-4 py-2">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
