import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { api } from '../Config/axiosRequestInterceptor'; // Adjust path as needed

const RequestConge = (props) => {
  const { keycloak, initialized } = useKeycloak();
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const requestConge = async () => {
    try {
      const data = {
        endDate: props.endDate,
        startDate: props.startDate,
        reason: props.reason,
      };

      //if (data.end_date > data.start_date) {
        if (initialized && keycloak.token) {
          const response = await api.post(
            '/conge/request-conge',
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${keycloak.token}`,
              },
            }
          );

          setResult(response.data);
          console.log(response.data);
        } else {
          setError('User is not authenticated');
        }
      /*} else {
        setError('Start date is later than end date');
      }*/
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <button
        className='flex items-center justify-center rounded-full bg-red-500 text-white px-4 py-1 text-sm'
        onClick={requestConge}
      >
        Request Conge
      </button>
      {result && <div>Conge requested successfully: {JSON.stringify(result)}</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
};

export default RequestConge;
