"use client";

import { languageOptions } from "@/common/utils/constants/languageOptions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useLocale } from "next-intl";
import useChangeLanguage from "@/common/hooks/useChangeLanguage";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const currentLocale = useLocale();

    const { handleChangeLanguage } = useChangeLanguage();
    return (
        <Select
            value={currentLocale || "en"}
            onValueChange={handleChangeLanguage}
        >
            <SelectTrigger className='w-fit text-white bg-[#2C566A] capitalize'>
                {currentLocale}
            </SelectTrigger>
            <SelectContent className='bg-[#2C566A] text-white border-b-white'>
                {languageOptions.map((locale) => (
                    <SelectItem
                        key={locale.label}
                        value={locale.value}
                        className='bg-[#2C566A]'
                    >
                        {locale.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
