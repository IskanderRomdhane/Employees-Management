import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-col p-6 w-full max-w-[900px] rounded shadow-slate-300 bg-white dark:bg-gray-800">
        <img
          src={usedefault}
          alt="User Default"
          className="absolute top-0 right-0 m-4 w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <div className='pb-6 mt-16'>
        <h1 className='font-kanit text-lg pb-9'>Profile</h1>
          <label className='font-kanit text-sm inline-block w-24'>ID <span className='text-red-600'>*</span> </label>
          <input
            type="text"
            value={username}
            className="ml-12 h-10 w-[400px] border-2 bg-gray-200 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-sm"
            placeholder=""
            readOnly
          />
        </div>

        <div className='py-10'>
          <h1 className='font-kanit text-lg pb-9'>General</h1>

          <div className='pb-6'>
            <label className='font-kanit text-sm inline-block w-24'>Username <span className='text-red-600'>*</span> </label>
            <input
              type="text"
              value={preferred_username}
              className="ml-12 h-10 w-[400px]  border-2 bg-gray-200 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-sm"
              placeholder=""
              readOnly
            />
          </div>

          <div className='pb-6'>
            <label className='font-kanit text-sm inline-block w-24'>First Name <span className='text-red-600'>*</span> </label>
            <input
              type="text"
              value={firstName}
              className="ml-12 h-10 w-[400px]  border-2 bg-gray-200 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-sm"
              placeholder=""
              readOnly
            />
          </div>

          <div className='pb-6'>
            <label className='font-kanit text-sm inline-block w-24'>Last Name <span className='text-red-600'>*</span> </label>
            <input
              type="text"
              value={lastName}
              className="ml-12 h-10 w-[400px]  border-2 bg-gray-200 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-sm"
              placeholder=""
              readOnly
            />
          </div>

          <div className='pb-6'>
            <label className='font-kanit text-sm inline-block w-24'>Email <span className='text-red-600'>*</span> </label>
            <input
              type="text"
              value={email}
              className="ml-12 h-10 w-[400px]  border-2 bg-gray-200 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 rounded-sm"
              placeholder=""
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
