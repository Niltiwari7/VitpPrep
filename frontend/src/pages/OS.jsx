import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setDarkMode } from "../utils/slices/theme.slice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineBars, AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { FaBook, FaMoon, FaSun } from "react-icons/fa";
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

const OS = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    
  const API_URL= import.meta.env.VITE_API_URL;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    }

    const links = [
        {
            id: '#introduction',
            text: 'Introduction',
            color: 'blue'
        },
        {
            id: '#process_management',
            text: 'Process Management',
            color: 'red'
        },
        {
            id: '#thread',
            text: 'Thread',
            color: 'green'
        },
        {
            id: '#cpu_scheduling_algorithms',
            text: 'CPU scheduling algorithms',
            color: 'yellow',
            textColor: 'black'
        },
        {
            id: '#deadlocks',
            text: 'Deadlock',
            color: 'pink'
        },
        {
            id: '#memory_management',
            text: 'Memory Management',
            color: 'orange'
        },
        {
            id: '#file_system_disk_scheduling',
            text: 'File System and Disk Scheduling',
            color: 'teal'
        },
        {
            id: '#synchronization',
            text: 'Transaction Management & Concurrency Control',
            color: 'indigo'
        },
        {
            id: '#microkernel_monolithic',
            text: 'Locks in DBMS & Serializability',
            color: 'gray'
        }
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
                })
            }
        }, 100)
    }

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
    return (
        <div className="gap-5">
            <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30">
                <Link to="/dashboard" className="flex items-center space-x-2">
                    <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 hover:scale-105">
                        VitpPrep
                    </h3>

                    {/* <h3 className="text-2xl font-extrabold text-gray-900">PatternPrep</h3> */}

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

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="introduction">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            {/* Title Section */}
                            <div className="text-center mb-4">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2A3F5F] to-[#00C1B3] dark:from-[#00E3CC] dark:to-[#A0AEC0]">
                                    Operating System
                                </h1>

                            </div>

                            {/* Content */}
                            <div className="space-y-6 pt-5">
                                <div className="space-y-2">
                                    <div className="mt-4 flex gap-3 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                        </svg>
                                        <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                            Core Concepts & Architecture
                                        </h2>
                                    </div>
                                    <p className="mt-4 text-lg leading-relaxed text-[#2A3F5F] dark:text-[#A0AEC0] font-medium">
                                        An Operating System (OS) serves as the fundamental bridge between
                                        <span className="text-[#00C1B3] dark:text-[#00E3CC] font-semibold"> hardware resources </span>
                                        (CPU, memory, storage) and
                                        <span className="text-[#00C1B3] dark:text-[#00E3CC] font-semibold"> user applications</span>,
                                        providing essential services for efficient computation management.
                                    </p>

                                    <div className="space-y-6 pt-5">
                                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ">
                                            <Table className="w-full">
                                                <TableHeader className="bg-gradient-to-r from-[#00C1B3]/10 to-[#2A3F5F]/10 dark:from-[#00E3CC]/10 dark:to-[#0D1117]/10">

                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                        OS Type
                                                    </TableHead>
                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                        Architecture
                                                    </TableHead>
                                                    <TableHead className="px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20">
                                                        Use Cases
                                                    </TableHead>


                                                </TableHeader>
                                                <TableBody className="divide-y divide-[#00C1B3]/10 dark:divide-[#00E3CC]/10 bg-white/50 dark:bg-[#1A202C]/50">
                                                    {[
                                                        ['Single-Task', 'Sequential Processing', 'Embedded Systems, IoT'],
                                                        ['Multi-Tasking', 'Time-Sharing Scheduler', 'Desktop Environments'],
                                                        ['Real-Time', 'Deterministic Processing', 'Industrial Control Systems'],
                                                        ['Distributed', 'Cluster Management', 'Cloud Computing'],
                                                        ['Mobile', 'Power-Optimized', 'Smartphones/Tablets']
                                                    ].map(([type, arch, useCase], index) => (
                                                        <TableRow
                                                            key={index}
                                                            className="hover:bg-[#00C1B3]/5 dark:hover:bg-[#00E3CC]/5 transition-colors"
                                                        >
                                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                                {type}
                                                            </TableCell>
                                                            <TableCell className="px-6 py-4 text-sm text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                                {arch}
                                                            </TableCell>
                                                            <TableCell className="px-6 py-4 text-sm text-[#00C1B3] dark:text-[#00E3CC] font-medium">
                                                                {useCase}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                        </div>
                                    </div>


                                    {/* Concept Visualization */}
                                    <div className="mt-8 p-6 bg-white dark:bg-[#1A202C] rounded-lg border border-[#00C1B3]/20">
                                        <h4 className="text-lg font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] mb-4">
                                            OS Architecture Layers
                                        </h4>
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 bg-[#00C1B3] rounded-full" />
                                                <span className="text-sm text-[#2A3F5F] dark:text-[#A0AEC0]">
                                                    User Applications → System Libraries → Kernel → Hardware
                                                </span>
                                            </div>
                                            <div className="h-1 bg-gradient-to-r from-[#00C1B3] via-[#2A3F5F] to-[#00C1B3] rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id="process_management">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">


                            {/* Title Section */}
                            <div >

                                <div className="mt-4 flex gap-2">

                                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                        </svg>
                                        <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                            Core Concepts & Process States:
                                        </h2>
                                    </h2>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6 pt-5">
                                <div className="space-y-w">
                                    <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">1. Process vs Thread</h3>

                                    <Table className="mt-3 text-base">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Feature</TableHead>
                                                <TableHead>Process</TableHead>
                                                <TableHead>Thread</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        {
                                            [
                                                ['Defination', 'A process is an independent program in execution with its own memory and resources.', 'A thread is a smaller unit of execution within a process, sharing the same memory and resources.'],
                                                ['Memory', 'Each process has its own separate memory space.', 'Threads within the same process share the same memory space.'],
                                                ['Resource Allocation', 'Processes require separate resources (CPU, memory, etc.) for execution.', 'Threads share resources (like CPU, memory) of their parent process.'],
                                                ['Creation Time', 'Creating a process takes more time because it requires its own resources.', 'Creating a thread is faster because it shares resources with other threads in the same process.'],
                                                ['Execution', 'Each process executes independently.', 'Multiple threads in a process can run concurrently and share the same address space.'],
                                                ['Fault Tolerance', 'If a process crashes, it does not affect other processes.', 'If one thread crashes, it could potentially crash the entire process, affecting all other threads.']
                                            ].map(([type, desc, example], index) => (
                                                <TableBody key={index}>
                                                    <TableRow>
                                                        <TableCell><strong>{type}</strong></TableCell>
                                                        <TableCell>{desc}</TableCell>
                                                        <TableCell>{example}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ))
                                        }
                                    </Table>

                                    <div>
                                        <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                            2. Process States & Process Control Block (PCB)
                                        </h3>

                                        <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">Process States:</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            A process in an operating system can exist in various states throughout its life cycle. These states help the operating system manage and track processes efficiently. The main process states are:
                                        </p>

                                        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                                            <li><strong>New:</strong> The process is being created.</li>
                                            <li><strong>Ready:</strong> The process is waiting to be assigned to a processor. It is ready for execution but not currently running.</li>
                                            <li><strong>Running:</strong> The process is currently being executed by the CPU.</li>
                                            <li><strong>Waiting (Blocked):</strong> The process is waiting for an event or resource, like I/O completion.</li>
                                            <li><strong>Terminated:</strong> The process has finished execution and is now in the terminated state, ready to be cleaned up by the operating system.</li>
                                        </ul>

                                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                                            These states help the operating system efficiently manage multitasking and process scheduling.
                                        </p>

                                        <figure className="relative">
                                            <img
                                                src="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter3/3_02_ProcessState.jpg"
                                                alt="Process states"
                                                className="object-cover w-full pt-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                            />
                                            <figcaption className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-2 rounded-md text-lg">
                                                States of Process
                                            </figcaption>
                                        </figure>

                                        <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">3. Process Control Block (PCB):</h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            The Process Control Block (PCB) is a data structure used by the operating system to store all the information needed to manage a process. It contains key details about the process, allowing the OS to track its state, resources, and execution context.
                                        </p>

                                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                                            A PCB typically includes the following information:
                                        </p>

                                        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
                                            <li><strong>Process ID (PID):</strong> A unique identifier for the process.</li>
                                            <li><strong>Process State:</strong> The current state of the process (e.g., running, ready, blocked).</li>
                                            <li><strong>Program Counter (PC):</strong> The address of the next instruction to execute.</li>
                                            <li><strong>CPU Registers:</strong> Values of the CPU registers at the time of the last execution.</li>
                                            <li><strong>Memory Management Info:</strong> Information about the memory allocated to the process.</li>
                                            <li><strong>Scheduling Info:</strong> Process priority and scheduling details.</li>
                                            <li><strong>I/O Status Info:</strong> Information about I/O operations being performed by the process.</li>
                                            <li><strong>Accounting Info:</strong> Data like CPU time used and process creation time.</li>
                                        </ul>

                                        <p className="text-gray-700 dark:text-gray-300 mt-4">
                                            The PCB is essential for process management in modern operating systems. It ensures that each process can be paused and resumed correctly during context switches, making multitasking possible.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="thread">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Threads:
                                </h2>
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* FCFS (First-Come, First-Served) */}
                                <div className="space-y-2">

                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-7">
                                        A thread is the smallest unit of execution within a process.
                                    </p>

                                    <div className='space-y-6 pt-5'>
                                        {/* Heading */}
                                        <div className='space-y-2'>
                                            <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                                Difference between User-Level Threads and Kernel-Level Threads
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Table */}
                                    <div className='space-y-6 pt-5'>
                                        <div className='overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
                                            <Table className='w-full'>
                                                <TableHeader>
                                                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                                                        <TableHead>Concept</TableHead>
                                                        <TableHead>User-Level Threads</TableHead>
                                                        <TableHead>Kernel-Level Threads</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        ['Definition', 'Threads managed by user-level libraries, without OS intervention.', 'Threads managed and scheduled by the operating system kernel.'],
                                                        ['Performance', 'Generally faster since there is no need for kernel intervention.', 'Slower due to the overhead of kernel context switching.'],
                                                        ['Context Switching', 'Context switching happens in user space (no kernel involvement).', 'Context switching involves the kernel and can be slower.'],
                                                        ['Portability', 'More portable across systems because they don’t rely on OS kernel.', 'Less portable since they depend on kernel-specific support.'],
                                                        ['Complexity', 'Easier to implement because no kernel intervention is needed.', 'More complex to implement as the kernel must manage threads.']
                                                    ].map(([concept, user, kernel], index) => (
                                                        <TableRow key={index} className='hover:bg-gray-50 dark:hover:bg-gray-900/50'>
                                                            <TableCell>{concept}</TableCell>
                                                            <TableCell>{user}</TableCell>
                                                            <TableCell>{kernel}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="cpu_scheduling_algorithms">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            {/* Section Title */}
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    CPU Scheduling Algorithms:
                                </h2>
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* FCFS (First-Come, First-Served) */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        1. FCFS (First-Come, First-Served):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Processes are executed in the order they arrive.</li>
                                        <li>Simple but can lead to long waiting times (convoy effect).</li>
                                    </ul>
                                </div>

                                {/* SJF (Shortest Job First) */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        2. SJF (Shortest Job First):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>The process with the shortest burst time is executed first.</li>
                                        <li>Can minimize average waiting time but requires knowing process lengths in advance.</li>
                                    </ul>
                                </div>

                                {/* Round Robin (RR) */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        3. Round Robin (RR):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Each process is assigned a fixed time slice (quantum) and executed in a circular order.</li>
                                        <li>Fair but can lead to high turnaround time for longer processes.</li>
                                    </ul>
                                </div>

                                {/* Priority Scheduling */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        4. Priority Scheduling:
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Each process is assigned a priority, and the process with the highest priority is executed first.</li>
                                        <li>Can be preemptive or non-preemptive.</li>
                                    </ul>
                                </div>

                                {/* Preemptive vs Non-Preemptive Table */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Preemptive vs Non-Preemptive</h3>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>Feature</TableHead>
                                                <TableHead>Preemptive Scheduling</TableHead>
                                                <TableHead>Non-Preemptive Scheduling</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Definition", "The OS can interrupt a running process to switch to another.", "Once a process starts execution, it runs until completion or voluntarily yields control."],
                                                ["Context Switching", "Frequent context switching", "Less frequent context switching"],
                                                ["CPU Utilization", "Generally better CPU utilization due to rapid context switching.", "Can result in lower CPU utilization if a process is blocked or waiting for I/O."],
                                                ["Interrupts", "Can be interrupted by the OS at any time.", "Process cannot be interrupted once it starts execution."],
                                                ["Complexity", "More complex", "Simpler to implement"]
                                            ].map(([data1, data2, data3], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell><strong>{data1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</strong></TableCell>
                                                    <TableCell>{data2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{data3 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Interprocess Communication (IPC) */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Interprocess Communication (IPC)
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Interprocess Communication (IPC) allows processes to communicate and synchronize with each other.</li>
                                    </ul>
                                </div>

                                {/* Shared Memory vs. Message Passing Table */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Shared Memory vs. Message Passing</h3>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>Feature</TableHead>
                                                <TableHead>Shared Memory</TableHead>
                                                <TableHead>Message Passing</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Definition", "Multiple processes can access a common region of memory.", "Processes communicate by sending messages to each other."],
                                                ["Communication Mechanism", "Direct access to shared memory region.", "Messages are passed via system calls or message queues."],
                                                ["Speed", "Faster", "Slower"],
                                                ["Synchronization", "Requires synchronization mechanisms", "Automatically handled by the OS or message-passing system."],
                                                ["Ease of Use", "More complex to implement due to need for synchronization.", "Simpler and more modular but can lead to overhead."]
                                            ].map(([data1, data2, data3], index) => (
                                                <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                    <TableCell><strong>{data1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</strong></TableCell>
                                                    <TableCell>{data2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    <TableCell>{data3 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8 " id="deadlocks">
                        < div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden0" >
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>

                                Deadlocks
                            </h2>


                            {/* Section Description */}
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-7">
                                A deadlock occurs when a set of processes are blocked, each waiting for resources that are held by other processes in the set, resulting in a circular wait and no process can proceed.
                            </p>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Conditions for Deadlock
                                    </h3>
                                    <p>Deadlock can occur if the following four conditions hold true simultaneously:</p>

                                    {/* Conditions List */}
                                    <ul className='list-decimal list-inside space-y-2'>
                                        <li>
                                            <strong>Mutual Exclusion:</strong> At least one resource must be held in a non-shareable mode, meaning that only one process can use the resource at a time.
                                        </li>
                                        <li>
                                            <strong>Hold and Wait:</strong> A process is holding at least one resource and is waiting to acquire additional resources that are currently held by other processes.
                                        </li>
                                        <li>
                                            <strong>No Preemption:</strong> Resources cannot be preempted from processes. A process must release its resources voluntarily once it is done.
                                        </li>
                                        <li>
                                            <strong>Circular Wait:</strong> A set of processes exists such that each process is waiting for a resource held by the next process in the cycle, forming a circular chain of waiting processes.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="memory_management">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" >
                            {/* Section Title */}
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Memory Management
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* Paging vs Segmentation */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Paging vs. Segmentation
                                    </h3>
                                    <p><strong>Paging</strong>: Memory is divided into fixed-size blocks called pages. These pages are mapped into physical memory, which prevents fragmentation and simplifies memory management.</p>
                                    <p><strong>Segmentation</strong>: Memory is divided into variable-sized segments, like functions or data structures. It allows logical grouping of memory but can lead to external fragmentation.</p>
                                </div>

                                {/* Internal & External Fragmentation */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Internal & External Fragmentation
                                    </h3>
                                    <p><strong>Internal Fragmentation</strong>: Occurs when memory blocks are allocated but not fully used, leading to wasted space inside a block (common in paging).</p>
                                    <p><strong>External Fragmentation</strong>: Happens when free memory is scattered in small blocks, preventing large contiguous memory allocations (common in segmentation).</p>
                                </div>

                                {/* Virtual Memory & Page Replacement */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Virtual Memory & Page Replacement
                                    </h3>
                                    <p><strong>Virtual Memory</strong>: A memory management technique that simulates a larger memory space using disk storage. It allows programs to run as though they have more memory than physically available.</p>
                                    <p><strong>Demand Paging</strong>: Pages are loaded into memory only when they are needed, saving memory by loading only required pages.</p>
                                    <p><strong>Thrashing</strong>: Occurs when the system spends most of its time swapping data between RAM and disk due to excessive page faults, significantly reducing performance.</p>

                                    {/* Page Replacement Algorithms */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Page Replacement Algorithms</h4>
                                    <ul className="list-disc list-inside">
                                        <li><strong>FIFO (First In, First Out)</strong>: The oldest page in memory is replaced when a new page needs to be loaded.</li>
                                        <li><strong>LRU (Least Recently Used)</strong>: The page that has not been used for the longest time is replaced.</li>
                                        <li><strong>Optimal</strong>: The page that will not be used for the longest time in the future is replaced (theoretical and not practical to implement).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="file_system_disk_scheduling">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" >
                            {/* Section Title */}
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                File System & Disk Scheduling
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* File System Management */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        File System Management
                                    </h3>

                                    {/* File Structure & Directory Structures */}
                                    <p><strong>File Structure</strong>: The way in which data is organized and stored in files. Common structures include simple text files, binary files, and database files, which define how data is stored and retrieved.</p>
                                    <p><strong>Directory Structures</strong>: Methods for organizing files in a hierarchical manner. Common structures include:
                                        <ul className="list-disc list-inside">
                                            <li><strong>Single-level Directory</strong>: All files are stored in one directory.</li>
                                            <li><strong>Two-level Directory</strong>: Files are stored in user directories, each with its own subdirectory.</li>
                                            <li><strong>Hierarchical Directory</strong>: A tree-like structure with multiple levels of directories and subdirectories.</li>
                                        </ul>
                                    </p>

                                    {/* File Allocation Methods */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">File Allocation Methods</h4>
                                    <ul className="list-disc list-inside">
                                        <li><strong>Contiguous Allocation</strong>: Files are stored in contiguous blocks of memory, making access faster but causing issues with fragmentation.</li>
                                        <li><strong>Linked Allocation</strong>: Each file block points to the next block, making it flexible and eliminating fragmentation, but access time is slower due to pointer following.</li>
                                        <li><strong>Indexed Allocation</strong>: Each file has an index block that contains pointers to its data blocks, allowing direct access but using more memory for storing index blocks.</li>
                                    </ul>
                                </div>

                                {/* Disk Scheduling Algorithms */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Disk Scheduling Algorithms
                                    </h3>
                                    <p>Disk scheduling algorithms are used to decide the order in which disk I/O requests are processed. Common algorithms include:</p>
                                    <ul className="list-disc list-inside">
                                        <li><strong>FCFS (First-Come, First-Served)</strong>: Requests are processed in the order they arrive, which can lead to inefficient disk utilization.</li>
                                        <li><strong>SSTF (Shortest Seek Time First)</strong>: The request closest to the current head position is processed next, reducing seek time but potentially causing starvation for distant requests.</li>
                                        <li><strong>SCAN</strong>: The disk arm moves in one direction servicing requests until it reaches the end, then reverses direction to service the requests on the other side.</li>
                                        <li><strong>C-SCAN (Circular SCAN)</strong>: Similar to SCAN, but instead of reversing direction, the disk arm jumps to the other end and continues servicing requests in the same direction.</li>
                                        <li><strong>LOOK</strong>: The disk arm moves in one direction until it reaches the last request, then reverses direction without going all the way to the end of the disk, making it more efficient than SCAN.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="synchronization">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id="synchronization-concurrency">
                            {/* Section Title */}
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Synchronization & Concurrency Control
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* Critical Section Problem */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Critical Section Problem
                                    </h3>
                                    <p>The Critical Section Problem arises in concurrent programming when multiple processes or threads try to access shared resources (such as data or files) simultaneously, leading to data inconsistencies or errors. The goal is to design a mechanism that allows only one process to enter the critical section at a time, ensuring mutual exclusion and preventing race conditions.</p>
                                    <p>To solve this, we need to ensure the following properties:</p>
                                    <ul className="list-disc list-inside">
                                        <li><strong>Mutual Exclusion:</strong> Only one process can be in the critical section at a time.</li>
                                        <li><strong>Progress:</strong> If no process is in the critical section, the next process should be able to enter.</li>
                                        <li><strong>Bounded Waiting:</strong> There must be a limit on the number of times other processes can enter the critical section before the waiting process gets its turn.</li>
                                    </ul>
                                </div>

                                {/* Synchronization Mechanisms */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Synchronization Mechanisms
                                    </h3>
                                    <p>Synchronization mechanisms are used to coordinate the access of multiple processes or threads to shared resources, ensuring that data integrity is maintained and preventing conflicts. Two common synchronization mechanisms are:</p>

                                    {/* Semaphores */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Semaphores</h4>
                                    <p>A <strong>semaphore</strong> is a synchronization primitive that controls access to shared resources by using a counter. It has two main operations:</p>
                                    <ul className="list-disc list-inside">
                                        <li><strong>Wait (P):</strong> Decreases the semaphore's value. If the value is negative, the process is blocked.</li>
                                        <li><strong>Signal (V):</strong> Increases the semaphore's value, potentially unblocking a waiting process.</li>
                                    </ul>
                                    <p>Semaphores are typically used to manage access to a finite number of resources, such as a pool of database connections or printers.</p>

                                    {/* Mutex */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Mutex</h4>
                                    <p>A <strong>mutex</strong> (short for mutual exclusion) is a locking mechanism used to enforce mutual exclusion, ensuring that only one thread or process can access a shared resource at any time. It works by locking a resource when a process enters the critical section and unlocking it when the process exits. Unlike semaphores, which can be used by multiple processes, a mutex is typically used by a single process or thread.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id="microkernel_monolithic">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden" id="kernel-comparison">
                            {/* Section Title */}
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Microkernel vs. Monolithic Kernel
                            </h2>

                            <div className="space-y-6 pt-5">
                                {/* Microkernel vs. Monolithic Kernel */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Microkernel vs. Monolithic Kernel
                                    </h3>

                                    <p><strong>Microkernel</strong>: A microkernel is a kernel architecture that only includes the basic functionalities of the operating system such as communication, process management, and memory management. Other services, such as device drivers, file systems, and networking, run in user space as separate processes.</p>

                                    <p><strong>Monolithic Kernel</strong>: A monolithic kernel is an operating system architecture where the entire operating system, including device drivers, file systems, and system services, runs in kernel space, forming a single large program.</p>

                                    {/* Differences */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Differences</h4>
                                    <Table className="min-w-full text-left table-auto">
                                        <TableHead className="px-4 py-2 border"> Feature</TableHead>
                                        <TableHead className="px-4 py-2 border">MicroKernel</TableHead>
                                        <TableHead className="px-4 py-2 border">Monolithis</TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="px-4 py-2 border">Architecture</TableCell>
                                                <TableCell className="px-4 py-2 border">Minimal, only essential services in kernel space</TableCell>
                                                <TableCell className="px-4 py-2 border">All services (drivers, file systems) in kernel space</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-4 py-2 border">Performance</TableCell>
                                                <TableCell className="px-4 py-2 border">Slower due to communication overhead between user and kernel space</TableCell>
                                                <TableCell className="px-4 py-2 border">Faster as everything is in kernel space</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-4 py-2 border">Fault Isolation</TableCell>
                                                <TableCell className="px-4 py-2 border">Better fault tolerance, as services run in user space</TableCell>
                                                <TableCell className="px-4 py-2 border">Less fault tolerance, as crashes in the kernel affect the whole system</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="px-4 py-2 border">Modularity</TableCell>
                                                <TableCell className="px-4 py-2 border">Highly modular, easier to add/remove services</TableCell>
                                                <TableCell className="px-4 py-2 border">Less modular, all services tightly integrated</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                    {/* Advantages */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Advantages</h4>
                                    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100">Microkernel</h5>
                                    <ul className="list-disc list-inside">
                                        <li>Better fault isolation and system stability.</li>
                                        <li>More flexible, with easier updates and modifications since services run in user space.</li>
                                        <li>Improved security, as fewer parts run with high privileges in kernel space.</li>
                                    </ul>

                                    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100">Monolithic Kernel</h5>
                                    <ul className="list-disc list-inside">
                                        <li>Faster performance, since services run directly in kernel space.</li>
                                        <li>More efficient communication between services, as no need for message passing between user and kernel space.</li>
                                        <li>Simpler to implement for smaller systems that don't require heavy modularity.</li>
                                    </ul>

                                    {/* Examples */}
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Examples</h4>
                                    <p><strong>Microkernel:</strong> Examples of microkernel-based operating systems include **MINIX** and **QNX**.</p>
                                    <p><strong>Monolithic Kernel:</strong> Examples of monolithic kernels include **Linux**, **Unix**, and **MS-DOS**.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

            </div >
        </div >
    )
}

export default OS