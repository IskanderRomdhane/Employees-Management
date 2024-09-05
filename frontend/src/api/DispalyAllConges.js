import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import ChangeCongeStatus from './ChangeCongeStatus';
const DisplayAllConges = () => {
  const { keycloak, initialized } = useKeycloak();
  const [conges, setConges] = useState([]); // Initialize with an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const displayConges = async () => {
      try {
        if (initialized && keycloak.token) {
          const response = await axios.get('http://localhost:8088/api/v1/conge/display-all-conges', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${keycloak.token}`,
            },
          });
          console.log(response.data); 
          setConges(response.data);
        }
      } catch (error) {
        console.error('Error fetching conges:', error);
        setError(error.message);
      }
    };

    displayConges();
  }, [initialized, keycloak.token]);

  const handleCongeChange = async (userId , state) =>  {
    try {
      const requestData = {
          state: state,
          userId: userId
      };

      if (initialized && keycloak.token) {
          const response = await axios.put('http://localhost:8088/api/v1/conge/setStatus',
              requestData,
              {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${keycloak.token}`,
                  }
              }
          );
          console.log('Response data:', response.data);
          //setData(response.data);
      }
  } catch (error) {
      console.error('Error updating conge status:', error.response ? error.response.data : error.message);
      setError(error);
  }
  }
  return (
    <tbody>
      {error ? (
        <tr>
          <td colSpan="6">Error: {error}</td>
        </tr>
      ) : (
        conges.map((conge) => (
          <tr key={conge.id}>
            <td className="  px-4 py-2">{conge.startDate}</td>
            <td className=" px-4 py-2">{conge.endDate}</td>
            <td className=" text-gray-500 text-sm font-semibold tracking-wide px-4 py-2">{conge.reason}</td>
            <td className="  px-4 py-2">{conge.state ? <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> Accepted </span> : 
            (conge.state === false ? <span class="text-white text-sm w-1/3 pb-1 bg-red-600 font-semibold px-2 rounded-full"> Refused </span> : 
              <span class="text-white text-sm w-1/3 pb-1 bg-orange-600 font-semibold px-2 rounded-full"> In progress </span>
             )}</td>
            <td className="  px-4 py-2">{conge.username}</td>
            <td className=" px-4 py-2">{
              (conge.state === null ? <>
              <button onClick={() => handleCongeChange(conge.username,true)} className='rounded-lg bg-green-600 px-2 mr-2 text-white'>accept</button>
              <button onClick={() => handleCongeChange(conge.username,false)} className='rounded-lg bg-red-600 px-2'>refuse</button>
              
              </>
              : <div></div>)
              }</td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default DisplayAllConges;
