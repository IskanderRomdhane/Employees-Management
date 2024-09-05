import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      if (!initialized) {
        return;
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
            window.location.href = '/unauthorized'; 
          }
        } else {
          keycloak.login(); 
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
