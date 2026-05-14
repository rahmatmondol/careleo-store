"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, ArrowLeft, Truck, MapPin, CheckCircle2, Clock, ChevronRight } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "ORD-8472",
    date: "May 10, 2026",
    status: "Delivered",
    total: 48.37,
    items: [
      { name: "Care Leo Salmon Recipe Adult Dog Food - 2kg", qty: 1, price: 24.99, img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300&q=80" },
      { name: "Greenies Original Dental Treats", qty: 1, price: 16.99, img: "https://images.unsplash.com/photo-1623366302587-bca23fc9e422?w=300&q=80" },
    ],
    address: "123 Pawly Street, Downtown, New York, NY 10001",
    tracking: "TRK123456789"
  },
  {
    id: "ORD-8499",
    date: "May 12, 2026",
    status: "Processing",
    total: 85.20,
    items: [
      { name: "Premium Cat Litter - 10kg", qty: 2, price: 35.00, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80" },
      { name: "Interactive Laser Toy", qty: 1, price: 15.20, img: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=300&q=80" },
    ],
    address: "123 Pawly Street, Downtown, New York, NY 10001",
    tracking: "Pending"
  }
];

export default function OrdersTab() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  if (selectedOrder) {
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
              <h2 className="text-xl font-black text-[var(--foreground)] dark:text-white">Order #{selectedOrder.id}</h2>
              <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 mt-1">Placed on {selectedOrder.date}</p>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold ${
              selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
            }`}>
              {selectedOrder.status === 'Delivered' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
              {selectedOrder.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[var(--foreground)] dark:text-white mb-4 flex items-center gap-2">
                <Package size={18} className="text-[var(--brand-primary)]" /> Items in your order
              </h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 relative shrink-0">
                      <Image src={item.img} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[var(--foreground)] dark:text-white line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-[var(--brand-ink-soft)] dark:text-gray-400 mt-1">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-[var(--foreground)] dark:text-white text-sm">
                      ${(item.qty * item.price).toFixed(2)}
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
                  Tracking Number: <span className="font-bold text-[var(--foreground)] dark:text-white">{selectedOrder.tracking}</span>
                </p>
              </div>
              <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900/50 rounded-xl p-4 border border-[var(--brand-line)] dark:border-gray-800">
                <h3 className="font-bold text-[var(--foreground)] dark:text-white mb-2 flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-[var(--brand-primary)]" /> Shipping Address
                </h3>
                <p className="text-sm text-[var(--brand-ink-soft)] dark:text-gray-300 leading-relaxed">
                  {selectedOrder.address}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[var(--brand-line)] dark:border-gray-800 flex justify-between items-center">
            <span className="font-bold text-[var(--foreground)] dark:text-white">Order Total</span>
            <span className="text-2xl font-black text-[var(--brand-primary)]">${selectedOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h2 className="text-2xl font-black text-[var(--foreground)] dark:text-white mb-6">Order History</h2>
      
      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-[var(--brand-surface)] dark:bg-gray-950 rounded-2xl border border-[var(--brand-line)] dark:border-gray-800 p-4 md:p-6 shadow-sm hover:border-[var(--brand-primary)]/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-orange-100 text-orange-500 dark:bg-orange-900/30'
                }`}>
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] dark:text-white text-base md:text-lg">{order.id}</h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[var(--brand-ink-soft)] dark:text-gray-400 mt-0.5">
                    <span>{order.date}</span>
                    <span>•</span>
                    <span>{order.items.length} Items</span>
                    <span>•</span>
                    <span className="font-bold text-[var(--foreground)] dark:text-white">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
                }`}>
                  {order.status}
                </span>
                
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="brand-secondary-button px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                >
                  View Details <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}