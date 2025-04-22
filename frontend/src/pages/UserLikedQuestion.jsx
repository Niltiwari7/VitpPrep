import React, { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { FaStar, FaEdit, FaYoutube, FaRegStar } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { LogOut } from 'lucide-react';
import { Heart } from "lucide-react";
import { User } from 'lucide-react';
import { logout } from "../utils/slices/user.slice.js";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaAngleDown, FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AiOutlineArrowLeft, AiOutlineDashboard } from 'react-icons/ai';

const UserLikedQuestion = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const user = useSelector((state) => state.user?.userInfo || {});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);


    const tableVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };
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
    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };


    const isUser = user?._id === userId;


    useEffect(() => {
        const fetchLikedQuestions = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/users/likequestion/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setQuestions(data.question.favorites.questions);
                } else {
                    setError(data.message || 'Failed to fetch liked questions');
                }
            } catch (error) {
                setError(error.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchLikedQuestions();
        }
    }, [userId]);


    console.log(questions);


    const handleProgressToggle = useCallback(async (questionId) => {
        try {
            setQuestions(prev => prev.map(q =>
                q._id === questionId ? { ...q, completed: !q.completed } : q
            ));

            const response = await fetch(`${API_URL}/questions/update-progress`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, questionId })
            });

            if (!response.ok) throw new Error('Progress update failed');

            const data = await response.json();
            if (!data.success) throw new Error(data.message);

        } catch (error) {
            setError(error.message);
            // Rollback optimistic update
            setQuestions(prev => prev.map(q =>
                q._id === questionId ? { ...q, completed: !q.completed } : q
            ));
        }
    }, [user?._id]);

    const handleFavoriteToggle = async (questionId) => {
        try {
            setQuestions(prev => prev.map(q =>
                q._id === questionId ? {
                    ...q,
                    likedBy: q.likedBy.includes(user._id)
                        ? q.likedBy.filter(id => id !== user._id)
                        : [...q.likedBy, user._id]
                } : q
            ));

            const response = await fetch(`${API_URL}/questions/toggle-like`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionId, userId: user._id })
            });

            if (!response.ok) throw new Error('Favorite update failed');

            const data = await response.json();
            if (!data.success) throw new Error(data.message);

        } catch (error) {
            setError(error.message);
            // Rollback optimistic update
            setQuestions(prev => prev.map(q =>
                q._id === questionId ? {
                    ...q,
                    likedBy: q.likedBy.includes(user._id)
                        ? q.likedBy.filter(id => id !== user._id)
                        : [...q.likedBy, user._id]
                } : q
            ));
        }
    };



    if (error) {
        return <div className="text-red-500 text-center py-4">⚠️ {error}</div>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-4">
                <Loader2 className="animate-spin text-gray-500" size={40} />
            </div>
        );
    }

    return (

        <>
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
                                    <AiOutlineDashboard className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />
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
            <div className="w-full min-h-screen bg-gradient-to-br from-[#0a192f] via-[#0f1b2e] to-[#112240] text-white px-4 py-6 pt-[90px]
">


                <div className="px-6 py-4 group relative">
                    <Link
                        to={`/dashboard`}
                        className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-300 ease-out bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 hover:text-blue700 dark:text-blue-400 dark:hover:text-blue-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        <AiOutlineArrowLeft className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110" size={20} />
                        <span className="relative font-medium">Back To Profile</span>

                    </Link>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 animate-bounce"> ❤️Liked Questions</h2>

                {questions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table className="bg-opacity-10 backdrop-blur-lg border border-[#64ffda33] 
          dark:bg-[#020c1bb3] text-gray-100 
          shadow-2xl rounded-xl
">
                            <TableHeader>
                                <TableRow className="bg-gray-800">
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
                                {questions.map((question) => (
                                    <TableRow key={question._id} className="hover:bg-gray-700 transition">
                                        <TableCell className="text-center">
                                            <input
                                                type="checkbox"
                                                className="h-5 w-5 accent-green-500 cursor-pointer"
                                                checked={question.completed}
                                                onChange={() => handleProgressToggle(question._id)}
                                                disabled={!user}
                                            />
                                        </TableCell>

                                        <TableCell className="text-white">{question.title}</TableCell>

                                        <TableCell className="text-center">
                                            <span className={`px-3 py-1 rounded-lg font-semibold ${question.difficulty === 'easy' ? 'bg-green-500' :
                                                question.difficulty === 'medium' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}>
                                                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <button
                                                className="p-2 hover:bg-gray-600 rounded-lg transition"
                                                onClick={() => handleFavoriteToggle(question._id)}
                                                disabled={!user}
                                            >
                                                {question.likedBy.includes(user?._id) ? (
                                                    <FaStar className="text-yellow-400" size={20} />
                                                ) : (
                                                    <FaRegStar className="text-gray-300" size={20} />
                                                )}
                                            </button>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {question.url ? (
                                                <a
                                                    href={question.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition"
                                                >
                                                    <SiLeetcode className="text-orange-500" size={20} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {question.videoLink ? (
                                                <a
                                                    href={question.videoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:opacity-80 transition"
                                                >
                                                    <FaYoutube className="text-red-500" size={20} />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </TableCell>

                                        {!isUser && (
                                            <TableCell className="text-center">
                                                <Drawer>
                                                    <DrawerTrigger>
                                                        <button className="p-2 hover:bg-gray-600 rounded-lg transition">
                                                            <FaEdit className="text-white" size={18} />
                                                        </button>
                                                    </DrawerTrigger>
                                                    <DrawerContent className="bg-gray-800 text-white">
                                                        <DrawerHeader>
                                                            <DrawerTitle>Edit Question</DrawerTitle>
                                                            {/* Add UpdateQuestion component here */}
                                                        </DrawerHeader>
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
                    <p className="text-center text-gray-400 py-6">
                        No liked questions found
                    </p>
                )}
            </div>
        </>
    );
};

export default UserLikedQuestion;