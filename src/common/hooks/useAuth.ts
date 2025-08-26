import { useKeycloak } from '@/common/contexts/KeycloakContext';

export const useAuth = () => {
    const { authenticated, loading, user } = useKeycloak();
    
    return {
        isAuthenticated: authenticated,
        isLoading: loading,
        user,
        hasRole: (role: string) => user?.roles?.includes(role) || false,
        hasAnyRole: (roles: string[]) => roles.some(role => user?.roles?.includes(role)) || false,
    };
};