import React from "react";
import { MarriageData } from "../types";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";

const GeneralInformation = ({ data }: { data: MarriageData }) => {
    return (
        <div className='flex gap-5 w-full'>
            <div className='flex flex-col items-center justify-center w-fit py-10 px-5'>
                <Image
                    src={groom}
                    alt='groom'
                    width={150}
                    height={150}
                    className='rounded-sm overflow-clip'
                />
                <div className='rounded-full px-2 py-0.5 mx-auto'>
                    Dawut Aveve Jevede
                </div>
                <div className='rounded-full px-4 py-0.5 mx-auto border'>
                    Groom
                </div>
            </div>
            <Card className='rounded-md p-5 gap-5 min-w-[350px] w-fit flex flex-col justify-center'>
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Date of Marriage</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Type of Marriage</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>{" "}
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Narriage Honor Record No.</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>{" "}
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Unique No. of the reg. office</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>{" "}
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Marriage Certificate Unique No.</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>
                <div className='grid grid-cols-2 gap-5 border-b'>
                    <p>Status</p>
                    <p className='font-semibold'>Date of Marriage</p>
                </div>
            </Card>
            <div className='flex flex-col items-center justify-center w-fit py-10 px-5'>
                <Image
                    src={bride}
                    alt='bride'
                    width={150}
                    height={150}
                    className='rounded-sm overflow-clip'
                />
                <p>Selam Mesfin Biru</p>
                <div className='rounded-full px-4 py-0.5 mx-auto border'>
                    Bride
                </div>
            </div>
        </div>
    );
};

export default GeneralInformation;
