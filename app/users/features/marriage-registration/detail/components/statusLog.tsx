import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StatusLog = ({
    statusData,
}: {
    statusData: {
        date: string;
        image: string;
        name: string;
        status: string;
    }[];
}) => {
    return (
        <Card className='py-5 px-5 w-full space-y-5'>
            <p className='text-3xl font-bold'>Status Log</p>
            <div className='space-y-2'>
                {statusData.map((status) => (
                    <div
                        className='flex items-center pb-2 last:pb-0 gap-x-2.5 border-b last:border-b-0'
                        key={status.name + status.date}
                    >
                        <Avatar className='w-[65px] h-[65px]'>
                            <AvatarImage src={status.image} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex-1'>
                            <p className='font-semibold'>{status.name}</p>
                            <p className='text-sm'>{status.date}</p>
                        </div>
                        <Badge className='h-fit py-1.5 px-7 rounded-full ml-5'>
                            {status.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default StatusLog;
