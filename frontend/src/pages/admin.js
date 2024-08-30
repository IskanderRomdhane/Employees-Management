import React from 'react';
import SoldeCongeApi from '../api/SoldeCongeApi';
import DisplayAllConges from '../api/DispalyAllConges';
import DisplayCongeStatus from '../api/DisplayCongeStatus';
import DisplayAllUser from '../api/DisplayAllUser';

const Admin = () => {
  return (
    <div>
      <div className='py-5 px-5'>
        <SoldeCongeApi />
      </div>
      <div className='py-5'>
        <table className='table-auto w-full border-collapse border border-gray-400'>
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2">Reason</th>
              <th className="border border-gray-400 px-4 py-2">State</th>
              <th className="border border-gray-400 px-4 py-2">Username</th>
            </tr>
          </thead>
          <DisplayAllConges />
        </table>
      </div>
      <div className='py-5 px-5'>
        <DisplayCongeStatus />
      </div>
      <div className='py-4'>
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
    </div>
  );
};

export default Admin;
