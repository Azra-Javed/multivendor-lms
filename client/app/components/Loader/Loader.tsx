"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-base font-medium text-gray-600 dark:text-gray-300 tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
