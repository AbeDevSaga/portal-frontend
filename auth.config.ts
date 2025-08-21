import { Account, User as AuthUser, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const param = {
                        id: "test",
                        version: "1.0.0",
                        requesttime: null,
                        metadata: {},
                        request: {
                            username: credentials.username,
                            password: credentials.password,
                        },
                    };

                    const response = await fetch(
                        `${process.env.CRRSA_BACKEND_API_URL}/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(param),
                        }
                    );

                    if (!response.ok) {
                        console.error(
                            "Failed to authenticate:",
                            response.status,
                            response.statusText
                        );
                        return null;
                    }
                    const data = await response.json();

                    if (!data.response) {
                        throw new Error("Invalid credentials");
                    }
                    return data.response;
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id;
                token.token = user.access_token;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            session.user = session.user || {};

            if (token) {
                session.user.id = token.id;
                session.user.access_token = token.token;
            }
            return session;
        },
        async signIn({ user, account }: { user: AuthUser; account: Account }) {
            if (account?.provider == "credentials") {
                return true;
            }
        },
        async redirect({ url, baseUrl }: any) {
            if (url.startsWith("/"))
                return `${process.env.AUTH_URL}${url}`;
            return baseUrl;
        },
    },
    pages: {
        signOut: "/login",
    },
};
