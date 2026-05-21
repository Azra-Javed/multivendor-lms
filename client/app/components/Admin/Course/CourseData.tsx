import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
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

const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) => {
  const prevButton = () => setActive(active - 1);

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => setBenefits([...benefits, { title: "" }]);

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () =>
    setPrerequisites([...prerequisites, { title: "" }]);

  return (
    <div className="space-y-10">
      {/* Benefits */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
          What are the benefits for students?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins mb-4">
          List what students will gain from this course.
        </p>

        <div className="space-y-3">
          {benefits.map((benefit: any, index: number) => (
            <input
              key={index}
              type="text"
              name="Benefit"
              placeholder="e.g. Build a full stack LMS platform..."
              required
              className={inputClass}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddBenefit}
          className="mt-3 flex items-center gap-2 text-sm font-medium font-Poppins
                     text-teal-500 hover:text-teal-600 transition-colors duration-200"
        >
          <AiOutlinePlusCircle className="w-4 h-4" />
          Add Benefit
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-white/10" />

      {/* Prerequisites */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins mb-1">
          What are the prerequisites?
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins mb-4">
          List the skills or knowledge students need before starting.
        </p>

        <div className="space-y-3">
          {prerequisites.map((prerequisite: any, index: number) => (
            <input
              key={index}
              type="text"
              name="prerequisites"
              placeholder="e.g. Basic knowledge of MERN stack"
              required
              className={inputClass}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddPrerequisites}
          className="mt-3 flex items-center gap-2 text-sm font-medium font-Poppins
                     text-teal-500 hover:text-teal-600 transition-colors duration-200"
        >
          <AiOutlinePlusCircle className="w-4 h-4" />
          Add Prerequisite
        </button>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={prevButton}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                     border border-gray-200 dark:border-white/10
                     text-gray-700 dark:text-gray-300
                     hover:border-teal-500 hover:text-teal-500
                     transition-all duration-200"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={handleOptions}
          className="px-8 py-2.5 rounded-lg text-sm font-semibold font-Poppins
                     bg-teal-500 hover:bg-teal-600 text-white
                     transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
