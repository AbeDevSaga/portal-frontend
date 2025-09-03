'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import keycloak from '@/lib/keycloak';

interface KeycloakContextType {
    keycloak: typeof keycloak;
    authenticated: boolean;
    loading: boolean;
    user: any;
    login: () => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
}

const KeycloakContext = createContext<KeycloakContextType | undefined>(undefined);

export const useKeycloak = () => {
    const context = useContext(KeycloakContext);
    if (context === undefined) {
        throw new Error('useKeycloak must be used within a KeycloakProvider');
    }
    return context;
};

interface KeycloakProviderProps {
    children: ReactNode;
}

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                    enableLogging: true, // Enable logging for debugging
                });

                if (authenticated) {
                    setAuthenticated(true);
                    setUser(extractUserInfo(keycloak.tokenParsed));
                    
                    // Set up token refresh
                    keycloak.onTokenExpired = () => {
                        refreshToken();
                    };
                }
            } catch (error) {
                console.error('Failed to initialize Keycloak:', error);
            } finally {
                setLoading(false);
            }
        };

        initKeycloak();
    }, []);

    const extractUserInfo = (tokenParsed: any) => {
        if (!tokenParsed) return null;
        
        return {
            id: tokenParsed.sub,
            username: tokenParsed.preferred_username,
            email: tokenParsed.email,
            firstName: tokenParsed.given_name,
            lastName: tokenParsed.family_name,
            roles: tokenParsed.resource_access?.['crrsa-service']?.roles || [],
            printingZone: tokenParsed.printing_zone,
            accessToken: keycloak.token,
            refreshToken: keycloak.refreshToken,
        };
    };

    const login = () => {
        // Use redirect flow instead of popup to avoid iframe issues
        keycloak.login({
            redirectUri: window.location.origin + '/application',
            prompt: 'login', // Force login prompt
        });
    };

    const logout = () => {
        keycloak.logout({
            redirectUri: window.location.origin + '/',
        });
    };

    const refreshToken = async () => {
        try {
            await keycloak.updateToken(70);
            setUser(extractUserInfo(keycloak.tokenParsed));
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
        }
    };

    const value: KeycloakContextType = {
        keycloak,
        authenticated,
        loading,
        user,
        login,
        logout,
        refreshToken,
    };

    return (
        <KeycloakContext.Provider value={value}>
            {children}
        </KeycloakContext.Provider>
    );
}; 