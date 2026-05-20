import {
  FiUser,
  FiBook,
  FiCreditCard,
  FiShield,
  FiUsers,
  FiInfo,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";

type Props = {};

const policies = [
  {
    number: "01",
    title: "Account Responsibility",
    body: "You are responsible for maintaining the confidentiality of your account information. Any activity under your account is your responsibility.",
    icon: <FiUser className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "02",
    title: "Course Access",
    body: "Courses are for personal learning purposes only. Sharing, redistributing, or reselling content is strictly prohibited.",
    icon: <FiBook className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "03",
    title: "Payments & Refunds",
    body: "All payments are securely processed. Refunds are provided according to our Refund Policy within the eligible time window.",
    icon: <FiCreditCard className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "04",
    title: "Intellectual Property",
    body: "All course materials, videos, and resources are the intellectual property of E-Learning. Unauthorized use is not allowed.",
    icon: <FiShield className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "05",
    title: "Community Guidelines",
    body: "Respectful behavior is required. Harassment, abuse, or sharing inappropriate content is not tolerated under any circumstances.",
    icon: <FiUsers className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "06",
    title: "Limitation of Liability",
    body: "E-Learning provides educational content and guidance. Results depend on individual effort and circumstances.",
    icon: <FiInfo className="w-5 h-5 text-teal-500" />,
  },
  {
    number: "07",
    title: "Changes to Terms",
    body: "We may update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.",
    icon: <FiRefreshCw className="w-5 h-5 text-teal-500" />,
  },
];

const Policy = (props: Props) => {
  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto py-20">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-teal-500">
          <span className="w-5 h-px bg-teal-500 inline-block" />
          Legal
          <span className="w-5 h-px bg-teal-500 inline-block" />
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl 1000px:text-5xl font-semibold leading-tight text-gray-900 dark:text-white font-Poppins">
          Platform <span className="text-teal-500">Terms & Conditions</span>
        </h1>

        <p className="mt-5 text-base text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
          By using our platform, you agree to these terms. These rules ensure a
          safe, fair, and effective learning experience for everyone.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mt-12 mb-12">
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {policies.length} policies
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      </div>

      {/* Policy cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 1000px:grid-cols-3">
        {policies.map((policy) => (
          <div
            key={policy.number}
            className="rounded-xl border border-gray-200 dark:border-white/10
                       bg-white dark:bg-slate-800
                       p-6 shadow-sm
                       hover:border-teal-500/50 hover:shadow-md hover:-translate-y-0.5
                       transition-all duration-200"
          >
            {/* Icon + number row */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                {policy.icon}
              </div>
              <span className="text-xs font-bold text-gray-300 dark:text-white/20 font-Poppins">
                {policy.number}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white font-Poppins mb-2">
              {policy.title}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-Poppins leading-relaxed">
              {policy.body}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom agreement note */}
      <div
        className="mt-12 rounded-xl border border-gray-200 dark:border-white/10
                      bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
      >
        <div className="h-1 w-full bg-teal-500" />
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
            <FiCheckCircle className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
            By using{" "}
            <span className="text-teal-500 font-medium">E-Learning</span>, you
            agree to follow these guidelines and ensure a positive experience
            for yourself and the community. If you have any questions, feel free
            to{" "}
            <a
              href="mailto:iamazrajaved@gmail.com"
              className="text-teal-500 font-medium hover:underline"
            >
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Policy;
