import { useGetResidentDataByIdQuery } from "@/features/application-service/api/residentApi";
import { BirthData } from "../types";
import { Loader } from "lucide-react";
import { Card } from "@/common/components/ui/card";
const handleConvertDate = (date: string) => {
    const dateOnly = date.split("T")[0];
    return dateOnly;
};
const ChildGeneralInformation = ({
    data,
    status,
}: {
    data: BirthData;
    status: string;
}) => {
    const localizedDataEn = data?.localizations?.find((item: any) => item.languageCode === "en");

    console.log("the child data is", localizedDataEn)
    return (
        <div className=''>
            <p className='text-xl font-semibold border-b pb-7'>
                Child's General Information
            </p>
            <div className='flex flex-col lg:flex-row w-full py-5 gap-y-5'>
                {/* {isChildLoading ? (
                    <div className='min-h-[2350px]'>
                        <Loader className='animate-spin' />
                    </div>
                ) : ( */}
                    <Card className='rounded-md py-5 px-5 gap-2 w-full flex flex-col justify-center bg-[#E8EEFD]'>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Birth Type</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.birthType || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's First Name</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.childFirstName || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Gender</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.gender || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Birth Date</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.birthDate || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Birth Time Weight</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.childWeight || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Birth Time Height</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.childHeight || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Birth Attendant Name</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.attendantName || "-"}
                            </p>
                        </div>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Child's Birth Attendant Qualification</p>
                            <p className='text-sm font-semibold w-fit'>
                                {localizedDataEn?.attendantQualification || "-"}
                            </p>
                        </div>
                    </Card>

                {/* )} */}
            </div>
        </div>
    );
}

export default ChildGeneralInformation;