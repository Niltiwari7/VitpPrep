import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice";
import { FaAngleDown, FaEdit, FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Sidebar from "../components/sideBar";
import { Link } from "react-router-dom";
import { updateSubtopicsById } from "../utils/slices/topicQuestion.slice.js";
import QuestionBySubtopicId from "../components/QuestionBySubtopicId.jsx";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import UpdateTopic from "../components/UpdateTopic.jsx";
import UpdateSubtopic from "../components/UpdateSubtopic.jsx";


const API_URL = 'http://localhost:3000';

const Question = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const adminInfo = useSelector((state) => state.admin?.adminInfo || {}, shallowEqual);
     
    const [topic, setTopic] = useState({});
    const [subtopic, setSubtopic] = useState({})
    const [selectedTopic, setSelectedTopic] = useState("");
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [subtopicError, setSubtopicError] = useState("");
    const [expandedSubtopic, setExpandedSubtopic] = useState(null);
    const [selectSubtopic, setSelectSubtopic] = useState("");
    const [topicLoading, setTopicLoading] = useState(false);
    const [subtopicLoading, setSubtopicLoading] = useState(false);
    const [errorTopics, setErrorTopics] = useState('');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setErrorTopics('');
                const response = await fetch('http://localhost:3000/topics/getalltopics', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();


                if (data.success) {
                    console.log(data);

                    setTopic(data.topics);

                    setErrorTopics('');
                } else {
                    setErrorTopics(data.message);
                }
            } catch (error) {
                setErrorTopics(error.message);
            } finally {
                setTopicLoading(false);
            }
        };

        fetchTopics();
    }, [API_URL, dispatch]);

    console.log("topic", topic);


    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };



    useEffect(() => {
        if (selectedTopic) {
            const fetchSubtopicsById = async () => {
                try {
                    setSubtopicError('');
                    const response = await fetch(`${API_URL}/subtopics/${selectedTopic}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();
                    console.log(data);
                    
                    if (data.success) {
                        setSubtopic(data.subtopics);
                        setSubtopicError('');
                    } else {
                        setSubtopicError(data.message || 'Failed to fetch subtopics');
                    }
                } catch (error) {
                    setSubtopicError(error.message || 'An unexpected error occurred');
                }
            };
            fetchSubtopicsById();
        }
    }, [selectedTopic, dispatch]);

    const handleSubtopic = (topicId) => {
        setExpandedTopic(expandedTopic === topicId ? null : topicId);
        setSelectedTopic(topicId);
    };
    const handleSubtopicById = (subtopicId) => {
        setSelectSubtopic(subtopicId);
        setExpandedSubtopic(expandedSubtopic === subtopicId ? null : subtopicId);
    };
    // Handle topic update
    const handleTopicUpdate = (updatedTopic) => {
        setTopic((prev) => prev.map((topic) => topic._id === updatedTopic._id ? updatedTopic : topic))

    };

    const handleSubtopicUpdate = (updatedSubtopic) => {
        setSubtopic((prev) =>
            prev.map((subtopic) =>
                subtopic._id === updatedSubtopic._id ? updatedSubtopic : subtopic
            )
        );
    };



    // Memoize the topic rendering to avoid unnecessary re-renders
    const memoizedSubtopics = useMemo(() => (
        <div className="text-white font-semibold rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-full dark:bg-gray-900 bg-white rounded-lg">
                {Object.keys(subtopic).length > 0 ? (
                    Object.entries(subtopic).map(([key, value]) => (
                        <div key={key}>
                            {/* Subtopic Row */}
                            <div
                                className="p-3 border-b last:border-b-0 flex justify-between items-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md hover:bg-gradient-to-r from-blue-500 to-purple-500"
                            >
                                <h4 className="text-md text-gray-800 dark:text-gray-200 font-medium">
                                    {value.name}
                                </h4>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {/* Edit Button */}
                                    <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg">
                                        <Drawer>
                                            <DrawerTrigger asChild>
                                                <button aria-label="Edit topic " className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                                    <FaEdit size={20} className="text-gray-600 dark:text-gray-300" />
                                                </button>
                                            </DrawerTrigger>
                                            {/* Move UpdateTopic inside DrawerContent */}
                                            <DrawerContent className="flex justify-center items-center dark:bg-transparent bg-transparent">
                                                <DrawerHeader>
                                                    <DrawerTitle>Edit Subtopic</DrawerTitle>
                                                </DrawerHeader>
                                                <UpdateSubtopic subtopic={value} onSubtopicUpdate={handleSubtopicUpdate} />
                                            </DrawerContent>
                                        </Drawer>
                                    </button>

                                    {/* Expand Button */}
                                    <button
                                        onClick={() => handleSubtopicById(value._id)}
                                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <FaAngleDown
                                            size={16}
                                            className={`text-gray-600 dark:text-gray-300 transform transition-transform ${expandedSubtopic === value._id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Questions Section */}
                            {expandedSubtopic === value._id && (
                                <div className="ml-4 mt-2">
                                    {/* Render the questions related to this subtopic */}
                                    {<QuestionBySubtopicId selectSubtopic={value._id}  />}
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


    // Memoize topic rendering
    const memoizedTopics = useMemo(() => (
        Object.entries(topic).map(([key, value]) => (
            <div key={key}>
                <div
                    className="p-4 border-2 border-white flex justify-between items-center rounded-lg 
                    transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                    hover:shadow-lg dark:border-gray-700 dark:hover:border-transparent dark:hover:bg-gradient-to-r 
                    dark:hover:from-blue-500 dark:hover:via-purple-500 dark:hover:to-pink-500"
                >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {value.name}
                    </h3>
                    <div className="flex gap-4 ">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <button aria-label="Edit topic " className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                    <FaEdit size={20} className="text-gray-600 dark:text-gray-300" />
                                </button>
                            </DrawerTrigger>
                            {/* Move UpdateTopic inside DrawerContent */}
                            <DrawerContent className="flex justify-center items-center dark:bg-transparent bg-transparent">
                                <DrawerHeader>
                                    <DrawerTitle>Edit Topic</DrawerTitle>
                                </DrawerHeader>
                                <UpdateTopic topic={value} onTopicUpdate={handleTopicUpdate} />
                            </DrawerContent>
                        </Drawer>
                        <button
                            aria-label="Toggle subtopics"
                            onClick={() => handleSubtopic(value._id)}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            <FaAngleDown
                                size={20}
                                className={`text-gray-600 dark:text-gray-300 transform transition-transform ${expandedTopic === value._id ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                </div>
                {expandedTopic === value._id && (
                    <div className="ml-4 mt-2">{memoizedSubtopics}</div>
                )}
            </div>
        ))
    ), [topic, expandedTopic, memoizedSubtopics]);




    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
            <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
                <Sidebar />
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
                    <Link to={`/admin/profile/${adminInfo._id}`} className="flex items-center text-blue-600 hover:underline">
                        <AiOutlineArrowLeft size={20} />
                        <span className="ml-2">Back To Profile</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            className="p-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                        >
                            {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                        </button>
                        {adminInfo.imageUrl && (
                            <img className="w-10 h-10 rounded-full object-cover shadow-md" src={adminInfo.imageUrl} alt="Profile" />
                        )}
                    </div>
                </header>

                <div className="w-full">
                    <div className="p-6 mt-6">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Topics</h1>
                        <div className="mt-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                            {Object.keys(topic).length > 0 ? memoizedTopics : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No topics available.</p>
                            )}
                        </div>
                        {subtopicError && <p className="text-red-500 text-sm mt-2">{subtopicError}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
