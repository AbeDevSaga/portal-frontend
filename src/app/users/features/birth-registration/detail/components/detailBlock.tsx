import StatusComponent from "@/common/components/common/statusComponent";
import React from "react";

const DetailBlock = ({
    blockData,
    hasStatus = false,
}: {
    blockData: {
        title: string;
        data: {
            label: string;
            key: string;
            value: string;
            status?: string;
        }[];
    };
    hasStatus?: boolean;
}) => {
    return (
        <div>
            <p className='font-semibold text-xl mb-2 text-[#204D66]'>
                {blockData.title}
            </p>
            <div className='grid grid-cols-2 gap-4'>
                {blockData?.data?.map((blockData) => (
                    <div
                        key={blockData.label}
                        className='grid grid-cols-2 gap-2'
                    >
                        <p className=''>{blockData.label}</p>
                        <p className='font-semibold capitalize'>
                            {blockData.value}
                        </p>
                    </div>
                ))}

                {hasStatus ? (
                    <div className='flex gap-2'>
                        <p className='min-w-fit text-sm'>Status -</p>
                        <div className='font-semibold flex justify-center w-full'>
                            {blockData?.data?.[0]?.status
                                ? StatusComponent({
                                      status: blockData.data[0].status,
                                  })
                                : ""}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default DetailBlock;
