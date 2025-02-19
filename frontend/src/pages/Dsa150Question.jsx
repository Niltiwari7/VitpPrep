import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../utils/slices/theme.slice';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FaSun, FaMoon } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import {Loader2} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


const Dsa150Question = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userInfo || {});
    const darkMode = useSelector((state) => state.theme.darkMode || false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

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
                            <DropdownMenuLabel className="font-semibold text-center">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center">Profile</DropdownMenuItem>
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

            <div>
                <h1 className='font-bold text-xl sm:text-2xl text-center pt-5 '>Most Importand Dsa Question</h1>


            </div>
        </div>
    )
}

export default Dsa150Question