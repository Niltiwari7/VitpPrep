import React from "react";
import { FaGithub, FaLinkedin, FaRegArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-6 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
             
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-500 dark:from-blue-400 dark:to-purple-300 animate-pulse">
               VitpPrep
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Master technical interviews with curated resources and expert
              guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-200">
              Resources
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2"
              >
                About Us
              </Link>
             
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-200">
              Support
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/contact"
                className="hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2"
              >
                FAQ
              </Link>
              
            </nav>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-200">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Niltiwari7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6 text-gray-800 dark:text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/nilesh-tiwari-bbb685215/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6 text-gray-800 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            © 2025 PatternPrep. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <FaRegArrowAltCircleUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
