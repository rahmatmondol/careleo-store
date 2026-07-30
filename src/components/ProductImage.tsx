"use client";

import { useState } from "react";
import Image from "next/image";
import { Package } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Product imagery with a visible fallback.
 *
 * Catalogue images come from the media service and from supplier URLs, so a
 * host that isn't in next.config's `remotePatterns` (or a 404 upstream) used to
 * render an <img> that silently failed and left an empty box on the page. Here a
 * failed load swaps in a placeholder tile instead.
 */
export default function ProductImage({ src, alt, className, sizes, priority }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--brand-surface-soft)] text-gray-400"
      >
        <Package size={28} aria-hidden="true" />
        <span className="px-2 text-center text-[10px] font-bold uppercase tracking-widest">
          No photo yet
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
