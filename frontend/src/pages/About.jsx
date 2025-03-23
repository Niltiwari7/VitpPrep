import React from 'react';
import { FaGithub, FaLinkedin, FaBook, FaCode, FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Header/>
      <div className="container mx-auto px-4 sm:px-6 py-16">
        {/* Platform Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            🎯 PatternPrep
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A Student-Built Platform for Structured Placement Preparation
          </p>
        </div>

        {/* Creator Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16 border border-gray-100 dark:border-gray-700 text-center">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="\src\assets\public\nilesh.png" // Add your profile image path
              alt="Nilesh Tiwari"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-100 dark:border-blue-800"
            />
            <h2 className="text-2xl font-bold">Nilesh Tiwari</h2>
            <p className="text-gray-600 dark:text-gray-300">Project Creator & Senior Student</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            "As someone who's been through the placement grind, I built PatternPrep to help 
            juniors avoid common pitfalls and focus on what really matters."
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/Niltiwari7" className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/in/nilesh-tiwari" className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        {/* Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaCode className="text-green-500" />
              What PatternPrep Offers
            </h2>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li>✅ Curated DSA Roadmaps</li>
              <li>📚 CS Fundamental Guides</li>
              <li>🎯 Pattern-Based Problem Solving</li>
              <li>📝 Interview Preparation Kits</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaBook className="text-purple-500" />
              Key Features
            </h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
              <div>🧩 50+ Coding Patterns</div>
              <div>📊 300+ Curated Problems</div>
              <div>💡 Visual Explanations</div>
              <div>⏱️ Time-Saving Structure</div>
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

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Start Learning Today!</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of VIT students using PatternPrep for their placement prep
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
              Explore DSA Patterns
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              View CS Modules
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;