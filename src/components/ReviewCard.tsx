import React from "react";
import { Star, Check, Camera } from "lucide-react";

export type ReviewCardProps = {
  name: string;
  rating: number;
  timeAgo: string;
  content: string;
  hasImage?: boolean;
};

export default function ReviewCard({
  name,
  rating,
  timeAgo,
  content,
  hasImage = true,
}: ReviewCardProps) {
  return (
    <div className="bg-[var(--brand-surface-soft)] dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow h-full">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="font-black text-gray-900 dark:text-white">{name}</h4>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Check size={10} /> Verified Purchase
        </span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={12}
              fill={i <= rating ? "currentColor" : "none"}
              className={i > rating ? "text-gray-300 dark:text-gray-600" : ""}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-gray-500">{timeAgo}</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-4">
        {content}
      </p>
      {hasImage && (
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
          <Camera size={24} />
        </div>
      )}
    </div>
  );
}
