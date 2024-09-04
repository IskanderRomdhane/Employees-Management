import React from 'react'
import DisplayAllConges from '../api/DispalyAllConges'; 

const Conges = () => {
  return (
    <div><section className="bg-white rounded-lg shadow-md border border-gray-200 p-6 w-full">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">All Conges</h2>
    <div className="overflow-x-auto">
      <table className="mx-auto w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
        <thead className="bg-gray-900 ">
          <tr className="text-white text-left">
            <th className="font-semibold text-sm uppercase  px-4 py-2">Start Date</th>
            <th className="font-semibold text-sm uppercase  px-4 py-2">End Date</th>
            <th className="font-semibold text-sm uppercase  px-4 py-2">Reason</th>
            <th className="font-semibold text-sm uppercase  px-4 py-2">State</th>
            <th className="font-semibold text-sm uppercase  px-4 py-2">Username</th>
            <th className="font-semibold text-sm uppercase px-4 py-2">Actions</th>
          </tr>
        </thead>
        <DisplayAllConges />
      </table>
    </div>
  </section></div>
  )
}

export default Conges