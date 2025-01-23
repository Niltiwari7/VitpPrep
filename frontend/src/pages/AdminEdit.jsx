import React, { useState } from "react";
import Sidebar from "../components/sideBar";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { setDarkMode } from "../utils/slices/theme.slice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ImageUpload from "../components/ImageUpload";

const AdminEdit = () => {
    const dispatch = useDispatch();
    const { adminId } = useParams();
    const darkMode = useSelector((state) => state.theme?.darkMode || false);
    const adminInfo = useSelector((state) => state.admin.adminInfo || {});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: adminInfo.fullName || "",
        email: adminInfo.email || "",
        imageUrl: adminInfo.imageUrl || "",
        University: adminInfo.University || "",
        bio: adminInfo.bio || "",
        location: adminInfo.location || "",
        github: adminInfo.github || "",
        linkedIn: adminInfo.linkedIn || "",
        newPassword: "",
        confirmPassword: "",
        skill: "",
    });

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
    console.log(formData);

    // Handle the update button click
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error before attempting to update

        // Add your update logic here, either through Redux or API request.
        try {
            // Example: You can dispatch an action to update the user info in Redux store
            // await dispatch(updateAdminInfo(formData)); 

            // Or call your API to save the updated info
            // const response = await apiCallToUpdateAdminInfo(formData);

            // On success, stop loading and show success
            setLoading(false);
            // Optionally redirect or show success message
            console.log("Profile updated successfully!");
        } catch (err) {
            setLoading(false);
            setError("An error occurred while updating your info.");
            console.error(err);
        }
    };


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
                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                    {/* Personal Info */}
                    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Use a permanent email address where you can receive mail.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block font-medium" htmlFor="college">
                                    College
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.college}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Social Links */}
                    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
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
                                    placeholder="GitHub profile URL"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    placeholder="LinkedIn profile URL"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Password Section */}
                    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Technical Skills */}
                    <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                        <h2 className="text-xl font-semibold">Technical Skills</h2>
                        <p className="text-gray-500 dark:text-gray-400">Highlight your technical expertise.</p>
                        <select
                            name="skill"
                            value={formData.skill}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="react">React</option>
                            <option value="node">Node</option>
                            <option value="express">Express</option>
                            <option value="mongodb">MongoDB</option>
                        </select>
                    </section>

                    {/* Update Button */}
                    <section>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            {loading ? "Updating..." : "Update Info"}
                        </button>
                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    </section>
                </form>
            </div>
        </div>
    );
};

export default AdminEdit;
