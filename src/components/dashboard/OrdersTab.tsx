"use client";

import { useEffect, useState } from "react";
import { Package, ArrowLeft, Truck, MapPin, CheckCircle2, Clock, ChevronRight } from "lucide-react";

type OrderItem = { id?: string; productName: string; quantity: number; price: number | string };
type Order = {
  id: string;
  totalAmount: number | string;
  status: string;
  shippingAddress?: string | null;
  createdAt: string;
  items?: OrderItem[];
};

const formatDate = (value: string) =>
  value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((json) => setOrders(Array.isArray(json?.orders) ? json.orders : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openOrder = async (order: Order) => {
    setSelectedOrder(order);
    try {
      const res = await fetch(`/api/orders/${order.id}`);
      const json = await res.json();
      if (json?.order) setSelectedOrder({ ...json.order, items: json.items ?? json.order.items ?? [] });
    } catch {
      // keep summary view
    }
  };

  if (selectedOrder) {
    const isDelivered = selectedOrder.status === "DELIVERED";
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={() => setSelectedOrder(null)}
          className="flex items-center gap-2 text-sm font-bold text-[var(--brand-ink-soft)] hover:text-[var(--brand-primary)] transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Orders
        </button>

        <div className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--brand-line)] dark:border-gray-800">
            <div>
              <h2 className="text-xl font-black text-[var(--foreground)] dark:text-white">Order #{selectedOrder.id.slice(0, 8)}</h2>
              <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 mt-1">Placed on {formatDate(selectedOrder.createdAt)}</p>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
              isDelivered ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
            }`}>
              {isDelivered ? <CheckCircle2 size={16} /> : <Clock size={16} />}
              {selectedOrder.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[var(--foreground)] dark:text-white mb-4 flex items-center gap-2">
                <Package size={18} className="text-[var(--brand-primary)]" /> Items in your order
              </h3>
              <div className="space-y-4">
                {(selectedOrder.items ?? []).map((item, i) => (
                  <div key={item.id ?? i} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center shrink-0">
                      <Package size={24} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[var(--foreground)] dark:text-white line-clamp-2">{item.productName}</h4>
                      <p className="text-xs text-[var(--brand-ink-soft)] dark:text-gray-400 mt-1">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-[var(--foreground)] dark:text-white text-sm">
                      ${(item.quantity * Number(item.price)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 rounded-xl p-4 border border-[var(--brand-line)] dark:border-gray-800">
                <h3 className="font-bold text-[var(--foreground)] dark:text-white mb-2 flex items-center gap-2 text-sm">
                  <Truck size={16} className="text-[var(--brand-primary)]" /> Delivery Information
                </h3>
                <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-300">
                  Status: <span className="font-bold text-[var(--foreground)] dark:text-white">{selectedOrder.status}</span>
                </p>
              </div>
              <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 rounded-xl p-4 border border-[var(--brand-line)] dark:border-gray-800">
                <h3 className="font-bold text-[var(--foreground)] dark:text-white mb-2 flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-[var(--brand-primary)]" /> Shipping Address
                </h3>
                <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-300 leading-relaxed">
                  {selectedOrder.shippingAddress || "No address on file"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[var(--brand-line)] dark:border-gray-800 flex justify-between items-center">
            <span className="font-bold text-[var(--foreground)] dark:text-white">Order Total</span>
            <span className="text-2xl font-black text-[var(--brand-primary)]">${Number(selectedOrder.totalAmount).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-6">Order History</h2>
      
      <div className="space-y-4">
        {loading ? (
          <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-[var(--brand-ink-soft)] dark:text-gray-400">You have no orders yet.</p>
        ) : (
          orders.map((order) => {
            const isDelivered = order.status === "DELIVERED";
            return (
              <div key={order.id} className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-4 md:p-6 shadow-sm hover:border-[var(--brand-primary)]/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isDelivered ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-orange-100 text-orange-500 dark:bg-orange-900/30'
                    }`}>
                      <Package size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground)] dark:text-white text-base md:text-lg">#{order.id.slice(0, 8)}</h3>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 mt-0.5">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>•</span>
                        <span className="font-bold text-[var(--foreground)] dark:text-white">${Number(order.totalAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isDelivered ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
                    }`}>
                      {order.status}
                    </span>
                    
                    <button 
                      onClick={() => openOrder(order)}
                      className="brand-secondary-button px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                    >
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
