import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      access_token: string;
      expires_in: number;
      refresh_expires_in: number;
      token_type: string;
      session_state: string;
      scope: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    session_state: string;
    scope: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    session_state: string;
    scope: string;
  }
}
