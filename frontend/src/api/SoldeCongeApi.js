import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

const SoldeCongeApi = () => {
  const [days, setDays] = useState(0);
  const [error, setError] = useState(null);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const fetchDays = async () => {
      try {
        if (initialized && keycloak.token) {
          const response = await axios.get('http://localhost:8088/api/v1/conge/soldeconge', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${keycloak.token}`,
            },
          });
          setDays(response.data); 
        }
      } catch (error) {
        console.error('Error fetching days:', error);
        setError(error);
      }
    };

    fetchDays();
  }, [initialized, keycloak.token]);

  return (
    <div>
      {error ? <div>Error: {error.message}</div> : <div>Sole Conge : {days}</div>}
    </div>
  );
};

export default SoldeCongeApi;
