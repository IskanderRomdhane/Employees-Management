import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import User from './pages/user';
import Root from './pages/root/root';
import Admin from './pages/admin';
import Unauthorized from './pages/unauthorazied';
import PrivateRoute from './Components/PrivateRoute';
import keycloak from './Config/keycloak';  // Ensure keycloak is correctly imported
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import EditUser from './pages/edituser';
import CreateUser from './pages/createUser';
import Users from './pages/users';
import Sidebar from './Components/Sidebar';
import Conges from './pages/Conges';
import Profile from './pages/Profile';
import UserNavbar from './Components/UserNavbar';
import Sprofile from './pages/SeditProfile';
function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { keycloak } = useKeycloak();

  // Check if the user has the ADMIN role or USER role
  const isAdmin = keycloak.tokenParsed?.resource_access?.emp.roles.includes('ADMIN');
  const isUser = keycloak.tokenParsed?.resource_access?.emp.roles.includes('USER');
  return (
    
    <div className="">
      {(isAdmin || isUser) && (
        <UserNavbar />
      )}
      <div className="flex mt-8">
      {isAdmin && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}
      
      <div className={`flex-grow ${isAdmin ? (isSidebarOpen ? 'ml-[320px] mr-[10px]' : 'ml-[80px] mr-[20px]') : 'ml-[0] mr-[0]'}`}>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Root />} />
          <Route path='/profile' element={<PrivateRoute component={Profile} allowedRoles={['ADMIN', 'USER']} />} />
          <Route path='/conges' element={<PrivateRoute component={Conges} allowedRoles={['ADMIN']} />} />
          <Route path='/users' element={<PrivateRoute component={Users} allowedRoles={['ADMIN']} />} />
          <Route path='/editprofile/:username' element={<PrivateRoute component={EditUser} allowedRoles={['ADMIN']} />} />
          <Route path='/seditprofile/:username' element={<PrivateRoute component={Sprofile} allowedRoles={['USER', 'ADMIN']} />} />
          <Route path='/createuser' element={<PrivateRoute component={CreateUser} allowedRoles={['ADMIN']} />} />
          <Route path='/user' element={<PrivateRoute component={User} allowedRoles={['USER']} />} />
          <Route path='/admin' element={<PrivateRoute component={Admin} allowedRoles={['ADMIN']} />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'check-sso' }}>
      <Router>
        <AppContent />
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
