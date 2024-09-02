import React, { useState } from 'react';
import RequestConge from '../api/RequestConge';
import DisplayCongeStatus from '../api/DisplayCongeStatus';
import SoldeCongeApi from '../api/SoldeCongeApi';
import UserNavbar from '../Components/UserNavbar';

const User = () => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Section 1: Navigation */}
      <nav>
        <UserNavbar />
      </nav>

      {/* Section 2: Conge Request Form */}
      <section className="p-6 max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Conge Request Form</h1>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="reason" className="mb-2 text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              id="reason"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Reason"
              value={reason}
              onChange={handleReasonChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="start" className="mb-2 text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="end" className="mb-2 text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              id="end"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>

          <div className="mt-4">
            <RequestConge reason={reason} startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </section>

      {/* Section 3: Conge Status and Solde */}
      <section className="p-6 max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Conge Status and Solde</h2>
        <div className="space-y-6">
          <DisplayCongeStatus />
          <SoldeCongeApi />
        </div>
      </section>
    </div>
  );
};

export default User;
