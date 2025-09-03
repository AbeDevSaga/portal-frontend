import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import MarriageAvatar from "./marriageAvatar";
import marriage from "@/public/images/sidebar/marriage.svg";
import { Button } from "@/common/components/ui/button";
import { useGetVitalServiceEventQuery } from "@/features/application-service/api/applicationApi";
import { useGetResidentDataByIdQuery } from "@/features/application-service/api/residentApi";
import { useGetMarriageBySlugQuery } from "@/features/marriage-service/api/marriageApi";
import husband from "@/public/images/husband.svg";
import wife from "@/public/images/wife.svg";
import { complaintType } from "../types/type";
import { Loader } from "lucide-react";
const MarriageCard = ({
    setOpenComplaintModal,
    setComplaintModalData,
    data,
    isLoading,
}: {
    setOpenComplaintModal: Dispatch<SetStateAction<boolean>>;
    data: {
        registrationFormNumber: string;
        wife: string;
        husband: string;
        marriageRequestId: string;
    };
    setComplaintModalData: Dispatch<SetStateAction<complaintType | null>>;
    isLoading: boolean;
}) => {
    console.log("data", data);

    // const {
    //     data: vitalData,
    //     isLoading: isVitalLoading,
    //     isError: isVitalError,
    // } = useGetVitalServiceEventQuery(
    //     { id: data.registrationFormNumber },
    //     {
    //         skip: !data.registrationFormNumber,
    //         refetchOnMountOrArgChange: true,
    //     }
    // );

    const {
        data: HusbandData,
        isLoading: isHusbandLoading,
        isError: isHusbandError,
    } = useGetResidentDataByIdQuery(
        { id: data?.husband! },
        {
            skip: !data?.husband,
            refetchOnMountOrArgChange: true,
        }
    );

    const {
        data: wifeData,
        isLoading: isWifeLoading,
        isError: isWifeError,
    } = useGetResidentDataByIdQuery(
        { id: data?.wife! },
        {
            skip: !data?.wife,
            refetchOnMountOrArgChange: true,
        }
    );

    const husbandInfo = HusbandData?.content[0] || null;
    const wifeInfo = wifeData?.content[0] || null;

    const coupleAvatar = [
        {
            image: husband.src,
            name: husbandInfo?.firstName + " " + husbandInfo?.lastName || "",
        },
        {
            image: wife.src,
            name: wifeInfo?.firstName + " " + wifeInfo?.lastName || "",
        },
    ];

    const handleShowComplaintModalData = () => {
        setComplaintModalData({
            id: data.registrationFormNumber,
            info: [
                {
                    name:
                        husbandInfo?.firstName + " " + husbandInfo?.lastName ||
                        "",
                    image: husband.src,
                },
                {
                    name: wifeInfo?.firstName + " " + wifeInfo?.lastName || "",
                    image: wife.src,
                },
            ],
        });
        setOpenComplaintModal(true);
    };
    return (
        <Card className='pt-3.5 pb-2 px-5 rounded-md shadow-md min-h-[250px] flex flex-col'>
            {isLoading || isWifeLoading || isHusbandLoading ? (
                <div className='flex-1 flex items-center justify-center'>
                    <Loader className='animate-spin' />
                </div>
            ) : (
                <div className='w-full'>
                    <div className='px-5 space-y-2 pb-3 border-b'>
                        <div className='flex flex-col items-center justify-center'>
                            <Image
                                src={marriage}
                                alt='marriage'
                                width={20}
                                height={20}
                            />
                            <p className='text-xl font-semibold text-yellow-500'>
                                To be Married
                            </p>
                        </div>
                    </div>
                    <div className='px-5 space-y-2.5'>
                        <MarriageAvatar coupleAvatar={coupleAvatar} />
                        <div className='flex w-full justify-between py-0.5 border-y pt-1.5'>
                            <div className='leading-tight'>
                                <p>Subcity</p>
                                <p className='text-sm font-semibold'>
                                    {/* {married.subcity} */}
                                </p>
                            </div>
                            <div className=' leading-none'>
                                <p>Woreda</p>
                                <p className='text-sm font-semibold'>
                                    {/* {married.woreda} */}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between items-center py-0.5'>
                        <div>
                            <p className='text-2xl font-semibold px-5 text-yellow-500'>
                                {/* {married.daysRemaining} days */}
                            </p>
                            <p className='text-xs'>Remaining Complaint Days</p>
                        </div>
                        <Button
                            onClick={() => handleShowComplaintModalData()}
                            size='sm'
                            className='bg-[#073954]'
                            disabled={
                                isLoading ||
                                isHusbandLoading ||
                                isWifeLoading ||
                                isHusbandError ||
                                isWifeError
                            }
                        >
                            Give Complaint
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default MarriageCard;
