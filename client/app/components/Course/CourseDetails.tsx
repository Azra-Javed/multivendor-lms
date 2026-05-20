import Ratings from "@/app/utils/Ratings";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseContentList from "./CourseContentList";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import Link from "next/link";
import CoursePlayer from "../../utils/CoursePlayer";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { FiShield, FiCode, FiAward, FiHeadphones } from "react-icons/fi";

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

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentengePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModel(true);
    }
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

  return (
    <>
      <div className="w-[90%] mx-auto py-10">
        <div className="w-full flex flex-col-reverse 800px:flex-row gap-10">
          {/* ── Left column ── */}
          <div className="w-full 800px:w-[65%]">
            {/* Course title */}
            <h1 className="text-2xl 800px:text-3xl font-semibold font-Poppins text-gray-900 dark:text-white leading-snug">
              {data.name}
            </h1>

            {/* Ratings + students row */}
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

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            {/* What you will learn */}
            <h2 className="text-xl font-semibold font-Poppins text-gray-900 dark:text-white mb-4">
              What you will learn
            </h2>
            <div className="grid grid-cols-1 800px:grid-cols-2 gap-3">
              {data.benefits?.map((item: any, index: number) => (
                <div className="flex items-start gap-3" key={index}>
                  <IoCheckmarkDoneOutline
                    size={18}
                    className="text-teal-500 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            {/* Prerequisites */}
            <h2 className="text-xl font-semibold font-Poppins text-gray-900 dark:text-white mb-4">
              Prerequisites
            </h2>
            <div className="space-y-3">
              {data.prerequisites?.map((item: any, index: number) => (
                <div className="flex items-start gap-3" key={index}>
                  <IoCheckmarkDoneOutline
                    size={18}
                    className="text-teal-500 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            {/* Course overview */}
            <h2 className="text-xl font-semibold font-Poppins text-gray-900 dark:text-white mb-4">
              Course Overview
            </h2>
            <CourseContentList data={data?.courseData} isDemo={true} />

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            {/* Course description */}
            <h2 className="text-xl font-semibold font-Poppins text-gray-900 dark:text-white mb-4">
              Course Details
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed whitespace-pre-line">
              {data.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10 my-8" />

            {/* Reviews */}
            <div className="flex items-center gap-3 mb-6">
              <Ratings rating={data?.ratings} />
              <h3 className="text-lg font-semibold font-Poppins text-gray-900 dark:text-white">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Course Rating · {data?.reviews?.length} Reviews
              </h3>
            </div>

            <div className="space-y-6">
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div key={index}>
                    <div className="flex gap-3">
                      <Image
                        src={
                          item.user.avatar
                            ? item.user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={44}
                        height={44}
                        alt=""
                        className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200 dark:border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                            {item.user.name}
                          </span>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                          {item.comment}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block font-Poppins">
                          {format(item.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Replies */}
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="flex gap-3 ml-14 mt-4" key={index}>
                        <Image
                          src={
                            i.user.avatar
                              ? i.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={36}
                          height={36}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200 dark:border-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                              {i.user.name}
                            </span>
                            <VscVerifiedFilled className="text-teal-500 text-base" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins">
                            {i.comment}
                          </p>
                          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block font-Poppins">
                            {format(i.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ── Right column: sticky purchase card ── */}
          <div className="w-full 800px:w-[35%]">
            <div className="sticky top-[100px] z-50">
              {/* Video player */}
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
                <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              </div>

              {/* Price block */}
              <div className="mt-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 overflow-hidden shadow-sm">
                <div className="h-1 w-full bg-teal-500" />
                <div className="p-5">
                  {/* Price row */}
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white font-Poppins">
                      {data.price === 0 ? "Free" : `$${data.price}`}
                    </span>
                    {data.estimatedPrice && (
                      <span className="text-base text-gray-400 dark:text-gray-500 line-through font-Poppins">
                        ${data.estimatedPrice}
                      </span>
                    )}
                    {discountPercentengePrice &&
                      Number(discountPercentengePrice) > 0 && (
                        <span className="text-sm font-semibold text-teal-500 font-Poppins">
                          {discountPercentengePrice}% off
                        </span>
                      )}
                  </div>

                  {/* CTA button */}
                  <div className="mt-4">
                    {isPurchased ? (
                      <Link
                        href={`/course-access/${data._id}`}
                        className="w-full flex items-center justify-center py-3 rounded-lg
                                   bg-teal-500 hover:bg-teal-600
                                   text-white text-sm font-semibold font-Poppins
                                   transition-colors duration-200"
                      >
                        Go to Course
                      </Link>
                    ) : (
                      <button
                        onClick={handleOrder}
                        className="w-full flex items-center justify-center py-3 rounded-lg
                                   bg-teal-500 hover:bg-teal-600
                                   text-white text-sm font-semibold font-Poppins
                                   transition-colors duration-200"
                      >
                        {data.price === 0
                          ? "Enroll for Free"
                          : `Buy Now · $${data.price}`}
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/10 my-4" />

                  {/* What's included */}
                  <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 font-Poppins mb-3">
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

      {/* Payment modal */}
      {open && (
        <div className="w-full h-screen bg-black/40 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-[500px] bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-teal-500" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white font-Poppins">
                  Complete your purchase
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10
                             text-gray-500 hover:text-gray-900 dark:hover:text-white
                             hover:border-gray-300 transition-all duration-200"
                >
                  <IoCloseOutline size={18} />
                </button>
              </div>
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
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
