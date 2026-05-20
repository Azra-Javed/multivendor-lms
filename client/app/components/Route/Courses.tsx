import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { FiBook } from "react-icons/fi";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data) setCourses(data?.courses);
  }, [data]);

  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto pb-20">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-500">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Browse
          <span className="w-5 h-px bg-teal-500 inline-block" />
        </span>

        <h2 className="mt-4 text-3xl sm:text-4xl 1000px:text-5xl font-semibold leading-tight text-gray-900 dark:text-white font-Poppins">
          Expand Your Career <span className="text-teal-500">Opportunity</span>
          <br />
          With Our Courses
        </h2>

        <p className="mt-5 text-base text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
          Explore our courses to enhance your skills and advance your career in
          the tech world.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mt-12 mb-10">
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {courses.length > 0
            ? `${courses.length} courses available`
            : "All Courses"}
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800 overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-gray-100 dark:bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-px bg-gray-100 dark:bg-white/10" />
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-16" />
                  <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course grid */}
      {!isLoading && courses.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4">
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
            <FiBook className="w-7 h-7 text-teal-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
            No courses yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
            Check back soon — new courses are on the way!
          </p>
        </div>
      )}
    </section>
  );
};

export default Courses;
