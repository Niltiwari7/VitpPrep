import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineBars, AiOutlineClose, AiOutlineDashboard } from 'react-icons/ai';
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
import { FaYoutube, FaExternalLinkAlt } from 'react-icons/fa';
const Aptitude = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const user = useSelector((state) => state.user.userInfo);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };


    const API_URL = 'http://localhost:3000';

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
            })

            const data = await response.json();
            if (data.success) {
                dispatch(logout);
                navigate('/');
            } else {
                toast.error('Failed to Logout. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoader(false);
        }
    }

    const sortedAptitudeData = [
        // Phase 1: Foundation Building (Easiest)
        {
            sNo: 1,
            topicName: "Number System",
            videoLink: ["https://www.youtube.com/watch?v=dWZ2SZnooV4"],
            practiceLink: "https://www.indiabix.com/aptitude/numbers/"
        },
        {
            sNo: 2,
            topicName: "HCF & LCM",
            videoLink: ["https://www.youtube.com/watch?v=xyyejJYeILM"],
            practiceLink: "https://www.indiabix.com/aptitude/problems-on-hcf-and-lcm/"
        },
        {
            sNo: 3,
            topicName: "Simplification & Approximation",
            videoLink: ["https://www.youtube.com/watch?v=ZuMJFleXmiw&t=2051s"],
            practiceLink: "https://www.indiabix.com/aptitude/simplification/"
        },
        {
            sNo: 4,
            topicName: "Surds and Indices",
            videoLink: ["https://www.youtube.com/watch?v=jAbpPTpz2bQ"],
            practiceLink: "https://www.indiabix.com/aptitude/surds-and-indices/"
        },
    
        // Phase 2: Basic Arithmetic
        {
            sNo: 5,
            topicName: "Average",
            videoLink: ["https://www.youtube.com/watch?v=rhSxQ4ieAYc&t=52s"],
            practiceLink: "https://www.indiabix.com/aptitude/average/"
        },
        {
            sNo: 6,
            topicName: "Ratio and Proportion",
            videoLink: ["https://www.youtube.com/watch?v=3iLjZpCfs3Y&list=PL3JmT-xgOMNzI0gM52dReLwXMah1Ma6nl&index=5"],
            practiceLink: "https://www.indiabix.com/aptitude/ratio-and-proportion/"
        },
        {
            sNo: 7,
            topicName: "Percentage",
            videoLink: [
                "https://www.youtube.com/watch?v=pa3A7a56wqU",
                "https://www.youtube.com/watch?v=1WM6fwS7W3I"
            ],
            practiceLink: "https://www.indiabix.com/aptitude/percentage/"
        },
        {
            sNo: 8,
            topicName: "Profit and Loss",
            videoLink: ["https://www.youtube.com/watch?v=CPjB8kM5Qrg&list=PL3JmT-xgOMNxGdXaRXitX0kadTVEIFZ3n&index=4"],
            practiceLink: "https://www.indiabix.com/aptitude/profit-and-loss/"
        },
        {
            sNo: 9,
            topicName: "Simple & Compound Interest",
            videoLink: [
                "https://www.youtube.com/watch?v=alS_DcaB3Pw&list=PL3JmT-xgOMNxGdXaRXitX0kadTVEIFZ3n&index=6",
                "https://www.youtube.com/watch?v=hOO4teNGkUA&list=PL3JmT-xgOMNxGdXaRXitX0kadTVEIFZ3n&index=7"
            ],
            practiceLink: "https://www.indiabix.com/aptitude/simple-interest/"
        },
        {
            sNo: 10,
            topicName: "Partnership",
            videoLink: ["https://www.youtube.com/watch?v=hn9TKnr8L_8"],
            practiceLink: "https://www.indiabix.com/aptitude/partnership/"
        },
    
        // Phase 3: Intermediate Concepts
        {
            sNo: 11,
            topicName: "Mixture and Alligation",
            videoLink: ["https://www.youtube.com/watch?v=xO7rVrKDTQk&list=PL3JmT-xgOMNzl4wFgzy3ng-LRvau-c-ME&index=6"],
            practiceLink: "https://www.indiabix.com/aptitude/alligation-or-mixture/"
        },
        {
            sNo: 12,
            topicName: "Time and Work",
            videoLink: ["https://www.youtube.com/watch?v=ZSVx5uEXy8Y&list=PL3JmT-xgOMNy5r3QBTRzv32LFUTXBmKf2&index=7"],
            practiceLink: "https://www.indiabix.com/aptitude/time-and-work/"
        },
        {
            sNo: 13,
            topicName: "Time, Speed and Distance",
            videoLink: ["https://www.youtube.com/watch?v=jzNxXm5twx4"],
            practiceLink: "https://www.indiabix.com/aptitude/time-and-distance/"
        },
        {
            sNo: 14,
            topicName: "Pipes and Cisterns",
            videoLink: ["https://www.youtube.com/watch?v=ZSVx5uEXy8Y&list=PL3JmT-xgOMNy5r3QBTRzv32LFUTXBmKf2&index=7"],
            practiceLink: "https://www.indiabix.com/aptitude/pipes-and-cistern/"
        },
        {
            sNo: 15,
            topicName: "Boats and Streams",
            videoLink: ["https://www.youtube.com/watch?v=X_hnLMS2rxE&list=PL3JmT-xgOMNzl4wFgzy3ng-LRvau-c-ME&index=11"],
            practiceLink: "https://www.indiabix.com/aptitude/boats-and-streams/"
        },
    
        // Phase 4: Advanced Topics (Hardest)
        {
            sNo: 16,
            topicName: "Permutation & Combination",
            videoLink: ["https://www.youtube.com/watch?v=wmrh087VNBw&list=PL3JmT-xgOMNzl4wFgzy3ng-LRvau-c-ME&index=17"],
            practiceLink: "https://www.indiabix.com/aptitude/permutation-and-combination/"
        },
        {
            sNo: 17,
            topicName: "Probability",
            videoLink: ["https://www.youtube.com/watch?v=VaEjAJVzfVY&list=PL3JmT-xgOMNzl4wFgzy3ng-LRvau-c-ME&index=19"],
            practiceLink: "https://www.indiabix.com/aptitude/probability/"
        }
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
            <main className='sm:w-4/5 w-full mx-auto p-6 mt-20'>
                <section className='max-w-6xl mx-auto px-4 md:px-6 py-6'>
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2A3F5F] to-[#00C1B3] dark:from-[#00E3CC] dark:to-[#A0AEC0]">
                            Aptitude Preparation
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Master essential aptitude topics with curated resources</p>
                    </div>

                    <div className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <Table className='w-full min-w-[600px]'>
                                <TableHeader className='bg-gradient-to-r from-[#00C1B3]/10 to-[#2A3F5F]/10 dark:from-[#00E3CC]/10 dark:to-[#A0AEC0]/10'>
                                    <TableRow className='hover:bg-transparent'>
                                        <TableHead className='px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20'>
                                            #
                                        </TableHead>
                                        <TableHead className='px-6 py-4 text-left text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20'>
                                            Topic
                                        </TableHead>
                                        <TableHead className='px-6 py-4 text-center text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider border-r border-[#00C1B3]/20'>
                                            Video Links
                                        </TableHead>
                                        <TableHead className='px-6 py-4 text-center text-sm font-semibold text-[#2A3F5F] dark:text-[#A0AEC0] uppercase tracking-wider'>
                                            Practice
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {sortedAptitudeData.map((data, index) => (
                                        <TableRow
                                            key={index}
                                            className='border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                                        >
                                            <TableCell className="px-6 py-4 text-sm font-medium text-[#2A3F5F] dark:text-gray-300 font-mono">
                                                {data.sNo.toString().padStart(2, '0')}
                                            </TableCell>

                                            <TableCell className="px-6 py-4 text-sm font-semibold text-[#2A3F5F] dark:text-gray-200">
                                                {data.topicName}
                                            </TableCell>

                                            <TableCell className="px-6 py-4 text-center">
                                                <div className="flex flex-col space-y-2">
                                                    {data.videoLink.map((link, linkIndex) => (
                                                        <a
                                                            key={linkIndex}
                                                            href={link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 
                text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 
                transition-colors text-center"
                                                        >
                                                            <FaYoutube className="w-5 h-5 mr-2" />
                                                            <span>Video {linkIndex + 1}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </TableCell>


                                            <TableCell className="px-6 py-4 text-center">
                                                <a
                                                    href={data.practiceLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                                                >
                                                    <FaExternalLinkAlt className="w-5 h-5 mr-2" />
                                                    Practice
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Aptitude