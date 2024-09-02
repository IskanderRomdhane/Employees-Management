import axios from 'axios';
import React, { useState } from 'react'
import { useKeycloak } from '@react-keycloak/web';
import { Await } from 'react-router-dom';

const Euser = (props) => {
    const [error , setError] = useState('');
    const [response , setResponse] = useState('');
    const {keycloak , initialized} = useKeycloak();
    const handleEditUser = async () => {
        if (initialized && keycloak.authenticated) {
            setError("");
            try {
                const payload = {
                    id: props.username,
                    email: props.email,
                    firstName: props.firstname,
                    lastName: props.lastname,
                    enabled: true,
                    emailVerified: true,
                    requiredActions: [],
                    clientRoles: {
                        emp : [props.role]
                    }
                };
                const response = await axios.put(`http://localhost:8088/api/v1/keycloak/update-user/${props.username}`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${keycloak.token}`,
                        }
                    }
                );
    
                setResponse(response.data);
                console.log(response.data);
    
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        }
    };
    

  return (
    <div>

    <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                        <button type="submit" class="w-full p-4"
                        onClick={handleEditUser}
                        >Submit</button>
    </div>

    <div>
        {error ? <div> <h3>{error}</h3> </div> : <div> <h3>{response}</h3> </div>}
    </div>

    </div>
  )
}

export default Euser;