"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrdersTab from "@/components/dashboard/OrdersTab";
import SubscriptionsTab from "@/components/dashboard/SubscriptionsTab";
import PetsTab from "@/components/dashboard/PetsTab";
import AddressesTab from "@/components/dashboard/AddressesTab";
import AccountTab from "@/components/dashboard/AccountTab";
import { useAuth } from "@/lib/useAuth";
import { 
  LayoutDashboard, 
  Package, 
  RefreshCw, 
  Heart, 
  MapPin, 
  User, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Clock
} from "lucide-react";

type Order = {
  id: string;
  totalAmount: number | string;
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((json) => setOrders(Array.isArray(json?.orders) ? json.orders : []))
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "Guest";
  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U"
    : "U";

  const formatDate = (value: string) =>
    value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "subscriptions", label: "Care Leo+ Subscription", icon: RefreshCw },
    { id: "pets", label: "My Pets", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "account", label: "Account Details", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-gray-900 transition-colors duration-300 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 pt-28">
        
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-[var(--foreground)] dark:text-white mb-2">
            My Account
          </h1>
          <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">
            Manage your orders, subscriptions, and pet profiles.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0">
            <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 overflow-hidden sticky top-32">
              <div className="p-6 border-b border-[var(--brand-line)] dark:border-gray-800 bg-[var(--brand-surface-soft)] dark:bg-gray-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 font-black text-xl shrink-0">
                    {initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--foreground)] dark:text-white">{fullName}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Sparkles size={12} className="text-orange-500" />
                      <span className="text-xs font-bold text-orange-500">Care Leo+ Member</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <nav className="p-3 flex flex-col gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-xl transition-all text-sm font-semibold ${
                        isActive 
                          ? "bg-[var(--brand-primary)] text-white shadow-md shadow-[var(--brand-shadow)]" 
                          : "text-[var(--brand-ink-soft)] dark:text-gray-400 hover:bg-[var(--brand-surface-soft)] dark:hover:bg-gray-900 hover:text-[var(--brand-primary)] dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "opacity-70"} />
                        {item.label}
                      </div>
                      {isActive && <ChevronRight size={16} className="text-white opacity-80" />}
                    </button>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-[var(--brand-line)] dark:border-gray-800">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                  <LogOut size={18} className="opacity-70" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === "dashboard" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Welcome & Stats Banner */}
                <div className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-[var(--brand-shadow)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black mb-2">Hello, {user?.firstName ?? "there"}! 👋</h2>
                    <p className="text-white/80 mb-6 max-w-md">Your Care Leo+ subscription is active. You are saving 20% on all eligible orders and enjoying free shipping.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Total Orders</div>
                        <div className="text-2xl font-black">{orders.length}</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Points Earned</div>
                        <div className="text-2xl font-black">450</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hidden md:block">
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Saved</div>
                        <div className="text-2xl font-black">$124.50</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hidden md:block">
                        <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Pets</div>
                        <div className="text-2xl font-black">2</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid for Secondary Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg text-[var(--foreground)] dark:text-white">Recent Orders</h3>
                      <button onClick={() => setActiveTab("orders")} className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">View All</button>
                    </div>
                    
                    <div className="space-y-4">
                      {orders.length === 0 ? (
                        <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 py-4">No orders yet.</p>
                      ) : (
                        orders.slice(0, 3).map((order, idx) => {
                          const delivered = order.status === "DELIVERED";
                          return (
                            <div key={order.id} className={`flex items-center gap-4 ${idx < Math.min(orders.length, 3) - 1 ? "pb-4 border-b border-[var(--brand-line)] dark:border-gray-800" : ""}`}>
                              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center shrink-0">
                                {delivered ? <Package size={20} className="text-gray-500" /> : <Clock size={20} className="text-orange-500" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-sm text-[var(--foreground)] dark:text-white truncate">Order #{order.id.slice(0, 8)}</span>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${delivered ? "text-green-600 bg-green-100 dark:bg-green-900/30" : "text-orange-600 bg-orange-100 dark:bg-orange-900/30"}`}>{order.status}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-[var(--brand-ink-soft)] dark:text-gray-400">
                                  <span>{formatDate(order.createdAt)}</span>
                                  <span className="font-semibold text-[var(--foreground)] dark:text-gray-300">${Number(order.totalAmount).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* My Pets */}
                  <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-lg text-[var(--foreground)] dark:text-white">My Pets</h3>
                      <button onClick={() => setActiveTab("pets")} className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">Manage</button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Pet 1 */}
                      <div className="flex items-center gap-4 p-3 rounded-xl border border-[var(--brand-line)] dark:border-gray-800 bg-[var(--brand-surface-soft)] dark:bg-gray-900/50">
                        <div className="w-12 h-12 rounded-full bg-orange-200 dark:bg-orange-900/40 flex items-center justify-center shrink-0 text-xl">
                          🐶
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] dark:text-white text-sm">Max</h4>
                          <p className="text-xs text-[var(--brand-ink-soft)] dark:text-gray-400">Golden Retriever • 3 Years</p>
                        </div>
                      </div>
                      
                      {/* Pet 2 */}
                      <div className="flex items-center gap-4 p-3 rounded-xl border border-[var(--brand-line)] dark:border-gray-800 bg-[var(--brand-surface-soft)] dark:bg-gray-900/50">
                        <div className="w-12 h-12 rounded-full bg-purple-200 dark:bg-purple-900/40 flex items-center justify-center shrink-0 text-xl">
                          🐱
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[var(--foreground)] dark:text-white text-sm">Luna</h4>
                          <p className="text-xs text-[var(--brand-ink-soft)] dark:text-gray-400">Persian Cat • 1 Year</p>
                        </div>
                      </div>

                      <button className="w-full py-2.5 border-2 border-dashed border-[var(--brand-line)] dark:border-gray-700 rounded-xl text-sm font-bold text-[var(--brand-ink-soft)] dark:text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2">
                        + Add Another Pet
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Other Tabs Rendering */}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "subscriptions" && <SubscriptionsTab />}
            {activeTab === "pets" && <PetsTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "account" && <AccountTab />}
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}