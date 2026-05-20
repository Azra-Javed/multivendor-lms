"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Stars from "./Stars";

export type ReviewItem = {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
  rating: number;
  tag: string;
};

// ─── Featured (large) card ───────────────────────────────────────────────────

type FeaturedReviewCardProps = {
  item: ReviewItem;
  fading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export const FeaturedReviewCard = ({
  item,
  fading,
  onPrev,
  onNext,
}: FeaturedReviewCardProps) => (
  <div
    className="relative rounded-xl border border-gray-200 dark:border-white/10
               bg-white dark:bg-slate-800 shadow-sm overflow-hidden"
    style={{
      opacity: fading ? 0 : 1,
      transform: fading ? "translateY(10px)" : "translateY(0)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}
  >
    {/* Teal top bar */}
    <div className="h-1 w-full bg-teal-500" />

    <div className="p-10 1000px:p-12 min-h-[460px] flex flex-col">
      {/* Tag */}
      <span
        className="inline-flex w-fit items-center px-3 py-1 rounded-md text-xs font-medium
                   bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-6"
      >
        {item.tag}
      </span>

      {/* Quote icon */}
      <BiSolidQuoteAltLeft className="text-teal-500/30 w-10 h-10 mb-4" />

      {/* Comment */}
      <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed flex-1">
        "{item.comment}"
      </p>

      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10 flex items-center justify-between flex-wrap gap-4">
        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/30"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {item.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.profession}
            </p>
          </div>
        </div>
        <Stars count={item.rating} />
      </div>
    </div>

    {/* Nav controls — bottom right */}
    <div className="absolute bottom-6 right-6 flex items-center gap-2">
      <button
        onClick={onPrev}
        className="w-9 h-9 rounded-md border border-gray-200 dark:border-white/10
                   bg-white dark:bg-slate-700 flex items-center justify-center
                   text-gray-600 dark:text-gray-300
                   hover:bg-teal-500 hover:text-white hover:border-teal-500
                   transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onNext}
        className="w-9 h-9 rounded-md border border-gray-200 dark:border-white/10
                   bg-white dark:bg-slate-700 flex items-center justify-center
                   text-gray-600 dark:text-gray-300
                   hover:bg-teal-500 hover:text-white hover:border-teal-500
                   transition-all duration-200"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// ─── Side (compact) card ─────────────────────────────────────────────────────

type SideReviewCardProps = {
  item: ReviewItem;
  highlighted?: boolean;
  onClick: () => void;
};

export const SideReviewCard = ({
  item,
  highlighted = false,
  onClick,
}: SideReviewCardProps) => (
  <div
    onClick={onClick}
    className={`group relative rounded-xl border cursor-pointer
                bg-white dark:bg-slate-800
                transition-all duration-300 hover:-translate-y-0.5
                ${
                  highlighted
                    ? "border-teal-500/40 shadow-md"
                    : "border-gray-200 dark:border-white/10 shadow-sm hover:border-teal-500/30"
                }`}
  >
    {/* Left accent bar */}
    <div
      className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-teal-500
                   transition-opacity duration-300
                   ${highlighted ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
    />

    <div className="p-5 pl-6">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-white/10"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
            {item.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
            {item.profession}
          </p>
        </div>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-md
                     bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0"
        >
          {item.tag}
        </span>
      </div>

      {/* Comment */}
      <p
        className={`text-sm leading-relaxed text-gray-600 dark:text-gray-300
                    ${highlighted ? "line-clamp-3" : "line-clamp-2"}`}
      >
        "{item.comment}"
      </p>

      {highlighted && (
        <div className="mt-3">
          <Stars count={item.rating} />
        </div>
      )}
    </div>
  </div>
);
