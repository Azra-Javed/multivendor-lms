// import { styles } from "@/app/styles/styles";
// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import React, { useEffect, useState } from "react";
// import { HiMinus, HiPlus } from "react-icons/hi";

// type Props = {};

// const FAQ = (props: Props) => {
//   const { data } = useGetHeroDataQuery("FAQ", {});
//   const [activeQuestion, setActiveQuestion] = useState(null);
//   const [questions, setQuestions] = useState<any[]>([]);

//   useEffect(() => {
//     if (data) {
//       setQuestions(data.layout?.faq);
//     }
//   }, [data]);

//   const toggleQuestion = (id: any) => {
//     setActiveQuestion(activeQuestion === id ? null : id);
//   };

//   return (
//     <div>
//       <div className="w-[90%] 800px:w-[80%] m-auto">
//         <h1 className={`${styles.title} 800px:text-[40px]`}>
//           Frequently Asked Questions
//         </h1>
//         <div className="mt-12">
//           <dl className="space-y-8">
//             {questions?.map((q) => (
//               <div
//                 key={q.id}
//                 className={`${
//                   q._id !== questions[0]?._id && "border-t"
//                 } border-gray-200 pt-6`}
//               >
//                 <dt className="text-lg">
//                   <button
//                     className="flex items-start justify-between w-full text-left focus:outline-none"
//                     onClick={() => toggleQuestion(q._id)}
//                   >
//                     <span className="font-medium text-black dark:text-white">
//                       {q.question}
//                     </span>
//                     <span className="ml-6 flex-shrink-0">
//                       {activeQuestion === q._id ? (
//                         <HiMinus className="h-6 w-6 text-black dark:text-white" />
//                       ) : (
//                         <HiPlus className="h-6 w-6 text-black dark:text-white" />
//                       )}
//                     </span>
//                   </button>
//                 </dt>
//                 {activeQuestion === q._id && (
//                   <dd className="mt-2 pr-12">
//                     <p className="text-base font-Poppins text-black dark:text-white">
//                       {q.answer}
//                     </p>
//                   </dd>
//                 )}
//               </div>
//             ))}
//           </dl>
//         </div>
//         <br />
//         <br />
//         <br />
//       </div>
//     </div>
//   );
// };

// export default FAQ;

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="text-black dark:text-white py-12">
      <div className="w-[90%] 800px:w-[80%] m-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl 1000px:text-5xl font-semibold leading-tight">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>

        {/* FAQ list */}
        <div className="mt-10 max-w-5xl mx-auto text-left">
          <dl className="space-y-6">
            {questions?.map((q, index) => (
              <div
                key={q._id}
                className={`pt-6 ${
                  index !== 0
                    ? "border-t border-gray-200 dark:border-gray-700"
                    : ""
                }`}
              >
                <dt>
                  <button
                    className="flex items-start justify-between w-full text-left"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="text-base sm:text-lg font-medium text-black dark:text-white font-Poppins">
                      {q.question}
                    </span>

                    <span className="ml-4 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-5 w-5" />
                      ) : (
                        <HiPlus className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                </dt>

                {activeQuestion === q._id && (
                  <dd className="mt-3 pr-8">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
