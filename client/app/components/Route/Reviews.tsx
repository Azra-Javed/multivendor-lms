// "use client";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { FeaturedReviewCard, SideReviewCard } from "../Review/ReviewCard";
// import Link from "next/link";

// export const reviews = [
//   {
//     name: "Gene Bates",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     profession: "Student | Cambridge University",
//     comment:
//       "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. The courses cater to different skill levels and interests. Highly recommend!",
//     rating: 5,
//     tag: "Courses",
//   },
//   {
//     name: "Verna Santos",
//     avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     profession: "Full Stack Developer | Quarter Ltd.",
//     comment:
//       "Thanks for the amazing tutorials! The teaching style is outstanding, and the practical applications are extremely valuable. Highly recommend for anyone looking to enhance their programming skills.",
//     rating: 5,
//     tag: "Tutorials",
//   },
//   {
//     name: "Jay Gibbs",
//     avatar: "https://randomuser.me/api/portraits/men/2.jpg",
//     profession: "Computer Systems Engineering Student | Zimbabwe",
//     comment:
//       "Your tutorials are top-notch! Complex topics are explained clearly with real-world examples. It creates a supportive learning environment. Great work!",
//     rating: 5,
//     tag: "Community",
//   },
//   {
//     name: "Mina Davidson",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     profession: "Junior Web Developer | Indonesia",
//     comment:
//       "I was thoroughly impressed with E-learning's course range. Highly practical and engaging content that pushed me to grow every single day.",
//     rating: 5,
//     tag: "Courses",
//   },
//   {
//     name: "Rosemary Smith",
//     avatar: "https://randomuser.me/api/portraits/women/3.jpg",
//     profession: "Full Stack Web Developer | Algeria",
//     comment:
//       "Videos are detailed and cover everything. Beginners can complete integrated projects. Excited for more content!",
//     rating: 5,
//     tag: "Projects",
//   },
//   {
//     name: "Laura Mckenzie",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//     profession: "Full Stack Web Developer | Canada",
//     comment:
//       "E-learning focuses on practical applications. Lessons are clear, and projects are comprehensive. Highly recommended!",
//     rating: 5,
//     tag: "Practical",
//   },
// ];

// const Reviews = (props: any) => {
//   const [active, setActive] = useState(0);
//   const [fading, setFading] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const goTo = (idx: number) => {
//     if (fading || idx === active) return;
//     setFading(true);
//     setTimeout(() => {
//       setActive(idx);
//       setFading(false);
//     }, 300);
//   };

//   const next = () => goTo((active + 1) % reviews.length);
//   const prev = () => goTo((active - 1 + reviews.length) % reviews.length);

//   useEffect(() => {
//     timerRef.current = setInterval(next, 5000);
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [active]);

//   const featured = reviews[active];
//   const sideReviews = reviews
//     .map((r, i) => ({ ...r, origIdx: i }))
//     .filter((_, i) => i !== active)
//     .slice(0, 3);

//   return (
//     <section className="w-full max-w-6xl mx-auto px-6 py-20">
//       {/* ── Header ── */}
//       <div className="grid 1000px:grid-cols-2 gap-14 items-center mb-20">
//         {/* Left: text */}
//         <div className="text-center 1000px:text-left">
//           <h2 className="text-3xl sm:text-4xl 1000px:text-5xl font-semibold text-gray-900 dark:text-white leading-tight">
//             What Our <span className="text-teal-500">Students</span> Say About
//             Us
//           </h2>

//           <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto 1000px:mx-0">
//             Thousands of students have sharpened their development skills
//             through our practical courses, real-world projects, and supportive
//             community.
//           </p>

//           {/* Avatar strip */}
//           <div className="mt-10 flex items-center justify-center 1000px:justify-start gap-3">
//             <div className="flex -space-x-3">
//               {reviews.slice(0, 4).map((item, index) => (
//                 <img
//                   key={index}
//                   src={item.avatar}
//                   alt={item.name}
//                   className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
//                 />
//               ))}
//             </div>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               500K+ trusted users ·{" "}
//               <Link href={"/courses"}>
//                 {" "}
//                 <span className="text-teal-500 font-medium">View courses</span>
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Right: image */}
//         <div className="relative flex justify-center items-center">
//           <div className="absolute w-[300px] h-[300px] rounded-full hero_animation -z-10" />
//           <Image
//             src={require("../../../public/assets/review.png")}
//             alt="students"
//             width={400}
//             height={400}
//             className="object-contain max-h-[360px] relative z-10"
//           />
//         </div>
//       </div>

//       {/* ── Divider label ── */}
//       <div className="flex items-center gap-4 mb-10">
//         <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
//         <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 whitespace-nowrap">
//           Student Testimonials
//         </span>
//         <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
//       </div>

//       {/* ── Masonry: featured left + side column right ── */}
//       <div className="grid 1000px:grid-cols-[1fr_360px] gap-5 items-start">
//         {/* Featured card */}
//         <FeaturedReviewCard
//           item={featured}
//           fading={fading}
//           onPrev={prev}
//           onNext={next}
//         />

