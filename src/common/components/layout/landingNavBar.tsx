"use client";
import "@/common/utils/styles/home.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import React from "react";
import crrsaLogin from "@/public/images/crrsa-login.png";

import { useKeycloak } from "@/common/contexts/KeycloakContext";


export default function LandingNavBar() {
    const pathname = usePathname();
    const [hash, setHash] = useState("");
    const { authenticated, user, login, logout } = useKeycloak();

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

    const handleLogin = () => {
        login();
    };

    const handleLogout = () => {
        logout();
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
                        {!authenticated ? (
                            <>
                                <Button
                                    asChild
                                    variant='outline'
                                    className='border-2 border-[#073954] px-[24px] py-2.5'
                                >
                                    <Link href='/signup'>Register</Link>
                                </Button>
                                <Button
                                    onClick={handleLogin}
                                    className='border-2 border-[#073954] px-[24px] py-2.5 bg-[#073954]'
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className='flex items-center gap-3 text-[#073954]'>
                                    <span>Welcome, {user?.username || user?.firstName || 'User'}</span>
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    variant='outline'
                                    className='border-2 border-[#073954] px-[24px] py-2.5'
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}