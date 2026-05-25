import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
      if (data.layout?.faq?.length > 0) {
        setActiveQuestion(data.layout.faq[0]._id);
      }
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  const activeQ = questions.find((q) => q._id === activeQuestion);

  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto py-6">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 1000px:mb-16">
        <h2
          className="text-2xl sm:text-3xl 1000px:text-5xl font-semibold
                       leading-tight text-gray-900 dark:text-white font-Poppins"
        >
          Frequently Asked <span className="text-teal-500">Questions</span>
        </h2>
        <p
          className="mt-4 text-sm sm:text-base 1000px:text-lg
                      text-gray-600 dark:text-gray-300 font-Poppins"
        >
          Everything you need to know before getting started.
        </p>
      </div>

      {/* ── Mobile: simple accordion ── */}
      <div className="1000px:hidden flex flex-col gap-3">
        {questions?.map((q, index) => {
          const isOpen = activeQuestion === q._id;
          return (
            <div
              key={q._id}
              className={`rounded-xl border transition-all duration-200
                          ${
                            isOpen
                              ? "border-teal-500/40 bg-teal-500/5 dark:bg-teal-500/5"
                              : "border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800"
                          }`}
            >
              {/* Question row */}
              <button
                onClick={() => toggleQuestion(q._id)}
                className="w-full text-left px-4 py-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-teal-500 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-medium text-gray-900 dark:text-white
                                   font-Poppins leading-snug"
                  >
                    {q.question}
                  </span>
                </div>
                <span className="shrink-0">
                  {isOpen ? (
                    <HiMinus className="w-4 h-4 text-teal-500" />
                  ) : (
                    <HiPlus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  )}
                </span>
              </button>

              {/* Answer */}
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="h-px bg-gray-100 dark:bg-white/10 mb-3" />
                  <p
                    className="text-sm text-gray-600 dark:text-gray-300
                                font-Poppins leading-relaxed"
                  >
                    {q.answer}
                  </p>
                  <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 font-Poppins">
                    Still have questions?{" "}
                    <a
                      href="mailto:iamazrajaved@gmail.com"
                      className="text-teal-500 font-medium hover:underline"
                    >
                      Contact us
                    </a>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop: two column layout ── */}
      <div className="hidden 1000px:grid 1000px:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Left — question list */}
        <dl className="flex flex-col gap-2">
          {questions?.map((q, index) => {
            const isOpen = activeQuestion === q._id;
            return (
              <button
                key={q._id}
                onClick={() => toggleQuestion(q._id)}
                className={`w-full text-left px-5 py-4 rounded-lg flex items-center justify-between gap-4
                            border transition-all duration-200 font-Poppins
                            ${
                              isOpen
                                ? "border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/20"
                                : "border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 text-gray-900 dark:text-white hover:border-teal-500/50"
                            }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold shrink-0 ${isOpen ? "text-white/70" : "text-teal-500"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug">
                    {q.question}
                  </span>
                </div>
                <span className="shrink-0">
                  {isOpen ? (
                    <HiMinus className="w-4 h-4 text-white" />
                  ) : (
                    <HiPlus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  )}
                </span>
              </button>
            );
          })}
        </dl>

        {/* Right — answer panel */}
        <div className="sticky top-24">
          {activeQ ? (
            <div
              className="rounded-2xl border border-gray-200 dark:border-white/10
                            bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
            >
              <div className="h-1 w-full bg-teal-500" />
              <div className="p-8">
                <h3
                  className="text-lg font-semibold text-gray-900 dark:text-white
                               font-Poppins leading-snug mb-6"
                >
                  {activeQ.question}
                </h3>
                <div className="h-px bg-gray-100 dark:bg-white/10 mb-6" />
                <p
                  className="text-base text-gray-600 dark:text-gray-300
                              font-Poppins leading-relaxed"
                >
                  {activeQ.answer}
                </p>
                <div
                  className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10
                                flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-teal-500/10
                                  flex items-center justify-center shrink-0"
                  >
                    <svg
                      className="w-4 h-4 text-teal-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                    Still have questions?{" "}
                    <a
                      href="mailto:iamazrajaved@gmail.com"
                      className="text-teal-500 font-medium cursor-pointer hover:underline"
                    >
                      Contact us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-dashed border-gray-200 dark:border-white/10
                            p-12 flex flex-col items-center justify-center text-center"
            >
              <div
                className="w-12 h-12 rounded-full bg-teal-500/10
                              flex items-center justify-center mb-4"
              >
                <HiPlus className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                Select a question to see the answer
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
