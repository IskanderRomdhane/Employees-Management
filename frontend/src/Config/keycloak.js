import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090/',
  realm: 'Employees-Manager',
  clientId: 'emp',
});


export default keycloak;
