import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons

const Header = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme?.darkMode || false); // Ensure safe access to state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Theme toggle handler
  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <header className={`shadow-md ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="PatternPrep Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
          <h3 className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            PatternPrep
          </h3>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700"
          >
            SignUp
          </Link>
          <Link
            to="/about"
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700"
          >
            Contact Us
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition duration-300 hover:bg-blue-700"
          >
            {darkMode ? (
              <>
                <FaMoon size={20} /> 
              </>
            ) : (
              <>
                <FaSun size={20} /> 
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className={`lg:hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/signup"
                className="block bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                SignUp
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition duration-300 hover:bg-blue-700"
              >
                {darkMode ? (
                  <>
                    <FaMoon size={20} /> <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <FaSun size={20} /> <span>Light Mode</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
