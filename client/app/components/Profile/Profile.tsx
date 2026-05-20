"use client";

import { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Course/CourseCard";
import { FiBook } from "react-icons/fi";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id),
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[90%] 800px:w-[85%] flex mx-auto">
      {/* Sidebar */}
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px]
                    bg-white dark:bg-slate-800
                    border border-gray-200 dark:border-white/10
                    rounded-xl shadow-sm
                    mt-[80px] mb-[80px] sticky
                    ${scroll ? "top-[120px]" : "top-[30px]"}`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
        />
      </div>

      {/* Profile Info */}
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {/* Change Password */}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}

      {/* Enrolled Courses */}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          {/* Divider label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap font-Poppins">
              {courses.length > 0
                ? `${courses.length} enrolled course${courses.length > 1 ? "s" : ""}`
                : "My Courses"}
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Course grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 mb-12">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>

          {/* Empty state */}
          {courses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                <FiBook className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
                No courses yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                You haven&apos;t purchased any courses yet.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
