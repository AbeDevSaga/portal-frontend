"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
import { USER_MENU_ITEMS, ALL_MENU_ITEMS } from "@/common/utils/constants/MenuItems";
import "@/common/utils/styles/home.css";
import { Bell, Slash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/common/hooks/useAuth";
import React from "react";
import { LanguageSwitcher } from "../common/LanguageSelector";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTranslations } from "next-intl";
import crrsaLogin from "@/public/images/crrsa-login.png";
import { RootState } from "@/redux/store";

const userMenuItems = USER_MENU_ITEMS;

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}


export default function OfficersNavBar() {
    const { user, logout } = useAuth();
    const userState = useSelector((state: RootState) => state.user);
    const t = useTranslations();
    
    const username = user?.username || user?.firstName || 'User';
    const userRole = user?.roles?.[0] || 'user';
    const allMenus = ALL_MENU_ITEMS;
    const filteredRoutes = allMenus
    const navLinks = filteredRoutes;

    //TODO use this token to differenciate roles and determine which routes are avaliable based on that
    const pathName = usePathname();
    const [cleanedPathWithReverse, setCleanedReverse] = useState<string[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean[]>(
        new Array(navLinks.length).fill(false)
    );

    const handleSignOut = () => {
        logout();
    };

    // TODO: change this useEffect to method instead.
    const handleCleanPathName = (nameToBeCleared: string) => {
        let cleanedPathnames = nameToBeCleared.split("/").filter((x) => x);
        cleanedPathnames = cleanedPathnames.map((name) => {
            if (name.includes("-")) {
                return name.replace(/-/g, " ");
            }
            return name;
        });
        if (cleanedPathnames.length > 0 && cleanedPathnames[0] === "officers") {
            cleanedPathnames.shift();
        }

        return cleanedPathnames;
    };

    useEffect(() => {
        let cleanedPathnamesReversed = pathName.split("/").filter((x) => x);
        cleanedPathnamesReversed = cleanedPathnamesReversed.map((name) => {
            if (name.includes(" ")) {
                return name.replace(/ /g, "-");
            }
            return name;
        });
        if (
            cleanedPathnamesReversed.length > 0 &&
            cleanedPathnamesReversed[0] === "officers"
        ) {
            cleanedPathnamesReversed.shift();
        }
        setCleanedReverse(cleanedPathnamesReversed);
    }, [pathName]);

    const isLinkActive = (link: { path: string; children: any[] }) => {
        if (link.path === pathName) return true;
        if (link.children) {
            return link.children.some((child) => child.path === pathName);
        }
        return false;
    };

    const handleItemClick = (index: number) => {
        setIsOpen((prev) => {
            const newClickedItems = new Array(prev.length).fill(false);
            newClickedItems[index] = !newClickedItems[index];
            return newClickedItems;
        });
    };

    const renderNavLinks = (
        links: any[],
        isNested = false,
        parentIndex = 0 // do not remove this line
    ) => (
        <div
            className={
                isNested ? "ml-4 space-y-1 text-gray-400" : "flex space-x-4"
            }
        >
            {links.map((link, index) => {
                // Reminder: if there is error on clicking submenu list change the below line to: const currentIndex = isNested ? parentIndex + index : index;
                const currentIndex = isNested ? index : index;

                return (
                    <div key={link.name} className='relative group'>
                        <Link
                            href={link.path}
                            className={classNames(
                                isLinkActive(link)
                                    ? "bg-cyan-900 text-white"
                                    : !isNested
                                        ? "text-gray-200 hover:bg-cyan-700 hover:text-white"
                                        : "text-gray-400 hover:bg-cyan-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={
                                pathName === link.path ? "page" : undefined
                            }
                            onClick={() => handleItemClick(currentIndex)}
                        >
                            {link.name}
                        </Link>
                        {link.children &&
                            link.children.length > 0 &&
                            isOpen[currentIndex] && (
                                <div
                                    className='absolute left-0 mt-1 space-y-1 rounded-md bg-white p-2 shadow-lg min-w-56 nested-css'
                                    key={`submenu-${currentIndex}`}
                                >
                                    {renderNavLinks(
                                        link.children,
                                        true,
                                        currentIndex + 1
                                    )}
                                </div>
                            )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className='min-h-full'>
            <nav className="w-full shadow-lg hidden lg:block fixed top-0 z-50 bg-white">
                <div className='mx-auto py-3 px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between gap-2'>
                        <Image
                            src={crrsaLogin.src}
                            alt='crrsa-login'
                            width={228}
                            height={62.22}
                        />
                        <div className='flex items-center'>
                            {/* <div className='hidden md:block'>
                                <div className='ml-10 flex items-baseline'>
                                    {renderNavLinks(navLinks)}
                                </div>
                            </div> */}
                        </div>
                        <div className='hidden md:block'>
                            <div className='ml-4 flex items-center md:ml-6'>
                                <div className='relative ml-3'>
                                    <div className='flex text-right gap-5 items-center'>
                                        {/* {username ? (
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-white'>
                                                    <span className='font-normal text-gray-300'>
                                                        Welcome back,
                                                    </span>{" "}
                                                    <span className='capitalize'>
                                                        {username}
                                                    </span>
                                                </p>
                                                <span className='font-semibold text-white uppercase'>
                                                    {userRole}
                                                </span>
                                            </div>
                                        ) : null} */}

                                        <LanguageSwitcher />

                                        <Popover>
                                            <PopoverTrigger>
                                                <div className='relative'>
                                                    <Bell
                                                        className='z-40'
                                                        size={24}
                                                    />
                                                    <p className='absolute z-50 -right-1 -top-3 text-white bg-red-500 px-1.5 py-0.5 rounded-full text-xs'>
                                                        2
                                                    </p>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                Place content for the popover
                                                here.
                                            </PopoverContent>
                                        </Popover>

                                        <div className='flex items-center gap-3'>
                                            <div className='text-right'>
                                                <p className='text-lg font-semibold'>
                                                    {userState.personal_info.first_name}
                                                </p>
                                                <p className=''>{t("user")}</p>
                                            </div>
                                            <div>
                                                <button
                                                    type='button'
                                                    className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                                    id='user-menu-button'
                                                    aria-expanded={userMenuOpen}
                                                    aria-haspopup='true'
                                                    onClick={() =>
                                                        setUserMenuOpen(
                                                            !userMenuOpen
                                                        )
                                                    }
                                                >
                                                    <span className='sr-only'>
                                                        Open user menu
                                                    </span>
                                                    <Avatar>
                                                        <AvatarImage
                                                            src='/images/Profile_avatar_placeholder_large.png'
                                                            alt='@shadcn'
                                                        />
                                                        <AvatarFallback>
                                                            CN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {userMenuOpen && (
                                        <div
                                            className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                            role='menu'
                                            aria-orientation='vertical'
                                            aria-labelledby='user-menu-button'
                                        >
                                            {userMenuItems.map((item) => (
                                                <React.Fragment key={item.name}>
                                                    {" "}
                                                    {item.action ===
                                                        "signOut" ? (
                                                        <Button
                                                            onClick={
                                                                handleSignOut
                                                            }
                                                            className='w-full block px-4 py-2 text-sm text-gray-700 bg-transparent text-left hover:bg-transparent shadow-none'
                                                        >
                                                            Sign out
                                                        </Button>
                                                    ) : (
                                                        <Link
                                                            key={item.name}
                                                            href={item.path}
                                                            className='block px-4 py-2 text-sm text-gray-700'
                                                            role='menuitem'
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='-mr-2 flex md:hidden'>
                            <button
                                type='button'
                                className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                                aria-controls='mobile-menu'
                                aria-expanded={mobileMenuOpen}
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                            >
                                <span className='sr-only'>Open main menu</span>
                                {mobileMenuOpen ? (
                                    <svg
                                        className='block h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth='1.5'
                                        stroke='currentColor'
                                        aria-hidden='true'
                                    >
                                        {/* <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M6 18L18 6M6 6l12 12'
                                        /> */}
                                    </svg>
                                ) : (
                                    <svg
                                        className='block h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth='1.5'
                                        stroke='currentColor'
                                        aria-hidden='true'
                                    >
                                        {/* <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                                        /> */}
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={classNames(
                        "md:hidden",
                        mobileMenuOpen ? "block" : "hidden"
                    )}
                    id='mobile-menu'
                >
                    <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3 overflow-scroll scrollbar-hide '>
                        {renderNavLinks(navLinks)}
                    </div>
                    <div className='border-t border-gray-700 pb-3 pt-4'>
                        <div className='flex items-center px-5'>
                            <div className=''>
                                <div className='text-right'>
                                    {userState.personal_info.first_name}
                                    <p>user</p>
                                </div>
                                <div>
                                    <Avatar>
                                        <AvatarImage
                                            src='/images/Profile_avatar_placeholder_large.png'
                                            alt='@shadcn'
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 space-y-1 px-2'>
                            {userMenuItems.map((item) => (
                                <React.Fragment key={item.name}>
                                    {" "}
                                    {item.action === "signOut" ? (
                                        <Button
                                            onClick={handleSignOut}
                                            className='w-full block px-4 py-2 text-sm text-gray-200 bg-transparent text-left hover:bg-transparent shadow-none'
                                        >
                                            Sign out
                                        </Button>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.path}
                                            className='block rounded-md px-3 py-2 text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-white'
                                            role='menuitem'
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* <header className='fixed z-40 w-full bg-white shadow pt-[64px]'>
                <div className='flex flex-col lg:flex-row lg:justify-between items-start lg:items-center px-4 py-4 sm:px-6 lg:px-8 text-gray-400'>
                    <Breadcrumb>
                        {cleanedPathWithReverse.map((name, index) => {
                            const href =
                                "/officers/" +
                                cleanedPathWithReverse
                                    .slice(0, index + 1)
                                    .join("/");

                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={href}>
                                        {handleCleanPathName(
                                            name.toUpperCase()
                                        )}
                                    </BreadcrumbLink>

                                    {index !==
                                        cleanedPathWithReverse.length - 1 && (
                                            <Slash
                                                style={{
                                                    height: "1.0rem",
                                                    marginRight: "5px",
                                                }}
                                            />
                                        )}
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>
                </div>
            </header> */}
        </div>
    );
}
