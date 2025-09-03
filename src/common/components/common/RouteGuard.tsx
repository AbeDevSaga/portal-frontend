'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKeycloak } from '@/common/contexts/KeycloakContext';

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
    const { authenticated, loading, user } = useKeycloak();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;
        
        if (!authenticated || !user) {
            router.replace('/');
        }
    }, [authenticated, user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!authenticated || !user) {
        return null;
    }

    return <>{children}</>;
};

export default RouteGuard;
