import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineBars, AiOutlineClose, AiOutlineDashboard } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaBars, FaMoon, FaSun, FaYoutube } from 'react-icons/fa';
import { Card, CardContent } from "@/components/ui/card";
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


const ComputerNetwork = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [step, setStep] = useState(1);
    const API_URL = 'http://localhost:3000';
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    }


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
    const [currentSection, setCurrentSection] = useState('#cn_desc');
    const handleLinkClick = (sectionId) => {
        // Update current section
        setCurrentSection(sectionId);

        // Close sidebar on mobile
        toggleSidebar();

        // Scroll to section with smooth behavior
        setTimeout(() => {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100); // Small delay to allow state update
    };


    const links = [
        { id: '#cn_desc', text: 'Introduction', color: 'bg-blue-500' },
        { id: '#topology', text: 'Topology', color: 'bg-red-500' },
        { id: '#lan_van', text: 'LAN and WAN', color: 'bg-green-500' },
        { id: '#firewall', text: 'Firewall', color: 'bg-yellow-500' },
        { id: '#dhcp', text: 'DHCP (Dynamic Host Configuration Protocol)', color: 'bg-purple-500' },
        { id: '#httpvshttps', text: 'HTTP vs HTTPS', color: 'bg-pink-500' },
        { id: '#ipv4vsipv6', text: 'IPv4 vs IPv6', color: 'bg-orange-500' },
        { id: '#osi', text: 'OSI (Open Systems Interconnection) Model', color: 'bg-teal-500' },
        { id: '#tcp/ip', text: 'TCP/IP Model', color: 'bg-indigo-500' },
        { id: '#handshake', text: 'TCP Three-Way Handshake', color: 'bg-gray-500' },
        { id: '#browser', text: 'What Happens When You Enter a URL in a Browser?', color: 'bg-rose-500' },
    ];

    return (
        <div className='gap-5'>
           <header className="w-full flex items-center justify-between px-6 py-4 bg-[#2A3F5F] dark:bg-[#0D1117] shadow-xl backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 fixed top-0 left-0 right-0 z-50 border-b border-[#00C1B3]/30 dark:border-[#00E3CC]/30">
                           <Link to = "/dashboard" className="flex items-center space-x-2">
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


                    <section id='cn_desc' className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <div className="text-center mb-4">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2A3F5F] to-[#00C1B3] dark:from-[#00E3CC] dark:to-[#A0AEC0]">
                                    Computer Network
                                </h1>

                            </div>

                            <div className='space-y-4 pt-2'>
                                <div className='space-y-3'>
                                    <div className='mt-4 flex gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                        </svg>
                                        <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                            Introduction
                                        </h2>
                                    </div>
                                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">

                                        A computer network is a set of interconnected devices (nodes) that communicate with each other to share resources and information using a defined set of protocols over a communication medium.

                                    </p>
                                </div>
                            </div>


                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id='topology'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <div className="mt-4 flex gap-3 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Topology
                                </h2>
                            </div>


                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                Network topology refers to the arrangement of devices (nodes) and how they are connected in a network.
                            </p>

                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Types of Network Topologies:
                            </h3>
                            <ul className="list-decimal ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Bus Topology:</strong> All devices are connected to a single central cable (bus). If the main cable fails, the entire network is affected.</li>
                                <li><strong>Star Topology:</strong> All devices are connected to a central hub or switch. If the hub fails, the network stops working.</li>
                                <li><strong>Ring Topology:</strong> Devices are connected in a circular loop. If one device fails, the entire network may be affected.</li>
                                <li><strong>Mesh Topology:</strong> Each node is connected to every other node. Provides high reliability but is expensive to set up.</li>
                                <li><strong>Tree Topology:</strong> A combination of star and bus topology, suitable for large networks.</li>
                                <li><strong>Hybrid Topology:</strong> A mix of different topologies, offering flexibility and efficiency.</li>
                            </ul>

                            <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Advantages and Disadvantages:
                            </h2>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Bus Topology:</strong> Simple and cost-effective but has a single point of failure.</li>
                                <li><strong>Star Topology:</strong> Easy to manage, but the central hub is a vulnerability.</li>
                                <li><strong>Ring Topology:</strong> Efficient in small networks, but failure of one node can disrupt the network.</li>
                                <li><strong>Mesh Topology:</strong> Highly reliable, but expensive due to multiple connections.</li>
                                <li><strong>Tree Topology:</strong> Scalable, but failure at higher levels affects the entire network.</li>
                                <li><strong>Hybrid Topology:</strong> Flexible, but complex to configure.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id='lan_van'>
                        <div className="mb-2">
                            <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                                <div className="mt-4 flex gap-3 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                    </svg>
                                    <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                        LAN and VAN
                                    </h2>
                                </div>

                                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    A <strong>Local Area Network (LAN)</strong> is a network that connects computers and devices within a
                                    limited area, such as a home, office, or school. It enables high-speed communication through
                                    wired (Ethernet) or wireless (Wi-Fi) connections.
                                </p>

                                {/* WAN Definition */}
                                <h2 className="mt-5 text-2xl font-semibold text-gray-800 dark:text-gray-100">WAN (Wide Area Network)</h2>
                                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    A <strong>Wide Area Network (WAN)</strong> spans a large geographical area, often connecting multiple LANs
                                    across cities, countries, or even worldwide. It uses fiber optics, leased lines, and satellites for
                                    long-distance communication.
                                </p>

                                {/* Difference Table using ShadCN */}
                                <h2 className="mt-5 text-2xl font-semibold text-gray-800 dark:text-gray-100">Key Differences Between LAN and WAN</h2>
                                <Table className="mt-4">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Feature</TableHead>
                                            <TableHead>LAN (Local Area Network)</TableHead>
                                            <TableHead>WAN (Wide Area Network)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Scope</strong></TableCell>
                                            <TableCell>Limited to a small area (e.g., home, office, campus)</TableCell>
                                            <TableCell>Covers large areas (e.g., cities, countries, globally)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Speed</strong></TableCell>
                                            <TableCell>High-speed (up to 1 Gbps or more)</TableCell>
                                            <TableCell>Slower due to long-distance transmission</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Connectivity</strong></TableCell>
                                            <TableCell>Uses Ethernet cables, Wi-Fi, and switches</TableCell>
                                            <TableCell>Uses fiber optics, leased lines, and satellites</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Ownership</strong></TableCell>
                                            <TableCell>Owned and managed by a single organization</TableCell>
                                            <TableCell>Often managed by multiple providers (ISPs)</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Security</strong></TableCell>
                                            <TableCell>More secure as it is private</TableCell>
                                            <TableCell>Less secure, requires encryption & firewalls</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Cost</strong></TableCell>
                                            <TableCell>Low setup cost</TableCell>
                                            <TableCell>Expensive due to long-distance infrastructure</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Example</strong></TableCell>
                                            <TableCell>Office network, school Wi-Fi</TableCell>
                                            <TableCell>Internet, corporate global networks</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-6 md:px-8 py-8" id='firewall'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    Firewall 🔥
                                </h2>
                            </h2>



                            {/* Firewall Definition */}
                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                A <strong>firewall</strong> is a <strong>network security system</strong> that monitors,
                                filters, and controls incoming and outgoing network traffic based on
                                predetermined security rules. It acts as a <strong>barrier</strong> between a trusted
                                internal network (such as a <strong>LAN</strong>) and untrusted external networks
                                (such as the <strong>internet</strong>), preventing unauthorized access and cyber threats.
                            </p>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='dhcp'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    DHCP (Dynamic Host Configuration Protocol)
                                </h2>
                            </h2>



                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                DHCP (Dynamic Host Configuration Protocol) is a network protocol that
                                automatically assigns IP addresses and other network configurations
                                (such as subnet mask, gateway, and DNS server) to devices on a network.
                                It eliminates the need for manual IP configuration, making network
                                management more efficient.
                            </p>

                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Key Features:
                            </h3>
                            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>Automatic IP Assignment:</strong> Reduces manual configuration.</li>
                                <li><strong>Prevents IP Conflicts:</strong> Ensures each device gets a unique IP.</li>
                                <li><strong>Leases IP Addresses:</strong> Assigns temporary IPs that can be reassigned.</li>
                                <li><strong>Centralized Network Management:</strong> Managed by a DHCP server.</li>
                            </ul>

                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Example:
                            </h3>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                                When you connect to a Wi-Fi network, the router (acting as a DHCP server)
                                assigns your device an IP address dynamically.
                            </p>
                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='httpvshttps'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    HTTP vs HTTPS 🌐🔒
                                </h2>
                            </h2>


                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                <strong>HTTP</strong> (HyperText Transfer Protocol) is an <strong>insecure</strong> communication protocol used for transferring data on the web.
                                <br />
                                <strong>HTTPS</strong> (HyperText Transfer Protocol Secure) adds <strong>SSL/TLS encryption</strong> to secure data transmission.
                            </p>
                            <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Key Differences 📊
                            </h2>
                            <Table className="mt-3">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Feature</TableHead>
                                        <TableHead>HTTP 🌍</TableHead>
                                        <TableHead>HTTPS 🔒</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Security</strong></TableCell>
                                        <TableCell>Insecure, data can be intercepted</TableCell>
                                        <TableCell>Secure, uses SSL/TLS encryption</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Data Encryption</strong></TableCell>
                                        <TableCell>No encryption, plain text</TableCell>
                                        <TableCell>Encrypts data for secure transmission</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Port Number</strong></TableCell>
                                        <TableCell>Port 80</TableCell>
                                        <TableCell>Port 443</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>SSL/TLS Certificate</strong></TableCell>
                                        <TableCell>Not required</TableCell>
                                        <TableCell>Required for security</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Speed</strong></TableCell>
                                        <TableCell>Faster (no encryption overhead)</TableCell>
                                        <TableCell>Slightly slower (due to encryption)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>SEO Ranking</strong></TableCell>
                                        <TableCell>Not preferred</TableCell>
                                        <TableCell>Boosts SEO ranking</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Use Cases</strong></TableCell>
                                        <TableCell>For non-sensitive data (blogs, general sites)</TableCell>
                                        <TableCell>For secure transactions (banking, e-commerce)</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='ipv4vsipv6'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    IPv4 vs IPv6 🌍🔢
                                </h2>
                            </h2>

                            {/* Firewall Definition */}
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                <strong>IPv4</strong> is the fourth version of the Internet Protocol, using a 32-bit address system.
                                <br />
                                <strong>IPv6</strong> is the successor to IPv4, using a 128-bit address system to accommodate more devices.
                            </p>
                            <h2 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Key Differences 📊
                            </h2>

                            <Table className="mt-3">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Feature</TableHead>
                                        <TableHead>IPv4 🌍</TableHead>
                                        <TableHead>IPv6 🔢</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Address Length</strong></TableCell>
                                        <TableCell>32-bit</TableCell>
                                        <TableCell>128-bit</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Address Format</strong></TableCell>
                                        <TableCell>Decimal (e.g., 192.168.1.1)</TableCell>
                                        <TableCell>Hexadecimal (e.g., 2001:0db8::8a2e:0370:7334)</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Security</strong></TableCell>
                                        <TableCell>Less secure (IPSec optional)</TableCell>
                                        <TableCell>More secure (IPSec built-in)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Header Size</strong></TableCell>
                                        <TableCell>20 bytes</TableCell>
                                        <TableCell>40 bytes</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Fragmentation</strong></TableCell>
                                        <TableCell>Done by routers</TableCell>
                                        <TableCell>Done by the source device</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Broadcast Support</strong></TableCell>
                                        <TableCell>Supports broadcasting</TableCell>
                                        <TableCell>Uses multicast instead</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Compatibility</strong></TableCell>
                                        <TableCell>Widely supported</TableCell>
                                        <TableCell>Not fully compatible with IPv4</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>

                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='osi'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">

                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    OSI (Open Systems Interconnection) Model
                                </h2>
                            </h2>

                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                The OSI Model is a conceptual framework that standardizes network communication into seven layers. Each layer has a specific role in ensuring smooth data transmission across a network.
                            </p>

                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                🔹 OSI Model Layers & Responsibilities:
                            </h3>

                            <Table className="mt-3">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Layer</TableHead>
                                        <TableHead>Responsibility</TableHead>
                                        <TableHead>Example Protocols</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Application (Layer 7)</strong></TableCell>
                                        <TableCell>
                                            Provides network services directly to the end-user. This includes software applications that users interact with, such as web browsers, email clients, etc.
                                        </TableCell>
                                        <TableCell>HTTP, HTTPS, FTP, SMTP</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Presentation (Layer 6)</strong></TableCell>
                                        <TableCell>
                                            Translates data into a readable format for the application layer. It also handles data encryption, compression, and encoding, ensuring secure and efficient communication.
                                        </TableCell>
                                        <TableCell>SSL/TLS (for encryption), JPEG, PNG</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Session (Layer 5)</strong></TableCell>
                                        <TableCell>
                                            Manages sessions or connections between devices. It ensures that data is properly synchronized and that communication sessions are properly established, maintained, and terminated.
                                        </TableCell>
                                        <TableCell>NetBIOS, RPC (Remote Procedure Call)</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Transport (Layer 4)</strong></TableCell>
                                        <TableCell>
                                            Responsible for error detection and reliable data transfer. This layer ensures that data is sent in the correct order and without errors. It also manages flow control and retransmission of lost data.
                                        </TableCell>
                                        <TableCell>TCP (Transmission Control Protocol), UDP (User Datagram Protocol)</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Network (Layer 3)</strong></TableCell>
                                        <TableCell>
                                            Handles routing and forwarding of data packets. It ensures data reaches its destination across different networks, using logical IP addresses to direct the data.
                                        </TableCell>
                                        <TableCell>IP (Internet Protocol), ICMP (Internet Control Message Protocol)</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Data Link (Layer 2)</strong></TableCell>
                                        <TableCell>
                                            Manages data transfer between two directly connected nodes. This layer handles physical addressing (MAC addresses) and error detection/correction during transmission over the physical medium.
                                        </TableCell>
                                        <TableCell>Ethernet, Wi-Fi, ARP (Address Resolution Protocol)</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell><strong>Physical (Layer 1)</strong></TableCell>
                                        <TableCell>
                                            Deals with the physical connection between devices. It defines the hardware elements involved in the data transfer, such as cables, switches, and electrical signals.
                                        </TableCell>
                                        <TableCell>Fiber optic cables, Ethernet cables, Switches</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>

                            <div className="mt-6 flex items-center space-x-3">
                                <h3>To understand this topic</h3>
                                <a
                                    href="https://www.youtube.com/watch?v=vv4y_uOneC0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-red-600 hover:text-red-700 transition-all"
                                >
                                    <FaYoutube className="w-6 h-6" />
                                    <span className="ml-2 font-semibold">Watch on YouTube</span>
                                </a>
                            </div>

                        </div>
                    </section>


                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='tcp/ip'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    TCP/IP Model
                                </h2>
                            </h2>



                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                The TCP/IP model (Transmission Control Protocol/Internet Protocol) is a conceptual framework that defines how data is transmitted over the internet. It consists of four layers (compared to the OSI model’s seven layers).
                            </p>

                            <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                🛠 Layers of TCP/IP Model & Their Responsibilities:
                            </h3>


                            <Table className="mt-3">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Layer</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Example Protocols</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><strong>Application Layer	</strong></TableCell>
                                        <TableCell>Handles end-user interactions & application services</TableCell>
                                        <TableCell>HTTP, FTP, SMTP, DNS</TableCell>
                                    </TableRow>


                                    <TableRow>
                                        <TableCell><strong>Transport Layer</strong></TableCell>
                                        <TableCell>Ensures reliable/unreliable data transmission</TableCell>
                                        <TableCell>TCP, UDP</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Internet Layer</strong></TableCell>
                                        <TableCell>Handles routing, addressing, and packet forwarding</TableCell>
                                        <TableCell>IP, ICMP, ARP</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><strong>Network Access Layer</strong></TableCell>
                                        <TableCell>Defines physical transmission (hardware & data link)</TableCell>
                                        <TableCell>Ethernet, Wi-Fi
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                            <div className="mt-6 flex items-center space-x-3">
                                <h3>To understand this topic</h3>
                                <a
                                    href="https://www.youtube.com/watch?v=2QGgEk20RXM&pp=ygUMdGNwIGlwIG1vZGVs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-red-600 hover:text-red-700 transition-all"
                                >
                                    <FaYoutube className="w-6 h-6" />
                                    <span className="ml-2 font-semibold">Watch on YouTube</span>
                                </a>
                            </div>

                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='handshake'>
                        <div className="bg-gradient-to-br from-[#F8F9FA] via-[#F1F3F5] to-[#E9ECEF] dark:from-[#0D1117] dark:via-[#1A202C] dark:to-[#0D1117] shadow-xl rounded-xl p-8 border border-[#00C1B3]/20 dark:border-[#00E3CC]/20 relative overflow-hidden">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <svg className="w-10 h-10 text-[#00C1B3] dark:text-[#00E3CC]"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                                <h2 className="text-2xl font-extrabold text-[#2A3F5F] dark:text-[#A0AEC0]">
                                    TCP Three-Way Handshake 🚀
                                </h2>
                            </h2>


                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                This process establishes a reliable connection between a client and a server.
                            </p>

                            <div className="mt-6">
                                {step === 1 && (
                                    <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg">
                                        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-200">
                                            1️⃣ SYN (Client → Server)
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                                            The client sends a SYN(Synchronize Sequence Number)  packet to the server, requesting a connection.
                                        </p>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="p-4 bg-green-100 dark:bg-green-800 rounded-lg">
                                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-200">
                                            2️⃣ SYN-ACK (Server → Client)
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                                            The server responds with a SYN-ACK, acknowledging the request.
                                        </p>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="p-4 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
                                        <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-200">
                                            3️⃣ ACK (Client → Server)
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 mt-2">
                                            The client sends an ACK, confirming the connection is established.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className='flex items-center justify-center'>{step < 3 && (
                                <button
                                    onClick={nextStep}
                                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                                >
                                    Next Step →
                                </button>
                            )}</div>
                        </div>
                    </section>

                    <section className="max-w-4xl mx-auto px-4 md:px-6 py-6" id='browser'>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-8 border border-gray-100 dark:border-gray-700">

                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                What Happens When You Enter a URL in a Browser? 🌐
                            </h2>

                            {/* Explanation */}
                            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                When you type a URL (e.g., <strong>https://www.example.com</strong>) in your browser and hit enter,
                                the following steps occur:
                            </p>

                            {/* Steps */}
                            <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><strong>DNS Lookup:</strong> The browser finds the IP address of the domain.</li>
                                <li><strong>TCP Connection:</strong> A connection is established with the web server.</li>
                                <li><strong>HTTPS Handshake:</strong> If secure (HTTPS), SSL/TLS encryption starts.</li>
                                <li><strong>HTTP Request:</strong> The browser sends a request for the webpage.</li>
                                <li><strong>Server Response:</strong> The server processes and sends back the webpage.</li>
                                <li><strong>Rendering:</strong> The browser interprets and displays the page.</li>
                                <li><strong>Additional Requests:</strong> The browser loads images, CSS, and JavaScript.</li>
                            </ul>



                        </div>
                    </section>
                </main>
            </div>

        </div>
    )
}

export default ComputerNetwork