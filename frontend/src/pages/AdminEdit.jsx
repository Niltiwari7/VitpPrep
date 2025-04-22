import React, { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { setDarkMode } from "../utils/slices/theme.slice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ImageUpload from "../components/ImageUpload";
import { Button } from "@/components/ui/button";
import { updateAdminInfo } from "../utils/slices/admin.slice";
import { Loader2, University } from "lucide-react";
import { toast } from "react-hot-toast";





const AdminEdit = () => {
    const dispatch = useDispatch();
    const { adminId } = useParams();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const adminInfo = useSelector((state) => state.admin.adminInfo || {});
    const [error, setError] = useState("");
    const [personaInfoloading, setPersonalInfoLoading] = useState(false);
    const [socialLinksLoading, setSocialLinksLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [skillLoading, setSkillloading] = useState(false);
    const skillOptions = ["CPP", "Java", "Python", "JavaScript", "React", "Node", "Express", "MongoDB", "HTML", "CSS", "Tailwind", "Bootstrap", "Material-UI", "Chakra-UI", "Redux", "Context API", "GraphQL", "REST API", "Firebase", "AWS", "Azure", "Heroku", "Netlify", "Vercel", "Docker", "Kubernetes", "Jenkins", "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Asana", "Slack", "Zoom", "Google Meet", "Microsoft Teams", "Discord", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape", "Twinmotion", "Photoscan", "RealityCapture", "Agisoft Metashape", "ZBrush", "Substance Painter", "Substance Designer", "Marvelous Designer", "Keyshot", "Blender", "Unity", "Unreal Engine", "Maya", "3DS Max", "AutoCAD", "SolidWorks", "Fusion 360", "SketchUp", "Revit", "Rhino", "Grasshopper", "Lumion", "V-Ray", "Enscape"];

    skillOptions.sort();
    const [inputValue, setInputValue] = useState("");

    const [formData, setFormData] = useState({
        fullName: adminInfo.fullName || "",
        email: adminInfo.email || "",
        imageUrl: adminInfo.imageUrl || "",
        university: adminInfo.University || "",
        bio: adminInfo.bio || "",
        location: adminInfo.location || "",
        github: adminInfo.github || "",
        linkedin: adminInfo.linkedin || "",
        twitter: adminInfo.twitter || "",
        website: adminInfo.website || "",
        newPassword: "",
        confirmPassword: "",
        skill: "",
        technicalSkills: adminInfo.technicalSkills || [],
    });
   // console.log(formData);
    
    const [success, setSuccess] = useState('');
    const toggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        setPersonalInfoLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch(`http://localhost:3000/admin/updatePersonalInfo/${adminId}`, {
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
                dispatch(updateAdminInfo(data.admin));
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
                `http://localhost:3000/admin/updateSocialLinks/${adminId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            if (data.success) {
                toast.success("Your social links have been updated successfully");
                setSuccess(data.message);
                dispatch(updateAdminInfo(data.admin)); 
                console.log(data.admin);
                setError(""); 
            } else {
                toast.error("Failed to update social links. Please try again");
                setError("Failed to update social links. Please try again");
            }
        } catch (err) {
            toast.error(err.message || "An unexpected error occurred");
            setError("An error occurred while updating your info");
            console.error(err);
        } finally {
            setSocialLinksLoading(false);
        }
    };
    const API_URL = import.meta.env.VITE_API_URL;
    // handlePasswordSubmit
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        setError(""); 
        setSuccess(""); 
        try {
    
            const response = await fetch(
                `${API_URL}/admin/updatePassword/${adminId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData), 
                }
            );

            const data = await response.json();

            // Handle response
            if (data.success) {
                toast.success("Your password has been updated successfully");
                setSuccess(data.message); 
                //  dispatch(updateAdminInfo(data.admin)); 
            } else {
                toast.error("Failed to update password. Please try again.");
                setError("Failed to update password. Please try again.");
            }
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
            setError("An error occurred while updating your password");
            console.error(error); 
        } finally {
            setPasswordLoading(false); 
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
            const response = await fetch(`${API_URL}/admin/updateSkills/${adminId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)  
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Your technical skills have been updated successfully");
                setSuccess(data.message);
                dispatch(updateAdminInfo(data.admin));
                setSkillloading(false);
            } else {
                // console.log(data);
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
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-gray-800 shadow-md">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <header className="flex items-center justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-sm sticky top-0 z-10 gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
                    >
                        {darkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
                    </button>
                    <img
                        className="w-10 h-10 rounded-full object-cover shadow"
                        src={adminInfo.imageUrl}
                        alt="Profile"
                    />
                </header>

                {/* Back Button */}
                <div className="px-6 py-4">
                    <Link
                        to={`/admin/profile/${adminId}`}
                        className="flex items-center text-blue-600 hover:underline space-x-2"
                    >
                        <AiOutlineArrowLeft size={20} />
                        <span>Back To Profile</span>
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
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Image Upload */}
                            {/* error handling */}
                            {error && <p className="text-red-500">{error}</p>}
                            <ImageUpload adminId={adminId} adminInfo={adminInfo} />

                        </div>
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
                                    name="University"
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
                                    placeholder={`${adminInfo.socialLinks?.github ? adminInfo.socialLinks?.github : "GitHub profile URL"}`}

                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
                                />
                            </div>
                            <div>
                                <label className="block font-medium" htmlFor="linkedIn">
                                    LinkedIn
                                </label>
                                <input
                                    type="text"
                                    name="linkedIn"
                                    value={formData.linkedIn}
                                    onChange={handleChange}
                                    placeholder={`${adminInfo.socialLinks?.linkedIn ? adminInfo.socialLinks?.linkedIn : "LinkedIn profile URL"}`}
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
                                    placeholder={`${adminInfo.socialLinks?.twitter ? adminInfo.socialLinks?.twitter : "Twitter profile URL"}`}
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
                                    placeholder={`${adminInfo.socialLinks?.website ? adminInfo.socialLinks?.website : "Protfolio or personal website URL"}`}
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
                                {skillOptions.map((skill,index) => (
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
                            {formData.technicalSkills.map((skill,index) => (
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
                                disabled={skillLoading  } // Disable button while loading
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

export default AdminEdit;
