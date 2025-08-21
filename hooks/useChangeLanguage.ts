"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useChangeLanguage = () => {
    const router = useRouter();

    const handleChangeLanguage = (locale: string) => {
        Cookies.set("NEXT_LOCALE", locale);
        router.refresh();
    };
    return {
        handleChangeLanguage,
    };
};

export default useChangeLanguage;
