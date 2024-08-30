import React, { useState } from 'react';
import RequestConge from '../api/RequestConge';
import DisplayCongeStatus from '../api/DisplayCongeStatus';
import SoldeCongeApi from '../api/SoldeCongeApi';

const User = () => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(startDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    console.log(endDate);
  };

  return (
    <div className="flex flex-nowrap px-6 py-[50px]">
      <h1>User page</h1>
      <div className="px-3 py-4">
        <div className="flex flex-col">
          <label htmlFor="reason" className="mb-2 text-sm font-medium text-gray-900">
            Reason
          </label>
          <input
            type="text"
            id="reason"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Reason"
            value={reason}
            onChange={handleReasonChange}
          />

          <label htmlFor="start" className="mb-2 text-sm font-medium text-gray-900">
            Start Date
          </label>
          <input
            type="date"
            id="start"
            className="p-2 border border-gray-300 rounded-lg"
            value={startDate}
            onChange={handleStartDateChange}
          />

          <label htmlFor="end" className="mb-2 text-sm font-medium text-gray-900">
            End Date
          </label>
          <input
            type="date"
            id="end"
            className="p-2 border border-gray-300 rounded-lg"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <RequestConge reason={reason} startDate={startDate} endDate={endDate} />
        <div><DisplayCongeStatus /></div>
        <div><SoldeCongeApi /></div>
      </div>

      
    </div>
  );
};

export default User;
