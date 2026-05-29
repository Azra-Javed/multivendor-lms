import { FiBook, FiAward, FiUsers } from "react-icons/fi";
const About = () => {
  const features = [
    {
      icon: <FiBook className="w-5 h-5 text-teal-500" />,
      title: "Structured Learning",
      desc: "Guided paths with interactive lessons, quizzes, and hands-on projects built for real jobs.",
    },
    {
      icon: <FiAward className="w-5 h-5 text-teal-500" />,
      title: "Certifications",
      desc: "Earn recognised certificates on completion to stand out in the job market.",
    },
    {
      icon: <FiUsers className="w-5 h-5 text-teal-500" />,
      title: "Community",
      desc: "A supportive community and industry-focused content to turn ambition into achievement.",
    },
  ];

  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto py-20 pb-0">
      {/* ── Hero text block ── */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-500">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Our Story
          <span className="w-5 h-px bg-teal-500 inline-block" />
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl 1000px:text-5xl font-semibold leading-tight text-gray-900 dark:text-white font-Poppins">
          What is <span className="text-teal-500">SkillBridge?</span>
        </h1>

        <p className="mt-5 text-base text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
          A modern LMS built to help students and professionals grow with
          confidence — with structured courses, real-world projects, and a
          community that has your back.
        </p>
      </div>

      {/* ── Feature cards ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-16">
        {features.map((card, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-white/10
                       bg-white dark:bg-slate-800
                       p-6 shadow-sm
                       hover:border-teal-500/50 hover:shadow-md hover:-translate-y-0.5
                       transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-5">
              {card.icon}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white font-Poppins mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main content: two columns ── */}
      <div className="mt-16 grid 1000px:grid-cols-[1fr_1.6fr] gap-10 items-start">
        {/* Left: sticky label */}
        <div className="1000px:sticky 1000px:top-24">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 font-Poppins">
            Our Mission
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white font-Poppins leading-snug">
            Making quality education{" "}
            <span className="text-teal-500">accessible to everyone</span>
          </h2>
          <div className="mt-6 h-px w-12 bg-teal-500" />
        </div>

        {/* Right: paragraphs */}
        <div className="space-y-5 text-base text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
          <p>
            Whether you are just starting your journey or already working in the
            tech industry, SkillBridge gives you the tools, guidance, and
            structure you need to move forward.
          </p>
          <p>
            Through interactive lessons, hands-on projects, quizzes, and guided
            learning paths, we focus on practical skills that matter in real
            jobs. You don't just learn concepts — you build, practice, and apply
            them.
          </p>
          <p>
            We also provide certifications on course completion to help you
            showcase your skills and stand out in the job market. With a
            supportive learning community and industry-focused content,
            SkillBridge helps turn ambition into achievement.
          </p>
        </div>
      </div>

      {/* ── Founder signature card ── */}
      <div
        className="mt-16 rounded-xl border border-gray-200 dark:border-white/10
                      bg-white dark:bg-slate-800 p-8 shadow-sm
                      flex flex-col sm:flex-row items-center gap-6"
      >
        {/* Avatar placeholder */}
        <div
          className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500/30
                        flex items-center justify-center shrink-0 text-xl font-bold text-teal-500 font-Poppins"
        >
          AJ
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins italic leading-relaxed">
            "SkillBridge was built with one belief — that where you come from
            should never limit how far you go. Every course here is designed to
            close that gap."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8 bg-teal-500" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white font-Poppins text-sm">
                Azra Javed
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-Poppins">
                Founder & CEO, SkillBridge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
