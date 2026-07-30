import React from "react";
import { ShieldCheck, CheckCircle2, Truck, Bot, Heart } from "lucide-react";

export default function TrustBadges() {
  return (
    <section className="border-y border-gray-100 bg-white py-7 sm:py-8">
      <div className="mx-auto max-w-[var(--container-width)] px-4 sm:px-6">
        {/* `justify-between` on a wrapping flex row stranded the last badge on its
            own line with a huge gap on phones — a grid keeps the rhythm even. */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-6 lg:flex lg:justify-between">
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
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="shrink-0 text-gray-400">{icon}</div>
      <div className="min-w-0">
        <p className="text-[13px] font-black leading-snug text-gray-900 sm:text-sm">{title}</p>
        <p className="text-[11px] font-medium leading-snug text-gray-500 sm:text-xs">{desc}</p>
      </div>
    </div>
  );
}
