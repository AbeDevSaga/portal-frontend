"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

const NotAuthorized = () => {
    const router = useRouter();

    const onClick = useCallback(() => {
        router.back();
    }, [router]);
    return (
        <div
            className='min-h-screen bg-cover bg-no-repeat bg-[#073954]'
        >
            <div className='flex flex-col primary-text justify-center min-h-svh items-center gap-5 px-10 text-center'>
                <div className='space-y-5 bg-gray-50 primary-text -mt-16 p-20'>
                    <p className='text-xl md:text-3xl font-semibold primary-text'>
                        401
                    </p>
                    <p className='font-bold text-3xl md:text-5xl'>
                        Unauthorized
                    </p>
                    <p className='text-lg italic'>
                        Sorry, You are not authorized to view this page.
                    </p>
                    <button
                        onClick={() => onClick()}
                        className='primary-button px-4 py-2 rounded-md'
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotAuthorized;
