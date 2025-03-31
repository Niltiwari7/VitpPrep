import React, { useState } from 'react';
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateAdminInfo } from '../utils/slices/admin.slice';
import { Button } from "@/components/ui/button"
import {toast} from 'react-hot-toast';
import { Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
const AdminSignIn = () => {
 const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formData, setFormData] = useState({ email: '', password: '' });
   const [error, setError] = useState('');
   const [loader, setLoader] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError('');
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFormData(true);
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
                setLoader(false);
            } else {
                const id = data.admin.id;
                setError('');
                dispatch(updateAdminInfo(data));
                navigate(`/admin/profile/${id}`);
                setLoader(false);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while signing in.');
            setError(error.message || 'An error occurred while signing in.');
            setLoader(false);
        }
    };
   
    console.log(formData);
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-100 dark:bg-purple-900 rounded-full opacity-50" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50" />
  
          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
              >
                Welcome Back
              </motion.h2>
              <p className="text-gray-500 dark:text-gray-400">
                Sign in to continue your learning journey
              </p>
            </div>
  
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
  
              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
  
              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Forgot Password?
                </a>
              </div>
  
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}
  
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loader}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loader ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
  
              {/* Sign Up Link */}
              <p className="text-center text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <a
                  href="/admin/signup"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Create account
                </a>
              </p>
            </form>
  
           
          </div>
        </motion.div>
      </div>
    );
};

export default AdminSignIn;
