import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <header className="bg-gray-100 dark:bg-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="PatternPrep Logo"
            className="h-10 w-10 object-contain rounded-full"
          />
          <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
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
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-gray-200 dark:bg-gray-800">
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
                  setIsDarkMode(!isDarkMode);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
