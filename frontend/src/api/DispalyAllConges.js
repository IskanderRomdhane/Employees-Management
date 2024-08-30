import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

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

  return (
    <tbody>
      {error ? (
        <tr>
          <td colSpan="6">Error: {error}</td>
        </tr>
      ) : (
        conges.map((conge) => (
          <tr key={conge.id}>
            <td className="border border-gray-400 px-4 py-2">{conge.startDate}</td>
            <td className="border border-gray-400 px-4 py-2">{conge.endDate}</td>
            <td className="border border-gray-400 px-4 py-2">{conge.reason}</td>
            <td className="border border-gray-400 px-4 py-2">{conge.state}</td>
            <td className="border border-gray-400 px-4 py-2">{conge.username}</td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default DisplayAllConges;
