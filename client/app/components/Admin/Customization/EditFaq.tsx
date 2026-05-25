import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
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
  }, [data]);

  useEffect(() => {
    if (layoutSuccess) {
      toast.success("FAQ updated successfully");
      refetch();
    }
    if (error && "data" in error) toast.error((error as any)?.data?.message);
  }, [layoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q)),
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, question: value } : q)),
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, answer: value } : q)),
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

  const canSave =
    !areQuestionsUnchanged(data?.layout?.faq, questions) &&
    !isAnyQuestionEmpty(questions);

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
          Edit FAQ
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-Poppins">
          Add, edit or remove frequently asked questions shown on the FAQ page.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10 mb-8" />

      {/* FAQ list */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={q._id}
            className="rounded-xl border border-gray-200 dark:border-white/10
                       bg-white dark:bg-slate-800 overflow-hidden
                       transition-all duration-200"
          >
            {/* Question row */}
            <div className="flex items-center gap-3 px-5 py-4">
              {/* Question number */}
              <span className="text-xs font-bold text-gray-300 dark:text-white/20 font-Poppins shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question input */}
              <input
                value={q.question}
                onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                placeholder="Add your question..."
                className="flex-1 bg-transparent outline-none
                           text-sm font-medium font-Poppins
                           text-gray-900 dark:text-white
                           placeholder-gray-400 dark:placeholder-gray-500"
              />

              {/* Toggle button */}
              <button
                onClick={() => toggleQuestion(q._id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                           border border-gray-200 dark:border-white/10
                           text-gray-500 dark:text-gray-400
                           hover:border-teal-500 hover:text-teal-500
                           transition-all duration-200"
              >
                {q.active ? (
                  <HiMinus className="w-4 h-4" />
                ) : (
                  <HiPlus className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Answer row — shown when active */}
            {q.active && (
              <div className="px-5 pb-4 pt-0">
                <div className="h-px bg-gray-100 dark:bg-white/10 mb-4" />
                <div className="flex items-start gap-3">
                  <textarea
                    value={q.answer}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    placeholder="Add your answer..."
                    rows={3}
                    className="flex-1 px-4 py-3 rounded-lg resize-none outline-none
                               border border-gray-200 dark:border-white/10
                               bg-gray-50 dark:bg-slate-700
                               text-sm text-gray-700 dark:text-gray-300
                               placeholder-gray-400 dark:placeholder-gray-500
                               font-Poppins
                               focus:border-teal-500 dark:focus:border-teal-500
                               transition-colors duration-200"
                  />
                  <button
                    onClick={() =>
                      setQuestions((prev) =>
                        prev.filter((item) => item._id !== q._id),
                      )
                    }
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                               border border-gray-200 dark:border-white/10
                               text-rose-400 hover:border-rose-400 hover:bg-rose-400/10
                               transition-all duration-200 mt-0.5"
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new FAQ */}
      <button
        onClick={!isAnyQuestionEmpty(questions) ? newFaqHandler : undefined}
        disabled={isAnyQuestionEmpty(questions)}
        className={`mt-5 flex items-center gap-2 px-4 py-2.5 rounded-lg
              border border-dashed font-Poppins
              text-sm font-medium w-full justify-center
              transition-all duration-200
              ${
                isAnyQuestionEmpty(questions)
                  ? "border-gray-200 dark:border-white/10 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-teal-500 hover:text-teal-500 cursor-pointer"
              }`}
      >
        <IoMdAddCircleOutline className="w-4 h-4" />
        Add New FAQ
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10 mt-8 mb-6" />

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={canSave ? handleEdit : undefined}
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

export default EditFaq;
