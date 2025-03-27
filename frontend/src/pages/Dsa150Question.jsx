import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice";
import { FaAngleDown, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import QuestionBySubtopicId from "../components/QuestionBySubtopicId.jsx";
import { toast } from "react-hot-toast";
import { LogOut } from 'lucide-react';
import { Heart } from "lucide-react";
import { User } from 'lucide-react';
import { logout } from "../utils/slices/user.slice.js";

const API_URL = 'http://localhost:3000';

const Dsa150Question = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const user = useSelector((state) => state.user?.userInfo || {});

    const [topic, setTopic] = useState([]);
    const [subtopic, setSubtopic] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [expandedSubtopic, setExpandedSubtopic] = useState(null);
    const [selectSubtopic, setSelectSubtopic] = useState("67b2a8d21a2e1e5c151277c6");

    const [loading, setloading] = useState(false);
    const isUser = true;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const handleLogout = async () => {
        setError('');
        setLoader(true);
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
            setLoader(false);
        }
    };

    
    const userId = user._id;
    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    // Fetch subtopics when a topic is selected
    useEffect(() => {
        if (selectSubtopic) {
            const fetchSubtopicsById = async () => {
                try {
                    setloading(true);
                    setError("")
                    const response = await fetch(`${API_URL}/topics/subtopic/${selectSubtopic}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    const data = await response.json();

                    // Check if 'question' and 'subtopics' exist
                    if (data.success && data.question && Array.isArray(data.question.subtopics)) {
                        setSubtopic(data.question.subtopics);

                    }
                } catch (error) {
                    setError(error.message || 'An unexpected error occurred');
                } finally {
                    setloading(false);
                }
            };

            fetchSubtopicsById();
        }
    }, [selectedTopic, selectSubtopic]);





    const handleSubtopic = (topicId) => {
        setExpandedTopic(expandedTopic === topicId ? null : topicId);
        setSelectedTopic(topicId);
    };

    const handleSubtopicById = (subtopicId) => {
        setSelectSubtopic(subtopicId);
        setExpandedSubtopic(expandedSubtopic === subtopicId ? null : subtopicId);
    };

    const handleSubtopicUpdate = (updatedSubtopic) => {
        setSubtopic((prev) =>
            prev.map((sub) => (sub._id === updatedSubtopic._id ? updatedSubtopic : sub))
        );
    };
    console.log("User ", user);

    // Memoized subtopics for performance
    const memoizedSubtopics = useMemo(() => (
        <div className="text-white font-semibold rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-full dark:bg-gray-900 bg-white rounded-lg">
                {subtopic.length > 0 ? (
                    subtopic.map((value) => (
                        <div key={value._id} className="px-2">
                            {/* Click anywhere on this div to expand/collapse */}
                            <div
                                className="p-3 border-b last:border-b-0 flex justify-between items-center 
                                    transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                                    rounded-md hover:bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer"
                                onClick={() => handleSubtopicById(value._id)}
                            >
                                <h4 className="text-md text-gray-800 dark:text-gray-200 font-medium p-2">
                                    {value.name}
                                </h4>

                                <FaAngleDown
                                    size={20}
                                    className={`text-gray-600 dark:text-gray-300 transform transition-transform 
                                        ${expandedSubtopic === value._id ? "rotate-180" : ""}`}
                                />
                            </div>

                            {/* Show the subtopic content if expanded */}
                            {expandedSubtopic === value._id && (
                                <div className="ml-4 mt-2">
                                    <QuestionBySubtopicId selectSubtopic={value._id} isUser={isUser} />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-2">
                        No subtopics available.
                    </p>
                )}
            </div>
        </div>
    ), [subtopic, expandedSubtopic]);



    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30">
                <div className="flex items-center space-x-2">
                    <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 hover:scale-105">
                        VitpPrep
                    </h3>

                    {/* <h3 className="text-2xl font-extrabold text-gray-900">PatternPrep</h3> */}

                    <div className="h-4 w-1 bg-gradient-to-b from-[#00C1B3] to-[#00E3CC] rounded-full animate-pulse"></div>
                </div>



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
                                <Link to={`/user/${user._id}`} className="flex items-center">
                                    <User className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
                                    Profile
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="group transition-colors hover:bg-[#00C1B3]/10 dark:hover:bg-[#00E3CC]/10 focus:bg-[#00C1B3]/10 dark:focus:bg-[#00E3CC]/10">
                                <Link to={`/user/likedQuestion/${user._id}`} className="flex items-center w-full px-2 py-2">
                                    <Heart className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
                                    <span className="text-[#00C1B3] dark:text-[#00E3CC]">Liked Question</span>
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
            <div className="flex-1 flex flex-col">

                <div className="w-full">
                    <div className="p-6 mt-6">
                        <div className="px-6 py-4 group relative mt-10">
                            <Link
                                to={`/dashboard`}
                                className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-300 ease-out bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 hover:text-blue700 dark:text-blue-400 dark:hover:text-blue-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            >
                                <AiOutlineArrowLeft className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110" size={20} />
                                <span className="relative font-medium">Back To DashBoard</span>

                            </Link>
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center pb-4">Top Dsa Interview Question</h1>


                        <div className="mt-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                            {loading ? (
                                <div className="flex justify-center items-center min-h-[200px]">
                                    <div className="relative flex flex-col items-center">
                                        {/* Animated Loader */}
                                        <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-300 dark:border-t-blue-400 dark:border-blue-600 rounded-full animate-spin"></div>

                                        {/* Loading Text */}
                                        <span className="mt-3 text-blue-500 dark:text-white font-medium text-lg animate-pulse">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                memoizedSubtopics
                            )}
                        </div>

                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dsa150Question;
