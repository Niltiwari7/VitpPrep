import React, { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { setDarkMode } from "../utils/slices/theme.slice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Loader2, University } from "lucide-react";
import { toast } from "react-hot-toast";
import { updateUserInfo } from "../utils/slices/user.slice";
import { motion, AnimatePresence } from 'framer-motion';
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
import { User, Heart, LogOut } from 'lucide-react';
import { logout } from "../utils/slices/admin.slice";

const UserEdit = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const userInfo = useSelector((state) => state.user.userInfo || {});
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [personaInfoloading, setPersonalInfoLoading] = useState(false);
    const [socialLinksLoading, setSocialLinksLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [skillLoading, setSkillloading] = useState(false);
    const skillOptions = ["CPP", "Java", "Python", "JavaScript", "React", "Node", "Express", "MongoDB", "HTML", "CSS", "Tailwind", "Bootstrap", "Material-UI", "Chakra-UI", "Redux", "Context API", "GraphQL", "REST API", "Firebase", "AWS", "Azure", "Heroku", "Netlify", "Vercel", "Docker", "Kubernetes", "Jenkins", "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Asana", "Slack", "Zoom", "Google Meet", "Microsoft Teams", "Discord", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape"];


    const [inputValue, setInputValue] = useState("");

    const [formData, setFormData] = useState({
        fullName: userInfo.fullName || "",
        email: userInfo.email || "",
        imageUrl: userInfo.imageUrl || "",
        university: userInfo.University || "",
        bio: userInfo.bio || "",
        location: userInfo.location || "",
        github: userInfo.github || "",
        linkedin: userInfo.linkedin || "",
        twitter: userInfo.twitter || "",
        website: userInfo.website || "",
        newPassword: "",
        confirmPassword: "",
        skill: "",
        technicalSkills: userInfo.technicalSkills || [],
    });
    // console.log(formData);
    console.log(formData);

    const [success, setSuccess] = useState('');
    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };


    console.log("website", formData.website);


    useEffect(() => { }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        setPersonalInfoLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`http://localhost:3000/users/updatePersonalInfo/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Your personal info has been updated successfully");
                setSuccess(data.message);
                dispatch(updateUserInfo(data.User));
            } else {
                toast.error("Failed to update personal details. Please try again.");
                setError("Failed to update personal details. Please try again.");
            }
        } catch (err) {
            toast.error(err.message || "An unexpected error occurred");
            setError("An error occurred while updating your info.");
            console.error(err);
        } finally {
            setPersonalInfoLoading(false);
        }
    };

    const handleSocialLinksSubmit = async (e) => {
        e.preventDefault();
        setSocialLinksLoading(true); // Set loading to true
        setError(""); // Reset error
        setSuccess(""); // Reset success message

        try {
            const response = await fetch(
                `http://localhost:3000/users/updateSocialLinks/${userId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        github: formData.github,
                        linkedin: formData.linkedin,
                        twitter: formData.twitter,
                        website: formData.website
                    }),

                }
            );

            const data = await response.json();
            if (data.success) {
                toast.success("Your social links have been updated successfully");
                setSuccess(data.message);
                dispatch(updateUserInfo(data.User)); // Dispatch updated admin info to Redux
                console.log("updated social link:", data.User); // Log the updated admin info
                setError(""); // Clear error
            } else {
                toast.error("Failed to update social links. Please try again");
                setError("Failed to update social links. Please try again");
            }
        } catch (err) {
            toast.error(err.message || "An unexpected error occurred");
            setError("An error occurred while updating your info");
            console.error(err); // Log the error for debugging
        } finally {
            setSocialLinksLoading(false);
        }
    };

    // handlePasswordSubmit
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordLoading(true); // Set loading to true
        setError(""); // Reset error
        setSuccess(""); // Reset success message

        try {
            // API call to update the password
            const response = await fetch(
                `http://localhost:3000/users/updatePassword/${userId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), // Ensure formData contains required fields
                }
            );

            const data = await response.json();

            // Handle response
            if (data.success) {
                toast.success("Your password has been updated successfully");
                setSuccess(data.message); // Update success message
                //  dispatch(updateAdminInfo(data.admin)); // Dispatch updated admin info to Redux
            } else {
                toast.error("Failed to update password. Please try again.");
                setError("Failed to update password. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
            setError("An error occurred while updating your password");
            console.error(error); // Log the error for debugging
        } finally {
            setPasswordLoading(false); // Reset loading state
        }
    };


    const handleAddSkill = () => {
        if (formData.skill && !formData.technicalSkills.includes(formData.skill)) {
            setFormData({ ...formData, technicalSkills: [...formData.technicalSkills, formData.skill] });
            formData.skill = "";
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        setFormData({ ...formData, technicalSkills: formData.technicalSkills.filter(skill => skill !== skillToRemove) });
    }




    // handleSkillSubmit
    const handleSkillSubmit = async (e) => {
        e.preventDefault();
        setSkillloading(true);
        setError("");
        setSuccess("");
        setSkillloading(true);

        try {
            const response = await fetch(`http://localhost:3000/users/updateSkills/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ technicalSkills: formData.technicalSkills })  // Fix here
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Your technical skills have been updated successfully");
                setSuccess(data.message);
                dispatch(updateUserInfo(data.User));
                console.log(data.User);

                setSkillloading(false);
            } else {
                setSkillloading(false);
                toast.error("Failed to update technical skills. Please try again.");
                setError("Failed to update technical skills. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
            setError("An error occurred while updating your technical skills");
            setSkillloading(false);
            console.error(error);
        }
    }


    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

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
                                        src={userInfo.imageUrl || "/assets/placeholder.png"}
                                        className="hover:brightness-110 transition-all duration-300"
                                    />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                        {userInfo.name?.charAt(0) || "U"}
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
                                <Link to={`/user/${userInfo._id}`} className="flex items-center w-full px-2 py-2">
                                    <User className="mr-2 h-4 w-4 text-[#00C1B3] dark:text-[#00E3CC]" />

                                    <span className="text-[#00C1B3] dark:text-[#00E3CC]"> Profile</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="group transition-colors hover:bg-[#00C1B3]/10 dark:hover:bg-[#00E3CC]/10 focus:bg-[#00C1B3]/10 dark:focus:bg-[#00E3CC]/10">
                                <Link to={`/user/likedQuestion/${userInfo._id}`} className="flex items-center w-full px-2 py-2">
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
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto pt-20">
                {/* Header */}

                {/* Back Button */}
                <div className="px-6 py-4 group relative">
                    <Link
                        to={`/user/${userId}`}
                        className="inline-flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-300 ease-out bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-blue-600 hover:text-blue700 dark:text-blue-400 dark:hover:text-blue-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-sm border border-transparent hover:border-blue-200 dark:hover:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        <AiOutlineArrowLeft className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110" size={20} />
                        <span className="relative font-medium">Back To Profile</span>

                    </Link>
                </div>



                {/* Form Section */}
                <form onSubmit={handlePersonalInfoSubmit} className="px-6 py-6 space-y-6">
                    {/* Personal Info */}
                    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Use a permanent email address where you can receive mail.
                        </p>

                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>

                            {/* Bio Input */}
                            <div>
                                <label htmlFor="bio" className="block font-medium">
                                    Bio
                                </label>
                                <input
                                    type="text"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Enter your bio"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black "
                                />
                            </div>

                            <div>
                                <label className="block font-medium" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter your current location"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>

                            <div>
                                <label className="block font-medium" htmlFor="college">
                                    College
                                </label>

                                <input
                                    type="text"
                                    name="university"
                                    value={formData.University}
                                    onChange={handleChange}
                                    placeholder="Enter your college name"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    onClick={handlePersonalInfoSubmit}
                                    disabled={personaInfoloading} // Disable button while loading
                                    className="px-6 py-3 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-md transition-all"
                                >
                                    {personaInfoloading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Social Links */}
                    <form onSubmit={handleSocialLinksSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Social Links</h2>
                        <p className="text-gray-500 dark:text-gray-400">Share your social profiles.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="github">
                                    GitHub
                                </label>
                                <input
                                    type="text"
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    placeholder={`${userInfo.socialLinks?.github ? userInfo.socialLinks?.github : "GitHub profile URL"}`}

                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="linkedin">
                                    LinkedIn
                                </label>
                                <input
                                    type="text"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder={`${userInfo.socialLinks?.linkedin ? userInfo.socialLinks?.linkedin : "LinkedIn profile URL"}`}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="twitter">
                                    Twitter
                                </label>
                                <input
                                    type="text"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    placeholder={`${userInfo.socialLinks?.twitter ? userInfo.socialLinks?.twitter : "Twitter profile URL"}`}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="website">
                                    Other
                                </label>
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    placeholder={`${userInfo.socialLinks?.website ? userInfo.socialLinks?.website : "Protfolio or personal website URL"}`}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    onClick={handleSocialLinksSubmit}
                                    disabled={socialLinksLoading} // Disable button while loading
                                    className="px-6 py-3 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-md transition-all"
                                >
                                    {socialLinksLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Password Section */}
                    <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Set Password</h2>
                        <p className="text-gray-500 dark:text-gray-400">Update your account password.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium" htmlFor="newPassword">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                onClick={handlePasswordSubmit}
                                disabled={passwordLoading} // Disable button while loading
                                className="px-6 py-3 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-md transition-all"
                            >
                                {passwordLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Technical Skills */}
                    <form
                        onSubmit={handleSkillSubmit}
                        className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4"
                    >
                        <h2 className="text-xl font-semibold">Technical Skills</h2>
                        <p className="text-gray-500 dark:text-gray-400">Highlight your technical expertise.</p>

                        {/* Dropdown for skill selection */}
                        <div className="flex items-center space-x-4">
                            <select
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                            >
                                <option value="" disabled>
                                    Select a skill
                                </option>
                                {skillOptions.map((skill, index) => (
                                    <option key={index} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                            <Button
                                type="button"
                                onClick={handleAddSkill}
                                className="px-4 py-2 text-white font-medium bg-green-500 hover:bg-green-600 rounded-md transition-all"
                            >
                                Add
                            </Button>
                        </div>

                        {/* Display skills with removable tags */}
                        <div className="flex flex-wrap gap-2">
                            {formData.technicalSkills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-full space-x-2"
                                >
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="text-lg  text-red-500 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                onClick={handleSkillSubmit}
                                disabled={skillLoading} // Disable button while loading
                                className="px-6 py-3 text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-md transition-all"
                            >
                                {skillLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </form>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
