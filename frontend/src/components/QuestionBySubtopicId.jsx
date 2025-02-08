import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { FaStar, FaPlay, FaEdit } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { updateQuestionById } from '../utils/slices/questionbyId.slice.js';

const QuestionBySubtopicId = ({ selectSubtopic }) => {
    const API_URL = 'http://localhost:3000';
    const dispatch = useDispatch();
    const questionById = useSelector(
        (state) => state.questionBysubtopicId?.data || {},
        shallowEqual
    );
    const [questionByLoading, setQuestionByLoading] = useState(false);
    const [questionByIdError, setQuestionByIdError] = useState('');

    useEffect(() => {
        if (!selectSubtopic) return; // If no subtopic is selected, don't fetch

        const abortController = new AbortController();

        const fetchQuestionsBySubtopicId = async () => {
            try {
                setQuestionByIdError('');
                setQuestionByLoading(true);
                const response = await fetch(`${API_URL}/subtopics/question/${selectSubtopic}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: abortController.signal, // Attach the abort signal
                });

                const data = await response.json();
                if (data.success) {
                    dispatch(updateQuestionById(data.questions));
                    setQuestionByIdError('');
                } else {
                    setQuestionByIdError(data.message || 'Failed to fetch questions');
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setQuestionByIdError(error.message || 'An unexpected error occurred');
                }
            } finally {
                setQuestionByLoading(false);
            }
        };

        fetchQuestionsBySubtopicId();

        return () => abortController.abort(); // Cleanup function to cancel fetch if component unmounts
    }, [selectSubtopic]);

    if (questionByIdError) {
        return (
            <div className="text-red-500 dark:text-red-400 text-center py-4">
                ⚠️ {questionByIdError}
            </div>
        );
    }

    if (questionByLoading) {
        return (
            <div className="flex justify-center items-center p-4">
                <Loader2 className="animate-spin dark:text-white text-black" />
            </div>
        );
    }

    return (
        <div className="text-white font-semibold rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-full dark:bg-gray-900 bg-white rounded-lg p-3">
                {Object.keys(questionById).length > 0 ? (
                    Object.entries(questionById).map(([key, value]) => (
                        <div
                            key={key}
                            className="p-1 border-b last:border-b-0 flex justify-between items-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md hover:bg-gradient-to-r from-blue-500 to-purple-500 pointer"
                        >
                            {/* Question Name */}
                            <h4 className="text-md text-gray-800 dark:text-gray-200 font-medium flex-1 px-3">
                                {value.title}
                            </h4>

                            <div className="flex gap-4">
                                {/* Favorite Button */}
                                <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                                    <FaStar size={20} className="text-yellow-500" />
                                </button>

                                {/* Difficulty */}
                                <span className="px-3 py-1 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold">
                                    {value.difficulty}
                                </span>

                                {/* LeetCode Icon */}
                                <a
                                    href={value.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                                >
                                    <SiLeetcode size={16} className="text-orange-500" />
                                </a>

                                {/* Video Link */}
                                <a
                                    href={value.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                                >
                                    <FaPlay size={16} className="text-blue-500" />
                                </a>

                                {/* Edit Button */}
                                <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                                    <FaEdit size={16} className="text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-2">
                        No questions available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default QuestionBySubtopicId;
