// import { styles } from "@/app/styles/styles";
// import {
//   useEditLayoutMutation,
//   useGetHeroDataQuery,
// } from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { AiOutlineCamera } from "react-icons/ai";

// type Props = {};

// const EditHero = (props: Props) => {
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [subTitle, setSubTitle] = useState("");
//   const { data, refetch } = useGetHeroDataQuery("Banner", {
//     refetchOnMountOrArgChange: true,
//   });
//   const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

//   useEffect(() => {
//     if (data) {
//       setTitle(data?.layout?.banner?.title);
//       setSubTitle(data?.layout?.banner?.subTitle);
//       setImage(data?.layout?.banner?.image?.url);
//     }
//     if (isSuccess) {
//       toast.success("Hero updated successfully!");
//       refetch();
//     }
//     if (error && "data" in error) toast.error((error as any)?.data?.message);
//   }, [data, isSuccess, error, refetch]);

//   const handleUpdate = (e: any) => {
//     const file = e.target?.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         if (reader.readyState === 2) setImage(e.target.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = async () =>
//     await editLayout({ type: "Banner", image, title, subTitle });

//   return (
//     <div className="w-full 1000px:flex items-center">
//       {/* Hero animation */}
//       <div className="absolute top-[120px] 1000px:top-[unset] 1500px:h-[650px] 1500px:w-[650px] 1100px:h-[480px] 1100px:w-[480px] h-[45vh] w-[45vh] hero_animation rounded-[50%] 1100px:left-[16rem] 1500px:left-[20rem]"></div>

//       {/* Image */}
//       <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[60px] 1000px:pt-[0] z-10">
//         <div className="relative flex items-center justify-end">
//           <img
//             src={image}
//             alt=""
//             className="object-contain 1100px:max-w-[85%] w-[85%] 1500px:max-w-[80%] h-auto z-[10]"
//           />
//           <input
//             type="file"
//             id="banner"
//             accept="image/*"
//             onChange={handleUpdate}
//             className="hidden"
//           />
//           <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
//             <AiOutlineCamera className="dark:text-white text-black text-[20px] cursor-pointer" />
//           </label>
//         </div>
//       </div>

//       {/* Text */}
//       <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[120px]">
//         <textarea
//           className="dark:text-white resize-none text-[#000000c7] text-[28px] lg:text-[55px] 1500px:text-[65px] font-[600] font-Josefin py-2 px-3 w-full 1000px:leading-[70px] 1500px:w-[60%] 1100px:w-[78%] outline-none bg-transparent block"
//           placeholder="Improve Your Online Learning Experience Better Instantly"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           rows={3}
//         />
//         <textarea
//           value={subTitle}
//           onChange={(e) => setSubTitle(e.target.value)}
//           placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
//           className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[16px] lg:text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent outline-none resize-none mt-4"
//         ></textarea>
//         <div
//           className={`${
//             styles.button
//           } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
//             data?.layout?.banner?.title !== title ||
//             data?.layout?.banner?.subTitle !== subTitle ||
//             data?.layout?.banner?.image?.url !== image
//               ? "!cursor-pointer !bg-[#42d383]"
//               : "!cursor-not-allowed"
//           } !rounded absolute bottom-12 right-12`}
//           onClick={
//             data?.layout?.banner?.title !== title ||
//             data?.layout?.banner?.subTitle !== subTitle ||
//             data?.layout?.banner?.image?.url !== image
//               ? handleEdit
//               : () => null
//           }
//         >
//           Save
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditHero;

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error && "data" in error) toast.error((error as any)?.data?.message);
  }, [isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) setImage(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () =>
    await editLayout({ type: "Banner", image, title, subTitle });

  // check if anything changed to enable save button
  const hasChanges =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.image?.url !== image;

  return (
    <div className="w-full min-h-screen p-8 mt-15">
      {/* Page header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-500">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Customization
        </span>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white font-Poppins">
          Edit Hero Section
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-Poppins">
          Update the banner image, title and subtitle shown on the homepage.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10 mb-8" />

      <div className="grid 1000px:grid-cols-2 gap-10 items-start">
        {/* Left: image upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-sm">
            <img
              src={image}
              alt="Hero banner"
              className="w-full h-auto rounded-xl object-contain
                         border border-gray-200 dark:border-white/10
                         bg-gray-50 dark:bg-slate-800"
            />

            {/* Camera overlay */}
            <label
              htmlFor="banner"
              className="absolute bottom-3 right-3 w-10 h-10 rounded-lg
                         bg-white dark:bg-slate-700
                         border border-gray-200 dark:border-white/10
                         flex items-center justify-center cursor-pointer
                         hover:border-teal-500 hover:text-teal-500
                         text-gray-600 dark:text-gray-300
                         transition-all duration-200 shadow-sm"
            >
              <AiOutlineCamera className="w-5 h-5" />
            </label>

            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 font-Poppins">
            Click the camera icon to upload a new image
          </p>
        </div>

        {/* Right: text fields */}
        <div className="flex flex-col gap-6">
          {/* Title field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-Poppins mb-2">
              Hero Title
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Improve Your Online Learning Experience Better Instantly"
              rows={4}
              className="w-full px-4 py-3 rounded-xl
                         border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         font-Poppins text-base font-semibold
                         outline-none resize-none
                         focus:border-teal-500 dark:focus:border-teal-500
                         transition-colors duration-200"
            />
          </div>

          {/* Subtitle field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 font-Poppins mb-2">
              Hero Subtitle
            </label>
            <textarea
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="We have 40k+ Online courses & 500K+ Online registered students."
              rows={3}
              className="w-full px-4 py-3 rounded-xl
                         border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         font-Poppins text-sm
                         outline-none resize-none
                         focus:border-teal-500 dark:focus:border-teal-500
                         transition-colors duration-200"
            />
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={hasChanges ? handleEdit : undefined}
              disabled={!hasChanges}
              className={`px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                          transition-all duration-200
                          ${
                            hasChanges
                              ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
                              : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                          }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
