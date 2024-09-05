import React, { useState, useEffect } from 'react';
import userdefault from '../assests/User/userdefault.png';
import { ChevronLeft, ChevronRight, Menu, Home, UserCircle, Settings, Users, Calendar, LogOut } from 'lucide-react'; // Import the icons
import { useKeycloak } from '@react-keycloak/web';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { keycloak } = useKeycloak();
  const [username, setUsername] = useState("");
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
        setEmail(userInfo.email);
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
        window.location.href = logoutUrl;
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full transition-transform duration-300 ease-in-out bg-gray-900 border-r border-gray-700 z-40 ${
          isOpen ? 'w-80 translate-x-0' : 'w-16 -translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && userInfo && (
            <div className="flex items-center space-x-4">
              <img
                className="w-12 h-12 rounded-full border-2 border-teal-500"
                src={userdefault}
                alt="avatar"
              />
              <div className='text-white'>
                <span className="block text-lg font-semibold">{userInfo.given_name} {userInfo.family_name}</span>
                <span className="block text-sm text-gray-400">{email}</span>
              </div>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          <a
            href="/admin"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <Home className="w-6 h-6 mr-3" />
            {isOpen && 'Home'}
          </a>
          <a
            href="/profile"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <UserCircle className="w-6 h-6 mr-3" />
            {isOpen && 'Profile'}
          </a>
          <a
            href={`/seditprofile/${username}`}
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <Settings className="w-6 h-6 mr-3" />
            {isOpen && 'Settings'}
          </a>
          <div className="px-4 py-2 text-gray-500 font-semibold uppercase text-xs">
            Applications
          </div>
          <a
            href="/users"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <Users className="w-6 h-6 mr-3" />
            {isOpen && 'Users'}
          </a>
          <a
            href="/conges"
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <Calendar className="w-6 h-6 mr-3" />
            {isOpen && 'Conges'}
          </a>
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-white hover:bg-gray-700 rounded-md transition-colors"
          >
            <LogOut className="w-6 h-6 mr-3" />
            {isOpen && 'Log Out'}
          </a>
        </nav>

        {/* Email Section */}
        {isOpen && userInfo && (
          <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gray-800 border-t border-gray-700 text-white">
            <span className="text-sm">Email:</span>
            <div className="text-sm font-medium">{email}</div>
          </div>
        )}
      </aside>

      {/* Small Side Menu */}
      <div className={`fixed top-0 left-0 h-full ${isOpen ? 'hidden' : 'w-16'} bg-gray-900 text-gray-400 flex flex-col items-center py-4 z-50 transition-all duration-300 ease-in-out`}>
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center mt-4 border-t border-gray-700">
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href="/admin">
            <Home className="w-6 h-6" />
          </a>
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href="/profile">
            <UserCircle className="w-6 h-6" />
          </a>
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href={`/seditprofile/${username}`}>
            <Settings className="w-6 h-6" />
          </a>
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href="/users">
            <Users className="w-6 h-6" />
          </a>
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href="/conges">
            <Calendar className="w-6 h-6" />
          </a>
          <a className="flex items-center justify-center w-12 h-12 mb-2 rounded-full hover:bg-gray-700 hover:text-gray-300" href="#" onClick={handleLogout}>
            <LogOut className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
