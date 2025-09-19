import Image from "next/image";
import React from "react";
import footerCrrsa from "@/public/images/crrsa-footer.svg";
import Link from "next/link";
<<<<<<< HEAD
import { footerData } from "../constants/footerData";
import SocialLinks from "./SocialLinks";
const Footer = () => {
  const date = new Date();
  return (
    <div className="bg-[#073954] text-white pt-16 lg:pt-[96px] lg:px-[66px] px-5 w-full">
      <div className="w-full mx-auto">
        <div className=" w-full grid md:grid-cols-2 gap-10 pb-5 border-b border-b-gray-100">
          <div className="flex flex-col gap-[20px]">
            <Image src={footerCrrsa.src} alt="crrsa" width={257} height={80} />
            <p className="text-2xl md:text-4xl font-semibold">
              Civil Registration and Residency <br /> Service Agency
            </p>
            <p className="text-xl">Addis Ababa, Ethiopia</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {footerData.map((footer) => (
              <div key={footer.title} className="space-y-2.5 md:space-y-5">
                <p className="text-lg lg:text-2xl font-semibold">
                  {footer.title}
                </p>
                <div className="flex flex-col gap-3 text-[#F7F7F7]">
                  {footer.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base lg:text-xl"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-10 w-full flex items-center justify-between">
          <p className="text-[18.67px]">
            {date.getFullYear()} CRRSA ETHIOPIA, All rights reserved.
          </p>
          <SocialLinks
            platforms={["facebook", "twitter", "linkedin"]}
            size={15}
            className="justify-center"
            iconClassName="hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
=======
const Footer = () => {
    const footerLinks = [
        {
            title: "Civil Registration",
            links: [
                {
                    label: "Birth",
                    href: "/birth",
                },
                {
                    label: "Marriage",
                    href: "/marriage",
                },
                {
                    label: "Adoption",
                    href: "/adoption",
                },
                {
                    label: "Divorce",
                    href: "/divorce",
                },
                {
                    label: "Death",
                    href: "/death",
                },
            ],
        },
        {
            title: "Legal",
            links: [
                {
                    label: "Terms of Service",
                    href: "/termsofservice",
                },
                {
                    label: "Privacy Policy",
                    href: "/privacypolicy",
                },
                {
                    label: "Cookies Policy",
                    href: "/cookiespolicy",
                },
                {
                    label: "Data Processing",
                    href: "/dataprocessing",
                },
            ],
        },
    ];
    const date = new Date();
    return (
        <div className='bg-[#073954] text-white pt-16 lg:pt-[96px] px-5 w-full'>
            <div className='max-w-[1700px] mx-auto'>
                <div className=' w-full grid md:grid-cols-2 gap-10 pb-5 border-b border-b-[#F7F7F7]'>
                    <div className='flex flex-col gap-[20px]'>
                        <Image
                            src={footerCrrsa.src}
                            alt='crrsa'
                            width={257}
                            height={80}
                        />
                        <p className='text-2xl md:text-4xl font-semibold'>
                            Civil Registration and Residency <br /> Service
                            Agency
                        </p>
                        <p className='text-xl'>Addis Ababa, Ethiopia</p>
                    </div>
                    <div className='grid gap-5 md:grid-cols-3'>
                        {footerLinks.map((footer) => (
                            <div
                                key={footer.title}
                                className='space-y-2.5 md:space-y-5'
                            >
                                <p className='text-lg lg:text-2xl font-semibold'>
                                    {footer.title}
                                </p>
                                <div className='flex flex-col gap-3 text-[#F7F7F7]'>
                                    {footer.links.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className='text-base lg:text-xl'
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='py-10'>
                    <p className='text-sm'>
                        {date.getFullYear()} CRRSA ETHIOPIA, All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
>>>>>>> gitlab1/main
};

export default Footer;
