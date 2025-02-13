import React from "react";
import { FaBook } from "react-icons/fa"; // Example icon, you can customize it

const TopicCovered = ({ topics }) => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics?.map((topic, index) => (
          <div
            key={index}
            className="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 shadow-lg rounded-2xl flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
          >
            {/* Floating Icon */}
            <div className="absolute -top-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
              <FaBook size={30} className="text-blue-600 dark:text-blue-400" />
            </div>

            <h3 className="text-lg font-semibold text-white mt-8">{topic?.name}</h3>
            <p className="text-4xl font-extrabold text-white mt-2">
              {topic?.subtopics.length}
            </p>
            <p className="text-sm text-gray-200 mt-1">Subtopics</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicCovered;
