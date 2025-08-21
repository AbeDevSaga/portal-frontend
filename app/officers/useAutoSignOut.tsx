import { signOut } from "next-auth/react";

const useAutoSignOut = (session: any) => {
    const handleCheckSession = async () => {
        const sessionExipreDate: string | undefined | null = session?.expires;
        if (sessionExipreDate !== undefined && sessionExipreDate !== null) {
            const givenTime = new Date(sessionExipreDate);
            const currentTime = new Date();

            if (givenTime > currentTime) return;
            else {
                signOut({ callbackUrl: `/home` });
                return;
            }
        }
        signOut({ callbackUrl: `/home` });
        return;
    };

    return { handleCheckSession };
};

export default useAutoSignOut;
