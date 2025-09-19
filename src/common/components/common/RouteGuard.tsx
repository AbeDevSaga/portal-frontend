'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/common/hooks/useAuth';

interface RouteGuardProps {
    children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        
        if (!isAuthenticated || !user) {
            router.replace('/');
        }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return null;
    }

    return <>{children}</>;
};

export default RouteGuard;
