import React from 'react';
import Sidebar from '../components/sideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaMoon, FaSun } from 'react-icons/fa';
import Profile from '../components/Profile';
import AdminStats from '../components/adminStats';
import TopicCovered from '../components/TopicCovered';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };
    
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-sm sticky top-0 z-10">
                   
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-full transition duration-300 hover:bg-blue-700"
                        >
                            {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>
                        {/* Profile Image */}
                        <img
                            className="w-10 h-10 rounded-full object-cover shadow"
                            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                            alt="Profile"
                        />
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="p-6 space-y-6 overflow-auto">
                    {/* Profile Section */}
                    <div className='sm:flex sm:gap-3 sm:space-y-1 space-y-4'>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <Profile />
                        </div>

                        <div className='flex flex-col justify-between gap-4'>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Admin Statistics</h2>
                                <AdminStats topics={29} subtopics={100} questions={300} />
                            </div>

                            {/* Topics Covered Section */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Topics Covered</h2>
                                <TopicCovered />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProfile;
