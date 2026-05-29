"use client";

export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                    bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          {/* Track */}
          <div
            className="absolute inset-0 rounded-full
                          border-[3px] border-gray-100 dark:border-white/10"
          />
          {/* Spinning arc */}
          <div
            className="absolute inset-0 rounded-full
                          border-[3px] border-transparent
                          border-t-teal-500
                          animate-spin"
          />
        </div>

        {/* Brand + message */}
        <div className="text-center">
          <p className="text-base font-semibold text-gray-900 dark:text-white font-Poppins">
            Skill<span className="text-teal-500">Bridge</span>
          </p>
          <p className="text-s text-gray-400 dark:text-gray-500 font-Poppins mt-1">
            Loading, please wait...
          </p>
        </div>
      </div>
    </div>
  );
}
