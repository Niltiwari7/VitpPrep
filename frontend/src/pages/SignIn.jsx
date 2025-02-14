import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../utils/slices/user.slice.js';

const API_URL = 'http://localhost:3000';
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');  // Initialize error as an empty string
  const [loader, setLoader] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        dispatch(updateUserInfo(data.user));  // Ensure this action is imported
        navigate('/dashboard');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Sign In</h2>
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
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          {
            loader ? (
              <div className="flex justify-center items-center">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-5 rounded-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition duration-300 ease-in-out transform active:scale-95"
              >
                Sign In
              </button>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default SignIn;
