import React from 'react';
import { FaGithub, FaLinkedin, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-r from-[#F3F4F6] to-[#e2e4e8] dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="PatternPrep Logo"
                className="h-12 w-12 object-contain animate-pulse"
              />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-300">
                PatternPrep
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Master technical interviews with curated resources and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                About Us
              </Link>
              <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                Courses
              </Link>
              <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                Blog
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Support</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                Contact Us
              </Link>
              <Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                FAQ
              </Link>
              <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:pl-2">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Niltiwari7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/nilesh-tiwari-bbb685215/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 PatternPrep. All rights reserved. 
          </p>
          
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
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