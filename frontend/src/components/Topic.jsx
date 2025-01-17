import React from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation

const Topics = () => {
  return (
    <div className="flex-1 p-8">
      <h2 className="text-3xl font-semibold mb-6">Manage Topics</h2>
      <Link to="/admin/topics/add" className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 inline-block hover:bg-green-600">
        Add Topic
      </Link>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Topic Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 px-6">Mathematics</td>
            <td className="py-4 px-6">Basic math concepts and problems.</td>
            <td className="py-4 px-6">
              <Link to="/admin/topics/edit/1" className="text-blue-500 hover:underline">Edit</Link> |
              <button className="text-red-500 hover:underline ml-2">Delete</button>
            </td>
          </tr>
          {/* Repeat for other topics */}
        </tbody>
      </table>
    </div>
  );
};

export default Topics;