//         {/* Side cards + dots */}
//         <div className="flex flex-col gap-4">
//           {sideReviews.map((item, idx) => (
//             <SideReviewCard
//               key={item.origIdx}
//               item={item}
//               highlighted={idx === 0}
//               onClick={() => goTo(item.origIdx)}
//             />
//           ))}

//           {/* Dot indicators */}
//           <div className="flex items-center justify-center gap-2 pt-2">
//             {reviews.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => goTo(i)}
//                 className="rounded-full transition-all duration-300"
//                 style={{
//                   width: i === active ? "20px" : "6px",
//                   height: "6px",
//                   background: i === active ? "#14b8a6" : "#d1d5db",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reviews;
"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FeaturedReviewCard, SideReviewCard } from "../Review/ReviewCard";
import Link from "next/link";

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. The courses cater to different skill levels and interests. Highly recommend!",
    rating: 5,
    tag: "Courses",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Thanks for the amazing tutorials! The teaching style is outstanding, and the practical applications are extremely valuable. Highly recommend for anyone looking to enhance their programming skills.",
    rating: 5,
    tag: "Tutorials",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "Your tutorials are top-notch! Complex topics are explained clearly with real-world examples. It creates a supportive learning environment. Great work!",
    rating: 5,
    tag: "Community",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I was thoroughly impressed with E-learning's course range. Highly practical and engaging content that pushed me to grow every single day.",
    rating: 5,
    tag: "Courses",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Web Developer | Algeria",
    comment:
      "Videos are detailed and cover everything. Beginners can complete integrated projects. Excited for more content!",
    rating: 5,
    tag: "Projects",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full Stack Web Developer | Canada",
    comment:
      "E-learning focuses on practical applications. Lessons are clear, and projects are comprehensive. Highly recommended!",
    rating: 5,
    tag: "Practical",
  },
];

const Reviews = (props: any) => {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (fading || idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 300);
  };

  const next = () => goTo((active + 1) % reviews.length);
  const prev = () => goTo((active - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  const featured = reviews[active];
  const sideReviews = reviews
    .map((r, i) => ({ ...r, origIdx: i }))
    .filter((_, i) => i !== active)
    .slice(0, 3);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-6 pt-0 1000px:py-20">
      {/* ── Header ── */}
      <div className="grid 1000px:grid-cols-2 gap-10 1000px:gap-14 items-center mb-12 1000px:mb-20">
        {/* Left: text */}
        <div className="text-center 1000px:text-left">
          <h2
            className="text-2xl sm:text-3xl 1000px:text-5xl font-semibold
                         text-gray-900 dark:text-white leading-tight font-Poppins"
          >
            What Our <span className="text-teal-500">Students</span> Say About
            Us
          </h2>

          <p
            className="mt-4 text-sm sm:text-base 1000px:text-lg
                        text-gray-600 dark:text-gray-300
                        max-w-xl mx-auto 1000px:mx-0 font-Poppins"
          >
            Thousands of students have sharpened their development skills
            through our practical courses, real-world projects, and supportive
            community.
          </p>

          {/* Avatar strip — hidden on mobile, shown on desktop */}
          <div className="hidden 1000px:flex mt-10 items-center justify-start gap-3">
            <div className="flex -space-x-3">
              {reviews.slice(0, 4).map((item, index) => (
                <img
                  key={index}
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
              500K+ trusted users ·{" "}
              <Link href="/courses">
                <span className="text-teal-500 font-medium">View courses</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Right: image — hidden on mobile */}
        <div className="hidden 1000px:flex relative justify-center items-center">
          <div className="absolute w-[300px] h-[300px] rounded-full hero_animation -z-10" />
          <Image
            src={require("../../../public/assets/review.png")}
            alt="students"
            width={400}
            height={400}
            className="object-contain max-h-[360px] relative z-10"
          />
        </div>
      </div>

      {/* ── Divider label ── */}
      <div className="flex items-center gap-4 mb-8 1000px:mb-10">
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
        <span
          className="text-xs font-medium tracking-widest uppercase
                         text-gray-400 dark:text-gray-500 whitespace-nowrap font-Poppins"
        >
          Student Testimonials
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      </div>

      {/* ── Mobile: just the featured card + dots ── */}
      <div className="1000px:hidden">
        <FeaturedReviewCard
          item={featured}
          fading={fading}
          onPrev={prev}
          onNext={next}
        />

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 pt-5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "20px" : "6px",
                height: "6px",
                background: i === active ? "#14b8a6" : "#d1d5db",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: masonry featured left + side column right ── */}
      <div className="hidden 1000px:grid 1000px:grid-cols-[1fr_360px] gap-5 items-start">
        {/* Featured card */}
        <FeaturedReviewCard
          item={featured}
          fading={fading}
          onPrev={prev}
          onNext={next}
        />

        {/* Side cards + dots */}
        <div className="flex flex-col gap-4">
          {sideReviews.map((item, idx) => (
            <SideReviewCard
              key={item.origIdx}
              item={item}
              highlighted={idx === 0}
              onClick={() => goTo(item.origIdx)}
            />
          ))}

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "20px" : "6px",
                  height: "6px",
                  background: i === active ? "#14b8a6" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
