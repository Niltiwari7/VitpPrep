import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaEdit, FaMoon, FaSun } from 'react-icons/fa';
import Profile from '../components/Profile';
import AdminStats from '../components/adminStats';
import TopicCovered from '../components/TopicCovered';
import { updateAdminInfo } from '../utils/slices/admin.slice';
import { Link, useParams } from 'react-router-dom';

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { adminId } = useParams();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const adminInfo = useSelector((state) => state.admin.adminInfo);


    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };
    

    useEffect(() => {
        const fetchAdminInfo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/admin/getadmin/${adminId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (!data.success) {
                    setError(data.message || 'Something went wrong');
                } else {
                    setError('');
                    dispatch(updateAdminInfo(data.admin));
                }
            } catch (err) {
                setError('Failed to fetch admin info.');
            } finally {
                setLoading(false);
            }
        };

        if (adminId) fetchAdminInfo();
    }, [adminId, dispatch]);

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
                            src={adminInfo.imageUrl}
                            alt="Profile"
                        />
                    </div>
                </header>

                {/* Main Content Section */}
                <main className="p-6 space-y-6 overflow-auto">
                    {error ? (
                        <div className="text-red-500 text-center font-bold">{error}</div>
                    ) : loading ? (
                        <div className="text-center text-gray-500">Loading...</div>
                    ) : (
                        <div className="sm:flex sm:gap-3 sm:space-y-1 space-y-4">
                            {/* Profile Section */}

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative">
                                <Link to={`/admin/edit/${adminId}`}>
                                    <FaEdit className="text-2xl text-gray-600 dark:text-gray-300 absolute top-4 right-8 cursor-pointer hover:text-blue-600" />
                                </Link>

                                <Profile />
                            </div>


                            {/* Admin Statistics and Topics Covered */}
                            <div className="flex flex-col justify-between gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        Admin Statistics
                                    </h2>
                                    <AdminStats topics={adminInfo.topics?.length} subtopics={adminInfo.subtopics?.length} questions={adminInfo.questions?.length} />
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        Topics Covered
                                    </h2>
                                    <TopicCovered />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminProfile;
