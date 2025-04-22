import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import {
    FaEdit, FaMoon, FaSun, FaCheckCircle, FaBullseye, FaChartLine,
    FaHeart, FaCode, FaCogs, FaNetworkWired, FaDatabase, FaLaptop, FaBook,

} from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserP from './UserP';
import { logout, updateUserInfo } from '../utils/slices/user.slice.js';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Heart, LogOut } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL;

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
    { title: 'Liked Questions', icon: FaHeart, color: 'text-red-500', path: '/user/likedQuestion' },
    { title: 'Top DSA Questions', icon: FaCode, color: 'text-blue-500', path: '/top-interview-questions-dsa' },
    { title: 'OOPS Concepts', icon: FaCogs, color: 'text-green-500', path: '/oops' },
    { title: 'Computer Networks', icon: FaNetworkWired, color: 'text-purple-500', path: '/computer-network' },
    { title: 'DBMS', icon: FaDatabase, color: 'text-indigo-500', path: '/dbms' },
    { title: 'Operating Systems', icon: FaLaptop, color: 'text-teal-500', path: '/os' }
];



  
        const handleLogout = async () => {
            setError('');
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/users/logout`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                const data = await response.json();
                console.log(data);
    
                if (data.success) {
                    dispatch(logout());
                    navigate('/');
                } else {
                    toast.error('Failed to logout. Please try again.');
                }
            } catch (error) {
                toast.error('An error occurred. Please try again.');
                console.log(error);
    
            } finally {
                setLoading(false);
            }
        };
    
    
    const [activeTopicIndex, setActiveTopicIndex] = useState(0);
    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#101927] text-gray-100' : 'bg-[#F3F4F6]text-gray-900'}`}>
            {/* Header */}
           <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30">
                                      <Link to = "/dashboard" className="flex items-center space-x-2">
                                          <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 hover:scale-105">
                                              VitpPrep
                                          </h3>
                      
                                          {/* <h3 className="text-2xl font-extrabold text-gray-900">PatternPrep</h3> */}
                      
                                          <div className="h-4 w-1 bg-gradient-to-b from-[#00C1B3] to-[#00E3CC] rounded-full animate-pulse"></div>
                                      </Link>
                      
                      
                      
                                      <div className="flex items-center gap-5">
                                          <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={toggleTheme}
                                              className="p-2 bg-[#00C1B3] dark:bg-[#00E3CC] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
                                          >
                                              {darkMode ? (
                                                  <FaMoon size={20} className="group-hover:rotate-[-15deg] transition-transform duration-300" />
                                              ) : (
                                                  <FaSun size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                              )}
                                          </Button>
                      
                                          {/* Profile Dropdown */}
                                          <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                  <Button
                                                      variant="ghost"
                                                      className="relative h-10 w-10 rounded-full hover:scale-105 transition-transform duration-200"
                                                  >
                                                      <Avatar className="h-10 w-10 border-2 border-white/20 hover:border-[#00C1B3]/40 dark:hover:border-[#00E3CC]/40 transition-colors duration-300">
                                                          <AvatarImage
                                                              src={user.imageUrl || "/assets/placeholder.png"}
                                                              className="hover:brightness-110 transition-all duration-300"
                                                          />
                                                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                                              {user.name?.charAt(0) || "U"}
                                                          </AvatarFallback>
                                                      </Avatar>
                                                      <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white dark:border-[#0D1117]"></span>
                                                  </Button>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent
                                                  className="w-56 bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-lg border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 shadow-xl"
                                                  align="end"
                                              >
                                                  <DropdownMenuLabel className="text-[#00C1B3] dark:text-[#00E3CC] font-semibold">
                                                      My Account
                                                  </DropdownMenuLabel>
                                                  <DropdownMenuSeparator className="bg-[#00C1B3]/20 dark:bg-[#00E3CC]/20" />
                                                  <DropdownMenuItem className="group hover:bg-[#00C1B3]/10 dark:hover:bg-[#00E3CC]/10 focus:bg-[#00C1B3]/10 dark:focus:bg-[#00E3CC]/10 transition-colors">
                                                      <Link to={`/user/${user._id}`} className="flex items-center w-full px-2 py-2">
                                                          <User className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
                                                         
                                                          <span className="text-[#00C1B3] dark:text-[#00E3CC]"> Profile</span>
                                                      </Link>
                                                  </DropdownMenuItem>
                      
                                                  <DropdownMenuItem className="group transition-colors hover:bg-[#00C1B3]/10 dark:hover:bg-[#00E3CC]/10 focus:bg-[#00C1B3]/10 dark:focus:bg-[#00E3CC]/10">
                                                      <Link to={`/user/likedQuestion/${user._id}`} className="flex items-center w-full px-2 py-2">
                                                          <Heart className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
                                                          <span className="text-[#00C1B3] dark:text-[#00E3CC]">Liked Question</span>
                                                      </Link>
                                                  </DropdownMenuItem>

                                                  <DropdownMenuItem className="group transition-colors hover:bg-[#00C1B3]/10 dark:hover:bg-[#00E3CC]/10 focus:bg-[#00C1B3]/10 dark:focus:bg-[#00E3CC]/10">
                                                      <Link to={`/dashboard`} className="flex items-center w-full px-2 py-2">
                                                          <Heart className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
                                                          <span className="text-[#00C1B3] dark:text-[#00E3CC]">DashBoard</span>
                                                      </Link>
                                                  </DropdownMenuItem>
                      
                      
                                                  <DropdownMenuSeparator className="bg-[#00C1B3]/20 dark:bg-[#00E3CC]/20" />
                                                  <DropdownMenuItem className="p-0 hover:bg-transparent">
                      
                                                      <Button
                                                          variant="destructive"
                                                          className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-colors"
                                                          onClick={handleLogout}
                                                      >
                                                          Logout
                                                          <LogOut className="ml-2 h-4 w-4" />
                                                      </Button>
                      
                                                  </DropdownMenuItem>
                                              </DropdownMenuContent>
                                          </DropdownMenu>
                                      </div>
                                  </header>

            {/* Main Content */}
            <main className='container mx-auto px-4 xl:px-6 py-8 grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-0.5 pt-20'>
                {/* Sidebar */}
                <aside
                    className="col-span-1 bg-[#FEFEFF] dark:bg-[#374050] rounded-xl shadow-lg p-6 
    transition-all duration-500 ease-in-out 
    md:transform md:-translate-x-2 animate-slideInLeft 
    w-full mx-auto flex flex-col items-center
    sm:max-w-full max-w-full 
    md:w-auto "
                >
                    <div className="text-center font-semibold text-2xl text-gray-800 dark:text-white mb-6 transition-colors duration-300">
                        Learning Topics
                    </div>

                    {learningTopics.map((topic, index) => (
                        <Link 
                            to = {topic.path}
                            key={index}
                            className={`group w-full text-center text-xl font-semibold rounded-md p-4 mb-3 
                transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
                hover:translate-x-2 hover:shadow-2xl
                ${activeTopicIndex === index
                                    ? 'bg-blue-100 dark:bg-gray-700 border-l-4 border-blue-500 dark:border-blue-400 text-blue-500'
                                    : 'text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-800'}
                flex items-center justify-center gap-3`}
                            onClick={() => setActiveTopicIndex(index)}
                        >
                            <topic.icon
                                className={`${topic.color} text-2xl transition-transform duration-300 
                    group-hover:scale-110 group-hover:-translate-y-1`}
                            />
                            <span className="transition-all duration-300 group-hover:tracking-wide">
                                {topic.title}
                            </span>
                        </Link>
                    ))}
                </aside>


                {/* Profile Section */}
                <section className='col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300 max-w-full'>
                    <div className='flex items-center justify-between mb-8'>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                            User Profile
                        </h1>
                        <Link
                            to={`/user/edit/${userId}`}
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

                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserProfile;