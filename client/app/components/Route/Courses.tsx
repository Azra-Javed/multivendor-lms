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
    <div className="w-[90%] 800px:w-[80%] m-auto py-12">
      <h1 className="text-center font-Poppins font-semibold text-3xl sm:text-4xl 1000px:text-5xl leading-tight dark:text-white text-black tracking-tight">
        Expand Your Career <span className="text-gradient">Opportunity</span>{" "}
        <br />
        With Our Courses
      </h1>

      <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-center font-Poppins">
        Explore our courses to enhance your skills and advance your career in
        the tech world.
      </p>

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mt-12">
        {courses &&
          courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Courses;
