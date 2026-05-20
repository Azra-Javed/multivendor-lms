import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi2";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard = ({ item, isProfile }: Props) => {
  const isFree = item.price === 0;

  // Only show a discount badge if estimatedPrice exists and is actually higher than the current price
  const hasDiscount =
    !isFree && item.estimatedPrice && item.estimatedPrice > item.price;

  // e.g. estimatedPrice = 100, price = 70 → discountPercent = 30
  const discountPercent = hasDiscount
    ? Math.round(
        ((item.estimatedPrice - item.price) / item.estimatedPrice) * 100,
      )
    : 0;

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}
      className="group block"
    >
      <div
        className="relative flex flex-col h-full rounded-xl overflow-hidden
                   border border-gray-200 dark:border-white/10
                   bg-white dark:bg-slate-800
                   shadow-sm hover:shadow-lg
                   transition-all duration-300 hover:-translate-y-1"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-slate-700">
          <Image
            src={item?.thumbnail?.url}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={item.name}
          />

          {/* Free badge */}
          {isFree && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500 text-white">
              Free
            </span>
          )}

          {/* Discount badge — e.g. "30% OFF" */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-500 text-white">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          {/* Course name */}
          <h2
            className="font-Poppins text-[15px] font-semibold leading-snug
                       text-gray-900 dark:text-white
                       line-clamp-2 mb-3
                       group-hover:text-teal-500 dark:group-hover:text-teal-400
                       transition-colors duration-200"
          >
            {item.name}
          </h2>

          {/* Ratings + students */}
          <div className="flex items-center justify-between mb-4">
            <Ratings rating={item.ratings} />
            <div
              className={`flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400
                          ${isProfile ? "hidden 800px:flex" : "flex"}`}
            >
              <HiOutlineUsers className="w-4 h-4" />
              <span>{item.purchased} students</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 dark:bg-white/10 mb-4" />

          {/* Price + lectures */}
          <div className="flex items-center justify-between mt-auto">
            {/* Price block */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {isFree ? "Free" : `$${item.price}`}
              </span>
              {/* Crossed-out original price — only shown when there's an actual discount */}
              {hasDiscount && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                  ${item.estimatedPrice}
                </span>
              )}
            </div>

            {/* Lectures */}
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <AiOutlineUnorderedList className="w-4 h-4" />
              <span>{item.courseData?.length} lectures</span>
            </div>
          </div>
        </div>

        {/* Bottom teal accent bar — appears on hover */}
        <div
          className="h-[3px] w-0 bg-teal-500
                     group-hover:w-full
                     transition-all duration-300 ease-in-out"
        />
      </div>
    </Link>
  );
};

export default CourseCard;
