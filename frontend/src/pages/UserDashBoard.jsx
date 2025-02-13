import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice.js";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from '@/components/ui/button'
const UserDashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userInfo || {});
  const darkMode = useSelector((state) => state.theme?.darkMode || false);

  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  // Reusable Card Component
  const Card = ({ imageUrl, title, description, buttonText }) => {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 w-full max-w-xs mx-auto transform transition-all hover:scale-105 hover:shadow-2xl mb-6">
        {/* Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
        />

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}
        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-md hover:scale-105 transition-all duration-300">
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        {/* Logo */}
        <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          PatternPrep
        </h3>

        {/* Right Section: Theme Toggle & Profile */}
        <div className="flex items-center space-x-7">
          {/* Logout Button */}
          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Logout
          </Button>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-700 dark:hover:bg-blue-400"
          >
            {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>

          {/* Profile Image */}
          <img
            className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-gray-300 dark:border-gray-600"
            src={user.imageUrl || "/assets/placeholder.png"} // Store in public/
            alt="Profile"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card
          imageUrl="src\assets\public\maqsds.png"
          title="Crack DSA Interviews"
          description="Master Data Structures and Algorithms with top coding questions asked by FAANG companies."
          buttonText="Start Learning"
        />

        <Card
          imageUrl="src\assets\public\oop.jpg"
          title="Object-Oriented Design"
          description="Understand OOP principles, design patterns, and best practices for scalable applications."
          buttonText="Explore OOP"
        />

        <Card
          imageUrl="src\assets\public\cn.png"
          title="Networking Essentials"
          description="Get a solid grasp on networking concepts like OSI model, TCP/IP, and cloud computing."
          buttonText="Learn More"
        />

        <Card
          imageUrl="src\assets\public\dbms.png"
          title="Database Management"
          description="Learn SQL queries, normalization, transactions, indexing, and more to ace DBMS interviews."
          buttonText="Start Practicing"
        />

        <Card
          imageUrl="src\assets\public\os.png"
          title="Operating Systems"
          description="Understand memory management, concurrency, process scheduling, and OS internals."
          buttonText="Explore Topics"
        />

        <Card
          imageUrl="src\assets\public\aptitude.png"
          title="Aptitude & Problem Solving"
          description="Sharpen your problem-solving skills with quantitative and logical reasoning challenges."
          buttonText="Solve Now"
        />

        <Card
          imageUrl="src\assets\public\lr.png"
          title="Logical Reasoning"
          description="Enhance your analytical thinking with logical puzzles, pattern recognition, and riddles."
          buttonText="Challenge Yourself"
        />
      </main>
    </div>
  );
};

export default UserDashBoard;
