// import Link from "next/link";

// type Props = {};

// const Footer = (props: Props) => {
//   return (
//     <footer>
//       <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
//       <br />
//       <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
//           <div className="space-y-3">
//             <h3 className="text-[20px] font-[600] text-black dark:text-white">
//               About
//             </h3>
//             <ul className="space-y-4">
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Our Story
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy-policy"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/faq"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   FAQ
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-[20px] font-[600] text-black dark:text-white">
//               Quick Links
//             </h3>
//             <ul className="space-y-4">
//               <li>
//                 <Link
//                   href="/courses"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Courses
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/profile"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   My Account
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/course-dashboard"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Course Dashboard
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-[20px] font-[600] text-black dark:text-white">
//               Social Links
//             </h3>
//             <ul className="space-y-4">
//               <li>
//                 <Link
//                   href="https://www.youtube.com/channel/UCHz6Sne9splmvm-q2w1_HWQ"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Youtube
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://www.instagram.com/shahriar_sajeeb_/"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   Instagram
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="https://www.github.com/shahriarsajeeb"
//                   className="text-base text-black dark:text-gray-300 dark:hover:text-white"
//                 >
//                   github
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
//               Contact Info
//             </h3>
//             <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
//               Call Us: 1-885-665-2022
//             </p>

//             <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
//               Address: +7011 Vermont Ave, Los Angeles, CA 90044
//             </p>

//             <p className="text-base text-black dark:text-gray-300 dark:hover:text-white  pb-2">
//               Mail Us: hello@elearning.com
//             </p>
//           </div>
//         </div>
//         <br />
//         <p className="text-center text-black dark:text-white">
//           Copyright © 2023 ELearning | All Rights Reserved
//         </p>
//       </div>
//       <br />
//     </footer>
//   );
// };

// export default Footer;
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-black py-8">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />

      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {/* About */}
          <div className="space-y-2">
            <h3 className="text-[18px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-[18px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/courses"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h3 className="text-[18px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://www.youtube.com/@azra-dev"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/azra-javed/"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Azra-Javed"
                  className="text-sm text-black dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <h3 className="text-[18px] font-[600] text-black dark:text-white pb-1">
              Contact Info
            </h3>
            <p className="text-sm text-black dark:text-gray-300 pb-2">
              Call Us: +92 304 8862233
            </p>
            <p className="text-sm text-black dark:text-gray-300 pb-2">
              Address: Chunian, District Kasur, Punjab, Pakistan
            </p>
            <p className="text-sm text-black dark:text-gray-300 pb-2">
              Email: iamazrajaved@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-black dark:text-white">
          Copyright © 2025 ELearning | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
