import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 mt-10">
      <div className="w-[95%] 800px:max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand column — full width on mobile */}
          <div className="hidden md:block col-span-2 md:col-span-1 space-y-3">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins">
              E<span className="text-teal-500">Learning</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-Poppins leading-relaxed max-w-[220px]">
              Empowering developers with practical skills through real-world
              courses and a supportive community.
            </p>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-900 dark:text-white font-Poppins">
              About
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Privacy Policy", href: "/policy" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-gray-500 dark:text-gray-400
                               hover:text-teal-500 dark:hover:text-teal-400
                               transition-colors duration-200 font-Poppins"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-900 dark:text-white font-Poppins">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Courses", href: "/courses" },
                { label: "My Account", href: "/profile" },
                { label: "Course Dashboard", href: "/profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs md:text-sm text-gray-500 dark:text-gray-400
                               hover:text-teal-500 dark:hover:text-teal-400
                               transition-colors duration-200 font-Poppins"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-xs  md: text-sm font-semibold tracking-widest uppercase text-gray-900 dark:text-white font-Poppins">
              Contact
            </h3>
            <ul className="space-y-2">
              {[
                { label: "+92 304 8862233", href: "tel:+923048862233" },
                {
                  label: "iamazrajaved@gmail.com",
                  href: "mailto:iamazrajaved@gmail.com",
                },
                { label: "Chunian, Kasur, Punjab", href: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-xs md:text-sm text-gray-500 dark:text-gray-400
                               hover:text-teal-500 dark:hover:text-teal-400
                               transition-colors duration-200 font-Poppins"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-white/10 mt-8 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-Poppins">
            © 2026 <span className="text-teal-500 font-medium">ELearning</span>{" "}
            · All Rights Reserved
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.youtube.com/@azra-dev"
              target="_blank"
              aria-label="YouTube"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:border-teal-500 hover:text-teal-500
                         dark:hover:border-teal-500 dark:hover:text-teal-400
                         transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>

            <Link
              href="https://www.linkedin.com/in/azra-javed/"
              target="_blank"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:border-teal-500 hover:text-teal-500
                         dark:hover:border-teal-500 dark:hover:text-teal-400
                         transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>

            <Link
              href="https://github.com/Azra-Javed"
              target="_blank"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:border-teal-500 hover:text-teal-500
                         dark:hover:border-teal-500 dark:hover:text-teal-400
                         transition-all duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
