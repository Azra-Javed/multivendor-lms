import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const inputClass = `w-full px-4 py-2.5 rounded-lg text-sm font-Poppins
  border border-gray-200 dark:border-white/10
  bg-white dark:bg-slate-800
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  outline-none focus:border-teal-500 dark:focus:border-teal-500
  transition-colors duration-200`;

const labelClass = `block text-sm font-semibold text-gray-700 dark:text-gray-300 font-Poppins mb-2`;

const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const { data } = useGetHeroDataQuery("Categories");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) setCategories(data.layout.categories);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!courseInfo.thumbnail) {
      toast.error("Please upload a course thumbnail");
      return;
    }
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Course Name */}
      <div>
        <label className={labelClass}>Course Name</label>
        <input
          type="text"
          required
          value={courseInfo.name}
          onChange={(e) =>
            setCourseInfo({ ...courseInfo, name: e.target.value })
          }
          placeholder="MERN stack LMS platform with Next 13"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Course Description</label>
        <textarea
          rows={6}
          placeholder="Write something amazing..."
          className={`${inputClass} resize-none`}
          value={courseInfo.description}
          onChange={(e) =>
            setCourseInfo({ ...courseInfo, description: e.target.value })
          }
        />
      </div>

      {/* Price row */}
      <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Course Price</label>
          <input
            type="number"
            required
            value={courseInfo.price}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, price: e.target.value })
            }
            placeholder="29"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Estimated Price (optional)</label>
          <input
            type="number"
            value={courseInfo.estimatedPrice}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
            }
            placeholder="79"
            className={inputClass}
          />
        </div>
      </div>

      {/* Tags + Categories row */}
      <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Course Tags</label>
          <input
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="MERN, Next 13, Socket io, Tailwind CSS"
            className={inputClass}
          />
        </div>

        {/* CATEGORY SECTION */}
        <div className="relative" ref={dropdownRef}>
          <label className={labelClass}>Course Categories</label>

          {/* dropdown button */}
          <div
            onClick={() => setOpen(!open)}
            className={
              inputClass + " cursor-pointer flex justify-between items-center"
            }
          >
            <span>
              {courseInfo.categories?.length > 0
                ? courseInfo.categories.join(", ")
                : "Select Category"}
            </span>
            <span>▼</span>
          </div>

          {/* dropdown list */}
          {open && (
            <div className="absolute left-0 right-0 z-50 mt-2 w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-h-60 overflow-y-auto p-2">
              {categories?.map((item: any) => {
                const checked = courseInfo.categories?.includes(item.title);

                return (
                  <label
                    key={item._id}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        let updated = [...(courseInfo.categories || [])];

                        if (checked) {
                          updated = updated.filter((t) => t !== item.title);
                        } else {
                          updated.push(item.title);
                        }

                        setCourseInfo({
                          ...courseInfo,
                          categories: updated,
                        });
                      }}
                      className="w-4 h-4 cursor-pointer accent-teal-500"
                    />

                    <span className="text-sm text-gray-700 dark:text-white">
                      {item.title}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Level + Demo URL row */}
      <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Course Level</label>
          <input
            type="text"
            required
            value={courseInfo.level}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, level: e.target.value })
            }
            placeholder="Beginner / Intermediate / Expert"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Demo URL</label>
          <input
            type="text"
            required
            value={courseInfo.demoUrl}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            placeholder="Enter demo video URL"
            className={inputClass}
          />
        </div>
      </div>

      {/* Thumbnail upload */}
      <div>
        <label className={labelClass}>Course Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          id="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full min-h-[160px] rounded-xl border-2 border-dashed
                      flex items-center justify-center cursor-pointer
                      transition-all duration-200 overflow-hidden
                      ${
                        dragging
                          ? "border-teal-500 bg-teal-500/5"
                          : "border-gray-200 dark:border-white/10 hover:border-teal-500/50"
                      }`}
        >
          {courseInfo.thumbnail ? (
            <img
              src={courseInfo.thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover max-h-[200px]"
            />
          ) : (
            <div className="text-center p-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                Drag and drop your thumbnail here
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-1">
                or click to browse
              </p>
            </div>
          )}
        </label>
      </div>

      {/* Next button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-8 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-600
                     text-white text-sm font-semibold font-Poppins
                     transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CourseInformation;
