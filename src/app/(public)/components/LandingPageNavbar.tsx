"use client";
import "@/common/utils/styles/home.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import crrsaLogin from "@/public/images/crrsa-login.png";
import { Home, Menu } from "lucide-react";

import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/components/ui/sheet";

export default function LandingPageNavbar() {
  const [activeLink, setActiveLink] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const user = {
    username: "Amanuel Daniel",
    firstName: "Amanuel",
  };

  // Set active link based on current pathname
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const landingLinks = [
    { link: "/", name: "Home" },
    { link: "/services", name: "Services" },
    { link: "/requirements", name: "Requirements" },
    { link: "/announcements", name: "Announcements" },
    // { link: "/applicationstatus", name: "Application Status" },
    { link: "/faq", name: "FAQ" },
  ];

  const mobileLinks = [
    { link: "/services", name: "Services" },
    { link: "/requirements", name: "Requirements" },
    { link: "/announcements", name: "Announcements" },
    // { link: "/applicationstatus", name: "Application Status" },
    { link: "/faq", name: "FAQ" },
  ];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setIsSheetOpen(false); // Close mobile menu
    router.push(link);
  };

  const handleLogin = () => {
    setIsSheetOpen(false); // Close mobile menu
    router.push("/login");
  };

  const handleLogout = () => {
    setIsSheetOpen(false); // Close mobile menu
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full bg-background shadow-lg hidden lg:block">
        <div className="mx-auto py-5 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Image
              src={crrsaLogin.src}
              alt="crrsa-login"
              width={228}
              height={62.22}
            />

            {/* Nav Links */}
            <div className="flex flex-wrap items-center gap-y-5 gap-x-8 leading-[25px] text-xl">
              {landingLinks.map((link) => (
                <button
                  key={link.link}
                  onClick={() => handleLinkClick(link.link)}
                  className={`${
                    link.link === activeLink
                      ? "text-[#073954]"
                      : "text-[#7D7D7D]"
                  } hover:text-[#073954] transition-colors`}>
                  {link.name}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-5">
              {!false ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5">
                    <Link
                      href="/signup"
                      className="text-[14px]">
                      Register
                    </Link>
                  </Button>
                  <Button
                    onClick={handleLogin}
                    className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5 bg-[#073954]">
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-[#073954]">
                    <span>
                      Welcome, {user?.username || user?.firstName || "User"}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5">
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="w-full bg-background shadow-lg lg:hidden">
        <div className="mx-auto py-4 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Image
              src={crrsaLogin.src}
              alt="crrsa-login"
              width={160}
              height={43}
              className="h-auto"
            />

            {/* Right side - Login button and Mobile Menu */}
            <div className="flex items-center gap-3">
              {!false ? (
                <Button
                  onClick={handleLogin}
                  className="border-2 text-[12px] border-[#073954] px-4 py-2 bg-[#073954] hover:bg-[#073954]/90">
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-2 text-[12px] border-[#073954] px-4 py-2">
                  Logout
                </Button>
              )}

              <Sheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#073954] text-[#073954] hover:bg-[#073954] hover:text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] p-0 sm:w-[400px]">
                  <SheetHeader className="flex justify-center border-b p-3 shadow-md">
                    <Image
                      src={crrsaLogin.src}
                      alt="crrsa-login"
                      width={170}
                      height={43}
                      className="h-auto"
                    />
                  </SheetHeader>

                  <div className="mt-2 flex flex-col space-y-4 ">
                    {/* Navigation Links */}
                    <button
                      onClick={() => handleLinkClick("/")}
                      className={`${
                        "/" === activeLink
                          ? "text-[#073954] font-semibold"
                          : "text-[#7D7D7D]"
                      } hover:text-[#073954] p-3 transition-colors shadow-sm text-left text-lg flex items-center justify-between border-b`}>
                      <span>Home</span>
                      <span className="ml-2">
                        <Home />
                      </span>
                    </button>
                    {mobileLinks.map((link) => (
                      <button
                        key={link.link}
                        onClick={() => handleLinkClick(link.link)}
                        className={`${
                          link.link === activeLink
                            ? "text-[#073954] font-semibold"
                            : "text-[#7D7D7D] p-3"
                        } hover:text-[#073954] transition-colors text-left py-2 text-lg flex items-center `}>
                        <span className="mr-2"></span>
                        {link.name}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
