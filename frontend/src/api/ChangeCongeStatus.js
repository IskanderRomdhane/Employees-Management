import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';

const ChangeCongeStatus = (props) => { // Destructure props
    const { keycloak, initialized } = useKeycloak();
    const [error, setError] = useState(null);
    const [data, setData] = useState("");
    
    const submitState = async () => {
        try {
            const requestData = {
                state: props.state,
                userId: props.userid
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
                setData(response.data);
            }
        } catch (error) {
            console.error('Error updating conge status:', error.response ? error.response.data : error.message);
            setError(error);
        }
    }

    return (
        <div>
        <button 
            className='flex items-center justify-center rounded-full bg-red-500 text-white px-4 py-1 text-sm m-2' 
            onClick={submitState}
        >
            Submit
        </button>
        {error ? <div> Error : {error} </div> : <div><h3>{data}</h3> </div>}
        </div>
    )
}

export default ChangeCongeStatus;
