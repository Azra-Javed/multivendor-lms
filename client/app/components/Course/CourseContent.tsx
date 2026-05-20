import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  // Fetch course content data using course id
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  // Controls authentication modal visibility
  const [open, setOpen] = useState(false);

  // Stores current auth route (Login / Signup)
  const [route, setRoute] = useState("Login");

  // Tracks currently active video index
  const [activeVideo, setActiveVideo] = useState(0);

  // Extract course content array
  const data = contentData?.content;

  if (isLoading) return <Loader />;

  if (!data) return <Loader />;

  return (
    <>
      {/* Dynamic page SEO */}
      <Heading
        title={data?.[activeVideo]?.title}
        keywords={data?.[activeVideo]?.tags}
        description={
          data?.[activeVideo]?.description ||
          "Learn through high quality video lessons and course materials."
        }
      />

      {/* Main site header */}
      <Header
        activeItem={1}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      {/* Main course content layout */}
      <div className="w-full min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="w-full grid 800px:grid-cols-10">
          {/* Left Section - Video player and lesson content */}
          <div className="col-span-10 800px:col-span-7 border-r border-gray-200 dark:border-white/10">
            <CourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              user={user}
              refetch={refetch}
            />
          </div>

          {/* Right Sidebar - Course lessons list */}
          <div className="hidden 800px:block 800px:col-span-3 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-slate-900">
            <CourseContentList
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
