import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components/ui/avatar";
type copuleAvatarType = {
    coupleAvatar: {
        image: string;
        name: string;
    }[];
};
const MarriageAvatar = ({ coupleAvatar }: copuleAvatarType) => {
    return (
        <div className='flex w-fit gap-10 py-2.5 mx-auto'>
            {coupleAvatar.map((item, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                    <Avatar className='w-[80px] h-[80px] mx-auto lg:mx-0'>
                        <AvatarImage
                            src={
                                item.image ||
                                `https://randomuser.me/api/portraits/men/${Math.floor(
                                    Math.random() * 100
                                )}.jpg`
                            }
                        />
                        <AvatarFallback className='text-center'>
                            {item.name}
                        </AvatarFallback>
                    </Avatar>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
};

export default MarriageAvatar;
