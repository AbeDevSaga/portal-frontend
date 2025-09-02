"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = ({
    redirectTo = null,
    action,
    title,
    description,
}: {
    redirectTo?: string | null;
    action?: React.ReactNode;
    title: string;
    description: string;
}) => {
    const router = useRouter();

    return (
        <div className='flex flex-wrap justify-between items-end'>
            <div className=''>
                <div className='flex items-center text-[#073954] -ml-4'>
                    <Button
                        onClick={
                            redirectTo
                                ? () => router.replace(redirectTo)
                                : () => router.back()
                        }
                        className='bg-transparent hover:bg-transparent border-none shadow-none text-[#073954] px-2'
                    >
                        <ChevronLeft size={32} />
                    </Button>{" "}
                    <p className='text-xl font-bold '>{title}</p>
                </div>
                <p className='text-[#7D7D7D]'>{description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-3'>{action}</div>
        </div>
    );
};

export default HeroSection;
