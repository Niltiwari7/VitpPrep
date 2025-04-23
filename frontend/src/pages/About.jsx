import React from 'react';
import { FaGithub, FaLinkedin, FaBook, FaCode, FaUserCircle, FaMedal } from 'react-icons/fa';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { SiLeetcode } from 'react-icons/si';

const About = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10">
        <div className="container mx-auto px-4 sm:px-6 py-16">
          {/* Platform Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              🎯 VitpPrep
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A Student-Built Platform for Structured Placement Preparation
            </p>
          </div>

          {/* Creator Introduction */}

          {/* Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaCode className="text-green-500" />
                What VitpPrep Offers
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li>✅ Curated Placement Material.</li>
                <li>📚 CS Fundamental Guides.</li>
                <li>🎯 Pattern-Based Problem Solving.</li>
                <li>📝 Free resume session.(Upcoming)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaBook className="text-purple-500" />
                Key Features
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <div>🧩 Pattern wise DSA preparation</div>
                <div>📊 Core subject Notes</div>
                <div>⏱️ Time-Saving Structure</div>
                <div>📝 Resume Building</div>
              </div>
            </div>
          </div>

          {/* Why It Works */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Why PatternPrep Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-bold mb-2">Tested Approach</h3>
                <p className="text-sm">Methods verified through personal placement journey</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold mb-2">Focus on Essentials</h3>
                <p className="text-sm">Only what you need for placements</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-bold mb-2">Student Perspective</h3>
                <p className="text-sm">Built by someone who understands your challenges</p>
              </div>
            </div>
          </div>


          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16 border border-gray-100 dark:border-gray-700">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img
                  src="\nilesh.png"
                  alt="Nilesh Tiwari"
                  className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-100 dark:border-blue-800 shadow-lg transform transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-600 transition-all duration-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Nilesh Tiwari
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Creator of PatternPrep • Senior Student
              </p>
            </div>

            {/* Quote */}
            <div className="mb-8 px-6 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-400 dark:border-blue-600">
              <p className="text-gray-700 dark:text-blue-200 italic font-medium text-center">
                "Built PatternPrep to help juniors avoid common pitfalls and focus on what really matters in placements."
              </p>
            </div>

            {/* Achievements Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center flex items-center justify-center gap-2">
                <FaMedal className="w-6 h-6 text-yellow-500 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Key Achievements
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '📚', text: '4 Research Papers (Springer, IEEE)' },

                  { icon: '🏆', text: 'Top 30 in SIH Internal (534+ teams)' },
                  { icon: '🎯', text: '1500+ DSA Problems Solved' },
                  { icon: '💡', text: 'Patent Published: Vehicle Number Plate Recognition System' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center gap-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
              <a
                href="https://github.com/Niltiwari7"
                className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-600 hover:-translate-y-0.5 w-full md:w-auto justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nilesh-tiwari-bbb685215/"
                className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-600 hover:-translate-y-0.5 w-full md:w-auto justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">LinkedIn</span>
              </a>

              <a
                href="https://leetcode.com/u/nilestiwari_7/"
                className="flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-gray-700 rounded-full transition-all hover:bg-gray-200 dark:hover:bg-gray-600 hover:-translate-y-0.5 w-full md:w-auto justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLeetcode className="w-5 h-5 text-[#FFA116] dark:text-[#FFA116]" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">LeetCode</span>
              </a>
            </div>

          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Start Learning Today!</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Your placement journey begins here! Prepare with structured resources, guidance to crack your dream job.
              Stay consistent, keep practicing, and believe in yourself! 🚀
            </p>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              I wish you all the best for your future. Let's turn your hard work into success!
            </p>

            <div className="flex justify-center gap-6">
              <Link to='/signup' className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Get Started
              </Link>

            </div>
          </div>

        </div>
        <Footer className="fixed bottom-0 w-full pt-20" />
      </div>
    </>
  );
};

export default About;