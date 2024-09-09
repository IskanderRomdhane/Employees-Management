import React, { useState } from 'react';
import { BrowserRouter as Router, Route , Routes , useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Sidebar from './Components/Sidebar';
import UserNavbar from './Components/UserNavbar';
import Login from './pages/login';
import User from './pages/user';
import Root from './pages/root/root';
import Admin from './pages/admin';
import Unauthorized from './pages/unauthorazied';
import PrivateRoute from './Components/PrivateRoute';
import keycloak from './Config/keycloak'; 
import EditUser from './pages/edituser';
import CreateUser from './pages/createUser';
import Users from './pages/users';
import Conges from './pages/Conges';
import Profile from './pages/Profile';
import Sprofile from './pages/SeditProfile';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { keycloak } = useKeycloak();
  const location = useLocation();
  
  const showNavbar = !['/', '/unauthorized'].includes(location.pathname);
  const isAdmin = keycloak.tokenParsed?.resource_access?.emp.roles.includes('ADMIN');
  const isUser = keycloak.tokenParsed?.resource_access?.emp.roles.includes('USER');
  
  return (
    <div>
      {showNavbar && (isAdmin || isUser) && (
        <UserNavbar />
      )}
      <div className="flex mt-8">
        {showNavbar && isAdmin && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className={`flex-grow ${showNavbar ? (isAdmin ? (isSidebarOpen ? 'ml-[320px] mr-[10px]' : 'ml-[80px] mr-[20px]') : 'ml-[0] mr-[0]') : 'ml-[0] mr-[0]'}`}>
          <Routes>
            <Route path='/profile' element={<PrivateRoute component={Profile} allowedRoles={['ADMIN', 'USER']} />} />
            <Route path='/conges' element={<PrivateRoute component={Conges} allowedRoles={['ADMIN']} />} />
            <Route path='/users' element={<PrivateRoute component={Users} allowedRoles={['ADMIN']} />} />
            <Route path='/editprofile/:username' element={<PrivateRoute component={EditUser} allowedRoles={['ADMIN']} />} />
            <Route path='/seditprofile/:username' element={<PrivateRoute component={Sprofile} allowedRoles={['USER', 'ADMIN']} />} />
            <Route path='/createuser' element={<PrivateRoute component={CreateUser} allowedRoles={['ADMIN']} />} />
            <Route path='/user' element={<PrivateRoute component={User} allowedRoles={['USER']} />} />
            <Route path='/admin' element={<PrivateRoute component={Admin} allowedRoles={['ADMIN']} />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Root />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
