import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    console.log('Middleware - Path:', req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log('Middleware - Token:', token);
        console.log('Middleware - Path:', req.nextUrl.pathname);
        
        // Protect private routes - only allow access if user is authenticated
        if (req.nextUrl.pathname.startsWith('/officers') || 
            req.nextUrl.pathname.startsWith('/officers')) {
          const isAuthorized = !!token;
          console.log('Middleware - Is Authorized:', isAuthorized);
          return isAuthorized;
        }
        // Allow access to public routes
        return true;
      },
    },
  }
);

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