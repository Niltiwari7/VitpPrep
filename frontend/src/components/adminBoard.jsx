import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Topics</h2>
          <p className="text-3xl">25</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Subtopics</h2>
          <p className="text-3xl">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Total Questions</h2>
          <p className="text-3xl">120</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
