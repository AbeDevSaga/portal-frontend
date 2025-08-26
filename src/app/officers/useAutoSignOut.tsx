import { useEffect } from "react";
import { useKeycloak } from "@/common/contexts/KeycloakContext";

const useAutoSignOut = (session: any) => {
    const { logout } = useKeycloak();

    useEffect(() => {
        if (session?.expires) {
            const expirationTime = new Date(session.expires).getTime();
            const currentTime = Date.now();
            const timeUntilExpiration = expirationTime - currentTime;

            if (timeUntilExpiration > 0) {
                const timer = setTimeout(() => {
                    logout();
                }, timeUntilExpiration);

                return () => clearTimeout(timer);
            } else {
                // Session already expired
                logout();
            }
        }
    }, [session, logout]);
};

export default useAutoSignOut;
