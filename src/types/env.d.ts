declare namespace NodeJS {
  interface ProcessEnv {
    KEYCLOAK_URL: string;
    KEYCLOAK_REALM: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
