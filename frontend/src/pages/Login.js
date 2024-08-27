import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      if (!initialized) {
        return; // Keycloak is not initialized yet
      }

      try {
        if (keycloak.authenticated) {
          localStorage.setItem('authToken', keycloak.token);

          const roles = keycloak.tokenParsed?.realm_access?.roles || [];
          if (roles.includes('ADMIN')) {
            window.location.href = '/admin';
          } else if (roles.includes('USER')) {
            window.location.href = '/user';
          } else {
            window.location.href = '/unauthorized'; // Redirect if no roles match
          }
        } else {
          keycloak.login(); // Redirect to login if not authenticated
        }
      } catch (err) {}
    };

    handleLogin();
  }, [keycloak, initialized]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return null;
};

export default Login;
