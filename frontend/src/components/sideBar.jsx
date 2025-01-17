import React from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-5">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link></li>
        <li><Link to="/admin/topics" className="block py-2 px-4 hover:bg-gray-700 rounded">Topics</Link></li>
        <li><Link to="/admin/subtopics" className="block py-2 px-4 hover:bg-gray-700 rounded">Subtopics</Link></li>
        <li><Link to="/admin/questions" className="block py-2 px-4 hover:bg-gray-700 rounded">Questions</Link></li>
        <li><Link to="/logout" className="block py-2 px-4 hover:bg-gray-700 rounded">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
