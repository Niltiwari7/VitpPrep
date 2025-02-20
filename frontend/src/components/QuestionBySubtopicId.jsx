import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaStar, FaEdit, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import UpdateQuestion from './UpdateQuestion';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const QuestionBySubtopicId = ({ selectSubtopic, isUser }) => {
    const API_URL = 'http://localhost:3000';

    const [questionById, setQuestionById] = useState(null);
    const [questionByLoading, setQuestionByLoading] = useState(false);
    const [questionByIdError, setQuestionByIdError] = useState('');

    useEffect(() => {
        if (!selectSubtopic) return;
        const abortController = new AbortController();

        const fetchQuestionsBySubtopicId = async () => {
            try {
                setQuestionByLoading(true);
                const response = await fetch(`${API_URL}/subtopics/question/${selectSubtopic}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    signal: abortController.signal,
                });

                const data = await response.json();
                if (data.success) {
                    setQuestionById(data.questions);
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
        return () => abortController.abort();
    }, [selectSubtopic]);

    if (questionByIdError) {
        return <div className="text-red-500 text-center py-4">⚠️ {questionByIdError}</div>;
    }

    if (questionByLoading) {
        return <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin text-gray-500" size={40} /></div>;
    }

    return (
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Questions</h2>
            {questionById && questionById.length > 0 ? (
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
                            {questionById.map((question) => (
                                <TableRow key={question._id} className="hover:bg-gray-700 transition duration-300">
                                    <TableCell className="text-center">
                                        <input type="checkbox" className="h-5 w-5" />
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
                                        <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all">
                                            <FaStar size={20} className="text-yellow-500" />
                                        </button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {question.url ? (
                                            <a href={question.url} target="_blank" rel="noopener noreferrer">
                                                <SiLeetcode size={20} className="text-orange-500 mx-auto" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {question.videoLink ? (
                                            <a href={question.videoLink} target="_blank" rel="noopener noreferrer">
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
                                                    <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                                                        <FaEdit size={20} className="text-white" />
                                                    </button>
                                                </DrawerTrigger>
                                                <DrawerContent>
                                                    <DrawerHeader>
                                                        <DrawerTitle>Edit Question</DrawerTitle>
                                                    </DrawerHeader>
                                                    <UpdateQuestion question={question} />
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
