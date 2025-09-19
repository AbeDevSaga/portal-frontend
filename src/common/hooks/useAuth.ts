import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session, status, update } = useSession();
  
  // Handle token refresh errors
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      // Force a re-authentication
      signOut({ callbackUrl: "/login" });
    }
  }, [session?.error]);
  
  return {
    isAuthenticated: !!session && !session.error,
    isLoading: status === "loading",
    user: session?.user,
    hasRole: (role: string) => session?.user?.roles?.includes(role) || false,
    hasAnyRole: (roles: string[]) => roles.some(role => session?.user?.roles?.includes(role)) || false,
    login: () => signIn("keycloak", { callbackUrl: "/application" }),
    logout: () => signOut({ callbackUrl: "/" }),
    accessToken: session?.accessToken,
    error: session?.error,
    refreshSession: () => update(),
  };
};