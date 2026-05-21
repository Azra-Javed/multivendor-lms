import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const inputClass = `w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
  border border-gray-200 dark:border-white/10
  bg-gray-50 dark:bg-slate-900
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  outline-none focus:border-teal-500 dark:focus:border-teal-500
  transition-colors duration-200`;

const labelClass = `block text-xs font-semibold uppercase tracking-wider
  text-gray-500 dark:text-gray-400 font-Poppins mb-1.5`;

const CourseContent = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
    Array(courseContentData.length).fill(false),
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => e.preventDefault();

  const handleCollapseToggle = (index: number) => {
    const updated = [...isCollapsed];
    updated[index] = !updated[index];
    setIsCollapsed(updated);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = courseContentData.map((item: any, i: number) =>
      i === index
        ? {
            ...item,
            links: item.links.filter((_: any, li: number) => li !== linkIndex),
          }
        : item,
    );
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = courseContentData.map((item: any, i: number) =>
      i === index
        ? { ...item, links: [...item.links, { title: "", url: "" }] }
        : item,
    );
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === "" ||
      item.videoLength === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) newVideoSection = lastVideoSection;
      }
      setCourseContentData([
        ...courseContentData,
        {
          videoUrl: "",
          title: "",
          description: "",
          videoSection: newVideoSection,
          videoLength: "",
          links: [{ title: "", url: "" }],
          suggestion: "",
        },
      ]);
      // fix: expand isCollapsed array for the new item
      setIsCollapsed([...isCollapsed, false]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      setCourseContentData([
        ...courseContentData,
        {
          videoUrl: "",
          title: "",
          description: "",
          videoLength: "",
          videoSection: `Untitled Section ${activeSection}`,
          links: [{ title: "", url: "" }],
          suggestion: "",
        },
      ]);
      // fix: expand isCollapsed array for the new item
      setIsCollapsed([...isCollapsed, false]);
    }
  };

  const prevButton = () => setActive(active - 1);

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="space-y-4 pb-10">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={showSectionInput && index !== 0 ? "mt-8" : "mt-3"}
            >
              {/* Section title */}
              {showSectionInput && (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                    className="text-sm font-semibold font-Poppins
                               text-gray-900 dark:text-white bg-transparent
                               outline-none border-b border-dashed
                               border-gray-300 dark:border-white/30
                               focus:border-teal-500 pb-0.5 transition-colors
                               min-w-[140px]"
                  />
                  <BsPencil className="w-3 h-3 text-gray-400 shrink-0" />
                </div>
              )}

              {/* Card */}
              <div
                className="rounded-xl overflow-hidden
                              border border-gray-200 dark:border-white/10
                              bg-white dark:bg-[#1a2234]"
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-5 py-3
                                bg-gray-50 dark:bg-[#151f30]
                                border-b border-gray-100 dark:border-white/[0.08]"
                >
                  <p
                    className="text-sm font-medium font-Poppins
                                text-gray-600 dark:text-gray-300"
                  >
                    {isCollapsed[index] && item.title
                      ? `${index + 1}. ${item.title}`
                      : `Lesson ${index + 1}`}
                  </p>

                  <div className="flex items-center gap-2">
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                          const updatedCollapsed = [...isCollapsed];
                          updatedCollapsed.splice(index, 1);
                          setIsCollapsed(updatedCollapsed);
                        }
                      }}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center
                                  border border-gray-200 dark:border-white/10
                                  transition-all duration-200
                                  ${
                                    index > 0
                                      ? "text-gray-400 hover:border-red-400 hover:text-red-400 cursor-pointer"
                                      : "text-gray-200 dark:text-white/20 cursor-not-allowed"
                                  }`}
                    >
                      <AiOutlineDelete className="w-3.5 h-3.5" />
                    </button>

                    {/* Collapse */}
                    <button
                      type="button"
                      onClick={() => handleCollapseToggle(index)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center
                                 border border-gray-200 dark:border-white/10
                                 text-gray-500 dark:text-gray-400
                                 hover:border-teal-500 hover:text-teal-500
                                 transition-all duration-200"
                    >
                      <MdOutlineKeyboardArrowDown
                        className={`w-4 h-4 transition-transform duration-200
                                    ${isCollapsed[index] ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Card body */}
                {!isCollapsed[index] && (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className={labelClass}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={inputClass}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Video URL</label>
                      <input
                        type="text"
                        placeholder="Enter video URL"
                        className={inputClass}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Video Length (minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={inputClass}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Video Description</label>
                      <textarea
                        rows={4}
                        placeholder="Enter video description"
                        className={`${inputClass} resize-none`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                      {item?.links.map((link: any, linkIndex: number) => (
                        <div
                          key={linkIndex}
                          className="rounded-lg border border-gray-200 dark:border-white/10
                                     bg-gray-50 dark:bg-slate-900 p-4 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <label className={labelClass}>
                              Link {linkIndex + 1}
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                              className={`w-7 h-7 rounded-lg flex items-center justify-center
                                          border border-gray-200 dark:border-white/10
                                          transition-all duration-200
                                          ${
                                            linkIndex === 0
                                              ? "text-gray-200 dark:text-white/20 cursor-not-allowed"
                                              : "text-gray-400 hover:border-red-400 hover:text-red-400 cursor-pointer"
                                          }`}
                            >
                              <AiOutlineDelete className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Link title (e.g. Source Code)"
                            className={inputClass}
                            value={link.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                          <input
                            type="url"
                            placeholder="Link URL"
                            className={inputClass}
                            value={link.url}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url =
                                e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add Link + Add Content row */}
                    <div className="flex items-center gap-5 pt-1 border-t border-gray-100 dark:border-white/10 mt-2">
                      <button
                        type="button"
                        onClick={() => handleAddLink(index)}
                        className="flex items-center gap-1.5 text-sm font-medium
                                   font-Poppins text-teal-500 hover:text-teal-400
                                   transition-colors duration-200 pt-3"
                      >
                        <BsLink45Deg className="w-4 h-4" />
                        Add Link
                      </button>

                      {index === courseContentData.length - 1 && (
                        <button
                          type="button"
                          onClick={() => newContentHandler(item)}
                          className="flex items-center gap-1.5 text-sm font-medium
                                     font-Poppins text-teal-500 hover:text-teal-400
                                     transition-colors duration-200 pt-3"
                        >
                          <AiOutlinePlusCircle className="w-4 h-4" />
                          Add New Content
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </form>

      {/* Add new section */}
      <button
        type="button"
        onClick={addNewSection}
        className="flex items-center gap-2 px-4 py-3 rounded-xl w-full justify-center
                   border-2 border-dashed border-gray-200 dark:border-white/10
                   text-sm font-medium font-Poppins
                   text-gray-400 dark:text-gray-500
                   hover:border-teal-500 hover:text-teal-500
                   transition-all duration-200 mt-2"
      >
        <AiOutlinePlusCircle className="w-4 h-4" />
        Add New Section
      </button>

      {/* Nav buttons */}
      <div
        className="flex items-center justify-between pt-4
                      border-t border-gray-200 dark:border-white/10 mt-4"
      >
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
          onClick={handleOptions}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                     bg-teal-500 hover:bg-teal-600 text-white
                     transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
