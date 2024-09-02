import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

const DisplayAllUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    const displayUser = async () => {
      try {
        if (initialized && keycloak.token) {
          const response = await axios.get('http://localhost:8088/api/v1/conge/display-all-user', {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          });
          console.log(response.data);
          setUser(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    displayUser();
  }, [initialized, keycloak.token , ]);
  const handleDelete = async (userId) => {
    try {
        const response = await axios.delete(
            `http://localhost:8088/api/v1/keycloak/delete-user/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
};

  return (
    <tbody>
      {error ? (
        <tr>
          <td colSpan="6">Error: {error}</td>
        </tr>
      ) : (
        user.map((key) => (
          <tr key={key.congeId}>
            <td className="border border-gray-400 px-4 py-2 flex justify-between items-center">{key.email}<button className="ml-auto button_minus" onClick={() => handleDelete(key.username)}></button></td>
            <td   className="border border-gray-400 px-4 py-2">{key.firstname}</td>
            <td  className="border border-gray-400 px-4 py-2">{key.lastname}</td>
            <td  className="border border-gray-400 px-4 py-2">{key.fullName}</td>
            <td  className="border border-gray-400 px-4 py-2">{key.soldeConge}</td>
            <td  className="border border-gray-400 px-4 py-2">{key.congeId}</td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default DisplayAllUser;
