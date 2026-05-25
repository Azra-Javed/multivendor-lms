import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) setCategories(data.layout?.categories);
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("Categories updated successfully");
      refetch();
    }
  }, [layoutSuccess, refetch]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error((error as any)?.data?.message);
    }
  }, [error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i)),
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (original: any[], current: any[]) =>
    JSON.stringify(original) === JSON.stringify(current);

  const isAnyCategoryTitleEmpty = (categories: any[]) =>
    categories.some((q) => q.title === "");

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  const canSave =
    !areCategoriesUnchanged(data?.layout?.categories, categories) &&
    !isAnyCategoryTitleEmpty(categories);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full min-h-screen p-6 sm:p-8  mt-15">
      {/* Page header */}

      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-500">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Customization
        </span>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white font-Poppins">
          Edit Categories
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-Poppins">
          Add, edit or remove course categories shown across the platform.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10 mb-8" />

      {/* Category list */}
      <div className="space-y-3">
        {categories?.map((item: any, index: number) => (
          <div
            key={item._id || Math.random()}
            className="flex items-center gap-3 rounded-xl
                       border border-gray-200 dark:border-white/10
                       bg-white dark:bg-slate-800
                       px-5 py-3"
          >
            {/* Number */}
            <span className="text-xs font-bold text-gray-300 dark:text-white/20 font-Poppins shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Input */}
            <input
              value={item.title}
              onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
              placeholder="Enter category title..."
              className="flex-1 bg-transparent outline-none
                         text-sm font-medium font-Poppins
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500"
            />

            {/* Delete button */}
            <button
              onClick={() =>
                setCategories((prevCategory: any) =>
                  prevCategory.filter((i: any) => i._id !== item._id),
                )
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                         border border-gray-200 dark:border-white/10
                         text-rose-400
                         hover:border-rose-400 hover:bg-rose-400/10
                         transition-all duration-200"
            >
              <AiOutlineDelete className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add new category */}
      <button
        onClick={newCategoriesHandler}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg
                   border border-dashed border-gray-300 dark:border-white/10
                   text-sm font-medium font-Poppins
                   text-gray-500 dark:text-gray-400
                   hover:border-teal-500 hover:text-teal-500
                   transition-all duration-200 w-full justify-center"
      >
        <IoMdAddCircleOutline className="w-4 h-4" />
        Add New Category
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10 mt-8 mb-6" />

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={canSave ? editCategoriesHandler : undefined}
          disabled={!canSave}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                      transition-all duration-200
                      ${
                        canSave
                          ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
                          : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
