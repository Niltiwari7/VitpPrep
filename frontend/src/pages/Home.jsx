import React, { useEffect, useState } from 'react';


const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`bg-gray-100 dark:bg-black transition duration-500`}>
      {/* Dark Mode Toggle */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Master Data Structures & Algorithms</h1>
          <p className="text-lg mb-8">Your one-stop solution for mastering DSA with topic-wise and category-wise patterns.</p>
          <a href="#topics" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Get Started
          </a>
        </div>
      </header>

      {/* Featured Topics Section */}
      <section id="topics" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 dark:text-white">Featured Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Dynamic Programming</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Learn about different types of pattern and their applications.</p>
              <a href="/arrays" className="text-blue-600 font-semibold">Explore</a>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Linked Lists</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Understand linked lists and their various operations.</p>
              <a href="/linked-lists" className="text-blue-600 font-semibold">Explore</a>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4">Trees</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Dive into tree data structures and their traversal methods.</p>
              <a href="/trees" className="text-blue-600 font-semibold">Explore</a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">Connect with fellow learners and enhance your DSA skills.</p>
          <a href="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className=" container mx-auto text-center">
          <p>&copy; 2025 Pattern Prep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;