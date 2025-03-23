import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice";
import { FaAngleDown,  FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

import QuestionBySubtopicId from "../components/QuestionBySubtopicId.jsx";
import { Loader2 } from "lucide-react";

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
    const [error,setError] = useState("");
    


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
            <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/20 dark:border-[#00E3CC]/20">
                {/* Back Link */}
                <Link
                    to='/dashboard'
                    className="flex items-center text-[#00C1B3] dark:text-[#00E3CC] hover:text-white dark:hover:text-white transition-colors duration-300 group"
                >
                    <AiOutlineArrowLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span className="ml-2 font-medium">Back to Dashboard</span>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        aria-label="Toggle Theme"
                        onClick={toggleTheme}
                        className="p-2 bg-[#00C1B3] dark:bg-[#00E3CC] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        {darkMode ? (
                            <FaMoon size={18} className="hover:rotate-12 transition-transform" />
                        ) : (
                            <FaSun size={18} className="hover:rotate-12 transition-transform" />
                        )}
                    </button>

                    {/* Profile Image */}
                    {user?.imageUrl && (
                        <div className="relative group">
                            <img
                                className="w-10 h-10 rounded-full object-cover border-2 border-[#00C1B3] dark:border-[#00E3CC] hover:border-white cursor-pointer transition-all"
                                src={user.imageUrl}
                                alt="Profile"
                            />
                            <div className="absolute inset-0 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    )}
                </div>
            </header>
            <div className="flex-1 flex flex-col">

                <div className="w-full">
                    <div className="p-6 mt-6">
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
