import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const ROOT = "/home";
const PUBLIC_ROUTES = ["/home", "/login", "/_next", "/images", "/signup", , "/users"];
const DEFAULT_REDIRECT = "/login";
const { auth } = NextAuth(authConfig);

export default auth((req: any) => {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth;

    // Modified public route check
    const isPublicRoute =
        PUBLIC_ROUTES.includes(nextUrl.pathname) ||
        req.nextUrl.pathname.startsWith("/home/") ||
        req.nextUrl.pathname.startsWith("/_next/") ||
        req.nextUrl.pathname.startsWith("/images/") ||
        req.nextUrl.pathname.startsWith("/users/");

    if (nextUrl.pathname === "/") {
        return Response.redirect(new URL(ROOT, nextUrl));
    }

    if (nextUrl.pathname.includes("/officers") && !isAuthenticated) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }

    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL(ROOT, nextUrl));
    }
});

export const config = {
    matcher: [
        // Added 'images' to excluded paths
        "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
        "/api/recaptchaSubmit",
    ],
};
