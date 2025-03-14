import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../utils/slices/theme.slice';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineBars } from 'react-icons/ai';
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

const DBMS = () => {
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
        <div className='gap-5'>
            <header className='w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10'>
                <Link to='/dashboard' className='flex items-center text-blue-600 dark:text-yellow-500 hover:underline'>
                    <AiOutlineArrowLeft size={20} />
                    <span className='ml-2'>Back To Profile</span>
                </Link>

                <div className='flex items-center gap-4'>
                    <button
                        aria-label='Toggle theme'
                        onClick={toggleTheme}
                        className='p-2 bg-blue-600 dark:bg-yellow-500 text-white rounded-full shadow hover:scale-105 transition'
                    >
                        {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>

                    {
                        user?.imageUrl && (
                            <img className='w-10 h-10 rounded-full object-cover shadow-md'
                                src={user.imageUrl}
                                alt='Profile'
                            />
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

                <main className='sm:w-4/5 w-full ml-auto p-6 mt-20'>

                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700 " id='introduction'>

                            {/* Title */}
                            <h1 className="text-center text-2xl font-bold text-blue-600 dark:text-yellow-500">
                                Database Management System
                            </h1>
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Introduction
                            </h2>
                            <p className="mt-2 text-base text-gray-700 dark:text-gray-300 leading-relaxed">

                                A Database Management System (DBMS) is software that allows users to create, manage, and manipulate databases efficiently. It ensures data consistency, security, and integrity while supporting multiple users simultaneously. Examples: MySQL, PostgreSQL, MongoDB, Oracle, etc.

                            </p>


                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Difference Between File System and DBMS:
                            </h3>


                            <Table className="mt-3 text-base">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Feature</TableHead>
                                        <TableHead>File System 📂</TableHead>
                                        <TableHead>DBMS 🗃️</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Data Storage	</strong></TableCell>
                                        <TableCell>Data is stored in separate files.</TableCell>
                                        <TableCell>Data is stored in structured databases.</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell><strong>Data Redundancy</strong></TableCell>
                                        <TableCell>High (same data may be stored multiple times).</TableCell>
                                        <TableCell>Low (data is normalized and managed efficiently).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Data Integrity</strong></TableCell>
                                        <TableCell>Difficult to maintain.</TableCell>
                                        <TableCell>Ensures integrity via constraints (Primary Key, Foreign Key).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Security</strong></TableCell>
                                        <TableCell>Basic security, difficult to control access.</TableCell>
                                        <TableCell>High security with authentication and role-based access.
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Concurrency</strong></TableCell>
                                        <TableCell>No proper support for multiple users.</TableCell>
                                        <TableCell>Multiple users can access data simultaneously with proper locking mechanisms.
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Data Access Speed</strong></TableCell>
                                        <TableCell>Slower due to sequential searching.</TableCell>
                                        <TableCell>Faster due to indexing and optimized queries.
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Backup & Recovery</strong></TableCell>
                                        <TableCell>Manual and less reliable.</TableCell>
                                        <TableCell>Automated backups with recovery mechanisms.
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Example</strong></TableCell>
                                        <TableCell>Text files, Excel sheets.</TableCell>
                                        <TableCell>MySQL, PostgreSQL, Oracle, MongoDB.
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>





                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='key'>


                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Types of Keys in DBMS
                            </h2>


                            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                Keys in DBMS help identify unique records in a table and establish relationships between tables.
                            </p>

                            {/* Table */}
                            <div className="overflow-x-auto mt-6">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow className="bg-gray-100 dark:bg-gray-700">
                                            <TableHead>Key Type</TableHead>
                                            <TableHead>Definition</TableHead>
                                            <TableHead>Example</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Primary Key</strong></TableCell>
                                            <TableCell>A unique identifier for a record in a table. It cannot have NULL values.</TableCell>
                                            <TableCell>Student_ID in a Students table.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Candidate Key</strong></TableCell>
                                            <TableCell>A set of attributes that can uniquely identify a record. One of them is chosen as the Primary Key.</TableCell>
                                            <TableCell>{`{Aadhar_No, Passport_No}`} (both can uniquely identify a person).</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Super Key</strong></TableCell>
                                            <TableCell>A set of attributes that uniquely identifies a record. It may contain extra attributes.</TableCell>
                                            <TableCell>{`{Student_ID, Name}`}, where Name is extra.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Foreign Key</strong></TableCell>
                                            <TableCell>A key that references a Primary Key in another table to establish relationships.</TableCell>
                                            <TableCell>Department_ID in Employees table referring to Department_ID in Departments table.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Composite Key</strong></TableCell>
                                            <TableCell>A key made of two or more attributes that uniquely identify a record.</TableCell>
                                            <TableCell>{`{Order_ID, Product_ID}`} in Orders table.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Alternate Key</strong></TableCell>
                                            <TableCell>A Candidate Key that is not chosen as the Primary Key.</TableCell>
                                            <TableCell>If Aadhar_No is the Primary Key, then Passport_No is an Alternate Key.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Unique Key</strong></TableCell>
                                            <TableCell>Similar to Primary Key but allows NULL values.</TableCell>
                                            <TableCell>Email column in Users table.</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell><strong>Surrogate Key</strong></TableCell>
                                            <TableCell>A system-generated unique key, usually an auto-incremented number.</TableCell>
                                            <TableCell>Order_Number in an Orders table (generated automatically).</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>


                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='er_model'>


                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                ER Model (Entity-Relationship Model)
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
                    </div>


                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 ">
                        < div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='normalisation'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                                        <div className='overflow-x-auto'> {/* Make table horizontally scrollable on small screens */}
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
                    </div>
                    <div className='max-w-4xl mx-auto px-6 md:px-8 py-8 space-y-8'>
                        {/* Header Section */}
                        <div className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700' id='joins'>
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                SQL Joins
                            </h2>
                            <p className='text-lg text-gray-600 dark:text-gray-300 leading-7'>
                                A <span className='font-semibold text-blue-600 dark:text-blue-400'>JOIN</span> clause combines records from two or more tables using a related column. Essential for working with normalized databases.
                            </p>


                            {/* Inner Join Section */}
                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>1. Inner Join</h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-base'>
                                        Returns only matching records from both tables. Non-matching rows are excluded.
                                    </p>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT Students.Student_ID, Students.Name, Courses.Course_Name 
FROM Students 
INNER JOIN Courses ON Students.Course_ID = Courses.Course_ID;
`}
                                    </SyntaxHighlighter>
                                </div>

                                {/* Example Section */}
                                <div className='space-y-8'>
                                    {/* Tables Grid */}
                                    <div className='grid md:grid-cols-2 gap-6'>
                                        {/* Students Table */}
                                        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
                                            <div className='p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl'>
                                                <h4 className='font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                                                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                    Students
                                                </h4>
                                            </div>
                                            <Table className="w-full">
                                                <TableHeader>
                                                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                                                        <TableHead className="w-[100px]">Student_ID</TableHead>
                                                        <TableHead>Name</TableHead>
                                                        <TableHead>Course ID</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        [101, "John", 1],
                                                        [102, "Alice", 2],
                                                        [103, "Bob", null],
                                                        [104, "Mike", 3]
                                                    ].map(([id, name, course]) => (
                                                        <TableRow key={id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                            <TableCell>{id}</TableCell>
                                                            <TableCell>{name}</TableCell>
                                                            <TableCell>
                                                                {course || <span className="text-red-500 dark:text-red-400">NULL</span>}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Courses Table */}
                                        <div className='bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'>
                                            <div className='p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl'>
                                                <h4 className='font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                    Courses
                                                </h4>
                                            </div>
                                            <Table className="w-full">
                                                <TableHeader>
                                                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                                                        <TableHead className="w-[100px]">Course_ID</TableHead>
                                                        <TableHead>Course_Name</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {[
                                                        [1, "Math"],
                                                        [2, "Science"],
                                                        [3, "Physics"],
                                                        [4, "English"]
                                                    ].map(([id, name]) => (
                                                        <TableRow key={id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                                            <TableCell>{id}</TableCell>
                                                            <TableCell>{name}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>

                                    {/* Join Result */}
                                    <div className='relative'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center py-4'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                INNER JOIN RESULT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Result Table */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>
                                                        Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, "John", "Math"],
                                                    [102, "Alice", "Science"],
                                                    [104, "Mike", "Physics"]
                                                ].map(([id, name, course]) => (
                                                    <TableRow key={id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                        <TableCell>{course}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 pt-6'>2. LEFT JOIN (All Left Table + Matching Right Table)</h3>
                                    <ul className='text-gray-600 dark:text-gray-400 text-base'>
                                        <li>
                                            Returns all rows from the left table and matching rows from the right table.
                                        </li>
                                        <li>If no match is found, NULL values are returned for the right table.
                                        </li>
                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT Students.Student_ID, Students.Name, Courses.Course_Name 
FROM Students 
LEFT JOIN Courses ON Students.Course_ID = Courses.Course_ID;
`}
                                    </SyntaxHighlighter>


                                    {/* Join Result for LEFT JOIN */}
                                    <div className='relative py-8'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                LEFT JOIN RESULT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corrected Result Table for LEFT JOIN */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>
                                                        Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>	Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[

                                                    [101, "John", "Math"],
                                                    [102, "Alice", "Science"],
                                                    [103, "Bob", null],
                                                    [104, "Mike", "Physics"]


                                                ].map(([id, name, course]) => (
                                                    <TableRow key={id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell>{id}</TableCell>
                                                        <TableCell>{name}</TableCell>
                                                        <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>


                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 pt-6'>3. RIGHT JOIN (All Right Table + Matching Left Table)</h3>
                                    <ul className='text-gray-600 dark:text-gray-400 text-base'>
                                        <li>
                                            Returns all rows from the right table and matching rows from the left table.
                                        </li>
                                        <li>If no match is found, NULL values are returned for the left table.
                                        </li>
                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT Students.Student_ID, Students.Name, Courses.Course_Name 
FROM Students 
RIGHT JOIN Courses ON Students.Course_ID = Courses.Course_ID;`}
                                    </SyntaxHighlighter>


                                    {/* Join Result for RIGHT JOIN */}
                                    <div className='relative py-8'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                RIGHT JOIN RESULT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corrected Result Table for LEFT JOIN */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>	Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, "John", "Math"],
                                                    [102, "Alice", "Science"],
                                                    [104, "Mike", "Physics"],
                                                    [null, null, "English"]
                                                ].map(([id, name, course]) => (
                                                    <TableRow key={id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell>{id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                        <TableCell>{name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                        <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 pt-6'>4.FULL OUTER JOIN (All Data from Both Tables)</h3>
                                    <ul className='text-gray-600 dark:text-gray-400 text-base'>
                                        <li>
                                            Returns all rows from both tables.
                                        </li>
                                        <li>If there is no match, NULL is placed in missing columns.
                                        </li>
                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT Students.Student_ID, Students.Name, Courses.Course_Name 
FROM Students 
FULL OUTER JOIN Courses ON Students.Course_ID = Courses.Course_ID;
`}
                                    </SyntaxHighlighter>


                                    {/* Join Result forFULL OUTER JOIN */}
                                    <div className='relative py-8'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                FULL OUTER JOIN RESULT
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corrected Result Table for LEFT JOIN */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>
                                                        Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    [101, "John", "Math"],
                                                    [102, "Alice", "Science"],
                                                    [103, "Bob", null],
                                                    [104, "Mike", "Physics"],
                                                    [null, null, "English"]
                                                ].map(([id, name, course]) => (
                                                    <TableRow key={id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell>{id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                        <TableCell>{name || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>

                                                        <TableCell>{course || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 pt-6'>5. SELF JOIN (Joining a Table to Itself)</h3>
                                    <ul className='text-gray-600 dark:text-gray-400 text-base'>
                                        <li>
                                            A table is joined with itself to compare rows within the same table.
                                        </li>

                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT A.Name AS Student1, B.Name AS Student2, A.Course_ID 
FROM Students A 
JOIN Students B ON A.Course_ID = B.Course_ID 
AND A.Student_ID <> B.Student_ID;
`}
                                    </SyntaxHighlighter>


                                    {/* Join Result forFULL OUTER JOIN */}
                                    <div className='relative py-8'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                SELF JOIN (Joining a Table to Itself)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corrected Result Table for LEFT JOIN */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>
                                                        Student1</TableHead>
                                                    <TableHead>Student2</TableHead>

                                                    <TableHead>Course_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    ["John", "Alice", 1],
                                                    ["Alice", "John", 1]
                                                ].map(([name1, name2, course_id]) => (
                                                    <TableRow key={course_id} className="hover:bg-blue-50 dark:hover:bg-blue-900/10">
                                                        <TableCell>{name1 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                        <TableCell>{name2 || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>
                                                        <TableCell>{course_id || <span className="text-red-500 dark:text-red-400">NULL</span>}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 pt-6'>6.  CROSS JOIN (Cartesian Product)</h3>
                                    <ul className='text-gray-600 dark:text-gray-400 text-base'>
                                        <li>
                                            Returns all possible combinations of rows from both tables.
                                        </li>

                                    </ul>
                                </div>

                                {/* Code Snippet */}
                                <div className='relative group'>
                                    <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                    <SyntaxHighlighter
                                        language='sql'
                                        style={dracula}
                                        className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                    >
                                        {`SELECT Students.Name, Courses.Course_Name 
FROM Students 
CROSS JOIN Courses;
`}
                                    </SyntaxHighlighter>


                                    {/* Join Result forFULL OUTER JOIN */}
                                    <div className='relative py-8'>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-full border-t border-dashed border-gray-300 dark:border-gray-600'></div>
                                        </div>
                                        <div className='relative flex justify-center'>
                                            <span className='px-4 bg-white dark:bg-gray-800 text-sm text-blue-500 font-medium'>
                                                CROSS JOIN (Cartesian Product)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corrected Result Table for LEFT JOIN */}
                                    <div className='bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-900 shadow-lg'>
                                        <div className='p-4 border-b border-blue-50 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-t-xl'>
                                            <h4 className='font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2'>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Combined Results
                                            </h4>
                                        </div>
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                                                    <TableHead>Name</TableHead>

                                                    <TableHead>Course Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    ["John", "Math"],
                                                    ["John", "Science"],
                                                    ["John", "Physics"],
                                                    ["John", "English"],
                                                    ["Alice", "Math"],
                                                    ["Alice", "Science"],
                                                    ["Alice", "Physics"],
                                                    ["Alice", "English"],
                                                    ["Bob", "Math"],
                                                    ["Bob", "Science"],
                                                    ["Bob", "Physics"],
                                                    ["Bob", "English"],
                                                    ["Mike", "Math"],
                                                    ["Mike", "Science"],
                                                    ["Mike", "Physics"],
                                                    ["Mike", "English"]
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
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 ">
                        < div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='view&indexing'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                View & Indexing
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
                                    <div className='relative group'>
                                        <div className='absolute inset-0 bg-blue-500/5 rounded-xl transition'></div>
                                        <SyntaxHighlighter
                                            language='sql'
                                            style={dracula}
                                            className='rounded-xl p-6 text-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 transition-all'
                                        >
                                            {`CREATE VIEW StudentView AS
SELECT Name, Course_ID FROM Students;`}
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
                    </div>
                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8 ">
                        < div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='stored_procedures&triggers'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Stored Procedures & Triggers
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
                    </div>

                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='transaction&concurrency'>
                            {/* Section Title */}
                            <h2 className='text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                Transaction Management & Concurrency Control
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
                    </div>

                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700" id='locks&serializability'>
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
                    </div>

                </main >

            </div >

        </div >
    )
}

export default DBMS