import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Users, Calendar, PlusCircle } from 'lucide-react'; 

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
      <header className="bg-gray-800 text-white flex items-center justify-between p-4 shadow-md">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ml-4">Admin Dashboard</h1>
        </div>
        <div>
          <button
            onClick={() => handleNavigate('/createuser')}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Create User
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Users className="w-12 h-12 text-teal-500 mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Users</h3>
                <button
                  onClick={() => handleNavigate('/users')}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Users
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <Calendar className="w-12 h-12 text-yellow-500 mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Conges</h3>
                <button
                  onClick={() => handleNavigate('/conges')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  View Conges
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
