import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { User, AtSign, Edit, Info } from 'lucide-react'; 
import usedefault from '../assests/User/userdefault.png';

const Profile = () => {
  const { keycloak } = useKeycloak();
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [preferred_username, setPreferred_username] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      if (keycloak?.token) {
        const response = await fetch('http://localhost:9090/realms/Employees-Manager/protocol/openid-connect/userinfo', {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setUsername(userInfo.sub);
        setPreferred_username(userInfo.preferred_username);
        setFirstName(userInfo.given_name);
        setLastName(userInfo.family_name);
        setEmail(userInfo.email);
      }
    };
    getUserInfo();
  }, [keycloak?.token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative flex flex-col p-8 w-full max-w-lg rounded-xl shadow-xl bg-white dark:bg-gray-800">
        <img
          src={usedefault}
          alt="User Default"
          className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-teal-500"
        />
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-teal-600 mb-6 dark:text-teal-400'>Profile</h1>
        </div>
        <div className='space-y-6'>
          {/* User Info */}
          <div className='flex items-center space-x-4'>
            <User className="w-6 h-6 text-teal-500" />
            <div className='w-full'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>ID</label>
              <input
                type="text"
                value={username}
                className="h-12 w-full border-2 border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 px-4"
                readOnly
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <Edit className="w-6 h-6 text-teal-500" />
            <div className='w-full'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Username</label>
              <input
                type="text"
                value={preferred_username}
                className="h-12 w-full border-2 border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 px-4"
                readOnly
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <Info className="w-6 h-6 text-teal-500" />
            <div className='w-full'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>First Name</label>
              <input
                type="text"
                value={firstName}
                className="h-12 w-full border-2 border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 px-4"
                readOnly
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <Info className="w-6 h-6 text-teal-500" />
            <div className='w-full'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Last Name</label>
              <input
                type="text"
                value={lastName}
                className="h-12 w-full border-2 border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 px-4"
                readOnly
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <AtSign className="w-6 h-6 text-teal-500" />
            <div className='w-full'>
              <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>Email</label>
              <input
                type="text"
                value={email}
                className="h-12 w-full border-2 border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200 px-4"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
