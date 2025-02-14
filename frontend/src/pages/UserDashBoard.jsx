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
import { useNavigate } from "react-router-dom";  // ✅ Corrected
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { logout } from "../utils/slices/user.slice.js";
import Footer from "../components/Footer.jsx";


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
  const FeatureCard = ({ imageUrl, title, description, buttonText }) => {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
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
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-30">
        <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          PatternPrep
        </h3>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.imageUrl || "/assets/placeholder.png"} className='border-2 border-white border-r-2' />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Liked Questions</DropdownMenuItem>
              <DropdownMenuItem>Interview Experience</DropdownMenuItem>
              <DropdownMenuItem>
                {loader ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <FeatureCard
          imageUrl="src/assets/public/maqsds.png"
          title="Crack DSA Interviews"
          description="Master Data Structures and Algorithms with top coding questions asked by FAANG companies."
          buttonText="Start Learning"
        />

        <FeatureCard
          imageUrl="src/assets/public/oop.jpg"
          title="Object-Oriented Design"
          description="Understand OOP principles, design patterns, and best practices for scalable applications."
          buttonText="Explore OOP"
        />

        <FeatureCard
          imageUrl="src/assets/public/cn.png"
          title="Networking Essentials"
          description="Get a solid grasp on networking concepts like OSI model, TCP/IP, and cloud computing."
          buttonText="Learn More"
        />

        <FeatureCard
          imageUrl="src/assets/public/dbms.png"
          title="Database Management"
          description="Learn SQL queries, normalization, transactions, indexing, and more to ace DBMS interviews."
          buttonText="Start Practicing"
        />

        <FeatureCard
          imageUrl="src/assets/public/os.png"
          title="Operating Systems"
          description="Understand memory management, concurrency, process scheduling, and OS internals."
          buttonText="Explore Topics"
        />

        <FeatureCard
          imageUrl="src/assets/public/aptitude.png"
          title="Aptitude & Problem Solving"
          description="Sharpen your problem-solving skills with quantitative and logical reasoning challenges."
          buttonText="Solve Now"
        />

        <FeatureCard
          imageUrl="src/assets/public/lr.png"
          title="Logical Reasoning"
          description="Enhance your analytical thinking with logical puzzles, pattern recognition, and riddles."
          buttonText="Challenge Yourself"
        />

      </main>
      <Footer/>
    </div>
  );
};

export default UserDashBoard;
