import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, allowedRoles }) => {
  const { keycloak, initialized } = useKeycloak();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (initialized) {
        if (!keycloak.authenticated) {
          keycloak.login();
        } else {
          const roles = keycloak.tokenParsed?.realm_access?.roles || [];
          const isAuthorized = allowedRoles.some(role => roles.includes(role));
          setIsAuthorized(isAuthorized);
        }
      }
    };

    checkAuth();
  }, [keycloak, initialized]);

  if (isAuthorized === null) {
    // While checking auth
    return <div>Loading...</div>;
  }

  if (isAuthorized) {
    return <Component />;
  } else {
    return <Navigate to='/unauthorized' />;
  }
};

export default PrivateRoute;
