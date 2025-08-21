'use client'
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useSession } from 'next-auth/react';
import { ALL_MENU_ITEMS } from '@/utils/constants/MenuItems';
import LoadingComponent from './LoadingComponent';

type RouteGuardProps = {
    children: ReactNode;
};
interface GuardValue {
    userRole: string;
    userName: string;
    userPrintingZone: string;
}

// Create the context to pass certain values to the child components wrapped by this RouteGuard component.
const GuardContext = createContext<GuardValue | null>(null);
// Hook to access the context value
export const useGuard = () => useContext(GuardContext);

const RouteGuard = ({ children }: RouteGuardProps) => {
    const { data: session, status: sessionStatus } = useSession();
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const [guardValue, setGuardValue] = useState<GuardValue | null>(null);

    useEffect(() => {
        if (sessionStatus === 'loading') return;

        if (!session) {
            router.replace('/login');
            return;
        }

        const decodedToken: any = jwt.decode(session.user.access_token);
        console.log("decoded token", decodedToken)
        const userRoles = decodedToken?.resource_access["crrsa-service"]?.roles;
        const userRole = userRoles ? userRoles[0] : null;
        const userName = decodedToken?.preferred_username;
        const userPrintingZone = decodedToken?.printing_zone;
        const userInfo = {
            userRole: userRole,
            userName: userName,
            userPrintingZone: userPrintingZone
        }
        setGuardValue(userInfo)
        const currentPath = window.location.pathname;


        const searchMenu = (menuItem: any, path: string) => {
            if (menuItem.path === path) {
                return menuItem;
            }

            if (menuItem.children && menuItem.children.length > 0) {
                for (const child of menuItem.children) {
                    const found: any = searchMenu(child, path);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        };

        const findMenu = (path: string): any | null => {
            for (const menu of ALL_MENU_ITEMS) {
                const matchedMenu = searchMenu(menu, path);
                if (matchedMenu) {
                    return matchedMenu;
                }
            }

            return null;
        };

        const matchedMenu = findMenu(currentPath);

        if (matchedMenu && matchedMenu.roles.includes(userRole)) {
            setAuthorized(true);
        } else {
            router.replace('/not-authorized');
        }
    }, [session, sessionStatus, router]);

    if (sessionStatus === 'loading' || !authorized) {
        return <LoadingComponent />
    }

    return (
        <GuardContext.Provider value={guardValue}>
            {children}
        </GuardContext.Provider>
    );
};

export default RouteGuard;
