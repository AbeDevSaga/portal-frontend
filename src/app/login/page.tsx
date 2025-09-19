"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        // Redirect to Keycloak login
        signIn("keycloak", { callbackUrl: "/application" });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#073954] mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to login...</p>
            </div>
        </div>
    );
}
