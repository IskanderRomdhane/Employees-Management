import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';

const GetRoles = (props) => {
    const [roles, setRoles] = useState([]);
    const { keycloak, initialized } = useKeycloak();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleRoles = async () => {
            if (keycloak.token && initialized) {
                try {
                    const response = await axios.get(
                        `http://localhost:9090/admin/realms/${keycloak.realm}/users/${props.userid}/role-mappings/clients/ef0964d4-e53f-4ee3-9c36-42d5ad6c2346`,
                        {
                            headers: {
                                Authorization: `Bearer ${keycloak.token}`,
                            },
                        }
                    );
                    setRoles(response.data);
                    console.log(response.data);
                } catch (error) {
                    setError(error);
                    console.log('Error:', error);
                }
            }
        };
        handleRoles();
    }, [initialized, keycloak.token, props.userid]);

    return (
        <div>
            {error ? (
                <p>Error: {error.message}</p>
            ) : (
                <p>{roles.map(role => role.name).join(', ')}</p>
            )}
        </div>
    );
};

export default GetRoles;
