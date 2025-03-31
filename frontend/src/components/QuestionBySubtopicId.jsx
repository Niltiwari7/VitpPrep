import React, { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaStar, FaEdit, FaYoutube, FaRegStar } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import UpdateQuestion from './UpdateQuestion';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { useSelector } from 'react-redux';

const QuestionBySubtopicId = ({ selectSubtopic, isUser }) => {
    const API_URL = 'http://localhost:3000';
    const user = useSelector((state) => state.user?.userInfo || {});
    const [questionByLoading, setQuestionByLoading] = useState(false);
    const [question, setQuestion] = useState(null);
    const [userId, setUserId] = useState(user._id || null);
    const [questionLoading, setQuestionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questionId, setQuestionId] = useState("");
    const admin = useSelector((state) => state.admin?.adminInfo || {});





    if (userId === null) {
        setUserId(admin._id);
    }

    const onQuestionUpdate = (updatedQuestion) => {
        setQuestion(...question.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q));

    }

    const handleChange = useCallback(async (userId, questionId) => {
        // Optimistically update the state immediately
        setQuestion((prev) => prev.map((q) => q._id === questionId ? { ...q, completed: !q.completed } : q));


        try {
            setQuestionLoading(true);
            const response = await fetch(`${API_URL}/questions/update-progress`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, questionId })
            });

            if (!response.ok) throw new Error('Failed to update question progress');

            const data = await response.json();
            if (data.success) {

            } else {
                setError(data.message || 'Internal server error');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred');
        } finally {
            setQuestionLoading(false);
        }
    }, []);





    const handleFavorite = async (questionId, userId) => {
        // Optimistically update UI
        setQuestion((prevQuestions) =>
            prevQuestions.map((q) =>
                q._id === questionId
                    ? {
                        ...q,
                        likedBy: q.likedBy.includes(userId)
                            ? q.likedBy.filter((id) => id !== userId)  // Remove user (unfavorite)
                            : [...q.likedBy, userId]  // Add user (favorite)
                    }
                    : q
            )
        );

        try {
            const response = await fetch(`${API_URL}/questions/toggle-like`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionId, userId }),
            });

            if (!response.ok) throw new Error("Failed to update favorite");

            const data = await response.json();
            if (!data.success) throw new Error(data.message || "Server Error");


        } catch (error) {
            console.error("Error:", error.message);
        }
    };








    useEffect(() => {
        if (!userId || !questionId) return;

        const UpdatedQuestion = async () => {
            try {
                setQuestionLoading(true);
                const response = await fetch(`${API_URL}/questions/update-progress`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, questionId })
                });

                if (!response.ok) throw new Error('Failed to update question progress');

                const data = await response.json();
                if (data.success) {

                } else {
                    setError(data.message || 'Internal server error');
                }
            } catch (error) {
                setError(error.message || 'An unexpected error occurred');
            } finally {
                setQuestionLoading(false);
            }
        };

        UpdatedQuestion();
    }, [questionId, handleChange]);




    // get updated questionList
    useEffect(() => {

        const fetchQuestionsBySubtopicId = async () => {
            try {
                setQuestionByLoading(true);
                const response = await fetch(`${API_URL}/questions/questions-with-progress`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId,
                        subtopicId: selectSubtopic
                    })
                })

                const data = await response.json();

                if (data.success) {

                    setQuestion(data.questions)
                } else {
                    setError(data.message || 'Internal server error')
                }
            } catch (error) {
                setError(error.message || 'Internal server Error');
            } finally {
                setQuestionByLoading(false);
            }
        }
        fetchQuestionsBySubtopicId();

    }, [selectSubtopic, handleChange]);





    if (error) {
        return <div className="text-red-500 text-center py-4">⚠️ {error}</div>;
    }

    if (questionByLoading) {
        return <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin text-gray-500" size={40} /></div>;
    }

    return (
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Questions</h2>
            {question && question.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table className="w-full bg-gray-900 rounded-lg shadow-md">
                        <TableHeader>
                            <TableRow className="bg-gray-800 text-white">
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead className="text-center">Difficulty</TableHead>
                                <TableHead className="text-center">Favorite</TableHead>
                                <TableHead className="text-center">LeetCode</TableHead>
                                <TableHead className="text-center">YouTube</TableHead>
                                {!isUser && <TableHead className="text-center">Edit</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {question.map((question) => (
                                <TableRow key={question._id} className="hover:bg-gray-700 transition duration-300">
                                    <TableCell className="text-center">
                                        <input type="checkbox" className="h-5 w-5"
                                            onChange={() => handleChange(user._id, question._id)}
                                            checked={question.completed}
                                        />
                                    </TableCell>
                                    <TableCell className="text-white">{question.title}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={`px-3 py-1 rounded-lg font-semibold text-white ${question.difficulty === "easy"
                                            ? "bg-green-500"
                                            : question.difficulty === "medium"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"}`}
                                        >
                                            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <button
                                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all mx-auto block"
                                            onClick={() => handleFavorite(question._id, user._id)}
                                        >
                                            {Array.isArray(question.likedBy) && question.likedBy.includes(user._id)
                                                ? <FaStar size={20} className="text-yellow-400" />
                                                : <FaRegStar size={20} className="text-gray-200" />
                                            }
                                        </button>
                                    </TableCell>

                                    {/* LeetCode Cell */}
                                    <TableCell className="text-center">
                                        {question.url ? (
                                            <a href={question.url} target="_blank" rel="noopener noreferrer"
                                                className="w-full h-full flex justify-center items-center">
                                                <SiLeetcode size={20} className="text-orange-500" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </TableCell>

                                    {/* YouTube Cell */}
                                    <TableCell className="text-center">
                                        {question.videoLink ? (
                                            <a href={question.videoLink} target="_blank" rel="noopener noreferrer"
                                                className="w-full h-full flex justify-center items-center">
                                                <FaYoutube size={20} className="text-red-500" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </TableCell>

                                    {!isUser && (
                                        <TableCell className="text-center">
                                            <Drawer>
                                                <DrawerTrigger asChild>
                                                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition mx-auto block">
                                                        <FaEdit size={20} className="text-white" />
                                                    </button>
                                                </DrawerTrigger>
                                                <DrawerContent>
                                                    <DrawerHeader>
                                                        <DrawerTitle className="text-lg text-center">Edit Question</DrawerTitle>
                                                    </DrawerHeader>
                                                    <UpdateQuestion question={question} onQuestionUpdate={onQuestionUpdate} />
                                                </DrawerContent>
                                            </Drawer>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center text-gray-400">No questions available</p>
            )}
        </div>
    );
};

export default QuestionBySubtopicId;
