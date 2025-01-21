import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for smaller screens */}
      <button
        className="absolute top-4 left-4 text-gray-300 text-2xl md:hidden z-50"
        onClick={toggleSidebar}
      >
        {/* Hamburger Icon */}
        {isOpen ? (
          <span>&#x2715;</span> // Close Icon (X)
        ) : (
          <span>&#9776;</span> // Hamburger Icon (☰)
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 h-screen p-5 transform transition-transform duration-300 md:translate-x-0 md:w-64 md:block`}
      >
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 mb-8">
          <img
            src="/logo.png"
            alt="PatternPrep Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
          <h3 className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            PatternPrep
          </h3>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-100">Admin Panel</h2>
        <ul>
          <li>
            <Link
              to="/admin/profile"
              className="block py-2 px-4 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded transition duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/topics"
              className="block py-2 px-4 text-gray-300 hover:text-teal-400 hover:bg-gray-700 rounded transition duration-200"
            >
              Topics
            </Link>
          </li>
          <li>
            <Link
              to="/admin/subtopics"
              className="block py-2 px-4 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded transition duration-200"
            >
              Subtopics
            </Link>
          </li>
          <li>
            <Link
              to="/admin/questions"
              className="block py-2 px-4 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded transition duration-200"
            >
              Questions
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="block py-2 px-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition duration-200"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
