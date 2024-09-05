import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';
import ReactLoading from "react-loading";

const PrivateRoute = ({ component: Component, allowedRoles }) => {
  const { keycloak, initialized } = useKeycloak();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    setIsAuthorized(null);
    const checkAuth = async () => {
      if (initialized) {
        if (!keycloak.authenticated) {
          keycloak.login();
        } else {
          const roles = keycloak.tokenParsed?.resource_access?.emp.roles || [];
          console.log(roles);
          const isAuthorized = allowedRoles.some(role => roles.includes(role));
          setIsAuthorized(isAuthorized);
        }
      }
    };

    checkAuth();
  }, [keycloak, initialized]);

  if (isAuthorized === null) {
    // While checking auth
    return (<div className="flex justify-center items-center min-h-screen">
      <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
    </div>);
  }

  if (isAuthorized) {
    return <Component />;
  } else {
    return <Navigate to='/unauthorized' />;
  }
};

export default PrivateRoute;
