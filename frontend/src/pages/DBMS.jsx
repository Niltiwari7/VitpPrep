import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../utils/slices/theme.slice';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineBars, AiOutlineClose, AiOutlineCopy, AiOutlineDashboard } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
import { toast } from "react-hot-toast";
import { LogOut } from 'lucide-react';
import { Heart } from "lucide-react";
import { User } from 'lucide-react';
import { logout } from "../utils/slices/user.slice.js";
import { crossJoinSnippet, fullJoinSnippet, innerJoinSnippet, leftJoinSnippet, rightJoinSnippet, viewSnippet } from '../assets/codeSnippets/sqlExamples.js';


const DBMS = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);
    const API_URL = 'http://localhost:3000';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();




    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    }

    const [copied, setCopied] = useState(false);
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard');
        }).catch((err) => {
            toast.error('Failed to copy to clipboard');
        })
    }


    const links = [
        {
            id: '#introduction',
            text: 'Introduction',
            color: 'bg-blue-500'
        },
        {
            id: '#key',
            text: 'Types of Keys in DBMS',
            color: 'bg-red-500'
        },
        {
            id: '#er_model',
            text: 'ER Model (Entity-Relationship Model)',
            color: 'bg-green-500'
        },
        {
            id: '#normalisation',
            text: 'Normalisation',
            color: 'bg-yellow-500'
        },
        {
            id: '#joins',
            text: 'SQL Joins',
            color: 'bg-purple-500'
        },
        {
            id: '#view_indexing',
            text: 'View & Indexing',
            color: 'bg-pink-500'
        },
        {
            id: '#stored_procedures_triggers',
            text: 'Stored Procedures & Triggers',
            color: 'bg-orange-500'
        },
        {
            id: '#transaction_concurrency',
            text: 'Transaction Management & Concurrency Control',
            color: 'bg-teal-500'
        },
        {
            id: '#locks_serializability',
            text: 'Locks in DBMS & Serializability',
            color: 'bg-indigo-500'
        }
    ];

    const [currentSection, setCurrentSection] = useState('#introduction');


    const handleLinkClick = (sectionId) => {
        setCurrentSection(sectionId);

        toggleSidebar();

        setTimeout(() => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
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


    useEffect(() => {
        const timeOut = setTimeout(() => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((enteries) => {
                enteries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(`#${entry.target.id}`);
                    }
                })
            }, observerOptions);

            const observedSections = [];

            links.forEach((link) => {
                const selector = link.id.startsWith('#') ?
                    link.id : `#${link.id}`;

                const section = document.querySelector(selector);

                if (section) {
                    observer.observe(section);
                    observedSections.push(section);
                }
            });

            return () => {
                observedSections.forEach((section) => observer.unobserve(section));
            }
        }, 200);

        return () => clearTimeout(timeOut);
    }, []);
    return (
        <div className='gap-5'>
            <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30">
                <Link to="/dashboard" className="flex items-center space-x-2">
                    <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 hover:scale-105">
                        VitpPrep
                    </h3>



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

            <div
                className='flex min-h-screen 
               bg-gradient-to-b from-[#F8F9FA] to-[#F1F3F5]
               dark:bg-[#0D1117]
               text-[#2A3F5F] dark:text-[#A0AEC0]
               transition-all duration-300 ease-in-out'
            >

                <div className={`bg-[#2A3F5F] dark:bg-[#0D1117] mt-[60px] p-6 w-[60%] sm:w-[20%] fixed min-h-screen shadow-xl rounded-r-lg 
                text-gray-100 transition-all duration-300 ease-in-out transform
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} 
                z-30 overflow-y-auto border-r border-[#00C1B3]/20 dark:border-[#00E3CC]/20`}
                    role="navigation"
                    aria-label="Main navigation">
                    <h3 className="text-center text-lg font-semibold pb-4 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30 sticky top-0 bg-[#2A3F5F] dark:bg-[#0D1117] text-white">
                        Content
                    </h3>
                    <div className="flex flex-col gap-2 mt-4">
                        {links.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={() => handleLinkClick(link.id)}
                                className={`block px-4 py-2 rounded-md transition-all duration-300
                          ${currentSection === link.id
                                        ? 'bg-[#00C1B3] text-white dark:bg-[#00E3CC] dark:text-[#0D1117]'
                                        : 'text-gray-300 dark:text-gray-400 hover:bg-[#00C1B3]/20 dark:hover:bg-[#00E3CC]/20'}
                           hover:pl-6 font-medium`}
                                aria-current={currentSection === link.id ? "page" : undefined}>
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Backdrop for mobile */}
                <div className={`sm:hidden fixed inset-0bg-[#00C1B3] dark:bg-[#00E3CC] z-20 transition-opacity 
                               ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    onClick={toggleSidebar}
                    aria-hidden="true" />
                <button
                    onClick={toggleSidebar}
                    className="sm:hidden fixed top-20 right-2 bg-[#00C1B3] dark:bg-[#00E3CC] text-white p-2 rounded-full shadow-lg z-30
                            transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isSidebarOpen}>
                    {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineBars size={24} />}
                </button>
                <main className='sm:w-4/5 w-full ml-auto p-6 mt-20'>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='introduction'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" >

                            {/* Title */}
                            <div className="text-center mb-4">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2A3F5F] to-[#00C1B3] dark:from-[#00E3CC] dark:to-[#A0AEC0]">
                                    Database Management System
                                </h1>

                            </div>
                            <div className='space-y-6 pt-5'>
                                <div className='space-y-2' >

                                    <div className="mt-4 flex gap-3 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                        </svg>
                                        <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                            Introduction
                                        </h2>
                                    </div>

                                    <p className="mt-2 text-base text-gray-700 dark:text-gray-300 leading-relaxed">

                                        A Database Management System (DBMS) is software that allows users to create, manage, and manipulate databases efficiently. It ensures data consistency, security, and integrity while supporting multiple users simultaneously. Examples: MySQL, PostgreSQL, MongoDB, Oracle, etc.

                                    </p>


                                    <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        Difference Between File System and DBMS:
                                    </h3>


                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">

                                        <Table className='w-full'>

                                            <TableHeader className="bg-gradient-to-r from-[#00C1B3]/10 to-[#2A3F5F]/10 dark:from-[#00E3CC]/10 dark:to-[#0D1117]/10">
                                                <TableRow>
                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">Feature</TableHead>
                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">File System 📂</TableHead>
                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">DBMS 🗃️</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className="divide-y divide-[#00C1B3]/10 dark:divide-[#00E3CC]/10 bg-white/50 dark:bg-[#1A202C]/50">
                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Data Storage	</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Data is stored in separate files.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Data is stored in structured databases.</TableCell>
                                                </TableRow>


                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Data Redundancy</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">High (same data may be stored multiple times).</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Low (data is normalized and managed efficiently).</TableCell>
                                                </TableRow>
                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Data Integrity</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Difficult to maintain.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Ensures integrity via constraints (Primary Key, Foreign Key).</TableCell>
                                                </TableRow>
                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Security</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Basic security, difficult to control access.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">High security with authentication and role-based access.
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Concurrency</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">No proper support for multiple users.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Multiple users can access data simultaneously with proper locking mechanisms.
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Data Access Speed</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Slower due to sequential searching.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Faster due to indexing and optimized queries.
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Backup & Recovery</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Manual and less reliable.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Automated backups with recovery mechanisms.
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]"><strong>Example</strong></TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">Text files, Excel sheets.</TableCell>
                                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">MySQL, PostgreSQL, Oracle, MongoDB.
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>

                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-8">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id='key'>


                            <div className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>

                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Types of Keys in DBMS
                                </h2>

                            </div>


                            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Keys in DBMS help identify unique records in a table and establish relationships between tables.
                            </p>

                            <div className='space-y-6 pt-5'>
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">

                                    <Table className="w-full">
                                        <TableHeader className="bg-gradient-to-r from-[#00C1B3]/10 to-[#2A3F5F]/10 dark:from-[#00E3CC]/10 dark:to-[#0D1117]/10">
                                            <TableRow>
                                                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                    Key Type
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                    Definition
                                                </TableHead>
                                                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                    Example
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody className="divide-y divide-[#00C1B3]/10 dark:divide-[#00E3CC]/10 bg-white/50 dark:bg-[#1A202C]/50">
                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Primary Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A unique identifier for a record in a table. It cannot have NULL values.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    Student_ID in a Students table.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Candidate Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A set of attributes that can uniquely identify a record. One of them is chosen as the Primary Key.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    {`{Aadhar_No, Passport_No}`} (both can uniquely identify a person).
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Super Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A set of attributes that uniquely identifies a record. It may contain extra attributes.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    {`{Student_ID, Name}`}, where Name is extra.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Foreign Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A key that references a Primary Key in another table to establish relationships.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    Department_ID in Employees table referring to Department_ID in Departments table.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Composite Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A key made of two or more attributes that uniquely identify a record.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    {`{Order_ID, Product_ID}`} in Orders table.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Alternate Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A Candidate Key that is not chosen as the Primary Key.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    If Aadhar_No is the Primary Key, then Passport_No is an Alternate Key.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Unique Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    Similar to Primary Key but allows NULL values.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    Email column in Users table.
                                                </TableCell>
                                            </TableRow>

                                            <TableRow className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors">
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    <strong>Surrogate Key</strong>
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    A system-generated unique key, usually an auto-incremented number.
                                                </TableCell>
                                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    Order_Number in an Orders table (generated automatically).
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </div>

                            </div>
                        </div>

                    </section>


                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id='er_model'>

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    ER Model (Entity-Relationship Model):
                                </h2>
                            </h2>

                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-7">

                                The ER Model is a high-level data model used for designing databases. It visually represents the structure of a database with entities, attributes, relationships, and constraints.
                            </p>

                            {/* Sections */}
                            <div className="space-y-6 pt-5">
                                {/* Entities */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">1️⃣ Entities 🏛️</h3>
                                    <p className="text-gray-700 dark:text-gray-300">An entity represents a real-world object that has distinct characteristics. (e.g., Students, Car)</p>
                                </div>

                                {/* Attributes */}
                                <div className='space-y-2'>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">2️⃣ Attributes 🎯</h3>
                                    <p className="text-gray-700 dark:text-gray-300">Attributes describe the properties of an entity.</p>
                                    <h4 className="mt-2 font-semibold">Types of Attributes:</h4>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                        <li><strong>Simple (Atomic)</strong> – Cannot be divided (e.g., Name, Age).</li>
                                        <li><strong>Composite</strong> – Can be divided (e.g., Full Name: First Name, Last Name).</li>
                                        <li><strong>Derived</strong> – Calculated (e.g., Total Marks = Marks1 + Marks2).</li>
                                        <li><strong>Multivalued</strong> – Can have multiple values (e.g., Phone Numbers).</li>
                                        <li><strong>Key Attribute</strong> – Uniquely identifies an entity (e.g., Student_ID).</li>
                                    </ul>

                                </div>


                                {/* Relationships */}
                                <div className='space-y-2'>

                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">3️⃣ Relationships 🔗</h3>
                                    <p className="text-gray-700 dark:text-gray-300">Relationships define associations between two or more entities.</p>
                                    <h4 className="mt-2 font-semibold">Types of Relationships:</h4>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                        <li><strong>One-to-One (1:1)</strong> – (e.g., Person ↔ Passport).</li>
                                        <li><strong>One-to-Many (1:M)</strong> – (e.g., Teacher ↔ Students).</li>
                                        <li><strong>Many-to-Many (M:N)</strong> – (e.g., Students ↔ Courses).</li>
                                    </ul>
                                </div>


                                {/* Cardinality */}
                                <div className='space-y-2'>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">4️⃣ Cardinality 🔢</h3>
                                    <p className="text-gray-700 dark:text-gray-300">Cardinality defines the number of entity instances involved in a relationship.</p>
                                </div>


                            </div>


                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">Example of ER Model Representation</h3>
                            <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Entities:</strong> <code>Student, Teacher, Course, Exam, Result</code></li>
                                <li><strong>Attributes:</strong> <code>Name, Age, Email, Student_ID, Teacher_ID, Course_ID, Exam_ID, Result_ID</code></li>
                                <li><strong>Relationships:</strong>
                                    <ul className="list-disc pl-6">
                                        <li><code>Student enrolls in course.</code></li>
                                        <li><code>Teacher teaches course.</code></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8 " id='normalisation'>
                        < div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" >
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Normalisation
                            </h2>


                            {/* Section Description */}
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-7">
                                Normalization is the process of organizing data in a database to reduce redundancy and
                                improve data integrity by dividing large tables into smaller related tables.
                            </p>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        1. First Normal Form (1NF)
                                    </h3>
                                </div>

                                {/* Explanation */}
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                    <li>Ensures that all columns contain <strong>atomic (indivisible) values</strong> and removes duplicate & multivalued attributes.</li>
                                </ul>

                                {/* Tables (Before and After 1NF) */}
                                <div className='grid md:grid-cols-2 gap-6'>
                                    {/* Student Table Before 1NF */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>Before 1NF</h4>
                                        </div>
                                        <div className='overflow-x-auto'> {/* Make table horizontally scrollable on small screens */}
                                            <Table className='w-full'>
                                                <TableHeader>
                                                    <TableRow className='bg-gray-50 dark:bg-gray-900'>
                                                        <TableHead>Student_ID</TableHead>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Subjects</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[[101, 'John Doe', 'Maths,     Science, English']].map(([id, studentId, name, subName]) => (
                                                        <TableRow key={id} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                            <TableCell>{id}</TableCell>
                                                            <TableCell>{studentId}</TableCell>
                                                            <TableCell>{name}</TableCell>
                                                            <TableCell>{subName}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>

                                    {/* Student Table After 1NF */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>After 1NF</h4>
                                        </div>
                                        <div className='overflow-x-auto'>
                                            <Table className='w-full'>
                                                <TableHeader>
                                                    <TableRow className='bg-gray-50 dark:bg-gray-900' >
                                                        <TableHead>Student_ID</TableHead>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Subject</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        [101, 'John Doe', 'Math'],
                                                        [101, 'John Doe', 'Science'],
                                                        [101, 'John Doe', 'English']
                                                    ].map(([studentId, name, subject]) => (
                                                        <TableRow key={studentId} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                            <TableCell>{studentId}</TableCell>
                                                            <TableCell>{name}</TableCell>
                                                            <TableCell>{subject}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        2. Second Normal Form (2NF)
                                    </h3>
                                </div>

                                {/* Explanation */}
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                    <li>Table should be in <strong>First Normal Form (1NF)</strong>.</li>
                                    <li>Remove <strong>partial dependency</strong> (i.e., non-key attributes should be fully dependent on the <strong>entire</strong> primary key).</li>
                                </ul>

                                {/* Before Normalization */}
                                <p className='text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4'>
                                    Before 2NF Normalization
                                </p>

                                <div className='overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
                                    <Table className='w-full'>
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                                <TableHead>Student_Id</TableHead>
                                                <TableHead>Course_Id</TableHead>
                                                <TableHead>Student_Name</TableHead>
                                                <TableHead>Course_Name</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                [1, 101, 'John Doe', 'Mathematics'],
                                                [2, 102, 'Shyam', 'Physics']
                                            ].map(([s_id, c_id, s_name, c_name]) => (
                                                <TableRow key={`${s_id}-${c_id}`} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                    <TableCell>{s_id}</TableCell>
                                                    <TableCell>{c_id}</TableCell>
                                                    <TableCell>{s_name}</TableCell>
                                                    <TableCell>{c_name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* After Normalization */}
                                <p className='text-lg font-semibold text-gray-700 dark:text-gray-200 mt-6'>
                                    After 2NF Normalization
                                </p>

                                <div className='grid md:grid-cols-2 gap-6'>
                                    {/* Student Table */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>Student</h4>
                                        </div>
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableRow className='bg-gray-50 dark:bg-gray-900'>
                                                    <TableHead>Student_Id</TableHead>
                                                    <TableHead>Student_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [1, 'John Doe'],
                                                    [2, 'Shyam']
                                                ].map(([id, name]) => (
                                                    <TableRow key={id} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Courses Table */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>Courses</h4>
                                        </div>
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableRow className='bg-gray-50 dark:bg-gray-900'>
                                                    <TableHead className='w-[100px]'>Course_Id</TableHead>
                                                    <TableHead>Course Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, 'Mathematics'],
                                                    [102, 'Physics']
                                                ].map(([id, c_name]) => (
                                                    <TableRow key={id} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{c_name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        3. Third Normal Form (3NF)
                                    </h3>
                                </div>

                                {/* Explanation */}
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                    <li>Table should be in <strong>Second Normal Form (2NF)</strong>.</li>
                                    <li>Remove <strong>transitive dependency</strong> (i.e., non-key attributes should depend <strong>only</strong> on the primary key).</li>
                                </ul>

                                {/* Before Normalization */}
                                <p className='text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4'>
                                    Before 3NF Normalization
                                </p>

                                <div className='overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
                                    <Table className='w-full'>
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                                <TableHead>Student_Id</TableHead>
                                                <TableHead>Course_Id</TableHead>
                                                <TableHead>Dept_ID</TableHead>
                                                <TableHead>Dept_Name</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                [1, 101, 'John Doe', 'Computer Sciene'],
                                                [2, 102, 'Shyam', 'Electrical Engineering']
                                            ].map(([s_id, c_id, s_name, c_name]) => (
                                                <TableRow key={`${s_id}-${c_id}`} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                    <TableCell>{s_id}</TableCell>
                                                    <TableCell>{c_id}</TableCell>
                                                    <TableCell>{s_name}</TableCell>
                                                    <TableCell>{c_name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* After Normalization */}
                                <p className='text-lg font-semibold text-gray-700 dark:text-gray-200 mt-6'>
                                    After 3NF Normalization
                                </p>

                                <div className='grid md:grid-cols-2 gap-6'>
                                    {/* Student Table */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>Student</h4>
                                        </div>
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableRow className='bg-gray-50 dark:bg-gray-900'>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Dept_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [1, 'John Doe', 101],
                                                    [2, 'Shyam', 102]
                                                ].map(([id, name, dept_id]) => (
                                                    <TableRow key={id} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                        <TableCell>{dept_id}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Courses Table */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                        <div className='p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
                                            <h4 className='font-semibold text-gray-800 dark:text-gray-200'>Department</h4>
                                        </div>
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableRow className='bg-gray-50 dark:bg-gray-900'>
                                                    <TableHead className='w-[100px]'>Dept_ID</TableHead>
                                                    <TableHead>Dept_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, 'Computer Science'],
                                                    [102, 'Electrical Engineering']
                                                ].map(([id, c_name]) => (
                                                    <TableRow key={id} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{c_name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-5">
                                {/* Heading */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        4. Boyce-Codd Normal Form (BCNF)
                                    </h3>
                                </div>

                                {/* Explanation */}
                                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                    <li>Table should be in <strong>Boyce-Codd Normal Form (BCNF)</strong>.</li>
                                    <li>Every <strong>functional dependency</strong> must have a <strong>super key</strong>.</li>
                                </ul>

                                {/* BCNF Explanation */}
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                    Boyce-Codd Normal Form (BCNF) is a stricter version of the Third Normal Form (3NF).
                                    In BCNF, for every non-trivial functional dependency <strong>X → Y</strong>,
                                    the left-hand side (X) must be a superkey. This ensures that no non-trivial
                                    dependency exists between non-superkey attributes, thus eliminating redundancy
                                    and ensuring better data integrity.
                                </p>

                                {/* Before Normalization */}
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4">
                                    Before BCNF Normalization
                                </p>

                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                                <TableHead>Professor_ID</TableHead>
                                                <TableHead>Professor_Name</TableHead>
                                                <TableHead>Subject</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                [101, 'Dr. Smith', 'Database Systems'],
                                                [102, 'Dr. Johnson', 'Operating Systems'],
                                            ].map(([s_id, c_id, s_name]) => (
                                                <TableRow key={`${s_id}-${c_id}`} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                    <TableCell>{s_id}</TableCell>
                                                    <TableCell>{c_id}</TableCell>
                                                    <TableCell>{s_name}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* After Normalization */}
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-6">
                                    After BCNF – Splitting into Two Tables
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Professor Table */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                        <div className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Professor Table</h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-gray-50 dark:bg-gray-900">
                                                    <TableHead>Professor_ID</TableHead>
                                                    <TableHead>Professor_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, 'Dr. Smith'],
                                                    [102, 'Dr. Johnson'],
                                                ].map(([id, name]) => (
                                                    <TableRow key={id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Subject Table */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                                        <div className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Subject Table</h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-gray-50 dark:bg-gray-900">
                                                    <TableHead className="w-[100px]">Subject</TableHead>
                                                    <TableHead>Professor_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    ['Database Systems', 101],
                                                    ['Operating Systems', 102],
                                                ].map(([subject, professor_id]) => (
                                                    <TableRow key={subject} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <TableCell>{subject}</TableCell>
                                                        <TableCell>{professor_id}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className='max-w-4xl mx-auto px-6 md:px-8 py-8 space-y-8 ' id='joins'>
                        {/* Header Section */}
                        <div className='bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden' >
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>

                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    SQL Joins
                                </h2>

                            </h2>
                            <p className='text-lg text-gray-600 dark:text-gray-300 leading-7'>
                                A <span className='font-semibold text-blue-600 dark:text-blue-400'>JOIN</span> clause combines records from two or more tables using a related column. Essential for working with normalized databases.
                            </p>
                            <div className='grid md:grid-cols-2 gap-6 pt-4 pb-8'>

                                {/* Student Table */}
                                {/* Student Table */}
                                <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                    <div className="px-4 pt-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Student Table</h4>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableHead>student_id</TableHead>
                                                <TableHead>name</TableHead>
                                                <TableHead>course_id</TableHead>
                                            </TableHeader>

                                            <TableBody>
                                                {[
                                                    [1, 'Ananya', 101],
                                                    [2, 'Raj', 102],
                                                    [3, 'Priya', 101],
                                                    [4, 'Arjun', null],
                                                    [5, 'Sneha', 104],
                                                ].map(([student_id, name, course_id]) => (
                                                    <TableRow key={student_id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <TableCell>{student_id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                        <TableCell>{course_id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>


                                {/* Course Table */}
                                {/* Course Table */}
                                <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden'>
                                    <div className="px-4 pt-4">
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Course Table</h4>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <Table className='w-full'>
                                            <TableHeader>
                                                <TableHead>course_id</TableHead>
                                                <TableHead>course_name</TableHead>
                                            </TableHeader>

                                            <TableBody>
                                                {[
                                                    [101, 'DBMS'],
                                                    [102, 'Operating System'],
                                                    [103, 'CN'],
                                                ].map(([course_id, course_name]) => (
                                                    <TableRow key={course_id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                        <TableCell>{course_id}</TableCell>
                                                        <TableCell>{course_name}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>


                            </div>


                            {/* Inner Join Section */}
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>1. Inner Join</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        Returns only matching records from both tables. Non-matching rows are excluded.
                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(innerJoinSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {innerJoinSnippet}
                                    </SyntaxHighlighter>

                                </div>



                                {/* Join Result */}
                                <div className='relative my-6'>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-6 py-1 bg-white dark:bg-gray-800 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-full shadow-sm border border-blue-100 dark:border-blue-900">
                                            INNER JOIN RESULT
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className='w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl '>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Combined Results
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black '>Name</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course_Name</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ['Ananya', 'DBMS'],
                                                ['Raj', 'Operating System'],
                                                ['Priya', 'DBMS'],
                                            ].map(([name, course], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell>{name}</TableCell>
                                                    <TableCell>{course}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>

                            <div className='space-y-6 pt-6'>
                                <div className='space-y-2 '>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>2. Left Join</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        A LEFT JOIN in SQL is used to retrieve all records from the left table (students, in our case) and only matching records from the right table (courses). If there is no match, it returns NULL for the columns from the right table.

                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(leftJoinSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {leftJoinSnippet}
                                    </SyntaxHighlighter>

                                </div>


                                {/* Join Result */}
                                <div className='relative my-6'>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-6 py-1 bg-white dark:bg-gray-800 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-full shadow-sm border border-blue-100 dark:border-blue-900">
                                            Left JOIN RESULT
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className='w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl '>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Combined Results
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black '>Name</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course_Name</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ['Ananya', 'DBMS'],
                                                ['Raj', 'Operating System'],
                                                ['Priya', 'DBMS'],
                                                ['Arjun', null],
                                                ['Sneha', null],
                                            ].map(([name, course], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell>{name}</TableCell>
                                                    <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>




                            <div className='space-y-6 pt-6'>
                                <div className='space-y-2 '>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>3. Right Join</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        A RIGHT JOIN retrieves all records from the right table (courses, in this case) and only matching records from the left table (students). If there's no match, it returns NULL for the columns from the left table.
                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(rightJoinSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {rightJoinSnippet}
                                    </SyntaxHighlighter>

                                </div>



                                {/* Join Result */}
                                <div className='relative my-6'>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-6 py-1 bg-white dark:bg-gray-800 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-full shadow-sm border border-blue-100 dark:border-blue-900">
                                            Right JOIN RESULT
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className='w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl '>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Combined Results
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black '>Name</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course_Name</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ['Ananya', 'DBMS'],
                                                ['Raj', 'Operating System'],
                                                ['Priya', 'DBMS'],
                                                [null, 'CN'],
                                            ].map(([name, course], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell>{name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>

                            <div className='space-y-6 pt-6'>
                                <div className='space-y-2 '>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>4. Full Outer Join</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        A FULL OUTER JOIN returns all records from both tables. If there is a match, it shows the combined data. If there is no match, it fills the missing values with NULL

                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(fullJoinSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {fullJoinSnippet}
                                    </SyntaxHighlighter>

                                </div>



                                {/* Join Result */}
                                <div className='relative my-6'>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-6 py-1 bg-white dark:bg-gray-800 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-full shadow-sm border border-blue-100 dark:border-blue-900">
                                            Full outer JOIN RESULT
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className='w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl '>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Combined Results
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black '>Name</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course_Name</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ['Ananya', 'DBMS'],
                                                ['Raj', 'Operating System'],
                                                ['Priya', 'DBMS'],
                                                ['Arjun', null],
                                                ['Sneha', null],
                                                [null, 'CN'],
                                            ].map(([name, course], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell>{name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>


                            <div className='space-y-6 pt-6'>
                                <div className='space-y-2 '>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>5. CROSS JOIN</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        A CROSS JOIN returns the Cartesian product of two tables — it combines every row from the first table with every row from the second table.

                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(crossJoinSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {crossJoinSnippet}
                                    </SyntaxHighlighter>

                                </div>



                                {/* Join Result */}
                                <div className='relative my-6'>
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-6 py-1 bg-white dark:bg-gray-800 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-full shadow-sm border border-blue-100 dark:border-blue-900">
                                            CROSS JOIN RESULT
                                        </span>
                                    </div>
                                </div>

                                {/* Result Table */}
                                <div className='w-full bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl '>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Combined Results
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black '>Student ID</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Name</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course ID</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Joined Course ID</TableHead>
                                            <TableHead className='w-1/2 font-bold dark:text-white text-black'>Course_Name</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                [1, 'Ananya', 101, 101, 'DBMS'],
                                                [1, 'Ananya', 101, 102, 'Operating System'],
                                                [1, 'Ananya', 101, 103, 'CN'],
                                                [2, 'Raj', 102, 101, 'DBMS'],
                                                [2, 'Raj', 102, 102, 'Operating System'],
                                                [2, 'Raj', 102, 103, 'CN'],
                                                [3, 'Priya', 101, 101, 'DBMS'],
                                                [3, 'Priya', 101, 102, 'Operating System'],
                                                [3, 'Priya', 101, 103, 'CN'],
                                                [4, 'Arjun', null, 101, 'DBMS'],
                                                [4, 'Arjun', null, 102, 'Operating System'],
                                                [4, 'Arjun', null, 103, 'CN'],
                                                [5, 'Sneha', 104, 101, 'DBMS'],
                                                [5, 'Sneha', 104, 102, 'Operating System'],
                                                [5, 'Sneha', 104, 103, 'CN'],
                                            ].map(([student_id, name, course_id, joined_course_id, course_name], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell>{student_id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{course_id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{joined_course_id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>

                                                    <TableCell>{course_name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>
                        </div>


                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="view_indexing">
                        < div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id='view&indexing'>

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    View & Indexing
                                </h2>
                            </h2>


                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        View
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>A <strong>view</strong> is a virtual table based on the result of an SQL query.</li>
                                        <li>Used for security, abstraction, and simplifying complex queries.</li>
                                    </ul>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                    <button
                                        className="absolute top-5 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                        onClick={() => handleCopy(viewSnippet)}
                                        title="Copy Code"
                                        aria-label="Copy code snippet"
                                    >
                                        {copied ? (
                                            <AiOutlineCheck
                                                className="text-green-600 dark:text-green-400 transition-colors"
                                                size={18}
                                            />
                                        ) : (
                                            <AiOutlineCopy
                                                className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                                                size={18}
                                            />
                                        )}
                                    </button>

                                    <SyntaxHighlighter language="sql" style={dracula} className="rounded-lg shadow-md mt-4">
                                        {viewSnippet}
                                    </SyntaxHighlighter>

                                </div>
                                </div>
                            </div>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Indexing
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Helps find data faster by organizing it better.</li>

                                    </ul>
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Types of Indexing:
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>Index Type</TableHead>
                                                    <TableHead>Description</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    ["Clustered Index", "Data is stored physically in sorted order. Only one per table."],
                                                    ["Non-Clustered Index", "Stores a separate index table with pointers to actual data. Multiple indexes are allowed."]
                                                ].map(([data1, data2], index) => (
                                                    <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell><strong>{data1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</strong></TableCell>
                                                        <TableCell>{data2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="stored_procedures_triggers">
                        < div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            {/* Section Title */}

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Stored Procedures & Triggers
                                </h2>
                            </h2>


                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Stored Procedure
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>A precompiled SQL script stored in the database to perform operations.</li>
                                        <li>Improves performance by reducing repeated query execution.</li>
                                    </ul>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Triggers
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>A trigger is an automatic action executed before/after an INSERT, UPDATE, or DELETE.</li>

                                    </ul>
                                </div>

                            </div>




                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id='transaction_concurrency'>
                            {/* Section Title */}

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Transaction Management & Concurrency Control
                                </h2>
                            </h2>


                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Transaction:
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>A sequence of SQL operations that must be <strong>atomic, consistent, isolated, and durable (ACID).</strong></li>
                                    </ul>
                                    <div className="space-y-2 mt-4">
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">ACID Properties:</h4>
                                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                            <li><strong>Atomicity:</strong>Atomicity ensures that a transaction is either fully completed or not executed at all. </li>
                                            <li><strong>Consistency:</strong>  consistency means that data in a database is always correct and follows the rules that have been set for it.</li>
                                            <li><strong>Isolation:</strong> Ensures that the operations of one transaction are isolated from others. Even if multiple transactions are running simultaneously, they do not interfere with each other.</li>
                                            <li><strong>Durability:</strong> Ensures that once a transaction is committed, it is permanently saved to the database, even if there is a system crash.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Concurrency Control
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>It ensures multiple transactions execute correctly.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id='locks_serializability'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Locks in DBMS & Serializability
                            </h2>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Locks in DBMS
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Locks are mechanisms used in a Database Management System (DBMS) to manage access to data in a way that ensures data consistency and concurrency control. </li>
                                    </ul>

                                </div>
                                <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Types of Locks in DBMS:
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>
                                                    Lock Type</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Shared (S-Lock)", "Multiple transactions can read but not write."],
                                                ["Exclusive (X-Lock)", "Only one transaction can read/write."],
                                                ["Two-Phase Locking (2PL)", "Ensures serializability by following a growing and shrinking phase."]
                                            ].map(([data1, data2], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell><strong>{data1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</strong></TableCell>
                                                    <TableCell>{data2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Serializability
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Ensures that parallel transactions produce the same result as a serial execution.</li>
                                    </ul>

                                </div>
                                <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                    <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                        <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Types of Serializability:
                                        </h4>
                                    </div>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>
                                                    Lock Type</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Conflict Serializability", "Transactions do not swap conflicting operations."],
                                                ["View Serializability", "Transactions produce the same final result as a serial schedule."]
                                            ].map(([data1, data2], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell><strong>{data1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</strong></TableCell>
                                                    <TableCell>{data2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </div>
                    </section>

                </main >

            </div >

        </div >
    )
}

export default DBMS