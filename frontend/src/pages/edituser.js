import React, { useEffect, useState } from 'react';
import Euser from '../api/Euser';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CreateUser = (props) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const { username } = useParams();
    const { keycloak, initialized } = useKeycloak();
    const [role, setRole] = useState('');
    const [cRole, setCrole] = useState('');
    const HandleFirstname = (event) => {
        setFirstName(event.target.value);
    };

    const HandleLastName = (event) => {
        setLastName(event.target.value);
    };

    const HandleEmail = (event) => {
        setEmail(event.target.value);
    };

    const HandleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const HandleCrole = (role) => {
        if (role === null){
            setCrole("No Roles Set");
        }
        else{setCrole(role);}
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                if (initialized && keycloak.token) {
                    const response = await axios.get(`http://localhost:8088/api/v1/keycloak/get-user/${username}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${keycloak.token}`,
                        },
                    });
                    console.log(response.data);
                    setData(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setCrole(response.data.clientRoles);
                }
            } catch (error) {
                setError(error);
            }
        };
        getUser();
    }, [initialized, keycloak, username]);

    return (
        <div>
            <section className="py-10 my-auto dark:bg-gray-900">
                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div>
                            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-kanit mb-2 dark:text-white">
                                Edit User
                            </h1>
                            <form>
                            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full  mt-6">
                                        <label className="mb-2 dark:text-gray-300">UserName</label>
                                        <input
                                            type="text"
                                            value={username}
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="First Name"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full mb-4 mt-6">
                                        <label className="mb-2 dark:text-gray-300">First Name</label>
                                        <input
                                            type="text"
                                            value={firstname}
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="First Name"
                                            onChange={HandleFirstname}
                                        />
                                    </div>

                                    <div className="w-full mb-4 lg:mt-6">
                                        <label className="dark:text-gray-300">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastname}
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="Last Name"
                                            onChange={HandleLastName}
                                        />
                                    </div>
                                </div>

                                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                                    <div className="w-full">
                                        <label className="dark:text-gray-300">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder="you@example.com"
                                            onChange={HandleEmail}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="dark:text-gray-300">Current Role</label>
                                        <input
                                            type="text"
                                            value={cRole}
                                            className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col w-full mt-6">
                                    <label className="mb-2 dark:text-gray-300">Select Role</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center dark:text-gray-300">
                                            <input
                                                type="radio"
                                                name="Roles"
                                                value="ADMIN"
                                                checked={role === 'ADMIN'}
                                                onChange={HandleRoleChange}
                                                className="mr-2"
                                            />
                                            ADMIN
                                        </label>
                                        <label className="flex items-center dark:text-gray-300">
                                            <input
                                                type="radio"
                                                name="Roles"
                                                value="USER"
                                                checked={role === 'USER'}
                                                onChange={HandleRoleChange}
                                                className="mr-2"
                                            />
                                            USER
                                        </label>
                                    </div>
                                </div>

                                <Euser username = {username} lastname={lastname} firstname={firstname} email={email} role={role} />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateUser;
