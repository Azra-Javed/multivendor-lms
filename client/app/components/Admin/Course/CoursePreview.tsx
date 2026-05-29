import { IoCheckmarkDoneOutline } from "react-icons/io5";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}: Props) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => setActive(active - 1);
  const createCourse = () => handleCourseCreate();

  return (
    <div className="space-y-8 pb-10">
      {/* Video player */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
        <CoursePlayer
          videoUrl={courseData?.demoUrl}
          title={courseData?.title}
        />
      </div>

      {/* Price + CTA */}
      <div
        className="rounded-xl border border-gray-200 dark:border-white/10
                      bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
      >
        <div className="h-1 w-full bg-teal-500" />
        <div className="p-5">
          {/* Price row */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white font-Poppins">
              {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
            </span>
            {courseData?.estimatedPrice && (
              <span className="text-base text-gray-400 dark:text-gray-500 line-through font-Poppins">
                ${courseData?.estimatedPrice}
              </span>
            )}
            {discountPercentagePrice && Number(discountPercentagePrice) > 0 && (
              <span className="text-sm font-semibold text-teal-500 font-Poppins">
                {discountPercentagePrice}% off
              </span>
            )}
          </div>

          {/* Buy button — disabled in preview */}
          <button
            disabled
            className="w-full py-2.5 rounded-lg text-sm font-semibold font-Poppins
                       bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500
                       cursor-not-allowed mb-4"
          >
            Buy Now ${courseData?.price} (Preview)
          </button>

          {/* Includes */}
          <div className="h-px bg-gray-100 dark:bg-white/10 mb-4" />
          <p
            className="text-xs font-semibold uppercase tracking-wider
                        text-gray-400 dark:text-gray-500 font-Poppins mb-3"
          >
            This course includes
          </p>
          <ul className="space-y-2">
            {[
              "Source code included",
              "Full lifetime access",
              "Certificate of completion",
              "Premium Support",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm
                                        text-gray-600 dark:text-gray-300 font-Poppins"
              >
                <IoCheckmarkDoneOutline className="w-4 h-4 text-teal-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-Poppins mb-2">
          {courseData?.name}
        </h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Ratings rating={0} />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
              0 Reviews
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
            0 Students
          </span>
        </div>

        {/* Benefits */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-3">
          What you will learn
        </h3>
        <div className="space-y-2 mb-6">
          {courseData?.benefits?.map((item: any, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <IoCheckmarkDoneOutline className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Prerequisites */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-3">
          Prerequisites
        </h3>
        <div className="space-y-2 mb-6">
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <IoCheckmarkDoneOutline className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-3">
          Course Details
        </h3>
        <p
          className="text-sm text-gray-600 dark:text-gray-300 font-Poppins
                      leading-relaxed whitespace-pre-line"
        >
          {courseData?.description}
        </p>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
        <button
          type="button"
          onClick={prevButton}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                     border border-gray-200 dark:border-white/10
                     text-gray-700 dark:text-gray-300
                     hover:border-teal-500 hover:text-teal-500
                     transition-all duration-200"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={createCourse}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                     bg-teal-500 hover:bg-teal-600 text-white
                     transition-colors duration-200"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
