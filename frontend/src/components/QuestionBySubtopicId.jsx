import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaStar, FaPlay, FaEdit, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import UpdateQuestion from './UpdateQuestion';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const QuestionBySubtopicId = ({ selectSubtopic }) => {
    const API_URL = 'http://localhost:3000';

    // Local state to hold data and loading/error status
    const [questionById, setQuestionById] = useState(null);
    const [questionByLoading, setQuestionByLoading] = useState(false);
    const [questionByIdError, setQuestionByIdError] = useState('');


    const handleQuestionUpdate = (updatedData) => {
        setQuestionById((prev) =>
            prev.map((question) =>
                question._id === updatedData._id
                    ? { ...question, ...updatedData }  // Update only the given properties
                    : question
            )
        );
    };


    useEffect(() => {
        if (!selectSubtopic) return; // If no subtopic is selected, don't fetch

        const abortController = new AbortController();

        const fetchQuestionsBySubtopicId = async () => {
            try {
                setQuestionByIdError('');  // Reset error state
                setQuestionByLoading(true);  // Set loading state to true
                const response = await fetch(`${API_URL}/subtopics/question/${selectSubtopic}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: abortController.signal,  // Attach abort signal
                });

                const data = await response.json();
                if (data.success) {
                    setQuestionById(data.questions);  // Set data in state
                    setQuestionByIdError('');  // Reset error state if successful
                } else {
                    setQuestionByIdError(data.message || 'Failed to fetch questions');
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setQuestionByIdError(error.message || 'An unexpected error occurred');
                }
            } finally {
                setQuestionByLoading(false);  // Set loading state to false
            }
        };

        fetchQuestionsBySubtopicId();

        return () => abortController.abort();  // Cleanup function to cancel fetch if component unmounts
    }, [selectSubtopic]);  // Trigger fetch when selectSubtopic changes

    // If there is an error, show the error message
    if (questionByIdError) {
        return (
            <div className="text-red-500 dark:text-red-400 text-center py-4">
                ⚠️ {questionByIdError}
            </div>
        );
    }

    // If the data is still loading, show a loader
    if (questionByLoading) {
        return (
            <div className="flex justify-center items-center p-4">
                <Loader2 className="animate-spin dark:text-white text-black" />
            </div>
        );
    }
    console.log(questionById);


    return (
        <div className="text-white w-full font-semibold rounded-lg p-2 shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="w-full dark:bg-gray-900 bg-white rounded-lg p-3 sm:p-5">
                {questionById && Object.keys(questionById).length > 0 ? (
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                                {/* Desktop: Status Column */}
                                <TableHead className="hidden sm:table-cell text-center">Status</TableHead>
                                <TableHead className="text-left">Question</TableHead>
                                {/* Desktop: Difficulty Column */}
                                <TableHead className="text-center hidden sm:table-cell">Difficulty</TableHead>
                                {/* Desktop: Favoriate Column  */}
                                <TableHead className="text-center hidden sm:table-cell">Favoriate</TableHead>
                                {/* Desktop: Question Column  */}
                                <TableHead className="text-center hidden sm:table-cell">QuestionLink</TableHead>
                                {/* DeskTop: Video Link  */}
                                <TableHead className="text-center hidden sm:table-cell">YouTube</TableHead>
                                {/* Desktop: Actions Column */}
                                <TableHead className="text-center hidden sm:table-cell">Edit</TableHead>

                                {/* Mobile: Only Edit Action */}
                                <TableHead className="text-center sm:hidden ">Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Object.entries(questionById).map(([key, value]) => (
                                <TableRow
                                    key={key}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                >
                                    {/* Desktop: Status */}
                                    <TableCell className="hidden sm:table-cell text-center">
                                        <input
                                            className="h-5 w-5 mr-2 align-middle"
                                            type="checkbox"
                                            name={value._id}
                                            id={value._id}
                                        />
                                        {value.miscellaneous}
                                    </TableCell>

                                    {/* Question Name (always visible) */}
                                    <TableCell className="text-gray-800 dark:text-gray-200 font-medium">
                                        {value.title}
                                    </TableCell>

                                    {/* Desktop: Difficulty */}
                                    <TableCell className="text-center hidden sm:table-cell">
                                        <span
                                            className={`
                          px-3 py-1 rounded-lg font-semibold
                          ${value.difficulty === "easy" ? "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-300" : ""}
                          ${value.difficulty === "medium" ? "bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-300" : ""}
                          ${value.difficulty === "hard" ? "bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-300" : ""}
                        `}
                                        >
                                            {value.difficulty.charAt(0).toUpperCase() + value.difficulty.slice(1)}
                                        </span>
                                    </TableCell>
                                    {/* Favoirate  */}
                                    <TableCell className="text-center hidden sm:table-cell">
                                        <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
                                            <FaStar size={20} className="text-yellow-500" />
                                        </button>
                                    </TableCell>
                                    <TableCell className="text-center hidden sm:table-cell">
                                        {value.url ? (
                                            <a
                                                href={value.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
            hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                                            >
                                                <SiLeetcode size={18} className="text-orange-500" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span> // Show a dash if no link
                                        )}
                                    </TableCell>

                                    <TableCell className="text-center hidden sm:table-cell">
                                        {value.videoLink ? (
                                            <a
                                                href={value.videoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700 
            hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                                            >
                                                <FaYoutube size={18} className="text-red-500" />
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </TableCell>


                                    {/* Actions */}
                                    <TableCell className="flex items-center gap-1 ">
                                        {/* Desktop: Full Actions */}
                                        <div className="hidden sm:flex gap-2 space-x-6">
                                            {/* Edit Button */}
                                            <Drawer>
                                                <DrawerTrigger asChild>
                                                    <button
                                                        aria-label="Edit question"
                                                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                                    >
                                                        <FaEdit size={20} className="text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                </DrawerTrigger>
                                                <DrawerContent className="flex justify-center items-center dark:bg-transparent bg-transparent">
                                                    <DrawerHeader>
                                                        <DrawerTitle>Edit Question</DrawerTitle>
                                                    </DrawerHeader>
                                                    <UpdateQuestion question={value} onQuestionUpdate={handleQuestionUpdate} />
                                                </DrawerContent>
                                            </Drawer>
                                        </div>

                                        {/* Mobile: Only Edit Button */}
                                        <div className="sm:hidden">
                                            <Drawer>
                                                <DrawerTrigger asChild>
                                                    <button
                                                        aria-label="Edit question"
                                                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                                    >
                                                        <FaEdit size={20} className="text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                </DrawerTrigger>
                                                <DrawerContent className="flex justify-center items-center dark:bg-transparent bg-transparent">
                                                    <DrawerHeader>
                                                        <DrawerTitle>Edit Question</DrawerTitle>
                                                    </DrawerHeader>
                                                    <UpdateQuestion question={value} onQuestionUpdate={handleQuestionUpdate} />
                                                </DrawerContent>
                                            </Drawer>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
