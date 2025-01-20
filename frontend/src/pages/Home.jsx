import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import Header from '../components/Header';
const HomePage = () => {
   
  return (
    <div className={`bg-gray-100 dark:bg-black transition duration-500`}>
      <Header/>
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Master Data Structures & Algorithms</h1>
          <p className="text-lg mb-8">Your one-stop solution for mastering DSA with topic-wise and category-wise patterns.</p>
          <Link to='/signin' className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Get Started
          </Link>
        </div>
      </header>

      {/* Featured Topics Section */}
      <section id="topics" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 dark:text-white">Featured Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 dark:text-gray-200">Dynamic Programming</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Learn about different types of pattern and their applications.</p>
              <a href="/arrays" className="text-blue-600 font-semibold">Explore</a>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 dark:text-gray-200">Linked Lists</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Understand linked lists and their various operations.</p>
              <a href="/linked-lists" className="text-blue-600 font-semibold">Explore</a>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 dark:text-gray-200">Trees</h3>
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
    </div>
  );
};

export default HomePage;