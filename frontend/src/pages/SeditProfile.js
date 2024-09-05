import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { User, Mail, UserPlus, Info, Edit } from 'lucide-react';
import Euser from '../api/Euser';

const Sprofile = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const { username } = useParams();
    const { keycloak, initialized } = useKeycloak();
    const [cRole, setCrole] = useState('');

    const HandleFirstname = (event) => setFirstName(event.target.value);
    const HandleLastName = (event) => setLastName(event.target.value);
    const HandleEmail = (event) => setEmail(event.target.value);

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
                    setData(response.data);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);

                }
            } catch (error) {
                setError(error);
            }
        };

        const fetchRoles = async () => {
            try {
                if (initialized && keycloak.token) {
                    const response = await axios.get(
                        `http://localhost:9090/admin/realms/${keycloak.realm}/users/${username}/role-mappings/clients/ef0964d4-e53f-4ee3-9c36-42d5ad6c2346`,
                        {
                            headers: {
                                Authorization: `Bearer ${keycloak.token}`,
                            },
                        }
                    );
                    const rolesString = response.data.map(role => role.name).join(", ");
                    setCrole(rolesString);
                    console.log(rolesString);
                }
            } catch (error) {
                console.error("Failed to fetch roles:", error);
            }
        };

        fetchRoles();
        getUser();
    }, [initialized, keycloak, username]);

    return (
        <section className="flex justify-center items-center min-h-screen  dark:bg-gray-900">
        <div className="relative flex flex-col p-5 w-full max-w-4xl rounded-xl shadow-xl bg-white dark:bg-gray-800 mt-[-250px]">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-purple-600 dark:text-purple-400 flex justify-center items-center gap-2">
                    <Edit className="w-8 h-8" />
                    Edit Profile
                </h1>
            </div>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">ID</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
                            <span className="flex items-center px-4 border-r border-gray-300 dark:border-gray-600">
                                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <input
                                type="text"
                                value={username}
                                className="flex-1 p-4 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg"
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
                            <span className="flex items-center px-4 border-r border-gray-300 dark:border-gray-600">
                                <UserPlus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <input
                                type="text"
                                value={firstname}
                                className="flex-1 p-4 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg"
                                onChange={HandleFirstname}
                            />
                        </div>
                    </div>
    
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
                            <span className="flex items-center px-4 border-r border-gray-300 dark:border-gray-600">
                                <UserPlus className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <input
                                type="text"
                                value={lastname}
                                className="flex-1 p-4 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg"
                                onChange={HandleLastName}
                            />
                        </div>
                    </div>
    
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
                            <span className="flex items-center px-4 border-r border-gray-300 dark:border-gray-600">
                                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                className="flex-1 p-4 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg"
                                onChange={HandleEmail}
                                readOnly
                            />
                        </div>
                    </div>
    
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Current Role</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent">
                            <span className="flex items-center px-4 border-r border-gray-300 dark:border-gray-600">
                                <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </span>
                            <input
                                type="text"
                                value={cRole}
                                className="flex-1 p-4 bg-transparent text-gray-900 dark:text-gray-100 rounded-lg"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
    
                <div className="mt-6">
                    <Euser username={username} lastname={lastname} firstname={firstname} email={email} />
                </div>
            </form>
        </div>
    </section>
    

    
    );
};

export default Sprofile;
