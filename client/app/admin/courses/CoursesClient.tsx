"use client";

import CourseCard from "@/app/components/Course/CourseCard";
import Footer from "@/app/components/footer";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader/Loader";
import Heading from "@/app/utils/Heading";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const CoursesClient = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!data?.courses) return;

    let filtered = data.courses;

    if (category !== "All") {
      filtered = filtered.filter((item: any) => item.categories === category);
    }

    if (search) {
      filtered = filtered.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setCourses(filtered);
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  if (isLoading) return <Loader />;

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />

      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh] py-10">
        <Heading
          title="All Courses - E-Learning"
          description="Browse high quality courses to grow your skills."
          keywords="programming courses, web development, mern, react"
        />

        {/* Category Filter */}
        <div className="w-full flex flex-wrap gap-3 mt-5 justify-center 1000px:justify-start">
          <button
            onClick={() => setCategory("All")}
            className={`h-[36px] px-5 rounded-full text-sm font-medium transition-all
              ${
                category === "All"
                  ? "bg-teal-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-teal-500"
              }`}
          >
            All
          </button>

          {categories &&
            categories.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => setCategory(item.title)}
                className={`h-[36px] px-5 rounded-full text-sm font-medium transition-all
                  ${
                    category === item.title
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-teal-500"
                  }`}
              >
                {item.title}
              </button>
            ))}
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-Poppins">
              {search
                ? "No courses found for your search."
                : "No courses available in this category."}
            </p>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mt-12">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesClient;
