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
    new Set()
  );

  // find unique video sections
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
      className={`mt-[15px] w-full ${
        !isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
      }`}
    >
      {sections.map((section: string, sectionIndex: number) => {
        const isVisible = visibleSections.has(section);

        const sectionVideos = data.filter(
          (item: any) => item.videoSection === section
        );

        const countVideos = sectionVideos.length;

        const totalVideoLength = sectionVideos.reduce(
          (sum: number, item: any) => sum + item.videoLength,
          0
        );

        const startIndex = totalCount;
        totalCount += countVideos;

        const hours = totalVideoLength / 60;

        return (
          <div
            className={`${
              !isDemo &&
              "border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2"
            }`}
            key={section}
          >
            <div className="w-full flex justify-between items-center">
              <h2 className="text-[22px] text-black dark:text-white">
                {section}
              </h2>

              <button
                className="mr-4 cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>

            <h5 className="text-black dark:text-white">
              {countVideos} Lessons ·{" "}
              {totalVideoLength < 60 ? totalVideoLength : hours.toFixed(2)}{" "}
              {totalVideoLength > 60 ? "hours" : "minutes"}
            </h5>

            <br />

            {isVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex = startIndex + index;
                  const lengthHours = item.videoLength / 60;

                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <MdOutlineOndemandVideo
                          size={25}
                          className="mr-2"
                          color="#1cdada"
                        />
                        <h1 className="text-[18px] break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>

                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength > 60
                          ? lengthHours.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
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
