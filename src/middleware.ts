import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
    // Authentication is handled by client-side RouteGuard components
    // Login is handled by Keycloak directly via the login() function
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};