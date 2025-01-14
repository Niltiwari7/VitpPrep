import React from 'react';
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Sign In
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Welcome back! Please enter your credentials.
        </p>
        <form className="mt-6">
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
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-between">
          <span className="w-1/5 border-b dark:border-gray-600"></span>
          <p className="text-sm text-gray-600 dark:text-gray-400">or</p>
          <span className="w-1/5 border-b dark:border-gray-600"></span>
        </div>

        {/* Social Sign-In Options */}
        <div className="flex justify-center space-x-4">
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <AiFillGoogleCircle className='h-5 w-5 mr-2'/>
            Sign in with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
