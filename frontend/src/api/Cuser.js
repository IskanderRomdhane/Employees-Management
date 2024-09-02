import axios from 'axios';
import React, { useState } from 'react'
import { useKeycloak } from '@react-keycloak/web';
const Cuser = (props) => {
    const [error , setError] = useState('');
    const [response , setResponse] = useState('');
    const {keycloak , initialized} = useKeycloak();
    const handleCreateUser = () => {
        if (props.password !== props.vpassword){
            setError("Password does not match")
        }
        else if(initialized && keycloak.authenticated) {
            
            setError("")
            try{
                const payload = {
                    username : props.username,
                    email : props.email,
                    firstName : props.firstname,
                    lastName: props.lastname,
                    enabled: true,
                    emailVerified: true,
                     credentials :[{
                    type: "password",
                    value: props.password,
                    temporary: false
                }],
                attributes: {},
                requiredActions: [],
                clientRoles: {
                    emp : [
                        "USER"
                    ]
                }
            }

                const response = axios.post('http://localhost:8088/api/v1/keycloak/create-user',
                    payload,
                    {
                        headers : {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${keycloak.token}`,
                        }
                    }
                )
                setResponse(response.data);
                console.log(response.data);

            }catch(error){setError(error);}
        }

    }   

  return (
    <div>

    <div class="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                        <button type="submit" class="w-full p-4"
                        onClick={handleCreateUser}
                        >Submit</button>
    </div>

    <div>
        {error ? <div> <h3>{error}</h3> </div> : <div> <h3>{response}</h3> </div>}
    </div>

    </div>
  )
}

export default Cuser