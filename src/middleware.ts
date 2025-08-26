import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT = '/home';

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Redirect login attempts to home page since login is handled in navigation
    if (pathname === "/login") {
        return NextResponse.redirect(new URL(ROOT, req.url));
    }

    // Define protected routes that require authentication
    const PROTECTED_ROUTES = ["/officers"];
    
    // Check if the current path is a protected route
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
        pathname.startsWith(route)
    );

    // For now, allow all routes - authentication will be handled by components
    // You can add more sophisticated logic here later if needed
    
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
