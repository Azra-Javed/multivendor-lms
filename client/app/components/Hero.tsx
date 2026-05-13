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
    <section className="w-full min-h-[92vh] 1000px:min-h-[calc(100vh-64px)] flex flex-col 1000px:flex-row items-center max-w-6xl mx-auto px-6 py-12 1000px:py-0 gap-14">
      {/* Image */}
      <div className="relative w-full 1000px:w-[40%] flex justify-center items-center">
        {/* Decorative background */}
        <div className="absolute -z-10 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] 1000px:w-[520px] 1000px:h-[520px] 1500px:w-[620px] 1500px:h-[620px] rounded-full hero_animation "></div>
        <Image
          src={data?.layout?.banner?.image?.url}
          alt="banner"
          width={400}
          height={400}
          className="object-contain max-h-[360px] 1000px:max-h-[480px] relative z-10"
        />
      </div>

      {/* Content */}
      <div className="w-full 1000px:w-[60%] text-center 1000px:text-left flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl 1000px:text-5xl font-semibold text-gray-900 dark:text-white leading-tight">
          {data?.layout?.banner?.title}
        </h1>

        <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto 1000px:mx-0">
          {data?.layout?.banner?.subTitle}
        </p>

        {/* Search */}
        <div className="mt-8 w-full max-w-lg relative mx-auto 1000px:mx-0">
          <input
            type="text"
            placeholder="Search courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[44px] rounded-md border px-4 pr-12 text-sm outline-none dark:bg-slate-800 dark:border-white/10 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1 h-[36px] w-[36px] rounded-md bg-teal-500 flex items-center justify-center"
          >
            <BiSearch className="text-white" size={18} />
          </button>
        </div>

        {/* Trust */}
        <div className="mt-10 flex items-center justify-center 1000px:justify-start gap-3">
          <div className="flex -space-x-3">
            <Image
              src={require("../../public/assets/client-1.png")}
              alt="c1"
              className="rounded-full"
            />
            <Image
              src={require("../../public/assets/client-2.png")}
              alt="c2"
              className="rounded-full"
            />
            <Image
              src={require("../../public/assets/client-3.png")}
              alt="c3"
              className="rounded-full"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            500K+ trusted users ·{" "}
            <Link href="/courses" className="text-teal-500 font-medium">
              View courses
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
