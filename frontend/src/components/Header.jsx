import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setDarkMode } from '../utils/slices/theme.slice';
import { FaSun, FaMoon, FaUserPlus, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const darkMode = useSelector((state) => state.theme?.darkMode || false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
    localStorage.setItem('darkMode', !darkMode);
  };

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-xl backdrop-blur-lg' : ''
    } ${darkMode ? 'bg-[#0D1117]/95' : 'bg-[#2A3F5F]/95'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <img
            src="/logo.png"
            alt="PatternPrep Logo"
            className="h-12 w-12 object-contain rounded-full border-2 border-white/20 hover:scale-105 transition-transform"
          />
          <Link
            to="/"
            className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              darkMode 
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
            } hover:opacity-80 transition-opacity`}
          >
            VitpPrep
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLink to="/signup" icon={<FaUserPlus />} text="Sign Up" darkMode={darkMode} />
          <NavLink to="/about" icon={<FaInfoCircle />} text="About Us" darkMode={darkMode} />
          <NavLink to="/contact" icon={<FaEnvelope />} text="Contact" darkMode={darkMode} />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-3 rounded-full flex items-center space-x-2 ${
              darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-600 text-white'
            }`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg"
          aria-label="Toggle navigation menu"
        >
          <div className="space-y-2">
            <span className={`block w-8 h-1 rounded-full transition-transform ${
              darkMode ? 'bg-gray-200' : 'bg-gray-800'
            } ${isMenuOpen ? 'rotate-45 translate-y-3' : ''}`}></span>
            <span className={`block w-8 h-1 rounded-full ${
              darkMode ? 'bg-gray-200' : 'bg-gray-800'
            } ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-8 h-1 rounded-full transition-transform ${
              darkMode ? 'bg-gray-200' : 'bg-gray-800'
            } ${isMenuOpen ? '-rotate-45 -translate-y-3' : ''}`}></span>
          </div>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              transition={{ duration: 0.3 }}
              className={`lg:hidden absolute top-full left-0 w-full ${
                darkMode ? 'bg-[#0D1117]' : 'bg-[#2A3F5F]'
              } shadow-xl`}
            >
              <ul className="p-4 space-y-4">
                <MobileNavLink
                  to="/signup"
                  icon={<FaUserPlus />}
                  text="Sign Up"
                  darkMode={darkMode}
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  to="/about"
                  icon={<FaInfoCircle />}
                  text="About Us"
                  darkMode={darkMode}
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  to="/contact"
                  icon={<FaEnvelope />}
                  text="Contact"
                  darkMode={darkMode}
                  onClick={() => setIsMenuOpen(false)}
                />
                <li>
                  <button
                    onClick={toggleTheme}
                    className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl ${
                      darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-600 text-white'
                    }`}
                  >
                    {darkMode ? <FaMoon size={24} /> : <FaSun size={24} />}
                    <span className="text-lg font-medium">
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </button>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

const NavLink = ({ to, icon, text, darkMode }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
        darkMode
          ? 'text-gray-300 hover:bg-gray-700'
          : 'text-white hover:bg-blue-700'
      }`}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  </motion.div>
);

const MobileNavLink = ({ to, icon, text, darkMode, onClick }) => (
  <motion.li whileHover={{ scale: 1.02 }}>
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-4 p-4 rounded-xl ${
        darkMode
          ? 'text-gray-300 hover:bg-gray-800'
          : 'text-white hover:bg-blue-600'
      }`}
    >
      {icon}
      <span className="text-lg font-medium">{text}</span>
    </Link>
  </motion.li>
);

export default Header;