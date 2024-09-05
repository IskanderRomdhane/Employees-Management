import React from 'react';
import DisplayAllUser from '../api/DisplayAllUser'; 
import { useNavigate } from 'react-router-dom'; 

const Users = () => {
    const navigate = useNavigate();
  
    const handleNavigate = () => {
        navigate("/createuser");
    };
  return (
    <div>
    <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-8">
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
                  <th className="font-semibold text-sm uppercase px-6 py-4  text-center">Actions</th>
                </tr>
              </thead>
              <DisplayAllUser />
            </table>
          </div>
        </section>
        </div>
  )
}

export default Users