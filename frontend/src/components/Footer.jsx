import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bottom-0 w-full bg-blue-600 dark:bg-black text-gray-300 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="PatternPrep Logo"
              className="h-12 w-12 object-contain"
            />
            <h3 className="text-xl font-bold text-white">PatternPrep</h3>
          </div>
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-white transition duration-300 ease-in-out">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-white transition duration-300 ease-in-out">
              Contact
            </Link>
            <Link to="/faq" className="hover:text-white transition duration-300 ease-in-out">
              FAQ
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Copyright Text */}
          <p className="text-sm">&copy; 2025 PatternPrep. All rights reserved.</p>
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/Niltiwari7"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/nilesh-tiwari-bbb685215/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300 ease-in-out transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;