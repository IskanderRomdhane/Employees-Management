import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

const DisplayCongeStatus = () => {
  const [status, setStatus] = useState(null);
  const { keycloak, initialized } = useKeycloak(); // Correctly invoking useKeycloak
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
        if (initialized && keycloak.token) {
          const response = await axios.get('http://localhost:8088/api/v1/conge/display-conge-status', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${keycloak.token}`,
            },
          });
          console.log(response.data);
          setStatus(response.data); 
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getStatus();
  }, [initialized, keycloak.token]);

  return (
    <div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <p>Status conge: {status}</p>
      )}
    </div>
  );
};

export default DisplayCongeStatus;
