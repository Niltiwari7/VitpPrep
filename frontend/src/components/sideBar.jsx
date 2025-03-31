import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from 'react-hot-toast'
import { logout } from '../utils/slices/admin.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2, LayoutDashboard, FilePlus, BookOpen, ListTree, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const adminInfo = useSelector((state) => state.admin.adminInfo || {});
  const { adminId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !document.querySelector('.sidebar-container').contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogOut = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    
    try {
      setLogoutLoading(true);
      const response = await fetch(`http://localhost:3000/admin/logout/${adminId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      dispatch(logout());
      localStorage.removeItem('adminInfo');
      toast.success('Logout Successful');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="fixed top-4 left-4 z-50 p-2 md:hidden rounded-lg bg-gray-800/80 backdrop-blur-sm text-gray-300 hover:bg-gray-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
      </button>

      {/* Sidebar Container */}
      <div
        className={`sidebar-container fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
        backdrop-blur-lg shadow-2xl h-screen p-5 transform transition-all duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40
        border-r border-gray-700/50`}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-800/50 rounded-xl">
          <img
            src="/src/assets/public/logo.png"
            alt="VitpPrep Logo"
            className="h-12 w-12 object-cover rounded-xl border-2 border-purple-400/30 shadow-lg"
          />
          <div>
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              VitpPrep
            </h3>
            <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          <NavLink to={`/admin/profile/${adminInfo._id}`} icon={<LayoutDashboard size={18} />}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/addQuestion" icon={<FilePlus size={18} />}>
            Add Question
          </NavLink>

          <NavLink to={`/admin/topic/${adminInfo._id}`} icon={<BookOpen size={18} />}>
            Topics
          </NavLink>

          <NavLink to="/admin/subtopics" icon={<ListTree size={18} />}>
            Subtopics
          </NavLink>

          <NavLink to="/admin/questions" icon={<ListTree size={18} />}>
            Questions
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 w-full px-5">
          <Button
            onClick={handleLogOut}
            className="w-full py-3 bg-gradient-to-r from-red-500/80 to-rose-600/80 hover:from-red-600 hover:to-rose-700 
            text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-red-500/20 
            flex items-center justify-center gap-2"
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogOut size={16} />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center p-3 space-x-3 text-gray-300 hover:text-white hover:bg-gray-700/50 
    rounded-lg transition-all duration-200 group border border-transparent hover:border-gray-600/50
    hover:shadow-sm"
  >
    <span className="text-gray-400 group-hover:text-purple-400 transition-colors">
      {icon}
    </span>
    <span className="text-sm font-medium">{children}</span>
  </Link>
);

export default Sidebar;