import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";

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
  const { data } = useGetHeroDataQuery("Categories");

  useEffect(() => {
    if (data) setCategories(data.layout.categories);
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        <div>
          <label className={labelClass}>Course Categories</label>
          <select
            className={inputClass}
            value={courseInfo.category}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, categories: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
          </select>
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
