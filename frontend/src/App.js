import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import User from './pages/user';
import Root from './pages/root';
import Admin from './pages/admin';
import Unauthorized from './pages/unauthorazied';
import PrivateRoute from './Components/PrivateRoute';
import keycloak from './Config/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import EditUser from './pages/edituser';
import CreateUser from './pages/createUser';
import Users from './pages/users';
import Sidebar from './Components/Sidebar';
import Conges from './pages/Conges';
import Profile from './pages/Profile';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ onLoad: 'check-sso' }}>
      <Router>
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className={`flex-grow ${isSidebarOpen ? 'ml-[320px] mr-[10px]' : 'ml-[75px]'}`}>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Root />} />
              <Route path='/profile' element={<PrivateRoute component={Profile} allowedRoles={['ADMIN','USER']} />} />
              <Route path='/conges' element={<PrivateRoute component={Conges} allowedRoles={['ADMIN']} />} />
              <Route path='/users' element={<PrivateRoute component={Users} allowedRoles={['ADMIN']} />} />
              <Route path='/editprofile/:username' element={<PrivateRoute component={EditUser} allowedRoles={['USER', 'ADMIN']} />} />
              <Route path='/createuser' element={<PrivateRoute component={CreateUser} allowedRoles={['ADMIN']} />} />
              <Route path='/user' element={<PrivateRoute component={User} allowedRoles={['USER']} />} />
              <Route path='/admin' element={<PrivateRoute component={Admin} allowedRoles={['ADMIN']} />} />
              <Route path='/unauthorized' element={<Unauthorized />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
