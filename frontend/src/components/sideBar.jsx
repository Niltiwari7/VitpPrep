import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast'
import { logout } from '../utils/slices/admin.slice';
import { useDispatch } from 'react-redux';
import { Loader2 } from 'lucide-react';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { adminId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handlelogOut = async () => {

    try {
      setLogoutLoading(true);
      const response = await fetch(`http://localhost:3000/admin/logout/${adminId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!data.success) {
        setLogoutLoading(false);
        toast.error(data.message || 'An error occurred. Please try again later.');
        return;
      }

      // Clear admin state in Redux
      dispatch(logout());

      setLogoutLoading(false);

      // Clear admin info from localStorage
      localStorage.removeItem('adminInfo');

      // Display success toast and navigate
      toast.success('Logout Successful');
      navigate('/');
    } catch (error) {
      setLogoutLoading(false);
      toast.error(error.message || 'Internal server error');
    }
  };


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon for Smaller Screens */}
      <button
        className="absolute top-4 left-4 text-gray-300 text-2xl md:hidden z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <span>&#x2715;</span> : <span>&#9776;</span>} {/* Close or Hamburger Icon */}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 h-screen p-5 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:w-64 md:block`}
      >
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 mb-8">
          <img
            src="/logo.png"
            alt="PatternPrep Logo"
            className="h-12 w-12 object-cover rounded-full"
          />
          <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            PatternPrep
          </h3>
        </div>

        {/* Admin Panel Header */}
        <h2 className="text-lg font-bold mb-6 text-gray-100 uppercase tracking-wide">
          Admin Panel
        </h2>

        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <Link
              to={`/admin/profile/${adminId}`}
              className="block py-2 px-4 text-gray-300 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition duration-200"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/admin/topics"
              className="block py-2 px-4 text-gray-300 hover:text-teal-400 hover:bg-gray-700 rounded-lg transition duration-200"
            >
              Topics
            </Link>
          </li>
          <li>
            <Link
              to="/admin/subtopics"
              className="block py-2 px-4 text-gray-300 hover:text-purple-400 hover:bg-gray-700 rounded-lg transition duration-200"
            >
              Subtopics
            </Link>
          </li>
          <li>
            <Link
              to="/admin/questions"
              className="block py-2 px-4 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-lg transition duration-200"
            >
              Questions
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-5">
          <Button
            to="/logout"
            className="w-full py-2 text-center bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
            onClick={handlelogOut}
          >
            {logoutLoading ? <Loader2 className="w-6 h-6" /> : 'Logout'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
