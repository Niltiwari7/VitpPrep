import React from 'react';
import { FaCode, FaGithub, FaGlobe, FaLinkedin, FaLocationArrow, FaUniversity, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { useSelector } from 'react-redux';



const Profile = () => {
    const adminInfo = useSelector((state) => state.admin.adminInfo);
    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
                <img
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                    src={adminInfo?.imageUrl}
                    alt="Profile"
                />
                <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
                    {adminInfo?.fullName}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {adminInfo?.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-4">
                    {adminInfo?.socialLinks && Object.entries(adminInfo.socialLinks).map(([key, url]) => (
                        <a
                            key={key}
                            href={url}
                            className={`text-gray-600 dark:text-gray-300 hover:transition ${key === 'github' ? 'hover:text-blue-500' : ''
                                } ${key === 'linkedin' ? 'hover:text-blue-700' : ''} ${key === 'website' ? 'hover:text-green-500' : ''
                                }`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {key === 'github' && <FaGithub size={20} />}
                            {key === 'linkedin' && <FaLinkedin size={20} />}
                            {key === 'twitter' && <FaTwitter size={20} />}
                            {key === 'website' && <FaGlobe size={20} />}
                        </a>
                    ))}
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
                            {adminInfo?.email}
                        </p>
                    </div>
                </div>

                {/* Location */}
                {adminInfo?.location && (
                    <div className="flex items-center gap-3">
                        <FaLocationArrow className="text-gray-600 dark:text-gray-300" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">Location</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{adminInfo?.location}</p>
                        </div>
                    </div>
                )}

                {/* College */}
                {adminInfo?.university && (
                    <div className="flex items-center gap-3">
                        <FaUniversity className="text-gray-600 dark:text-gray-300" />
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400">College</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {adminInfo?.university}
                            </p>
                        </div>
                    </div>
                )}
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
