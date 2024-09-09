import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './Config/keycloak';
import AppContent from './AppContent'; 

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
