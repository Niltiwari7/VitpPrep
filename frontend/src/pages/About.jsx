import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600 dark:text-blue-400">
          About Us
        </h1>
        <p className="text-center text-lg max-w-2xl mx-auto mb-8">
          Welcome to <span className="font-bold">PatternPrep</span>! Our mission is to help you master 
          patterns, problem-solving, and coding challenges, making your journey to technical excellence smooth and enjoyable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p>
              At PatternPrep, we aim to empower developers and learners to hone their coding skills 
              by providing intuitive resources, interactive tutorials, and a collaborative community. 
              Whether you're preparing for interviews or leveling up your knowledge, we’ve got you covered.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6">
              <li>Comprehensive learning materials tailored to your needs.</li>
              <li>Structured resources for each topic in Data Structures.</li>
              <li>A supportive community of fellow learners and mentors.</li>
              <li>Focused preparation on coding patterns for real-world problems.</li>
              <li>Regularly updated content to keep you ahead in the tech world.</li>
            </ul>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
          <p className="text-center mb-4">
            We believe in fostering a culture of learning, collaboration, and innovation. Our core values include:
          </p>
          <ul className="list-disc pl-6">
            <li>Integrity: We uphold the highest standards of honesty and transparency.</li>
            <li>Community: We thrive on collaboration and support among our members.</li>
            <li>Excellence: We strive for the best in everything we do.</li>
            <li>Innovation: We embrace change and encourage creative solutions.</li>
          </ul>
        </div>

        {/* Success Stories Section */}
        {/* <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Success Stories</h2>
          <p className="text-center mb-6">
            Hear from our users who have transformed their coding skills with PatternPrep:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-semibold">John Doe</h3>
              <p>"PatternPrep helped me land my dream job! The resources were invaluable during my interview preparation."</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-semibold">Jane Smith</h3>
              <p>"The community support and interactive tutorials made learning so much easier and enjoyable!"</p>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us Today!</h2>
          <p className="mb-6">
            Start your journey with PatternPrep and transform the way you solve problems. 
            Sign up now to unlock all the resources and tools available for you!
          </p>
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;