import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import userdefault from '../assests/User/userdefault.png'
import GetRoles from './GetRoles';
const DisplayAllUser = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

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
    }, [initialized, keycloak.token]);

    const handleEditClick = (username) => {
        navigate(`/editprofile/${username}`);
    };

    return (
        <tbody class="divide-y divide-gray-200">
            {error ? (
                <tr>
                    <td colSpan="6">Error: {error}</td>
                </tr>
            ) : (
                user.map((key) => (                

                    <tr key={key.username}>
                        <td class="px-6 py-4">
                            <div class="flex items-center space-x-3">
                                <div class="inline-flex w-10 h-10"> <img class='w-10 h-10 object-cover rounded-full' alt='User avatar' src={userdefault}/> </div>
                                <div>
                                    <p> {key.fullName} </p>
                                    <p class="text-gray-500 text-sm font-semibold tracking-wide"> {key.email} </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p class="text-gray-500 text-sm font-semibold tracking-wide"> <GetRoles userid = {key.username}/></p>
                        </td>
                        <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> Active </span> </td>
                        <td class="px-6 py-4 text-center"> {key.soldeConge} </td>
                        <td class="px-6 py-4 text-center"> <a onClick={() => handleEditClick(key.username)} class="text-purple-800 hover:underline">Edit</a> </td>
                    </tr>
                ))
            )}
        </tbody>
    );
};

export default DisplayAllUser;
