import { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  isDemo?: boolean;
  activeVideo?: number;
  setActiveVideo?: any;
};

const CourseContentList = ({
  data,
  isDemo,
  activeVideo,
  setActiveVideo,
}: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );

  const sections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  let totalCount = 0;

  const toggleSection = (section: string) => {
    const copiedSet = new Set(visibleSections);
    copiedSet.has(section) ? copiedSet.delete(section) : copiedSet.add(section);
    setVisibleSections(copiedSet);
  };

  return (
    <div
      className={`mt-4 w-full ${
        !isDemo && "ml-[-24px] min-h-screen sticky top-24 left-0 z-30 pr-2"
      }`}
    >
      {sections.map((section: string) => {
        const isVisible = visibleSections.has(section);

        const sectionVideos = data.filter(
          (item: any) => item.videoSection === section,
        );

        const countVideos = sectionVideos.length;

        const totalVideoLength = sectionVideos.reduce(
          (sum: number, item: any) => sum + item.videoLength,
          0,
        );

        const startIndex = totalCount;
        totalCount += countVideos;

        const hours = totalVideoLength / 60;

        return (
          <div
            key={section}
            className={`mb-3 rounded-lg overflow-hidden border transition
              ${
                !isDemo
                  ? "border-gray-200 dark:border-white/10"
                  : "border-transparent"
              }`}
          >
            {/* SECTION HEADER */}
            <div
              className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-900 cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {section}
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {countVideos} lessons ·{" "}
                  {totalVideoLength < 60
                    ? `${totalVideoLength} min`
                    : `${hours.toFixed(1)} hr`}
                </p>
              </div>

              <div className="text-gray-600 dark:text-gray-300">
                {isVisible ? (
                  <BsChevronUp size={18} />
                ) : (
                  <BsChevronDown size={18} />
                )}
              </div>
            </div>

            {/* VIDEOS */}
            {isVisible && (
              <div className="bg-white dark:bg-slate-950">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex = startIndex + index;
                  const lengthHours = item.videoLength / 60;

                  const isActive = videoIndex === activeVideo;

                  return (
                    <div
                      key={item._id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                      className={`flex gap-3 px-4 py-3 cursor-pointer transition-all
                        ${
                          isActive
                            ? "bg-teal-50 dark:bg-white/5 border-l-2 border-teal-500"
                            : "hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                    >
                      <MdOutlineOndemandVideo
                        size={20}
                        className="text-teal-500 mt-0.5 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h1 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </h1>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {item.videoLength > 60
                            ? `${lengthHours.toFixed(1)} hr`
                            : `${item.videoLength} min`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
