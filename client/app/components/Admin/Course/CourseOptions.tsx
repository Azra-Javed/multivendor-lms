import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="p-6">
      <p
        className="text-[11px] font-semibold tracking-widest uppercase
                    text-gray-400 dark:text-gray-500 font-Poppins mb-6"
      >
        Steps
      </p>
      <div className="flex flex-col gap-0">
        {options.map((option, index) => {
          const isDone = active + 1 > index;
          const isCurrent = active === index;

          return (
            <div key={index} className="flex items-start gap-3 relative">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                              border-2 transition-all duration-200
                              ${
                                isDone
                                  ? "bg-teal-500 border-teal-500"
                                  : "bg-transparent border-gray-300 dark:border-white/20"
                              }`}
                >
                  <IoMdCheckmark
                    className={`text-base ${isDone ? "text-white" : "text-gray-300 dark:text-white/20"}`}
                  />
                </div>

                {/* Connector line */}
                {index !== options.length - 1 && (
                  <div
                    className={`w-0.5 h-10 mt-1 transition-all duration-200
                                ${isDone ? "bg-teal-500" : "bg-gray-200 dark:bg-white/10"}`}
                  />
                )}
              </div>

              {/* Label */}
              <div className="pt-1 pb-10">
                <p
                  className={`text-sm font-medium font-Poppins transition-colors duration-200
                              ${
                                isCurrent
                                  ? "text-teal-500"
                                  : isDone
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-400 dark:text-gray-500"
                              }`}
                >
                  {option}
                </p>
                {isCurrent && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-0.5">
                    Current step
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseOptions;
