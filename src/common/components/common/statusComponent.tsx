import { BadgeAlert, BadgeCheck, BadgeX } from "lucide-react";
import React from "react";

const StatusComponent = ({ status }: { status: string }) => {
    if (status === "approved")
        return (
            <div className='flex rounded-full gap-1.5 place-self-end items-center bg-green-100 text-green-600 font-semibold w-fit px-5 py-0.5'>
                <BadgeCheck fill='green' color='white' />
                <p>Approved</p>
            </div>
        );
    if (status === "rejected")
        return (
            <div className='flex rounded-full gap-1.5 place-self-end items-center bg-red-100 text-red-600 font-semibold w-fit px-5 py-0.5'>
                <BadgeX fill='red' color='white' /> <p>Rejected</p>
            </div>
        );
    if (status === "pending")
        return (
            <div className='flex rounded-full gap-1.5 place-self-end items-center bg-orange-100 text-orange-600 font-semibold w-fit px-5 py-0.5'>
                <BadgeAlert fill='orange' color='white' /> <p>Pending</p>
            </div>
        );
    return (
        <div className='flex rounded-full gap-1.5 place-self-end items-center bg-red-100 text-red-600 font-semibold w-fit px-5 py-0.5'>
            <BadgeX fill='red' color='white' /> <p>Rejected</p>
        </div>
    );
};

export default StatusComponent;
