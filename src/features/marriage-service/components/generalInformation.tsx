import React from "react";
import Image from "next/image";
import { Card } from "@/common/components/ui/card";
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
  <div className="flex flex-col items-center justify-center w-fit px-5 mx-auto min-w-[200px]">
    <Image
      src={image}
      alt={bridalType}
      width={150}
      height={150}
      className="rounded-sm overflow-clip mb-4"
    />
    <div className="rounded-full px-2 py-0.5 mx-auto !min-w-fit text-sm">
      {name || "N/A"}
    </div>
    <div className="rounded-full py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD]">
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
      <div className="flex flex-col lg:flex-row w-full py-5 gap-y-5">
        {/* Groom */}
        <ProfileComponent name={husbandName} bridalType="Groom" image={groom} />

        {/* Info Card */}
        <Card className="rounded-md py-5 px-5 gap-2 w-full flex flex-col justify-center bg-[#E8EEFD]">
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Registration Form Number</p>
            <p className="text-sm font-semibold w-fit">
              {data?.registrationFormNumber || "N/A"}
            </p>
          </div>
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Marriage Request ID</p>
            <p className="text-sm font-semibold w-fit">
              {data?.marriageRequestId || "N/A"}
            </p>
          </div>
          <div className="w-full flex justify-between gap-x-5 gap-y-2">
            <p className="text-sm">Status</p>
            <p className="text-sm font-semibold w-fit">{data?.status || "N/A"}</p>
          </div>
        </Card>

        {/* Bride */}
        <ProfileComponent name={wifeName} bridalType="Bride" image={bride} />
      </div>
    </div>
  );
};

export default GeneralInformation;
