import React from "react";
import Image from "next/image";
import { Card } from "@/common/components/ui/card";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";
<<<<<<< HEAD

const ProfileComponent = ({
  image,
  name,
  bridalType,
=======
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
>>>>>>> gitlab1/main
}: {
  name?: string;
  bridalType: string;
  image: string;
}) => (
  <div className="flex flex-col items-center justify-center w-fit mx-auto min-w-[150px]">
    <Image
      src={image}
      alt={bridalType}
      width={100}
      height={100}
      className="rounded-sm overflow-clip mb-1"
    />
    <div className="rounded-full text-center font-medium text-gray-800 text-base px-2 py-0.5 mx-auto !min-w-fit">
      {name || "N/A"}
    </div>
    <div className="rounded-full mt-2 py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD]">
      {bridalType}
    </div>
  </div>
);
<<<<<<< HEAD

const GeneralInformation = ({
  data,
}: {
  data: any; 
}) => {
  const husbandName =
    data?.husband?.personalInfo?.localizedContent?.en?.firstName +
      " " +
      data?.husband?.personalInfo?.localizedContent?.en?.middleName +
      " " +
      data?.husband?.personalInfo?.localizedContent?.en?.lastName || "";

  const wifeName =
    data?.wife?.personalInfo?.localizedContent?.en?.firstName +
      " " +
      data?.wife?.personalInfo?.localizedContent?.en?.middleName +
      " " +
      data?.wife?.personalInfo?.localizedContent?.en?.lastName || "";

  return (
    <div>
      <p className="text-xl font-semibold border-b pb-7">General Information</p>
      <div className="flex flex-col justify-between lg:flex-row w-full py-5 gap-y-5">
        {/* Groom */}
        <ProfileComponent name={husbandName} bridalType="Groom" image={groom} />

        {/* Info Section */}
        <div className="py-6 px-5 gap-4 w-full flex flex-col justify-center bg-gradient-to-br from-slate-50 to-blue-50 ">
          <div className="w-full flex justify-between items-center gap-x-5 gap-y-2 border-b border-gray-200 pb-3">
            <p className="text-sm font-medium text-slate-700">Registration Form Number</p>
            <p className="text-sm font-semibold text-slate-900 w-fit text-right">
              {data?.registrationFormNumber || "N/A"}
            </p>
          </div>
          <div className="w-full flex justify-between items-center gap-x-5 gap-y-2 border-b border-gray-200 pb-3">
            <p className="text-sm font-medium text-slate-700">Marriage Request ID</p>
            <p className="text-sm font-semibold text-slate-900 w-fit text-right">
              {data?.marriageRequestId || "N/A"}
            </p>
          </div>
          <div className="w-full flex justify-between items-center gap-x-5 gap-y-2">
            <p className="text-sm font-medium text-slate-700">Status</p>
            <p className="text-sm font-semibold text-slate-900 w-fit text-right">{data?.status || "N/A"}</p>
          </div>
=======
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
>>>>>>> gitlab1/main
        </div>

        {/* Bride */}
        <ProfileComponent name={wifeName} bridalType="Bride" image={bride} />
      </div>
    </div>
  );
};

export default GeneralInformation;
