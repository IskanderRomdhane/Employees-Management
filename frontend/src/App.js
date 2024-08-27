import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import User from './pages/user';
import Root from './pages/root';
import Admin from './pages/admin';
import Unauthorized from './pages/unauthorazied';
import PrivateRoute from './Components/PrivateRoute';
import keycloak from './Config/keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import axios from 'axios';
function App() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: 'check-sso' }}
    >
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Root />} />
          
          {/* Protected Routes */}
          <Route path='/user' element={<PrivateRoute component={User} allowedRoles={['USER']} />} />
          <Route path='/admin' element={<PrivateRoute component={Admin} allowedRoles={['ADMIN']} />} />
          {/* Unauthorized Route */}
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
