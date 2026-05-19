import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data) setCourses(data?.courses);
  }, [data]);

  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto pb-20">
      {/* Section heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h2
          className="font-Poppins font-semibold text-3xl sm:text-4xl 1000px:text-5xl
                     leading-tight text-gray-900 dark:text-white tracking-tight"
        >
          Expand Your Career <span className="text-teal-500">Opportunity</span>
          <br />
          With Our Courses
        </h2>

        <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 font-Poppins">
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800 overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-gray-200 dark:bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
                <div className="h-px bg-gray-100 dark:bg-white/10" />
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-16" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course grid */}
      {!isLoading && courses.length > 0 && (
        <div
          className="grid grid-cols-1 gap-5
                     md:grid-cols-2 md:gap-6
                     lg:grid-cols-3 lg:gap-6
                     1500px:grid-cols-4 1500px:gap-7"
        >
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && courses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-Poppins">
            No courses available yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
};

export default Courses;
