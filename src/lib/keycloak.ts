import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'https://crrsa-auth.risertechservices.com',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'crrsa-realm',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'crrsa-client',
};

// Initialize Keycloak instance
const keycloak = new Keycloak(keycloakConfig);

export default keycloak; 