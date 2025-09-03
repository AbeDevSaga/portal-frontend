import React from "react";
import { MarriageData } from "../types";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";
import { useGetResidentDataByIdQuery } from "../../application-service/api/residentApi";
import { Loader } from "lucide-react";
type supportDocType = {
    documentId: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    status: string;
    uploadedAt: null;
};
const ProfileCompnent = ({
    image,
    name,
    bridalType,
}: {
    name: string;
    bridalType: string;
    image: string;
}) => (
    <div className='flex flex-col items-center justify-center w-fit px-5 mx-auto min-w-[200px]'>
        <Image
            src={image}
            alt={bridalType}
            width={150}
            height={150}
            className='rounded-sm overflow-clip mb-4'
        />
        <div className='rounded-full px-2 py-0.5 mx-auto !min-w-fit text-sm'>
            {name}
        </div>
        <div className='rounded-full py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD]'>
            {bridalType}
        </div>
    </div>
);
const GeneralInformation = ({
    data,
    status,
    supportingDocsArray,
}: {
    data: MarriageData;
    status: string;
    supportingDocsArray: supportDocType[];
}) => {
    console.log("supportingDocsArray", supportingDocsArray);
    const {
        data: husbandData,
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

    return (
        <div className=''>
            <p className='text-xl font-semibold border-b pb-7'>
                General Information
            </p>
            <div className='flex flex-col lg:flex-row w-full py-5 gap-y-5'>
                <ProfileCompnent
                    name={
                        husbandData
                            ? husbandData.personalInfo.localizedContent.en
                                  .firstName +
                              " " +
                              husbandData.personalInfo.localizedContent.en
                                  .middleName +
                              " " +
                              husbandData.personalInfo.localizedContent.en
                                  .lastName
                            : ""
                    }
                    bridalType='Groom'
                    image={
                        supportingDocsArray !== undefined &&
                        supportingDocsArray !== null &&
                        supportingDocsArray.length !== 0
                            ? supportingDocsArray?.find(
                                  (item: any) => item.fileType === "GROOM_PHOTO"
                              )?.fileUrl
                            : groom
                    }
                />

                {isHusbandLoading || isWifeLoading ? (
                    <div className='min-h-[2350px]'>
                        <Loader className='animate-spin' />
                    </div>
                ) : (
                    <Card className='rounded-md py-5 px-5 gap-2 w-full flex flex-col justify-center bg-[#E8EEFD]'>
                        {/* 
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Date of Marriage</p>
                            <p className='text-sm font-semibold w-fit'>
                                {husbandData?.localization[0]?.marriageDate}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Type of Marriage</p>
                            <p className='text-sm font-semibold w-fit'>
                                {husbandData?.localization[0]?.marriageType}
                            </p>
                        </div>{" "}
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Narriage Honor Record No.</p>
                            <p className='text-sm font-semibold w-fit'>
                                Date of Marriage
                            </p>
                        </div>{" "}
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>
                                Unique No. of the reg. office
                            </p>
                            <p className='text-sm font-semibold w-fit'>
                                Date of Marriage
                            </p>
                        </div>{" "}
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>
                                Marriage Certificate Unique No.
                            </p>
                            <p className='text-sm font-semibold w-fit'>
                                Date of Marriage
                            </p>
                        </div>
                     */}
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Date of Marriage</p>
                            <p className='text-sm font-semibold w-fit'>
                                {data?.localization[0]?.marriageDate}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Type of Marriage</p>
                            <p className='text-sm font-semibold w-fit'>
                                {data?.localization[0]?.marriageType}
                            </p>
                        </div>{" "}
                        <div className='w-full flex justify-between gap-x-5 gap-y-2'>
                            <p className='text-sm'>Status</p>
                            <p className='text-sm font-semibold w-fit'>
                                {status}
                            </p>
                        </div>
                    </Card>
                )}
                <ProfileCompnent
                    name={
                        wifeData
                            ? wifeData.personalInfo.localizedContent.en
                                  .firstName +
                              " " +
                              wifeData.personalInfo.localizedContent.en
                                  .middleName +
                              " " +
                              wifeData.personalInfo.localizedContent.en.lastName
                            : ""
                    }
                    bridalType='Bride'
                    image={
                        supportingDocsArray !== undefined &&
                        supportingDocsArray !== null &&
                        supportingDocsArray.length !== 0
                            ? supportingDocsArray?.find(
                                  (item: any) => item.fileType === "BRIDE_PHOTO"
                              )?.fileUrl
                            : bride
                    }
                />
            </div>
        </div>
    );
};

export default GeneralInformation;
