import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setDarkMode } from "../utils/slices/theme.slice";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineBars } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
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

const OS = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    }
    return (
        <div className="gap-5">
            <header className='w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10'>
                <Link to='/dashboard' className="flex items-center text-blue-600 dark:text-yellow-500 hover:underline">
                    <AiOutlineArrowLeft size={20} />
                    <span className="ml-2">Back To Profile</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button
                        aria-label="Toggle Theme"
                        onClick={toggleTheme}
                        className="p-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full shadow hover:scale-105 transition"
                    >
                        {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>

                    {
                        user?.imageUrl && (
                            <img className="w-10 h-10 rounded-full object-cover "
                                src={user.imageUrl} alt="Profile" />
                        )
                    }
                </div>
            </header>

            <div
                className='flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100'
            >

                <div className={`bg-white dark:bg-gray-900 mt-[60px] p-6 w-[60%] sm:w-[20%] fixed min-h-screen shadow-lg rounded-lg 
                 dark:text-white text-black transition-all duration-300 ease-in-out 
                 ${isSidebarOpen ? "block" : "hidden sm:block"} 
                 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600`}>

                    <h3 className="text-center text-lg font-semibold pb-4 border-b border-gray-300 dark:border-gray-700">Content</h3>

                    <div className="flex flex-col gap-2 mt-4">
                        <a href="#introduction" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition duration-300">Introduction</a>
                        <a href="#key" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition duration-300">Types of Keys in DBMS</a>
                        <a href="#er_model" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition duration-300">ER Model (Entity-Relationship Model)ER Model (Entity-Relationship Model)</a>
                        <a href="#normalisation" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-yellow-500 hover:text-black transition duration-300">Normalisation</a>

                        <a href="#joins" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white transition duration-300">SQL Joins</a>
                        <a href="#view&indexing" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition duration-300">View & Indexing</a>
                        <a href="#stored_procedures&triggers" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-teal-500 hover:text-white transition duration-300">Stored Procedures & Triggers</a>
                        <a href="#transaction&concurrency" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition duration-300">Transaction Management & Concurrency Control</a>
                        <a href="#locks&serializability" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-500 hover:text-white transition duration-300">Locks in DBMS & Serializability</a>

                    </div>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="sm:hidden fixed top-16 right-4 bg-blue-600 dark:bg-yellow-500 text-white p-2 rounded-full shadow-md z-20">
                    <AiOutlineBars size={24} />
                </button>

                <main className="sm:w-4/5 w-full ml-auto p-6 mt-20">

                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700 " id='introduction'>

                            {/* Title */}
                            <h1 className="text-center text-2xl font-bold text-blue-600 dark:text-yellow-500">
                                Operating System
                            </h1>
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Introduction
                            </h2>
                            <p className="mt-2 text-base text-gray-700 dark:text-gray-300 leading-relaxed">

                                An Operating System (OS) acts as an interface between the computer hardware and user applications. It manages the hardware resources of a computer, such as the CPU, memory, and storage, and provides services for running applications.

                            </p>


                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Types of OS
                            </h3>


                            <Table className="mt-3 text-base">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type of OS</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Example</TableHead>
                                    </TableRow>
                                </TableHeader>

                                {
                                    [
                                        ['Single-User, Single-Task OS', 'Used by a single user to perform one task at a time.', 'MS-DOS'],
                                        ['Single-User, Multi-Tasking OS', 'Allows one user to perform multiple tasks simultaneously.', 'Windows, macOS'],
                                        ['Multi-User OS', 'Supports multiple users simultaneously.', 'Linux, Unix, Windows Server'],
                                        ['Real-Time OS (RTOS)', 'Designed to process data in real-time, used in embedded systems.', 'FreeRTOS, VxWorks'],
                                        ['Distributed OS', 'Manages multiple computers as a single system.', 'Google Chrome OS, Hadoop']
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
                        </div>


                    </div>

                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700 " id='introduction'>


                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Process Management
                            </h2>
                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                1. Process vs Thread
                            </h3>


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
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 ">
                        < div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='normalisation'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Thread
                            </h2>


                            {/* Section Description */}
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-7">
                                A thread is the smallest unit of execution within a process.
                            </p>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Different between User-Level Threads and Kernel-Level Threads
                                    </h3>
                                </div>
                            </div>


                            <div className='space-y-6 pt-5'>

                                <div className='overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'>
                                    <Table className='w-full'>
                                        <TableHeader>
                                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                                <TableHead>Concept</TableHead>
                                                <TableHead>User-Level Threads</TableHead>

                                                <TableHead>	Kernel-Level Threads</TableHead>
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
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='transaction&concurrency'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                CPU Scheduling Algorithms:
                            </h2>

                            <div className='space-y-6 pt-5'>
                                {/* Heading */}
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        1. FCFS (First-Come, First-Served):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Processes are executed in the order they arrive.</li>
                                        <li>Simple but can lead to long waiting times (convoy effect).</li>
                                    </ul>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        2. SJF (Shortest Job First):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>The process with the shortest burst time is executed first.</li>
                                        <li>Can minimize average waiting time but requires knowing process lengths in advance.</li>
                                    </ul>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        3. Round Robin (RR):
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Each process is assigned a fixed time slice (quantum) and executed in a circular order.</li>
                                        <li>Fair but can lead to high turnaround time for longer processes.</li>
                                    </ul>
                                </div>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        4. Priority Scheduling:
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Each process is assigned a priority, and the process with the highest priority is executed first.</li>
                                        <li>Can be preemptive or non-preemptive.</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Preemptive vs Non-Preemptive</h3>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>
                                                    Feature</TableHead>
                                                <TableHead>Preemptive Scheduling</TableHead>
                                                <TableHead>Non-Preemptive Scheduling</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Definition", "The OS can interrupt a running process to switch to another.", "Once a process starts execution, it runs until completion or voluntarily yields control."],
                                                ["Context Switching", "Frequent context switching ", "Less frequent context switching "],
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

                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>
                                        Interprocess Communication (IPC)
                                    </h3>
                                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                                        <li>Interprocess Communication (IPC) allows processes to communicate and synchronize with each other.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Shared Memory vs. Message Passing</h3>
                                    <Table className="w-full">
                                        <TableHeader>
                                            <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                <TableHead>
                                                    Feature</TableHead>
                                                <TableHead>Shared Memory</TableHead>
                                                <TableHead>Message Passing</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {[
                                                ["Definition", "Multiple processes can access a common region of memory.", "Processes communicate by sending messages to each other."],
                                                ["Communication Mechanism", "Direct access to shared memory region. ", "Messages are passed via system calls or message queues."],
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
                    </div>
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 ">
                        < div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='normalisation'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    </div>
                </main>

            </div >
        </div >
    )
}

export default OS