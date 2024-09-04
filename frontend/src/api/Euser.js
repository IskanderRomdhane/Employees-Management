import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useKeycloak } from '@react-keycloak/web';

const Euser = (props) => {
    const [error , setError] = useState('');
    const [response , setResponse] = useState('');
    const { keycloak, initialized } = useKeycloak();

    const editRoles = async () => {
        try {
            if (keycloak.token && initialized) {
                const roleId = props.role === 'ADMIN'
                    ? "40c5a427-fcf6-4877-8fb2-95d78eaf041e"
                    : "468fe681-7d91-45f5-92f9-6ffe2fbd8797";

                const response = await axios.post(
                    `http://localhost:9090/admin/realms/Employees-Manager/users/${props.username}/role-mappings/clients/ef0964d4-e53f-4ee3-9c36-42d5ad6c2346`,
                    [
                        {
                            id: roleId,
                            name: props.role
                        }
                    ],
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${keycloak.token}`
                        }
                    }
                );
                console.log(response.data);
            }
        } catch (error) {
            console.error("Failed to change roles: ", error);
        }
    }

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
                };
                const response = await axios.put(
                    `http://localhost:8088/api/v1/keycloak/update-user/${props.username}`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${keycloak.token}`,
                        }
                    }
                );
                await editRoles();
                setResponse(response.data);

            } catch (error) {
                setError(error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div>
            <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4" onClick={handleEditUser}>
                    Submit
                </button>
            </div>

            <div>
                {error ? <div><h3>{error}</h3></div> : <div><h3>{response}</h3></div>}
            </div>
        </div>
    )
}

export default Euser;
