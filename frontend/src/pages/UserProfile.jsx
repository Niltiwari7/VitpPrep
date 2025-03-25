import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { 
    FaEdit, FaMoon, FaSun, FaCheckCircle, FaBullseye, FaChartLine,
    FaHeart, FaCode, FaCogs, FaNetworkWired, FaDatabase, FaLaptop, FaBook,
    FaUserCircle, FaCertificate, FaTrophy, FaSignOutAlt
} from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserP from './UserP';
import { updateUserInfo } from '../utils/slices/user.slice.js';

const API_URL = `http://localhost:3000`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userId } = useParams();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.userInfo);

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/users/profile/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                if (!data.success) {
                    setError(data.message || 'Something went wrong');
                } else {
                    setError('');
                    dispatch(updateUserInfo(data.User));
                }
            } catch (err) {
                setError('Failed to fetch user information');
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUserInfo();
    }, [userId, dispatch]);

    const learningTopics = [
        { title: 'Liked Questions', icon: FaHeart, color: 'text-red-500' },
        { title: 'Top DSA Questions', icon: FaCode, color: 'text-blue-500' },
        { title: 'OOPS Concepts', icon: FaCogs, color: 'text-green-500' },
        { title: 'Computer Networks', icon: FaNetworkWired, color: 'text-purple-500' },
        { title: 'DBMS', icon: FaDatabase, color: 'text-indigo-500' },
        { title: 'Operating Systems', icon: FaLaptop, color: 'text-teal-500' }
    ];

    const userStats = [
        { title: 'Completed Courses', value: '12', icon: FaCheckCircle, color: 'text-blue-500' },
        { title: 'Solved Problems', value: '24', icon: FaBook, color: 'text-green-500' },
        { title: 'Accuracy', value: '85%', icon: FaBullseye, color: 'text-yellow-500' },
        { title: 'Active Goals', value: '3', icon: FaChartLine, color: 'text-purple-500' }
    ];

    const handleLogout = () => {
        // Implement logout logic
        navigate('/login');
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#101927] text-gray-100' : 'bg-[#F3F4F6]text-gray-900'}`}>
            {/* Header */}
            <header className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-lg ${darkMode ? 'bg-[#0E1522]' : 'bg-[#2B4167]'} transition-colors duration-300`}>
                <div className='flex items-center space-x-4'>
                    <img 
                        src='/src/assets/public/logo.png' 
                        alt='Logo' 
                        className='w-12 h-12 rounded-full border-2 border-white/20 transform hover:scale-110 transition-transform duration-300' 
                    />
                    <Link to='/' className='text-2xl font-bold text-white hover:text-gray-200 transition-colors'>
                        VitpPrep
                    </Link>
                </div>
                <div className='flex items-center space-x-6'>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-amber-400' : 'bg-blue-600 text-white'} hover:opacity-90 transition-opacity duration-300 group`}
                    >
                        {darkMode ? <FaSun size={20} className='group-hover:rotate-180 transition-transform' /> : <FaMoon size={20} className='group-hover:rotate-180 transition-transform' />}
                    </button>
                    
                    {/* Profile Dropdown */}
                    <div className="relative group">
                        <img
                            className='w-10 h-10 rounded-full border-2 border-white/30 hover:border-blue-400 transition-all duration-300 cursor-pointer'
                            src={user?.imageUrl || '/default-avatar.png'}
                            alt='Profile'
                        />
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg hidden group-hover:block transition-all duration-300 z-50">
                            <div className="py-2">
                                <Link 
                                    to={`/admin/edit/${userId}`} 
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaUserCircle className="mr-2" /> Profile
                                </Link>
                                <Link 
                                    to="/achievements" 
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaTrophy className="mr-2" /> Achievements
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className='container mx-auto px-4 xl:px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* Sidebar */}
                <aside className="col-span-1 bg-[#FEFEFF] dark:bg-[#374050]rounded-xl shadow-lg p-6 transition-colors duration-300">
                    <div className="text-center font-semibold text-2xl text-gray-800 dark:text-white mb-6">
                        Learning Topics
                    </div>

                    {learningTopics.map((topic, index) => (
                        <button
                            key={index}
                            className="w-full text-center text-black dark:text-white text-xl font-semibold rounded-md p-4 mb-4 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100 dark:hover:bg-gray-700 dark:bg-gray-800 hover:text-blue-500 flex items-center justify-center gap-3"
                        >
                            <topic.icon className={`${topic.color} text-2xl`} />
                            {topic.title}
                        </button>
                    ))}
                </aside>

                {/* Profile Section */}
                <section className='col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300'>
                    <div className='flex items-center justify-between mb-8'>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            User Profile
                        </h1>
                        <Link
                            to={`/admin/edit/${userId}`}
                            className='p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors duration-300'
                        >
                            <FaEdit className='text-blue-600 dark:text-blue-400' size={24} />
                        </Link>
                    </div>

                    {error ? (
                        <div className='p-4 rounded-xl bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-300'>
                            {error}
                        </div>
                    ) : loading ? (
                        <div className='flex justify-center py-6'>
                            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                        </div>
                    ) : (
                        <>
                            <UserP />
                            <div className='mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600'>
                                <h3 className='text-xl font-semibold mb-6 flex items-center'>
                                    <FaChartLine className='mr-2 text-blue-500' />
                                    Activity Overview
                                </h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                                    {userStats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className='p-4 rounded-lg bg-[#FEFEFF] dark:bg-[#374050] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2'
                                        >
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                                    <p className='text-sm text-gray-600 dark:text-gray-300'>{stat.title}</p>
                                                </div>
                                                <div className={`${stat.color} text-2xl`}>
                                                    {stat.icon}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserProfile;