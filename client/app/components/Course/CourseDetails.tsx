"use client";

import Ratings from "@/app/utils/Ratings";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiAward, FiCode, FiHeadphones, FiShield } from "react-icons/fi";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "../../utils/CoursePlayer";
import CheckOutForm from "../Payment/CheckOutForm";
import { useTheme } from "next-themes";
import CourseContentList from "./CourseContentList";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setOpen: openAuthModel,
  setRoute,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  // only show discount when estimatedPrice is actually higher than price
  const discountPercentage =
    data?.estimatedPrice && data.estimatedPrice > data.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;

  const discountPercentengePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user?.courses?.some((item: any) => item._id === data._id) || false;

  const isCourseOwner =
    user && (user._id === data?.createdBy?._id || user._id === data?.createdBy);

  const handleOrder = () => {
    // no user → login
    if (!user) {
      setRoute("Login");
      openAuthModel(true);
      return;
    }

    // owner → manage course
    if (isCourseOwner) {
      router.push(`/course-access/${data._id}`);
      return;
    }

    // already purchased → go to course
    if (isPurchased) {
      router.push(`/course-access/${data._id}`);
      return;
    }

    // otherwise → checkout
    setOpen(true);
  };

  const includes = [
    {
      icon: <FiCode className="w-4 h-4 text-teal-500" />,
      label: "Source code included",
    },
    {
      icon: <FiShield className="w-4 h-4 text-teal-500" />,
      label: "Full lifetime access",
    },
    {
      icon: <FiAward className="w-4 h-4 text-teal-500" />,
      label: "Certificate of completion",
    },
    {
      icon: <FiHeadphones className="w-4 h-4 text-teal-500" />,
      label: "Premium support",
    },
  ];

  //theme
  const { resolvedTheme } = useTheme();
  console.log("resolvedTheme:", resolvedTheme);
  return (
    <>
      <div className="w-[92%] mx-auto py-12">
        <div className="flex flex-col-reverse 800px:flex-row gap-12">
          {/* ── Left column ── */}
          <div className="w-full 800px:w-[65%]">
            {/* Course title */}
            <h1
              className="text-2xl 800px:text-3xl font-semibold
                           text-gray-900 dark:text-white font-Poppins leading-snug"
            >
              {data.name}
            </h1>

            {/* Ratings + students */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Ratings rating={data.ratings} />
                <span className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                  {data.reviews?.length} Reviews
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                {data.purchased} Students
              </span>
            </div>

            <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

            {/* What you will learn */}
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white
                           font-Poppins mb-4"
            >
              What you will learn
            </h2>
            <div className="grid grid-cols-1 800px:grid-cols-2 gap-3">
              {data.benefits?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <IoCheckmarkDoneOutline
                    className="text-teal-500 mt-0.5 shrink-0"
                    size={18}
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

            {/* Prerequisites */}
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white
                           font-Poppins mb-4"
            >
              Prerequisites
            </h2>
            <div className="space-y-3">
              {data.prerequisites?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <IoCheckmarkDoneOutline
                    className="text-teal-500 mt-0.5 shrink-0"
                    size={18}
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

            {/* Course overview */}
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white
                           font-Poppins mb-4"
            >
              Course Overview
            </h2>
            <CourseContentList data={data?.courseData} isDemo />

            <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

            {/* Course description */}
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white
                           font-Poppins mb-4"
            >
              Course Details
            </h2>
            <p
              className="text-sm text-gray-600 dark:text-gray-300
                          font-Poppins leading-relaxed whitespace-pre-line"
            >
              {data.description}
            </p>

            {/* Reviews — only shown when reviews exist */}
            {data?.reviews?.length > 0 && (
              <>
                <div className="my-7 h-px bg-gray-200 dark:bg-white/10" />

                <div className="flex items-center gap-3 mb-6">
                  <Ratings rating={data?.ratings} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-Poppins">
                    {data?.ratings?.toFixed(2)} · {data?.reviews?.length}{" "}
                    Reviews
                  </h3>
                </div>

                <div className="space-y-4">
                  {[...(data?.reviews || [])]
                    .reverse()
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl border border-gray-200 dark:border-white/10
                                 bg-white dark:bg-slate-800"
                      >
                        <div className="flex gap-3">
                          <Image
                            src={
                              item.user.avatar?.url ||
                              "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={44}
                            height={44}
                            alt=""
                            className="w-11 h-11 rounded-full object-cover shrink-0
                                     border border-gray-200 dark:border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                                {item.user.name}
                              </span>
                              <Ratings rating={item.rating} />
                            </div>
                            <p
                              className="text-sm text-gray-600 dark:text-gray-300
                                        font-Poppins leading-relaxed"
                            >
                              {item.comment}
                            </p>
                            <span
                              className="text-xs text-gray-400 dark:text-gray-500
                                           font-Poppins mt-1 block"
                            >
                              {format(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* ── Right column: sticky purchase card ── */}
          <div className="w-full 800px:w-[35%]">
            <div className="sticky top-[100px] space-y-5">
              {/* Video player */}
              <div
                className="rounded-xl overflow-hidden border border-gray-200
                              dark:border-white/10 shadow-sm"
              >
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              </div>

              {/* Price card */}
              <div
                className="rounded-xl border border-gray-200 dark:border-white/10
                              bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
              >
                <div className="h-1 w-full bg-teal-500" />

                <div className="p-5">
                  {/* Price row */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white font-Poppins">
                      {data.price === 0 ? "Free" : `$${data.price}`}
                    </span>
                    {data?.estimatedPrice &&
                      data.estimatedPrice > data.price && (
                        <>
                          <span
                            className="text-sm text-gray-400 dark:text-gray-500
                                         line-through font-Poppins"
                          >
                            ${data.estimatedPrice}
                          </span>
                          <span className="text-sm font-semibold text-teal-500 font-Poppins">
                            {discountPercentengePrice}% off
                          </span>
                        </>
                      )}
                  </div>

                  {/* CTA button */}
                  <button
                    onClick={() => handleOrder()}
                    className="w-full py-2.5 rounded-lg text-sm font-semibold
                               font-Poppins bg-teal-500 hover:bg-teal-600
                               text-white transition-colors duration-200"
                  >
                    {!user
                      ? "Buy Course"
                      : isCourseOwner
                        ? "Manage Course"
                        : isPurchased
                          ? "Go to Course"
                          : data.price === 0
                            ? "Enroll for Free"
                            : `Buy Now · $${data.price}`}
                  </button>

                  {/* Owner hint */}
                  {isCourseOwner && (
                    <p
                      className="mt-2 text-xs text-center text-gray-400
                                  dark:text-gray-500 font-Poppins"
                    >
                      You created this course
                    </p>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/10 my-4" />

                  {/* Includes */}
                  <p
                    className="text-xs font-semibold uppercase tracking-wider
                                text-gray-400 dark:text-gray-500 font-Poppins mb-3"
                  >
                    This course includes
                  </p>
                  <ul className="space-y-2.5">
                    {includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        {item.icon}
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm
                        flex items-center justify-center px-4"
        >
          <div
            className="w-full max-w-[520px] bg-white dark:bg-slate-800
                          rounded-2xl border border-gray-200 dark:border-white/10
                          shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-Poppins">
                  Checkout
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                             border border-gray-200 dark:border-white/10
                             text-gray-500 dark:text-gray-400
                             hover:border-teal-500 hover:text-teal-500
                             transition-all duration-200"
                >
                  <IoCloseOutline size={18} />
                </button>
              </div>

              {stripePromise && clientSecret && (
                <Elements
                  key={resolvedTheme}
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: resolvedTheme === "dark" ? "night" : "stripe",
                      variables: {
                        colorPrimary: "#14b8a6",
                        colorBackground:
                          resolvedTheme === "dark" ? "#0f172a" : "#ffffff",
                        colorText:
                          resolvedTheme === "dark" ? "#e2e8f0" : "#111827",
                        colorDanger: "#f87171",
                        borderRadius: "8px",
                        fontFamily: "Poppins, sans-serif",
                      },
                    },
                  }}
                >
                  <CheckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
