import React, { useState } from 'react';
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateAdminInfo } from '../utils/slices/admin.slice';
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {toast} from 'react-hot-toast';
const AdminSignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Ensure the name attribute matches the formData keys
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!data.success) {
                toast.error(data.message || 'Login failed.');
                setError(data.message || 'Login failed.');
                setLoading(false);
            } else {
                const id = data.admin.id;
                setError('');
                dispatch(updateAdminInfo(data));
                navigate(`/admin/profile/${id}`);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while signing in.');
            setError(error.message || 'An error occurred while signing in.');
            setLoading(false);
        }
    };
   
    console.log(formData);
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Sign In
                </h2>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                    Welcome back! Please enter your credentials.
                </p>
                <form className="mt-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email" // Add name attribute matching formData key
                            placeholder="you@example.com"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.email} // Set value to formData.email
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password" // Add name attribute matching formData key
                            placeholder="••••••••"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.password} // Set value to formData.password
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>

                </form>

                {/* Sign Up Link */}
                <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/admin/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignIn;
