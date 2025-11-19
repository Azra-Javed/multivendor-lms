import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Loading text */}
        <p className="mt-4 text-gray-700 dark:text-gray-200 font-medium text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
