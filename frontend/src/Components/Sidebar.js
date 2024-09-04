import React, { useState, useEffect } from 'react';
import userdefault from '../assests/User/userdefault.png';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'; // Import the icons
import { useKeycloak } from '@react-keycloak/web';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { keycloak, initialized } = useKeycloak();
    const[username , setUsername] = useState("");
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
        console.log(userInfo);
        setUsername(userInfo.sub);
      }
    };
    getUserInfo();
  }, [keycloak?.token]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (keycloak) {
      const logoutUrl = "http://localhost:9090/realms/Employees-Manager/protocol/openid-connect/logout";
      keycloak.logout({
        redirectUri: window.location.origin
      }).then(() => {
        keycloak.clearToken();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = logoutUrl;  // Redirect to the Keycloak logout URL
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out bg-gray-900 border-r border-r-dashed border-r-neutral-200 z-40 ${
          isOpen ? 'w-[300px] translate-x-0' : 'w-[80px] -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5">
          {isOpen && userInfo && (
            <div className="flex items-center space-x-4">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={userdefault}
                alt="avatar"
              />
              <div className='text-white'>
                <a
                  href="#"
                  className="text-[1.075rem] font-medium text-secondary-inverse"
                >
                  {userInfo.given_name} 
                </a>
                <span className="block text-[0.85rem] text-secondary-dark">
                {userInfo.family_name}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="flex flex-col mt-4 px-2">
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-[1.15rem] text-white hover:text-dark rounded-md transition-colors"
          >
            {isOpen && 'Profile'}
          </a>
          <a
            href={`/editprofile/${username}`}
            className="flex items-center px-4 py-2 text-[1.15rem] text-white hover:text-dark rounded-md transition-colors"
          >
            {isOpen && 'Settings'}
          </a>
          <div className="px-4 py-2 text-secondary-dark font-semibold uppercase text-cyan-200">
            Applications
          </div>
          <a
            href="/users"
            className="flex items-center px-4 py-2 text-[1.15rem] text-white hover:text-dark rounded-md transition-colors"
          >
            {isOpen && 'Users'}
          </a>
          <a
            href="/conges"
            className="flex items-center px-4 py-2 text-[1.15rem] text-white hover:text-dark rounded-md transition-colors"
          >
            {isOpen && 'Conges'}
          </a>
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-[1.15rem] text-white hover:text-dark rounded-md transition-colors"
          >
            {isOpen && 'LogOut'}
          </a>
        </nav>
      </aside>

      {/* Small Side Menu */}
      {!isOpen && (
        <div className="fixed top-0 left-0 h-full w-16 bg-gray-900 text-gray-400 flex flex-col items-center py-4 z-50">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-12 h-12 mb-4 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center mt-4 border-t border-gray-700">
            <a className="flex items-center justify-center w-12 h-12 mb-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </a>
            <a className="flex items-center justify-center w-12 h-12 mb-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </a>
            <a className="flex items-center justify-center w-12 h-12 mb-2 text-gray-200 bg-gray-700 rounded" href="#">
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a className="flex items-center justify-center w-12 h-12 mb-2 rounded hover:bg-gray-700 hover:text-gray-300" href="#">
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h2" />
                 </svg>
               </a>
             </div>
           </div>
         )}
       </div>
     );
   };

   export default Sidebar;

