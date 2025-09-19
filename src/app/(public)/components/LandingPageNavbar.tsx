"use client";
import "@/common/utils/styles/home.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import crrsaLogin from "@/public/images/crrsa-login.png";

import { Button } from "./button";

export default function LandingPageNavbar() {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  const user = {
    username: "Amanuel Daniel",
    firstName: "Amanuel",
  };

  const landingLinks = [
    { link: "/", name: "Home" },
    { link: "/services", name: "Services" },
    { link: "/requirements", name: "Requirements" },
    { link: "/announcements", name: "Announcements" },
    // { link: "/applicationstatus", name: "Application Status" },
    { link: "/faq", name: "FAQ" },
  ];

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    router.push(link);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
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
                  link.link === activeLink ? "text-[#073954]" : "text-[#7D7D7D]"
                } hover:text-[#073954] transition-colors`}
              >
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
                  className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5"
                >
                  <Link href="/signup" className="text-[14px]">
                    Register
                  </Link>
                </Button>
                <Button
                  onClick={handleLogin}
                  className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5 bg-[#073954]"
                >
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
                  className="border-2 text-[14px] border-[#073954] px-[24px] py-2.5"
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
