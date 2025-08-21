"use client";
import CustomToaster from "@/components/common/CustomToast";
import OfficersNavBar from "@/components/layout/OfficersNavBar";
import Sidebar from "@/components/layout/sidebar";

export default function BirthDetailsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className='min-h-screen bg-cover bg-no-repeat font-barlow'>
                <OfficersNavBar />
                <div className='flex flex-col'>
                    <div className='pb-10 pt-32 px-5 md:px-10 flex gap-10 flex-1'>
                        <Sidebar />
                        <div className='w-full space-y-5'>
                            {children}
                        </div>
                    </div>
                </div>
                <CustomToaster />
            </div>
        </>
    );
}
