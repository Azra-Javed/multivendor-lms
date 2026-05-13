import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";
import { styles } from "@/app/styles/styles";

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
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
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

  if (isLoading) return <Loader />;

  return (
    <div className="mt-[100px] w-[90%] 800px:w-[70%] mx-auto">
      <h1 className={`${styles.title} text-center mb-8`}>All Categories</h1>

      <div className="space-y-4">
        {categories?.map((item: any) => (
          <div
            key={item._id || Math.random()}
            className="flex items-center justify-between bg-gray-50 dark:bg-[#111c43] p-3 rounded-lg shadow-sm"
          >
            <input
              className={`${styles.input} flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[18px] dark:text-white`}
              value={item.title}
              onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
              placeholder="Enter category title..."
            />
            <AiOutlineDelete
              className="text-red-500 hover:text-red-700 cursor-pointer text-xl ml-3"
              onClick={() =>
                setCategories((prevCategory: any) =>
                  prevCategory.filter((i: any) => i._id !== item._id)
                )
              }
            />
          </div>
        ))}
      </div>

      {/* Add New Category */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <IoMdAddCircleOutline
          className="text-green-500 hover:text-green-600 cursor-pointer text-2xl"
          onClick={newCategoriesHandler}
        />
        <span className="text-gray-600 dark:text-gray-300 font-medium">
          Add New Category
        </span>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          className={`${
            styles.button
          } !w-[120px] !h-[40px] rounded text-white ${
            areCategoriesUnchanged(data.layout?.categories, categories) ||
            isAnyCategoryTitleEmpty(categories)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
          onClick={
            areCategoriesUnchanged(data.layout?.categories, categories) ||
            isAnyCategoryTitleEmpty(categories)
              ? () => null
              : editCategoriesHandler
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
