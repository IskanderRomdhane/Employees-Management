import React, { useState } from 'react';
import DisplayAllConges from '../api/DispalyAllConges'; 
import DisplayAllUser from '../api/DisplayAllUser'; 
import UserNavbar from '../Components/UserNavbar';
import ChangeCongeStatus from '../api/ChangeCongeStatus';
import { useNavigate } from 'react-router-dom'; 
const Admin = () => {
  const [userid, setId] = useState('');
  const [state, setState] = useState(null);
  const Navigate = useNavigate();
  const handleNavigate = () => {
    Navigate("/createuser");
  }
  const idHandler = (event) => {
    setId(event.target.value);
    console.log(userid); 
  };

  const stateHandler = (event) => {
    setState(event.target.value);
    console.log(event.target.value); 
  };



  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <nav>
        <UserNavbar />
      </nav>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        

        {/* Display All Conges */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Conges</h2>
          <div className="overflow-x-auto">
          <table className='table-auto w-full border-collapse border border-gray-400'>
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2">Reason</th>
              <th className="border border-gray-400 px-4 py-2">State</th>
              <th className="border border-gray-400 px-4 py-2">username</th>
              <th className="border border-gray-400 px-4 py-2">actions</th>
            </tr>
          </thead>
          <DisplayAllConges />
        </table>
          </div>
        </section>

        {/* Display All Users */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>
          <button class='button_plus' onClick={handleNavigate}></button>
          <div className="overflow-x-auto">
          <table className='table-auto w-full border-collapse border border-gray-400'>
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">First Name</th>
              <th className="border border-gray-400 px-4 py-2">Last Name</th>
              <th className="border border-gray-400 px-4 py-2">Full Name</th>
              <th className="border border-gray-400 px-4 py-2">Solde Conge</th>
              <th className="border border-gray-400 px-4 py-2">Conge ID</th>
            </tr>
          </thead>
          <DisplayAllUser />
        </table>
          </div>
        </section>
      

      </div>
    </div>
  );
};

export default Admin;
