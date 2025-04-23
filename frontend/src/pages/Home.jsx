import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from '../components/Header';
import { FaCode, FaUsers, FaChartLine, FaRocket, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import Footer from '../components/Footer';

const HomePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <Header />


      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-28 overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Your Ultimate Placement Guide with VitpPrep
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8 max-w-2xl mx-auto text-gray-200"
          >
            Accelarate your placement journey with VitpPrep. we have cumulated all the neccessary resources to help you ace your placement journey.
            here you will find all the resources you need to ace your placement journey. All the best!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="group relative inline-flex rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-blue-500 to-black-500 hover:via-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Link
                to="/signin"
                className="relative flex items-center justify-center w-full h-full px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300"
              >
                <FaRocket className="mr-2 z-10" />
                <span className="z-10">Start Learning Now</span>
              </Link>
            </div>
          </motion.div>

        </div>


        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </motion.section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-16 dark:text-white"
          >
            Why Choose VitpPrep?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
          >
            <FeatureCard
              icon={<FaCode className="w-8 h-8" />}
              title="Pattern-Based Learning"
              description="Master Data Structures and Algorithms through structured problem patterns and real-world applications."
            />
            <FeatureCard
              icon={<FaChartLine className="w-8 h-8" />}
              title="Comprehensive CS Notes"
              description="Access well-structured notes on core Computer Science fundamentals, curated from real-world experience."
            />
            <FeatureCard
              icon={<FaLightbulb className="w-8 h-8" />}
              title="Master Aptitude with Structured Learning"
              description="Get access to well-organized content that simplifies learning and helps you focus on what really matters."
            />

          </motion.div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-16 dark:text-white"
          >
            Featured Learning Paths
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TopicCard
              title="Top Interview Questions - Pattern Wise"
              description="Master frequently asked interview questions by understanding their underlying patterns and approaches."
              icon={<FaGraduationCap />}
              path="/top-interview-questions-dsa"
            />
            <TopicCard
              title="OOPs Concepts & Notes"
              description="Deep dive into Object-Oriented Programming with structured notes and real-world examples."
              icon={<FaGraduationCap />}
              path="/oops"
            />
            <TopicCard
              title="DBMS Essentials"
              description="Explore key concepts of Database Management Systems with concise and easy-to-understand notes."
              icon={<FaGraduationCap />}
              path="/dbms"
            />
            <TopicCard
              title="Operating System Fundamentals"
              description="Learn core OS concepts, including memory management, process scheduling, and concurrency."
              icon={<FaGraduationCap />}
              path="/os"
            />
            <TopicCard
              title="Computer Networks Guide"
              description="Understand networking fundamentals, protocols, and security concepts for technical interviews."
              icon={<FaGraduationCap />}
              path="/computer-network"
            />


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Start Your Journey Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your placement journey begins here! Prepare with structured resources, guidance to crack your dream job.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                <FaRocket className="mr-2" />
                Get Started Free
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

     <Footer/>

    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

const TopicCard = ({ title, description, icon, path }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="group bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <div className="p-8">
      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <Link
        to={path}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        Explore Path
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </motion.div>
);

export default HomePage;