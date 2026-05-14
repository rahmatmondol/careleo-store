"use client";

import { useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import ReviewCard, { ReviewCardProps } from "./ReviewCard";

type ProductReviewsProps = {
  reviews: ReviewCardProps[];
  averageRating: number;
  totalReviews: number;
};

export default function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const reviewSliderRef = useRef<any>(null);

  const handleReviewPrev = useCallback(() => {
    if (!reviewSliderRef.current) return;
    reviewSliderRef.current.swiper.slidePrev();
  }, []);

  const handleReviewNext = useCallback(() => {
    if (!reviewSliderRef.current) return;
    reviewSliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 rounded-[32px] p-6 sm:p-8 lg:p-10 border border-gray-100 dark:border-gray-800 mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i <= Math.round(averageRating) ? "currentColor" : "none"}
                  className={
                    i > Math.round(averageRating)
                      ? "text-gray-300 dark:text-gray-600"
                      : ""
                  }
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {averageRating} out of 5{" "}
              <span className="text-gray-500 font-medium">
                ({totalReviews.toLocaleString()} reviews)
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-2">
            <button
              onClick={handleReviewPrev}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-all bg-white dark:bg-gray-800"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleReviewNext}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-all bg-white dark:bg-gray-800"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-full font-bold text-sm text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white transition-colors w-full sm:w-auto text-center hover:bg-gray-50 dark:hover:bg-gray-800">
            Write a review
          </button>
        </div>
      </div>

      <div className="-mx-6 sm:mx-0 px-6 sm:px-0">
        <Swiper
          ref={reviewSliderRef}
          modules={[Navigation, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.1}
          freeMode={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="pb-2 !px-0"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <ReviewCard {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 text-center lg:hidden">
        <button
          onClick={handleReviewNext}
          className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto hover:bg-[var(--brand-primary)] hover:text-white hover:border-[var(--brand-primary)] transition-all text-gray-500"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
