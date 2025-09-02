import React from "react";
import { MarriageData } from "../types";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";
import {
    useGetNationalityDataByIdQuery,
    useGetReligionDataByIdQuery,
    useGetResidentDataByIdQuery,
} from "@/features/application-service/api/residentApi";

const ProfileCompnent = ({
    image,
    name,
    bridalType,
}: {
    name: string;
    bridalType: string;
    image: string;
}) => (
    <div className='p-5 flex flex-col items-center'>
        <Image
            src={image}
            alt={bridalType}
            width={150}
            height={150}
            className='rounded-sm overflow-clip mb-4'
        />
        <div className='rounded-full px-2 py-0.5 mx-auto text-sm text-[#073954]'>
            {name}
        </div>
        <div className='rounded-full py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD] text-[#073954] font-semibold'>
            {bridalType}
        </div>
    </div>
);
const InformationComponent = ({ id, type }: { type: string; id: string }) => {
    const { data, isLoading, isError } = useGetResidentDataByIdQuery(
        { id: id! },
        {
            skip: !id,
            refetchOnMountOrArgChange: true,
        }
    );

    const {
        data: religionData,
        isLoading: isReligionLoading,
        isError: isReligionError,
    } = useGetReligionDataByIdQuery(
        { id: data?.content[0]?.religion! },
        {
            skip: !data?.content[0]?.religion,
            refetchOnMountOrArgChange: true,
        }
    );

    const {
        data: nationalityData,
        isLoading: isNationalityLoading,
        isError: isNationalityError,
    } = useGetNationalityDataByIdQuery(
        { id: data?.content[0]?.nationality! },
        {
            skip: !data?.content[0]?.nationality,
            refetchOnMountOrArgChange: true,
        }
    );
    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full py-5'>
            <Card className='flex flex-col md:flex-row w-full'>
                <ProfileCompnent
                    name={
                        data
                            ? data.content[0].firstName +
                              " " +
                              data.content[0].middleName +
                              " " +
                              data.content[0].lastName
                            : ""
                    }
                    bridalType={type}
                    image={type === "Groom" ? groom : bride}
                />

                <div className='rounded-md py-5 px-5 gap-2 min-w-fit flex flex-col justify-center w-full'>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Nationality</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {nationalityData?.localizedContent["en"].name}
                        </p>
                    </div>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>National ID Number</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            111111{" "}
                        </p>
                    </div>{" "}
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Date of Birth</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {data.content[0].dateOfBirth}
                        </p>
                    </div>{" "}
                    {/* <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Current Living Address</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            Date of Marriage
                        </p>
                    </div>{" "} */}
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Religion</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {religionData?.localizedContent["en"].name}
                        </p>
                    </div>
                    {/* <div className='w-full flex justify-between gap-x-5 gap-y-2 pb-2'>
                        <p className='text-sm'>Early Marriage Status</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            Date of Marriage
                        </p>
                    </div> */}
                </div>
            </Card>
            <Card className='min-w-[250px] p-5'>
                <p className='text-lg font-semibold text-[#073954]'>
                    Birth Information
                </p>
                <div className='py-5 gap-2 min-w-fit flex flex-col justify-center'>
                    <div className='flex justify-between border-b'>
                        <p className='text-sm'>Country </p>
                        <p className='text-sm font-semibold w-fit text-right'>
                            {nationalityData?.localizedContent["en"].name}
                        </p>
                    </div>
                    <div className='flex justify-between border-b'>
                        <p className='text-sm'>City / Region </p>
                        <p className='text-sm font-semibold w-fit text-right'>
                            Addis Ababa
                        </p>
                    </div>
                    <div className='flex justify-between border-b'>
                        <p className='text-sm'>Sub-city</p>
                        <p className='text-sm font-semibold w-fit text-right'>
                            Kirkos
                        </p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm'>Kebele</p>
                        <p className='text-sm font-semibold w-fit text-right'>
                            ----
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const BridalInformation = ({ data }: { data: MarriageData }) => {
    return (
        <div className=''>
            <p className='text-xl font-semibold border-b pb-7 text-[#073954]'>
                Bridal Information
            </p>
            <InformationComponent id={data.husband} type='Groom' />
            <InformationComponent id={data.wife} type='Bride' />
        </div>
    );
};

export default BridalInformation;
