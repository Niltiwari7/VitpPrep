import React from 'react';
import { FaCode, FaGithub, FaGlobe, FaLinkedin, FaLocationArrow, FaUniversity, FaEnvelope } from 'react-icons/fa';

const Profile = () => {
    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
                <img
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                    src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                    alt="Profile"
                />
                <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    Nilesh Tiwari
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Full Stack Developer</p>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                    <a
                        href="https://github.com/nileshtiwari07"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://leetcode.com/nileshtiwari07"
                        className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaCode size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nilesh-tiwari-7b6b3b1b7"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-700 transition"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="https://vercel.com/nileshtiwari"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
                        target="_blank" rel="noopener noreferrer"
                    >
                        <FaGlobe size={20} />
                    </a>
                </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300 dark:border-gray-700"></div>

            {/* Contact Info */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-600 dark:text-gray-300" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">Email</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            nilesh.tiwari07@pm.me
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaLocationArrow className="text-gray-600 dark:text-gray-300" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">Location</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Uttar Pradesh</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <FaUniversity className="text-gray-600 dark:text-gray-300" />
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">College</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Vellore Institute of Technology
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-300 dark:border-gray-700"></div>

            {/* Skills */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {['C++', 'Java', 'TailwindCSS', 'JavaScript', 'Python', 'React'].map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
