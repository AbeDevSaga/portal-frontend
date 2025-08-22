import { Button } from "@/components/ui/button";
import { FileText, Hourglass } from "lucide-react";
import Image from "next/image";
import React from "react";
import pdf from "@/public/images/pdf.svg"
const PdfDetailBlock = ({
    blockData,
}: {
    blockData: {
        title: string;
        data: {
            title: string;
            url: string;
        };
    };
}) => {
    return (
        <div className='w-fit'>
            <p className='font-semibold text-xl mb-2'>{blockData.title}</p>
            <div className='cursor-pointer border-black border rounded-md overflow-clip px-0'>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex-1 flex justify-start px-2 gap-2'>
                       <Image src={pdf.src} alt="pdf" width={42} height={42}/>
                        <p>{blockData.data.title}</p>
                    </div>
                    <div className='px-3.5 bg-yellow-500 ml-10 py-3.5'>
                        <Hourglass />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfDetailBlock;
