"use client";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Card } from "../ui/card";
import {
    Baby,
    BookUser,
    Cake,
    House,
    IdCard,
    MessageCircleWarning,
    ScanHeart,
    Skull,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import birth from "@/public/images/sidebar/birth.svg";
import death from "@/public/images/sidebar/death.svg";
import marriage from "@/public/images/sidebar/marriage.svg";
import divorce from "@/public/images/sidebar/divorce.svg";
import adoption from "@/public/images/sidebar/adoption.svg";
import legitmation from "@/public/images/sidebar/legitimationoffather.svg";
import recognition from "@/public/images/sidebar/recognitionofchild.svg";
import id from "@/public/images/sidebar/id.svg";
import family from "@/public/images/sidebar/family.svg";

import Image from "next/image";

const Sidebar = () => {
    const { data: session, status: sessionStatus } = useSession();
    const t = useTranslations();
    const router = usePathname().toLowerCase();

    //TODO fix this to have the right model
    const decodedToken: any = jwt.decode(session?.user.access_token);
    const username: any =
        decodedToken && decodedToken.preferred_username
            ? decodedToken.preferred_username
            : null;

    const sidebarRoutes = [
        {
            title: "civil-registration",
            childRoutes: [
                {
                    icon: (
                        <Image
                            src={birth.src}
                            width={24}
                            height={24}
                            alt='birth'
                            className='bg-[#073954]'
                        />
                    ),
                    label: "birth",
                    route: "/home/birth",
                },
                {
                    icon: (
                        <Image
                            src={death.src}
                            width={24}
                            height={24}
                            alt='death'
                        />
                    ),
                    label: "death",
                    route: "/home/death",
                },
                {
                    icon: (
                        <Image
                            src={marriage.src}
                            width={24}
                            height={24}
                            alt='marriage'
                        />
                    ),
                    label: "marriage",
                    route: "/home/marriage",
                },
                {
                    icon: (
                        <Image
                            src={divorce.src}
                            width={24}
                            height={24}
                            alt='divorce'
                        />
                    ),
                    label: "divorce",
                    route: "/home/divorce",
                },
                {
                    icon: (
                        <Image
                            src={adoption.src}
                            width={24}
                            height={24}
                            alt='adoption'
                        />
                    ),
                    label: "adoption",
                    route: "/home/adoption",
                },
                {
                    icon: (
                        <Image
                            src={legitmation.src}
                            width={24}
                            height={24}
                            alt='legitmation'
                        />
                    ),
                    label: "legitimation",
                    route: "/home/legitimation",
                },
                {
                    icon: (
                        <Image
                            src={recognition.src}
                            width={24}
                            height={24}
                            alt='recognition'
                        />
                    ),
                    label: "recognitionofchild",
                    route: "/home/recognition",
                },
            ],
        },
        {
            title: "complaint",
            childRoutes: [
                {
                    icon: <MessageCircleWarning />,
                    label: "complaint",
                    route: "/home/complaint",
                },
            ],
        },
    ];
    return (
        <Card className='py-8 px-5 space-y-8 w-fit h-fit hidden 2xl:block '>
            <div className='text-[#073954] space-y-5'>
                {sidebarRoutes.map((item) => (
                    <div key={item.title} className='space-y-1'>
                        <p className='mb-4 text-[#073954]/30 font-semibold'>
                            {t(item.title)}
                        </p>
                        {item.childRoutes.map((child) => (
                            <Button
                                asChild
                                className={`duration-200 ease-in-out flex items-center gap-3 justify-start border-none shadow-none ${
                                    router === child.route
                                        ? ""
                                        : "text-[#073954] hover:text-secondary bg-transparent"
                                }`}
                                key={child.label}
                            >
                                <Link href={child.route}>
                                    {child.icon}
                                    {t(child.label)}
                                </Link>
                            </Button>
                        ))}
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Sidebar;
