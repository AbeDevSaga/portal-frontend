"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { USER_MENU_ITEMS, ALL_MENU_ITEMS } from "@/utils/constants/MenuItems";
import "@/utils/styles/home.css";
import { Bell, Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";
import jwt, { JwtPayload } from "jsonwebtoken";
import React from "react";
import crrsaLogin from "@/public/images/crrsa-login.png";
import { LanguageSwitcher } from "../common/LanguageSelector";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTranslations } from "next-intl";
const userMenuItems = USER_MENU_ITEMS;

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type signeInType = {
    preferred_username: string;
    email: string;
};
type signedInUserToken = signeInType | string | null | JwtPayload;

export default function LandingNavBar() {
    const t = useTranslations();
    const pathname = usePathname();
    const [hash, setHash] = useState("");

    useEffect(() => {
        // Initial load hash
        setHash(window.location.hash);

        // Listen for hash changes on client side
        const onHashChange = () => {
            setHash(window.location.hash);
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const landingLinks = [
        {
            link: "/#home",
            name: "Home",
        },
        {
            link: "/#requirements",
            name: "Requirements",
        },
        {
            link: "/#faq",
            name: "FAQ",
        },
        {
            link: "/home/announcement",
            name: "Announcement",
        },
        {
            link: "/home/checkstatus",
            name: "Check Status",
        },
    ];
    const isActiveLink = (link: string) => {
        if (link.startsWith("/#")) {
            const anchor = link.substring(1);
            return pathname === "/" && hash === anchor;
        } else {
            if (
                (pathname.includes("announcement") &&
                    link === "/announcement") ||
                (pathname.includes("checkstatus") && link === "/checkstatus")
            )
                return true;

            return pathname === link;
        }
    };

    return (
        <nav className='w-full shadow-lg hidden lg:block'>
            <div className='mx-auto py-5 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    <Image
                        src={crrsaLogin.src}
                        alt='crrsa-login'
                        width={228}
                        height={62.22}
                    />
                    <div className='flex flex-wrap items-center gap-y-5 gap-x-8 leading-[25px] text-xl'>
                        {landingLinks.map((link) => {
                            return (
                                <Link
                                    href={link.link}
                                    scroll={true}
                                    key={link.link}
                                    className={`${
                                        isActiveLink(link.link)
                                            ? "text-[#073954]"
                                            : "text-[#7D7D7D]"
                                    } hover:text-[#073954] transition-colors`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            asChild
                            variant='outline'
                            className='border-2 border-[#073954] px-[24px] py-2.5'
                        >
                            <Link href='/signup'>Register</Link>
                        </Button>
                        <Button
                            asChild
                            className='border-2 border-[#073954] px-[24px] py-2.5 bg-[#073954]'
                        >
                            <Link href='/login'>Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
