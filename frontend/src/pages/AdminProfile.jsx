import React from 'react';
import Sidebar from '../components/sideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaMoon, FaSun } from 'react-icons/fa';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Sidebar */}
            <div className="w-full md:w-64 relative">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-200 dark:bg-black">
                {/* Header */}
                <header className="flex items-center justify-end px-4 py-2 bg-black text-white h-16">
                    
                    <div className="flex items-center space-x-4 ">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-full transition duration-300 hover:bg-blue-700 md:inline sm:hidden"
                        >
                            {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>

                        {/* Profile Image */}
                        <img
                            className="w-10 h-10 rounded-full object-cover  "
                            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                            alt="Profile"
                        />
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Welcome to the Admin Panel
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage your profile and access administrative features from here.
                    </p>
                </main>
            </div>
        </div>
    );
};

export default AdminProfile;
