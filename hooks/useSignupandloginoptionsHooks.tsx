import fayda from "@/public/images/fayda.svg";
import phone from "@/public/images/phone.svg";
import lock from "@/public/images/lock.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const useSignupandloginoptions = () => {
    const t = useTranslations();

    const optionsLoginAndSignup = [
        {
            label: (
                <div className='flex items-center gap-2'>
                    <Image height={21} width={21} src={fayda} alt='fayda' />
                    {t("using-fayda")}
                </div>
            ),
            value: "fayda",
        },
        {
            label: (
                <div className='flex items-center gap-2'>
                    <Image height={21} width={21} src={lock} alt='fayda' />
                    {t("using-email")}
                </div>
            ),

            value: "email",
        },
        {
            label: (
                <div className='flex items-center gap-2'>
                    <Image height={21} width={21} src={phone} alt='fayda' />
                    {t("using-phone")}
                </div>
            ),
            value: "phone",
        },
    ];
    return { optionsLoginAndSignup };
};

export default useSignupandloginoptions;
