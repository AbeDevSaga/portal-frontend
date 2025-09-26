import Image from "next/image";
import father from "@/public/images/groom.svg";
import { Card } from "@/common/components/ui/card";
import { useGetNationalityDataByIdQuery, useGetReligionDataByIdQuery, useGetResidentDataByIdQuery } from "@/features/application-service/api/residentApi";
import { BirthData } from "../types";
// import { Item } from "@radix-ui/react-accordion";
const handleConvertDate = (date: string) => {
    const dateOnly = date.split("T")[0];
    return dateOnly;
};
const ProfileCompnent = ({
    image,
    name,
    // bridalType,
}: {
    name: string;
    // bridalType: string;
    image: string;
}) => (
    <div className='p-5 flex flex-col items-center'>
        <Image
            src={image}
            alt={"Child's Father Information"}
            width={150}
            height={150}
            className='rounded-sm overflow-clip mb-4'
        />
        <div className='rounded-full px-2 py-0.5 mx-auto text-sm text-[#073954]'>
            {name}
        </div>
        {/* <div className='rounded-full py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD] text-[#073954] font-semibold'>
            {bridalType}
        </div> */}
    </div>
);
const FatherGeneralInformation = ({
    fatherData,
}: {
    fatherData: BirthData;
}) => {
    const { data, isLoading, isError } = useGetResidentDataByIdQuery(
        { id: fatherData.fatherId! },
        {
            skip: !fatherData.fatherId,
            refetchOnMountOrArgChange: true,
        }
    );
    // const fatherDetailData: any = data?.content?.find((item: any) => item.id === fatherData.fatherId)
    const fatherDetailData: any = data?.personalInfo;
        console.log("Father data abo", fatherDetailData);

    const {
        data: religionData,
        isLoading: isReligionLoading,
        isError: isReligionError,
    } = useGetReligionDataByIdQuery(
        { id: fatherDetailData?.religion! },
        {
            skip: !fatherDetailData?.religion,
            refetchOnMountOrArgChange: true,
        }
    );
    const relegionDetailDataEn: any = religionData?.localizedContent?.en;
    console.log("Husband data r", relegionDetailDataEn); 

    const {
        data: nationalityData,
        isLoading: isNationalityLoading,
        isError: isNationalityError,
    } = useGetNationalityDataByIdQuery(
        { id: fatherDetailData?.nationality! },
        {
            skip: !fatherDetailData?.nationality,
            refetchOnMountOrArgChange: true,
        }
    );
    const nationalityDetailDataEn: any = nationalityData?.localizedContent?.en
    console.log("Husband data n", nationalityDetailDataEn); 
    return (

        <div className='flex flex-col lg:flex-row gap-5 w-full py-5'>
            <Card className='flex flex-col md:flex-row w-full'>
                <ProfileCompnent
                    name={
                        data
                            ? fatherDetailData?.localizedContent.en.firstName +
                            " " +
                            fatherDetailData?.localizedContent.en.middleName +
                            " " +
                            fatherDetailData?.localizedContent.en.lastName
                            : ""
                    }
                    // bridalType={type}
                    image={father}
                />
                <div className='rounded-md py-5 px-5 gap-2 min-w-fit flex flex-col justify-center w-full'>
                    {/* <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Registration Number</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {fatherDetailData?.urid || "-"}
                        </p>
                    </div> */}
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Date of Birth</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {fatherDetailData?.dateOfBirth || "----"}
                        </p>
                    </div>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Phone number</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {fatherDetailData?.mobileNumber || "----"}
                        </p>
                    </div>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Email</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {fatherDetailData?.email || "----"}
                        </p>
                    </div>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Nationality</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {nationalityDetailDataEn?.name || "----"}
                        </p>
                    </div>
                    <div className='w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2'>
                        <p className='text-sm'>Father's Religion</p>
                        <p className='text-sm text-right font-semibold w-fit'>
                            {relegionDetailDataEn?.name || "----"}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default FatherGeneralInformation;