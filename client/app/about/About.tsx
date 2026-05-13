const About = () => {
  return (
    <div className="text-black dark:text-white py-12">
      <div className="w-[90%] 800px:w-[80%] m-auto ">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl 1000px:text-5xl font-semibold leading-tight text-center">
          What is <span className="text-gradient">E-Learning?</span>
        </h1>

        {/* Intro / Description */}
        <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-Poppins leading-relaxed">
          E-Learning is a modern Learning Management System (LMS) built to help
          students and professionals grow with confidence. We offer structured,
          high-quality courses in programming, web development, data science,
          and other in-demand tech fields — all designed for real-world impact.
        </p>

        {/* Long content (readable block) */}
        <div className="mt-8 max-w-3xl mx-auto text-left text-base sm:text-lg text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed space-y-6">
          <p>
            Our mission is simple: make quality education accessible to
            everyone. Whether you are just starting your journey or already
            working in the tech industry, E-Learning gives you the tools,
            guidance, and structure you need to move forward.
          </p>

          <p>
            Through interactive lessons, hands-on projects, quizzes, and guided
            learning paths, we focus on practical skills that matter in real
            jobs. You don’t just learn concepts — you build, practice, and apply
            them.
          </p>

          <p>
            We also provide certifications on course completion to help you
            showcase your skills and stand out in the job market. With a
            supportive learning community and industry-focused content,
            E-Learning helps turn ambition into achievement.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 text-center">
          <span className="text-lg sm:text-xl font-semibold">Azra Javed</span>
          <h5 className="text-base sm:text-lg font-Poppins text-gray-700 dark:text-gray-300">
            Founder & CEO, E-Learning
          </h5>
        </div>
      </div>
    </div>
  );
};

export default About;
