import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) setQuestions(data.layout?.faq || []);
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }
    if (error && "data" in error) toast.error((error as any)?.data?.message);
  }, [data, layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () =>
    setQuestions([...questions, { question: "", answer: "" }]);

  const areQuestionsUnchanged = (original: any[], current: any[]) =>
    JSON.stringify(original) === JSON.stringify(current);

  const isAnyQuestionEmpty = (qs: any[]) =>
    qs.some((q) => q.question === "" || q.answer === "");

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({ type: "FAQ", faq: questions });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[80px]">
      <div className="space-y-4">
        {questions.map((q) => (
          <div
            key={q._id}
            className="bg-gray-50 dark:bg-[#111c43] p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between space-x-3">
              <input
                className={`${styles.input} flex-1 border rounded px-3 py-2`}
                value={q.question}
                onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                placeholder="Add your question..."
              />
              <button onClick={() => toggleQuestion(q._id)}>
                {q.active ? (
                  <HiMinus className="h-5 w-5 text-gray-600 dark:text-white" />
                ) : (
                  <HiPlus className="h-5 w-5 text-gray-600 dark:text-white" />
                )}
              </button>
            </div>
            {q.active && (
              <div className="flex items-center mt-3 space-x-3">
                <input
                  className={`${styles.input} flex-1 border rounded px-3 py-2`}
                  value={q.answer}
                  onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  placeholder="Add your answer..."
                />
                <AiOutlineDelete
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                  onClick={() =>
                    setQuestions((prev) =>
                      prev.filter((item) => item._id !== q._id)
                    )
                  }
                />
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-2 mt-2">
          <IoMdAddCircleOutline
            className="text-green-500 hover:text-green-600 cursor-pointer text-2xl"
            onClick={newFaqHandler}
          />
          <span className="text-gray-600 dark:text-gray-300">Add New FAQ</span>
        </div>
      </div>

      {/* Save button  */}
      <div className="mt-6 flex justify-end">
        <button
          className={`${styles.button} !w-[120px] !h-[40px] ${
            areQuestionsUnchanged(data.layout?.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          } rounded text-white`}
          onClick={
            areQuestionsUnchanged(data.layout?.faq, questions) ||
            isAnyQuestionEmpty(questions)
              ? () => null
              : handleEdit
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
