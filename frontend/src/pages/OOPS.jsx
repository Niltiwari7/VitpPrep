import React, { useEffect, useState } from 'react';
import { AiFillCopy, AiOutlineArrowLeft, AiOutlineBars, AiOutlineClose, AiOutlineCopy, AiOutlineDashboard } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
import { abstractionSnippet, classSnippet, constructorSnippet, destuructorSnippet, friendclassSnippet, friendfunctionSnippet, functionOverLoadingSnippet, hierarchicalInheritenceSnippet, hybridInheritenceSnippet, multilevelInheritenceSnippet, multipleInheritenceSnippet, ObjectSnippet, operatorOverLoadingSnippet, privateAccessSpecifierSnippet, protectedAccessSpecifierSnippet, publicAccessSpecifierSnippet, runTimePolymorphismSnippet, singleInheritenceSnippet } from '../assets/codeSnippets/oopExamples.js';


const OOPS = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    // Toggle Sidebar Function
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };
    const API_URL = 'http://localhost:3000';
    const links = [
        { id: '#oops_desc', text: 'OOPS Introduction', color: 'blue' },
        { id: '#Constructor', text: 'Constructor', color: 'red' },
        { id: '#Destructor', text: 'Destructor', color: 'green' },
        { id: '#Four-Pillars-of-OOPS', text: 'Four Pillars of OOPS', color: 'yellow' },
        { id: '#Abstraction', text: 'Abstraction', color: 'purple' },
        { id: '#Polymorphism', text: 'Polymorphism', color: 'pink' },
        { id: '#Inheritance', text: 'Inheritance', color: 'orange' },
        { id: '#Encapsulation', text: 'Encapsulation', color: 'teal' },
        { id: '#Friend-Function-and-Friend-Class', text: 'Friend Function and Friend Class', color: 'indigo' },
        { id: '#Access-Modifier', text: 'Access Modifier', color: 'gray' },
    ];
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
    const [currentSection, setCurrentSection] = useState('#oops_desc');
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

            links.forEach((link) => {
                const section = document.querySelector(link.id);
                if (section) {
                    observer.observe(section);
                }
            })

            return () => {
                links.forEach((link) => {
                    const section = document.querySelector(link.id);
                    if (section) {
                        observer.unobserve(section);
                    }
                })
            }
        }, 200);


        return () => clearTimeout(timeOut);
    }, []);

    const [copied, setCopied] = useState(false);
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard');
        }).catch((err) => {
            toast.error('Failed to copy to clipboard');
        })
    }
   
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

                {/* Sidebar */}
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
                <main className="sm:w-4/5 w-full ml-auto p-6 mt-20">


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="oops_desc">

                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            {/* Title */}
                            <div className="text-center mb-4">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2A3F5F] to-[#00C1B3] dark:from-[#00E3CC] dark:to-[#A0AEC0]">
                                    Object-Oriented Programming
                                </h1>

                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Introduction
                                </h2>
                            </h2>

                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                OOP stands for <span className="font-bold text-gray-900 dark:text-white">Object-Oriented Programming</span>. It helps solve real-world problems using classes and objects.
                            </p>

                            {/* Class Section */}
                            <h2 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Class
                            </h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-6">
                                A <span className="font-bold text-gray-900 dark:text-white">class</span> is a user-defined data type with its own member functions and variables. It acts as a blueprint for creating objects.
                            </p>

                            {/* Class Example */}
                            <h3 className="r mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Example:
                            </h3>
                            <div className="relative mt-3 rounded-lg shadow-md overflow-hidden">

                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(classSnippet)}
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
                                <SyntaxHighlighter language="cpp"
                                    style={dracula}
                                    className="rounded-md"


                                >
                                    {classSnippet}
                                </SyntaxHighlighter>
                            </div>


                            {/* Object Section */}
                            <h2 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Object
                            </h2>
                            <p className="mt-2 text-gray-700 dark:text-gray-300 mb-6">
                                An <span className="font-bold text-gray-900 dark:text-white">object</span> is an instance of a class. It can access the properties and methods of the class.
                            </p>

                            {/* Object Example */}
                            <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Example:
                            </h3>
                            <div className="relative mt-3 rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(classSnippet)}
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
                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
                                    {ObjectSnippet}
                                </SyntaxHighlighter>
                            </div>


                            {/* Output Section */}
                            <h3 className="mt-8 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Output:
                            </h3>
                            <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                    {`The student name is John
The student age is 20`}
                                </SyntaxHighlighter>
                            </div>

                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Constructor">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Constructor in C++
                                </h2>
                            </h2>


                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                A <span className="font-bold text-gray-900 dark:text-white">constructor</span> is a special method that does not return anything. It is automatically invoked when an object is created.
                            </p>

                            {/* Types of Constructors */}
                            <h2 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Types of Constructors:
                            </h2>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li><strong>Default Constructor:</strong> A constructor with no parameters.</li>
                                <li><strong>Parameterized Constructor:</strong> A constructor that takes arguments.</li>
                                <li><strong>Copy Constructor:</strong> A constructor that initializes an object using another object.</li>
                            </ul>

                            {/* Characteristics of Constructors */}
                            <h2 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Characteristics of Constructors:
                            </h2>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li>Constructor does not return anything.</li>
                                <li>Constructor name is the same as the class name.</li>
                                <li>Constructor cannot be private unless used in a Singleton pattern.</li>
                                <li>C++ allows constructor overloading with different parameters.</li>
                                <li>Automatically called when an object is created.</li>
                                <li>Has no return type, not even <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded-md">void</code>.</li>
                                <li>A default constructor is called if no constructor is explicitly defined.</li>
                            </ul>

                            {/* Example Section */}
                            <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Example:
                            </h3>
                            <div className="relative mt-3 rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(classSnippet)}
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
                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
                                    {constructorSnippet}
                                </SyntaxHighlighter>
                            </div>

                            {/* Output Section */}
                            <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Output:
                            </h3>
                            <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                    {`Default Constructor

Parameterized Constructor
The student name is John
The student age is 20

Copy Constructor
The student name is John
The student age is 20`}
                                </SyntaxHighlighter>
                            </div>

                        </div>
                    </section>



                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Destructor">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Destructor in C++
                                </h2>
                            </h2>


                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                A <span className="font-bold text-gray-900 dark:text-white">destructor</span> in C++ is a special member function that is called automatically
                                when an object goes out of scope or is explicitly deleted. It is used to release resources allocated to the object.
                            </p>

                            {/* Characteristics of Destructor */}
                            <h2 className="mt-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                Characteristics of Destructor:
                            </h2>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded-md">~MyClass</code> is the naming convention for a destructor.</li>
                                <li>It does not return a value and does not take any arguments.</li>
                                <li>Called automatically when an object goes out of scope or is deleted.</li>
                                <li>Used to clean up resources like memory, file handles, or system resources.</li>
                                <li>A class can have only <strong>one destructor</strong> (cannot be overloaded).</li>
                                <li>Destructors are called in <strong>reverse order</strong> of object construction.</li>
                            </ul>

                            {/* Example Section */}
                            <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Example:
                            </h3>
                            <div className="relative mt-3 rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(classSnippet)}
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
                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
                                    {destuructorSnippet}
                                </SyntaxHighlighter>
                            </div>

                            {/* Output Section */}
                            <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Output:
                            </h3>
                            <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                    {`Constructor called!
x: 10, y: 20
Destructor called!`}
                                </SyntaxHighlighter>
                            </div>

                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Four-Pillars-of-OOPS">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" >
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Four Pillars of OOPS
                                </h2>
                            </h2>


                            {/* List of Pillars */}
                            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                                <li><strong>Abstraction</strong></li>
                                <li><strong>Polymorphism</strong></li>
                                <li><strong>Inheritance</strong></li>
                                <li><strong>Encapsulation</strong></li>
                            </ul>

                            {/* Note Section */}
                            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                                <span className="font-semibold text-gray-800 dark:text-gray-100">Note:</span> The best way to remember this is with the acronym <span className="font-semibold text-indigo-600 dark:text-indigo-400">APIE</span>.
                            </p>
                        </div>
                    </section>



                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Abstraction">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Abstraction
                                </h2>
                            </h2>


                            {/* Definition and Explanation */}
                            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                Abstraction is the process of hiding the implementation details and showing only the functionality to the user. It helps to reduce programming complexity and effort.
                            </p>

                            {/* Example to Understand Abstraction */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Example to Understand Abstraction:
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                Imagine driving a car. You only need to know how to use the steering wheel, accelerator, and brakes to control the car. You don’t need to understand how the engine works or how the fuel system operates.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                In this analogy, the car’s complex system is abstracted from you, and you interact only with the necessary controls.
                            </p>

                            {/* Code Example */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Code Example in C++:
                            </h3>
                            <div className="relative mt-3 rounded-lg shadow-md overflow-hidden">
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(classSnippet)}
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
                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-md">
                                    {abstractionSnippet}
                                </SyntaxHighlighter>
                            </div>

                            {/* Explanation */}
                            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                                In the above code:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Abstract class (Car)</strong>: Defines the common interface for all cars (e.g., `drive()` method) but doesn't provide the actual implementation.</li>
                                <li><strong>Concrete class (Tesla)</strong>: Implements the `drive()` method, making the car functional.</li>
                            </ul>

                            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                The user of the car (in this case, the `Tesla` class) only interacts with the abstract `drive()` method without knowing the internal details.
                            </p>

                            {/* Output */}
                            <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Output:
                            </h3>
                            <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                    {`Driving a Tesla... the car accelerates smoothly!
The car has stopped.`}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </section>



                    <section className="max-w-4xl mx-auto px-6 py-8" id="Polymorphism">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Polymorphism
                                </h2>
                            </h2>


                            {/* Definition */}
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Polymorphism is the ability of an object to take many forms. It allows objects of different classes to be treated as objects of a common superclass.
                            </p>

                            {/* Polymorphism Types */}
                            <h3 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Polymorphism Types:
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                Polymorphism in OOP can be categorized into two types:
                            </p>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>
                                    <strong>Compile-Time Polymorphism</strong>
                                    <ul className="list-disc ml-6">
                                        <li>a) <strong>Function Overloading</strong></li>
                                        <li>b) <strong>Operator Overloading</strong></li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Run-Time Polymorphism</strong>
                                </li>
                            </ul>

                            {/* Compile-Time Polymorphism Section */}
                            <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                1. Compile-Time Polymorphism:
                            </h4>

                            <p className="mt-2">
                                <strong>a) Function Overloading:</strong> Function overloading is when two or more functions in the same scope have the same name but different parameters.
                            </p>

                            {/* Function Overloading Code */}
                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(functionOverLoadingSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {functionOverLoadingSnippet}
                                </SyntaxHighlighter>

                            </div>

                            <h3 className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Output:
                            </h3>
                            <div className="mt-3 rounded-lg shadow-md overflow-hidden">
                                <SyntaxHighlighter language="text" style={dracula} className="rounded-md">
                                    {`Printing integer: 10
Printing double: 3.14
Printing string: Hello`}
                                </SyntaxHighlighter>
                            </div>


                            <p className="mt-4">
                                <strong>b) Operator Overloading:</strong> Operator overloading allows defining the behavior of operators for user-defined classes.
                            </p>

                            {/* Operator Overloading Code */}
                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(operatorOverLoadingSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {operatorOverLoadingSnippet}
                                </SyntaxHighlighter>

                            </div>


                            {/* Run-Time Polymorphism Section */}
                            <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                2. Run-Time Polymorphism:
                            </h4>

                            <p className="mt-2">
                                Run-time polymorphism is achieved through <strong>inheritance</strong> and <strong>virtual functions</strong>. It allows a base class reference or pointer to call derived class methods.
                            </p>

                            {/* Run-Time Polymorphism Code */}

                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(runTimePolymorphismSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {runTimePolymorphismSnippet}
                                </SyntaxHighlighter>

                            </div>

                            {/* Summary */}
                            <h4 className="mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Summary:
                            </h4>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>
                                    <strong>Compile-Time Polymorphism:</strong> Achieved through function overloading and operator overloading.
                                </li>
                                <li>
                                    <strong>Run-Time Polymorphism:</strong> Achieved through inheritance and virtual functions.
                                </li>
                            </ul>
                        </div>
                    </section>



                    <section className='max-w-4xl mx-auto px-4 md:px-6 py-6' id='Inheritance'>
                        <div className='mb-2'>
                            <div className='bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden'>
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                    </svg>
                                    <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                        Inheritance
                                    </h2>
                                </h2>


                                {/* Introduction Paragraph */}
                                <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                    Inheritance is the process by which one class acquires the properties and methods of another class. It helps to reuse the code and establish a relationship between different classes.
                                </p>

                                {/* Types of Inheritance */}
                                <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                    There are five types of inheritance:
                                </h4>

                                <ul className='list-decimal ml-6 space-y-2 mb-6'>
                                    <li className='text-gray-700 dark:text-gray-300'>Single Inheritance</li>
                                    <li className='text-gray-700 dark:text-gray-300'>Multiple Inheritance</li>
                                    <li className='text-gray-700 dark:text-gray-300'>Multilevel Inheritance</li>
                                    <li className='text-gray-700 dark:text-gray-300'>Hierarchical Inheritance</li>
                                    <li className='text-gray-700 dark:text-gray-300'>Hybrid Inheritance</li>
                                </ul>

                                {/* Single Inheritance */}
                                <div>
                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Single Inheritance
                                    </h4>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        Single inheritance occurs when a child class inherits from a single parent class.
                                    </p>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                        <button
                                            className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                            onClick={() => handleCopy(singleInheritenceSnippet)}
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

                                        <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                            {singleInheritenceSnippet}
                                        </SyntaxHighlighter>

                                    </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                        {`Animal is eating.
Dog is barking.`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Multiple Inheritance */}
                                <div>
                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Multiple Inheritance
                                    </h4>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        A child class inherits from multiple parent classes.
                                    </p>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                        <button
                                            className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                            onClick={() => handleCopy(multipleInheritenceSnippet)}
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

                                        <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                            {multipleInheritenceSnippet}
                                        </SyntaxHighlighter>

                                    </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                        {`Engine started.
Wheels are rotating.
Car is driving.`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Multilevel Inheritance */}
                                <div>
                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Multilevel Inheritance
                                    </h4>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        In multilevel inheritance, a class is derived from another derived class.
                                    </p>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(multilevelInheritenceSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {multilevelInheritenceSnippet}
                                </SyntaxHighlighter>

                            </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                        {`Animal is eating.
Mammal is walking.
Dog is barking.`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Hierarchical Inheritance */}
                                <div>
                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Hierarchical Inheritance
                                    </h4>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        Multiple child classes inherit from a single parent class.
                                    </p>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(hierarchicalInheritenceSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {hierarchicalInheritenceSnippet}
                                </SyntaxHighlighter>

                            </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                        {`Animal is sleeping.
Dog is barking.
Animal is sleeping.
Cat is meowing.`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Hybrid Inheritance */}
                                <div>
                                    <h4 className='font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200'>
                                        Hybrid Inheritance
                                    </h4>
                                    <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                        A mix of multiple and multilevel inheritance.
                                    </p>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(hybridInheritenceSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {hybridInheritenceSnippet}
                                </SyntaxHighlighter>

                            </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                                    <SyntaxHighlighter language='text' style={dracula} className='rounded-md shadow-md p-4 text-sm'>
                                        {`Engine started.
Vehicle is honking.
Wheels are rotating.
Car is driving.`}
                                    </SyntaxHighlighter>

                                    {/* Comparison Table */}
                                    <div className="mt-10">
                                        <h3 className="font-bold text-lg mb-4 text-center text-gray-800 dark:text-gray-100">
                                            Summary of Inheritance Types
                                        </h3>
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-gray-200 dark:bg-gray-700">
                                                    <TableHead className="text-left px-4 py-2">Inheritance Type</TableHead>
                                                    <TableHead className="text-left px-4 py-2">Description</TableHead>
                                                    <TableHead className="text-left px-4 py-2">Example</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className=" dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                    <TableCell className="font-semibold">private</TableCell>
                                                    <TableCell>Accessible within the same class</TableCell>
                                                    <TableCell>❌ Not accessible in derived class</TableCell>
                                                </TableRow>
                                                <TableRow className=" dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                    <TableCell className="font-semibold">public</TableCell>
                                                    <TableCell>Accessible from anywhere the object is visible</TableCell>
                                                    <TableCell>✅ Accessible in derived class</TableCell>
                                                </TableRow>
                                                <TableRow className="dark:odd:bg-gray-800 dark:even:bg-gray-700">
                                                    <TableCell className="font-semibold">protected</TableCell>
                                                    <TableCell>Accessible within the same class and derived classes</TableCell>
                                                    <TableCell>✅ Accessible in derived class, but not outside</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className='max-w-4xl mx-auto px-4 md:px-6 py-6 ' id='Encapsulation'>
                        <div className='mb-2'>
                            <div className='bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden'>
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                    </svg>
                                    <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                        Encapsulation
                                    </h2>
                                </h2>


                                {/* Description Paragraph */}
                                <p className='text-gray-700 dark:text-gray-300 mt-2 leading-relaxed'>
                                    Encapsulation is the process of wrapping data (variables) and code acting on the data (methods) into a single unit called a class. It helps to protect the data from unauthorized access.
                                </p>

                            </div>
                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Friend-Function-and-Friend-Class">
                        {/* Friend Functions Section */}
                        <div className="mb-2">
                            <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                    </svg>
                                    <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                        Friend Function and Friend Class
                                    </h2>
                                </h2>


                                {/* Friend Function Section */}
                                <div className="mb-8">
                                    <h3 className="mb-4">
                                        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">Friend Function:</span>
                                        <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                                            A friend function is a non-member function that is granted access to private and protected members of a class
                                            by using the friend keyword inside the class definition.
                                        </p>
                                    </h3>

                                    <h4 className="font-bold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200">
                                        Characteristics of Friend Functions
                                    </h4>
                                    <ul className="list-disc ml-6 space-y-2 mb-6">
                                        <li className="text-gray-700 dark:text-gray-300">Declared inside the class with the friend keyword</li>
                                        <li className="text-gray-700 dark:text-gray-300">Not a member of the class but has access to its private/protected members</li>
                                        <li className="text-gray-700 dark:text-gray-300">Can be a global function or a member of another class</li>
                                    </ul>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Example</h4>
                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(friendfunctionSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {friendfunctionSnippet}
                                </SyntaxHighlighter>

                            </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Output</h4>
                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className="rounded-md shadow-md p-4 text-sm md:text-base"
                                            style={dracula}
                                            language="text"
                                        >
                                            {`Width of the box: 10`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>

                                {/* Friend Class Section */}
                                <div className="mt-10">
                                    <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">Friend Class</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                        A friend class is a class that is given access to private and protected members of another class
                                        using the friend keyword.
                                    </p>

                                    <h4 className="font-semibold text-lg mt-6 mb-3 text-gray-800 dark:text-gray-200">
                                        Characteristics of Friend Classes
                                    </h4>
                                    <ul className="list-disc ml-6 space-y-2 mb-6">
                                        <li className="text-gray-700 dark:text-gray-300">Declared inside the class with the friend keyword</li>
                                        <li className="text-gray-700 dark:text-gray-300">Can access all private and protected members of the original class</li>
                                        <li className="text-gray-700 dark:text-gray-300">Useful for tightly coupled classes</li>
                                    </ul>

                                    <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(friendclassSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {friendclassSnippet}
                                </SyntaxHighlighter>

                            </div>

                                    <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Output</h4>
                                    <div className="my-6 overflow-x-auto">
                                        <SyntaxHighlighter
                                            className="rounded-md shadow-md p-4 text-sm md:text-base"
                                            style={dracula}
                                            language="text"
                                        >
                                            {`Car engine power: 200 HP`}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>

                                {/* Comparison Table */}
                                <div className="mt-10 overflow-x-auto">
                                    <h3 className="font-bold text-xl text-center mb-6 text-gray-800 dark:text-gray-100">
                                        Key Differences Between Friend Function and Friend Class
                                    </h3>
                                    <Table className="min-w-[600px]">
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-700">
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Feature</TableHead>
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Friend Function</TableHead>
                                                <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Friend Class</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Access to private/protected members</TableCell>
                                                <TableCell className="px-4 py-3">Yes</TableCell>
                                                <TableCell className="px-4 py-3">Yes</TableCell>
                                            </TableRow>
                                            {/* Other rows */}
                                            <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                                <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">Declaration</TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="rounded bg-gray-100 dark:bg-gray-700 p-2">
                                                        <code className="text-sm">friend void func(ClassName);</code>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <div className="rounded bg-gray-100 dark:bg-gray-700 p-2">
                                                        <code className="text-sm">friend class ClassName;</code>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="Access-Modifier">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Access Modifier
                                </h2>
                            </h2>


                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                                Access modifiers in C++ define the visibility and accessibility of class members (variables and methods).
                                They control how class members are accessed inside or outside the class.
                            </p>

                            {/* Private Access Modifier */}
                            <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">1. Private Access Modifier</h3>
                            <ul className="list-disc ml-6 space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">Members declared as private can only be accessed within the same class.</li>
                                <li className="text-gray-700 dark:text-gray-300">They cannot be accessed outside the class, even by derived classes.</li>
                            </ul>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(privateAccessSpecifierSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {privateAccessSpecifierSnippet}
                                </SyntaxHighlighter>

                            </div>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                            <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
                                {`Car Model: Tesla Model X`}
                            </SyntaxHighlighter>

                            {/* Public Access Modifier */}
                            <h3 className="font-semibold text-xl mt-10 mb-4 text-gray-800 dark:text-gray-100">2. Public Access Modifier</h3>
                            <ul className="list-disc ml-6 space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">Members declared as public can be accessed from anywhere.</li>
                                <li className="text-gray-700 dark:text-gray-300">There are no restrictions on access.</li>
                            </ul>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(publicAccessSpecifierSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {publicAccessSpecifierSnippet}
                                </SyntaxHighlighter>

                            </div>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                            <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
                                {`Car Brand: BMW`}
                            </SyntaxHighlighter>

                            {/* Protected Access Modifier */}
                            <h3 className="font-semibold text-xl mt-10 mb-4 text-gray-800 dark:text-gray-100">3. Protected Access Modifier</h3>
                            <ul className="list-disc ml-6 space-y-2 mb-6">
                                <li className="text-gray-700 dark:text-gray-300">Members declared as protected behave like private members but can be accessed in derived (child) classes.</li>
                                <li className="text-gray-700 dark:text-gray-300">Cannot be accessed directly from outside the class.</li>
                            </ul>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Example</h4>
                            <div className='relative mt-3 rounded-lg shadow-md overflow-hidden'>
                                <button
                                    className="absolute top-3 right-3 z-10 p-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                                    onClick={() => handleCopy(protectedAccessSpecifierSnippet)}
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

                                <SyntaxHighlighter language="cpp" style={dracula} className="rounded-lg shadow-md mt-4">
                                    {protectedAccessSpecifierSnippet}
                                </SyntaxHighlighter>

                            </div>

                            <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">Output</h4>
                            <SyntaxHighlighter className="rounded-md shadow-md p-4 text-sm" style={dracula} language="text">
                                {`Age: 25`}
                            </SyntaxHighlighter>

                            {/* Comparison Table */}
                            <div className="mt-10">
                                <h3 className="font-bold text-lg mb-4 text-center text-gray-800 dark:text-gray-100">
                                    Access Modifier Comparison Table
                                </h3>
                                <Table className="min-w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 dark:bg-gray-700">
                                            <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Modifier</TableHead>
                                            <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Within Class</TableHead>
                                            <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Derived Class</TableHead>
                                            <TableHead className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">Outside Class</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                            <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">private</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                            <TableCell className="px-4 py-3">❌ No</TableCell>
                                            <TableCell className="px-4 py-3">❌ No</TableCell>
                                        </TableRow>
                                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                            <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">public</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                        </TableRow>
                                        <TableRow className="border-b border-gray-200 dark:border-gray-700">
                                            <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">protected</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                            <TableCell className="px-4 py-3">✅ Yes</TableCell>
                                            <TableCell className="px-4 py-3">❌ No</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </section>

                </main >
            </div>


        </div>
    );
};

export default OOPS;
