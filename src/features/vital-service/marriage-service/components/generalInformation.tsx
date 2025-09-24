import React from "react";
import Image from "next/image";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";

const ProfileComponent = ({
  image,
  name,
  bridalType,
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
        </div>

        {/* Bride */}
        <ProfileComponent name={wifeName} bridalType="Bride" image={bride} />
      </div>
    </div>
  );
};

export default GeneralInformation;
