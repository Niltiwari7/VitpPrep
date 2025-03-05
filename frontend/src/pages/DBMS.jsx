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
                        <a href="#cn_desc" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition duration-300">Introduction</a>
                        <a href="#topology" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition duration-300">Topology</a>
                        <a href="#lan_van" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white transition duration-300">LAN and WAN</a>
                        <a href="#firewall" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-yellow-500 hover:text-black transition duration-300">Firewall</a>
                        <a href="#dhcp" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition duration-300">DHCP (Dynamic Host Configuration Protocol)</a>
                        <a href="#httpvshttps" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-pink-500 hover:text-white transition duration-300">HTTP vs HTTPS</a>
                        <a href="#ipv4vsipv6" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition duration-300">IPv4 vs IPv6</a>
                        <a href="#osi" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-teal-500 hover:text-white transition duration-300">OSI (Open Systems Interconnection) Model</a>
                        <a href="#tcp/ip" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition duration-300">TCP/IP Model</a>
                        <a href="#handshake" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-500 hover:text-white transition duration-300">TCP Three-Way Handshake</a>
                        <a href="#browser" onClick={toggleSidebar} className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-rose-500 hover:text-white transition duration-300">What Happens When You Enter a URL in a Browser?</a>
                    </div>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="sm:hidden fixed top-16 right-4 bg-blue-600 dark:bg-yellow-500 text-white p-2 rounded-full shadow-md z-20">
                    <AiOutlineBars size={24} />
                </button>

                <main className='sm:w-4/5 w-full ml-auto p-6 mt-20'>
                    <div id='cn_desc' className="w-full sm:w-4/5 mx-auto">
                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">

                                {/* Title */}
                                <h1 className="text-center text-2xl font-bold text-blue-600 dark:text-yellow-500">
                                    Database Management System
                                </h1>

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
                    </div>


                    <div id="cn_desc" className="w-full sm:w-4/5 mx-auto">
                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">

                                {/* Title */}
                                <h1 className="text-center text-2xl font-bold text-blue-600 dark:text-yellow-500">
                                    Types of Keys in DBMS 🔑
                                </h1>

                                <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Keys in DBMS help identify unique records in a table and establish relationships between tables.
                                </p>

                                {/* Table */}
                                <Table className="mt-3">
                                    <TableHeader>
                                        <TableRow>
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
                    <div id="cn_desc" className="w-full sm:w-4/5 mx-auto">
                        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-xl transition-all">

                                {/* Title */}
                                <h1 className="text-center text-2xl font-extrabold text-blue-600 dark:text-yellow-500 mb-6">
                                    ER Model (Entity-Relationship Model)
                                </h1>

                                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The ER Model is a high-level data model used for designing databases. It visually represents the structure of a database with entities, attributes, relationships, and constraints.
                                </p>

                                {/* Sections */}
                                <div className="mt-6 space-y-6">
                                    {/* Entities */}
                                    <section className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                        <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400">1️⃣ Entities 🏛️</h3>
                                        <p className="text-gray-700 dark:text-gray-300">An entity represents a real-world object that has distinct characteristics. (e.g., Students, Car)</p>
                                    </section>

                                    {/* Attributes */}
                                    <section className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                        <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400">2️⃣ Attributes 🎯</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Attributes describe the properties of an entity.</p>
                                        <h4 className="mt-2 font-semibold">Types of Attributes:</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                            <li><strong>Simple (Atomic)</strong> – Cannot be divided (e.g., Name, Age).</li>
                                            <li><strong>Composite</strong> – Can be divided (e.g., Full Name: First Name, Last Name).</li>
                                            <li><strong>Derived</strong> – Calculated (e.g., Total Marks = Marks1 + Marks2).</li>
                                            <li><strong>Multivalued</strong> – Can have multiple values (e.g., Phone Numbers).</li>
                                            <li><strong>Key Attribute</strong> – Uniquely identifies an entity (e.g., Student_ID).</li>
                                        </ul>
                                    </section>

                                    {/* Relationships */}
                                    <section className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                        <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400">3️⃣ Relationships 🔗</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Relationships define associations between two or more entities.</p>
                                        <h4 className="mt-2 font-semibold">Types of Relationships:</h4>
                                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                            <li><strong>One-to-One (1:1)</strong> – (e.g., Person ↔ Passport).</li>
                                            <li><strong>One-to-Many (1:M)</strong> – (e.g., Teacher ↔ Students).</li>
                                            <li><strong>Many-to-Many (M:N)</strong> – (e.g., Students ↔ Courses).</li>
                                        </ul>
                                    </section>

                                    {/* Cardinality */}
                                    <section className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                        <h3 className="text-xl font-semibold text-blue-700 dark:text-yellow-400">4️⃣ Cardinality 🔢</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Cardinality defines the number of entity instances involved in a relationship.</p>
                                    </section>
                                </div>

                                {/* Example Representation */}
                                <section className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
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
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

                            {/* Section Title */}
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Normalization</h2>

                            {/* Section Description */}
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Normalization is the process of organizing data in a database to reduce redundancy and
                                improve data integrity by dividing large tables into smaller related tables.
                            </p>

                            {/* 1NF Explanation */}
                            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">1️⃣ First Normal Form (1NF)</h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                    Ensures that all columns contain **atomic (indivisible) values** and removes duplicate & multivalued attributes.
                                </p>
                            </div>

                            {/* Before 1NF Table */}
                            <div className="mt-4">
                                <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">🚫 Before 1NF (Multivalued Attribute)</h4>
                                <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                    <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                        <TableRow>
                                            <TableHead>Student_ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Subjects</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="border-b dark:border-gray-600">
                                            <TableCell>1</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>Maths, Science, English</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            {/* After 1NF Table */}
                            <div className="mt-6">
                                <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">✅ After 1NF (Atomic Data)</h4>
                                <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                    <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                        <TableRow>
                                            <TableHead>Student_ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Subjects</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="border-b dark:border-gray-600">
                                            <TableCell>1</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>Maths</TableCell>
                                        </TableRow>
                                        <TableRow className="border-b dark:border-gray-600">
                                            <TableCell>1</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>Science</TableCell>
                                        </TableRow>
                                        <TableRow className="border-b dark:border-gray-600">
                                            <TableCell>1</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>English</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

                                    {/* Section Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2️⃣ Second Normal Form (2NF)</h2>

                                    {/* Explanation Box */}
                                    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Understanding 2NF</h3>
                                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                                            <li>Table should be in **First Normal Form (1NF)**.</li>
                                            <li>Remove **partial dependency** (i.e., non-key attributes should be fully dependent on the **entire** primary key).</li>
                                        </ul>
                                    </div>

                                    {/* Before 2NF Table */}
                                    <div className="mt-6">
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">🚫 Before 2NF (Partial Dependency Exists)</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            **Issue**: *Student_Name* depends **only** on *Student_ID*, not on *Course_ID*.
                                        </p>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Course_ID</TableHead>
                                                    <TableHead>Student_Name</TableHead>
                                                    <TableHead>Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>1</TableCell>
                                                    <TableCell>101</TableCell>
                                                    <TableCell>John Doe</TableCell>
                                                    <TableCell>Mathematics</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>2</TableCell>
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Jane Smith</TableCell>
                                                    <TableCell>Physics</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Solution - After 2NF */}
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">✅ After 2NF – Splitting into Three Tables</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            We break the table into **Student, Course, and Enrollment tables** to remove partial dependency.
                                        </p>

                                        {/* Student Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-4">📌 Student Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Student_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>1</TableCell>
                                                    <TableCell>John Doe</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>2</TableCell>
                                                    <TableCell>Jane Smith</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        {/* Course Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-6">📌 Course Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Course_ID</TableHead>
                                                    <TableHead>Course_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Mathematics</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Physics</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        {/* Enrollment Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-6">📌 Enrollment Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Course_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>1</TableCell>
                                                    <TableCell>101</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>2</TableCell>
                                                    <TableCell>102</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                </div>
                            </div>
                            <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

                                    {/* Section Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3️⃣ Third Normal Form (3NF)</h2>

                                    {/* Explanation Box */}
                                    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Understanding 3NF</h3>
                                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                                            <li>Table should be in **Second Normal Form (2NF)**.</li>
                                            <li>Remove **transitive dependency** (i.e., non-key attributes should depend **only** on the primary key).</li>
                                        </ul>
                                    </div>

                                    {/* Before 3NF Table */}
                                    <div className="mt-6">
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">🚫 Before 3NF (Transitive Dependency Exists)</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            **Issue**: *Dept_Name* depends **indirectly** on *Student_ID* via *Dept_ID*.
                                        </p>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Dept_ID</TableHead>
                                                    <TableHead>Dept_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>1</TableCell>
                                                    <TableCell>John Doe</TableCell>
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Computer Science</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>2</TableCell>
                                                    <TableCell>Jane Smith</TableCell>
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Electrical Engineering</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Solution - After 3NF */}
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">✅ After 3NF – Splitting into Two Tables</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            We separate **Department details** into a new table to remove transitive dependency.
                                        </p>

                                        {/* Student Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-4">📌 Student Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Student_ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Dept_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>1</TableCell>
                                                    <TableCell>John Doe</TableCell>
                                                    <TableCell>101</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>2</TableCell>
                                                    <TableCell>Jane Smith</TableCell>
                                                    <TableCell>102</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        {/* Department Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-6">📌 Department Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Dept_ID</TableHead>
                                                    <TableHead>Dept_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Computer Science</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Electrical Engineering</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    </div>
                                </div>
                            </div>

                            <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">

                                    {/* Section Title */}
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4️⃣ Boyce-Codd Normal Form (BCNF)</h2>

                                    {/* Explanation Box */}
                                    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Understanding BCNF</h3>
                                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-1">
                                            <li>Table should be in **Third Normal Form (3NF)**.</li>
                                            <li>Every **functional dependency** must have a **super key**.</li>
                                            <li>Used when **3NF does not handle anomalies properly**.</li>
                                        </ul>
                                    </div>

                                    {/* Before BCNF Table */}
                                    <div className="mt-6">
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">🚫 Before BCNF (Violation of Super Key Rule)</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                                            **Issue**: Professor_Name depends only on **Subject**, not on the full primary key *(Professor_ID, Subject)*.
                                        </p>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Professor_ID</TableHead>
                                                    <TableHead>Professor_Name</TableHead>
                                                    <TableHead>Subject</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Dr. Smith</TableCell>
                                                    <TableCell>Database Systems</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Dr. Johnson</TableCell>
                                                    <TableCell>Operating Systems</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {/* Solution - After BCNF */}
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">✅ After BCNF – Splitting into Two Tables</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            We create separate **Professor and Subject tables** to eliminate the **partial dependency**.
                                        </p>

                                        {/* Professor Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-4">📌 Professor Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Professor_ID</TableHead>
                                                    <TableHead>Professor_Name</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>101</TableCell>
                                                    <TableCell>Dr. Smith</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>102</TableCell>
                                                    <TableCell>Dr. Johnson</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                        {/* Subject Table */}
                                        <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 mt-6">📌 Subject Table</h4>
                                        <Table className="mt-2 border border-gray-300 dark:border-gray-600">
                                            <TableHeader className="bg-gray-200 dark:bg-gray-700">
                                                <TableRow>
                                                    <TableHead>Subject</TableHead>
                                                    <TableHead>Professor_ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>Database Systems</TableCell>
                                                    <TableCell>101</TableCell>
                                                </TableRow>
                                                <TableRow className="border-b dark:border-gray-600">
                                                    <TableCell>Operating Systems</TableCell>
                                                    <TableCell>102</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

            </div>

        </div>
    )
}

export default DBMS