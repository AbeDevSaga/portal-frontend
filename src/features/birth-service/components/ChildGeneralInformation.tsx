import { useGetResidentDataByIdQuery } from "@/features/application-service/api/residentApi";
import { BirthData } from "../types";
import { Loader } from "lucide-react";
import { Card } from "@/common/components/ui/card";

const ChildGeneralInformation = ({
    data,
    status,
}: {
    data: BirthData;
    status: string;
}) => {
    const {
        data: childData,
        isLoading: isChildLoading,
        isError: isChildError,
    } = useGetResidentDataByIdQuery(
        { id: data?.husband! },
        {
            skip: !data?.husband,
            refetchOnMountOrArgChange: true,
        }
    );
    return (
        <div className=''>
            <p className='text-xl font-semibold border-b pb-7'>
                Child's General Information
            </p>
            <div className='flex flex-col lg:flex-row w-full py-5 gap-y-5'>
                {isChildLoading ? (
                    <div className='min-h-[2350px]'>
                        <Loader className='animate-spin' />
                    </div>
                ) : (
                    <Card className='rounded-md py-5 px-5 gap-2 w-full flex flex-col justify-center bg-[#E8EEFD]'>
                        <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                            <p className='text-sm'>Birth Type</p>
                            <p className='text-sm font-semibold w-fit'>
                                {data?.localization[0]?.birthType}
                            </p>
                        </div>
                    </Card>

                )}
            </div>
        </div>
    );
}

export default ChildGeneralInformation;