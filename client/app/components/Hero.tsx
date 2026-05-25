import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Loader from "./Loader/Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/courses?title=${search}`);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="w-full min-h-[92vh]  1000px:min-h-[calc(100vh-64px)] flex flex-col 1000px:flex-row items-center justify-center max-w-6xl mx-auto px-6 sm:px-6 md:px-8 1000px:px-10 py-10 1000px:py-0 gap-8 lg:gap-18 overflow-hidden">
      {/* IMAGE SECTION */}
      <div className="relative w-full 1000px:w-[40%] flex justify-center items-center">
        {/* Animated Background */}
        <div
          className="
            absolute 
            -z-10
            w-[180px] h-[180px]
            sm:w-[240px] sm:h-[240px]
            md:w-[280px] md:h-[280px]
            1000px:w-[410px] 1000px:h-[410px]
           
            rounded-full hero_animation
          "
        />

        <Image
          src={data?.layout?.banner?.image?.url}
          alt="banner"
          width={400}
          height={400}
          priority
          className="
            object-contain
            w-[220px]
            sm:w-[280px]
            md:w-[320px]
           
            1000px:w-[420px]
            h-auto
            relative
            z-10
          "
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="w-full 1000px:w-[60%] flex flex-col justify-center text-center 1000px:text-left">
        {/* HEADING */}
        <h1
          className="
            font-semibold
            text-[24px]
            leading-[34px]
            sm:text-[32px]
            sm:leading-[42px]
          
            1000px:text-4xl
            1000px:leading-tight
            text-gray-900
            dark:text-white
            md:mt-5
            1000px:mt-0
          "
        >
          {data?.layout?.banner?.title}
        </h1>

        {/* SUBTITLE */}
        <p
          className="
            mt-5
            text-[14px]
            sm:text-[15px]
            md:text-lg
            leading-[24px]
            text-gray-600
            dark:text-gray-300
            max-w-xl
            mx-auto
            1000px:mx-0
          "
        >
          {data?.layout?.banner?.subTitle}
        </p>

        {/* SEARCH BAR */}
        <div className="w-full flex justify-center 1000px:justify-start">
          <div className="relative md:mt-8 mt-4 w-full sm:w-[90%] md:w-[80%] 1000px:w-[88%]">
            <input
              type="text"
              placeholder="Search Courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="
                bg-transparent
                border
                
                dark:border-white/10
                dark:bg-slate-800
                dark:text-white
                rounded-[8px]
                p-3
                pr-14
                w-full
                h-[46px]
                sm:h-[50px]
                outline-none
                text-sm
                sm:text-base
              "
            />

            <button
              onClick={handleSearch}
              className="
                absolute
                right-1
                top-1
                h-[38px]
                w-[38px]
                sm:h-[42px]
                sm:w-[42px]
                bg-[#37a39a]
                rounded-md
                flex
                items-center
                justify-center
                hover:bg-[#2d8f87]
                transition
              "
            >
              <BiSearch className="text-white text-[20px]" />
            </button>
          </div>
        </div>

        {/* TRUSTED USERS */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            1000px:justify-start
            gap-4
          "
        >
          {/* USERS IMAGES */}
          <div className="flex items-center -space-x-3">
            <Image
              src={require("../../public/assets/client-1.png")}
              alt="client-1"
              width={48}
              height={48}
              className="rounded-full border-2 border-white dark:border-slate-900 w-10 h-10 sm:w-11 sm:h-11"
            />

            <Image
              src={require("../../public/assets/client-2.png")}
              alt="client-2"
              width={48}
              height={48}
              className="rounded-full border-2 border-white dark:border-slate-900 w-10 h-10 sm:w-11 sm:h-11"
            />

            <Image
              src={require("../../public/assets/client-3.png")}
              alt="client-3"
              width={48}
              height={48}
              className="rounded-full border-2 border-white dark:border-slate-900 w-10 h-10 sm:w-11 sm:h-11"
            />
          </div>

          {/* TEXT */}
          <p
            className="
              text-center
              1000px:text-left
              text-sm
              sm:text-base
              text-gray-600
              dark:text-gray-300
              leading-[24px]
            "
          >
            500K+ trusted users ·{" "}
            <Link
              href="/courses"
              className="text-[#37a39a] font-[600] hover:underline"
            >
              View Courses
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
