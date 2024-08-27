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
        
          //const result = response.data.map ((conge) => );
          
        }
      } catch (error) {
        console.error('Error fetching conges:', error);
        setError(error.message);
      }
    };

    displayConges();
  }, [initialized, keycloak.token]);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {conges.map((conge, index) => (
            <li key={index}>{JSON.stringify(conge)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllConges;
