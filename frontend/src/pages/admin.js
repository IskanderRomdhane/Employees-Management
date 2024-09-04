import React, { useState } from 'react';
import DisplayAllConges from '../api/DispalyAllConges'; 
import DisplayAllUser from '../api/DisplayAllUser'; 
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../Components/Sidebar';
import { ChevronRight, ChevronLeft, Menu } from 'lucide-react'; // Import Menu icon

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/createuser");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
    {/*

      <div
        className={`flex-1 p-6 space-y-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-[350px]' : 'ml-[80px]'
        }`}
      >

        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Conges</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Start Date</th>
                  <th className="border border-gray-400 px-4 py-2">End Date</th>
                  <th className="border border-gray-400 px-4 py-2">Reason</th>
                  <th className="border border-gray-400 px-4 py-2">State</th>
                  <th className="border border-gray-400 px-4 py-2">Username</th>
                  <th className="border border-gray-400 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <DisplayAllConges />
            </table>
          </div>
        </section>


        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-8 pb-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">User List</h2>
            <button className="bg-blue-600 text-white rounded-sm w-20 h-8" onClick={handleNavigate}>Add User</button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
              <thead className="bg-gray-900">
                <tr className="text-white text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4">Name</th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">Role</th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Status</th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center">Solde Conge</th>
                  <th className="font-semibold text-sm uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <DisplayAllUser />
            </table>
          </div>
        </section>
      </div>
   
      */}
       </div>
  );
};

export default Admin;
