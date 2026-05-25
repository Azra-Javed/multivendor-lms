import { useEffect, useState } from "react";
import CourseContent from "./CourseContent";
import CourseData from "./CourseData";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  isCollapsed?: boolean;
};

const CreateCourse = ({ isCollapsed }: Props) => {
  const [createCourse, { isSuccess, isLoading, error }] =
    useCreateCourseMutation();
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoLength: courseContent.videoLength,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      }),
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
      categories: courseInfo.categories,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully!");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  // right sidebar width mirrors the freed space when left sidebar collapses
  const rightSidebarWidth = isCollapsed ? "lg:w-[240px]" : "lg:w-[200px]";
  const mainContentWidth = isCollapsed
    ? "800px:w-[calc(100%-200px)] lg:w-[calc(100%-240px)]"
    : "800px:w-[calc(100%-200px)]";

  return (
    <div className="w-full flex min-h-screen">
      {/* Main content */}
      <div
        className={`w-full ${mainContentWidth} mt-[64px] transition-all duration-300`}
      >
        {/* Page header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10">
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold
                           tracking-[0.18em] uppercase text-teal-500"
          >
            <span className="w-5 h-px bg-teal-500 inline-block" />
            Admin
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white font-Poppins">
            Create Course
          </h1>
        </div>

        {/* Step content */}
        <div className="px-6 py-6">
          {active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
            />
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div
        className={`hidden 800px:block fixed right-0 top-[64px]
                    h-[calc(100vh-64px)]
                    border-l border-gray-200 dark:border-white/10
                    bg-white dark:bg-slate-900 overflow-y-auto
                    transition-all duration-300
                    w-[200px] ${rightSidebarWidth}`}
      >
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
