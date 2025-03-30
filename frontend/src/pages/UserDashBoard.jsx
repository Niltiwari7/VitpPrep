import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../utils/slices/theme.slice.js";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { logout } from "../utils/slices/user.slice.js";
import Footer from "../components/Footer.jsx";
import { LogOut } from 'lucide-react';
import { Heart } from "lucide-react";
import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineDashboard } from "react-icons/ai";

const API_URL = 'http://localhost:3000';

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userInfo || {});
  const darkMode = useSelector((state) => state.theme?.darkMode || false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);

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

  // Reusable Card Component
  const FeatureCard = ({ imageUrl, title, description, buttonText, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(navigateTo);
    }
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300" onClick={handleClick}>
        <CardHeader>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-sm mb-4">{description}</CardDescription>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-24">
        <FeatureCard
          imageUrl="src/assets/public/maqsds.png"
          title="Crack DSA Interviews"
          description="Master Data Structures and Algorithms with top coding questions asked by FAANG companies."
          buttonText="Start Learning"
          navigateTo={"/top-interview-questions-dsa"}
        />

        <FeatureCard
          imageUrl="src/assets/public/oop.jpg"
          title="Object-Oriented Design"
          description="Understand OOP principles, design patterns, and best practices for scalable applications."
          buttonText="Explore OOP"
          navigateTo={"/oops"}
        />

        <FeatureCard
          imageUrl="src/assets/public/cn.png"
          title="Networking Essentials"
          description="Get a solid grasp on networking concepts like OSI model, TCP/IP, and cloud computing."
          buttonText="Learn More"
          navigateTo={"/computer-network"}
        />

        <FeatureCard
          imageUrl="src/assets/public/dbms.png"
          title="Database Management"
          description="Learn SQL queries, normalization, transactions, indexing, and more to ace DBMS interviews."
          buttonText="Start Practicing"
          navigateTo={"/dbms"}
        />

        <FeatureCard
          imageUrl="src/assets/public/os.png"
          title="Operating Systems"
          description="Understand memory management, concurrency, process scheduling, and OS internals."
          buttonText="Explore Topics"
          navigateTo={"/os"}
        />


      </main>
      <Footer />
    </div>
  );
};

export default UserDashBoard;
