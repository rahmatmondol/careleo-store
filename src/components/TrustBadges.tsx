import React from "react";
import { ShieldCheck, CheckCircle2, Truck, Bot, Heart } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-[var(--container-width)] px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <TrustBadge icon={<ShieldCheck />} title="Vet Approved" desc="Trusted by experts" />
          <TrustBadge icon={<CheckCircle2 />} title="Secure Payments" desc="100% safe & secure" />
          <TrustBadge icon={<Truck />} title="Fast Delivery" desc="Quick & reliable" />
          <TrustBadge icon={<Bot />} title="24/7 AI Assistant" desc="Always here to help" />
          <TrustBadge icon={<Heart />} title="Happiness Guarantee" desc="Love it or get help" />
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-sm font-black text-gray-900">{title}</p>
        <p className="text-xs font-medium text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
