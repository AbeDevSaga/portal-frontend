import React from "react";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import groom from "@/public/images/groom.svg";
import bride from "@/public/images/bride.svg";
import { MarriageData } from "../types";


const ProfileComponent = ({
  image,
  name,
  bridalType,
}: {
  name?: string;
  bridalType: string;
  image: string;
}) => (
  <div className="flex flex-col items-center justify-center w-fit px-5 mx-auto ">
    <Image
      src={image}
      alt={bridalType}
      width={100}
      height={100}
      className="rounded-sm overflow-clip mb-1"
    />
    <div className="rounded-full text-center font-medium text-gray-800 text-sm px-2 py-0.5 mx-auto !min-w-fit">
      {name || "N/A"}
    </div>
    <div className="rounded-full mt-2 py-0.5 mx-auto border text-sm px-8 bg-[#E8EEFD]">
      {bridalType}
    </div>
  </div>
);

const InformationComponent = ({
  person,
  type,
}: {
  type: string;
  person: any;
}) => {
  const personal = person?.personalInfo;
  const fullName = personal
    ? `${personal.localizedContent?.en?.firstName ?? ""} ${
        personal.localizedContent?.en?.middleName ?? ""
      } ${personal.localizedContent?.en?.lastName ?? ""}`
    : "";

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full py-5">
      <Card className="flex flex-col md:flex-row w-full">
        <ProfileComponent
          name={fullName}
          bridalType={type}
          image={type === "Groom" ? groom : bride}
        />

        <div className="rounded-md py-5 px-5 gap-2 min-w-fit flex flex-col justify-center w-full">
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Nationality</p>
            <p className="text-sm text-right font-semibold w-fit">
              {personal?.nationality?.localizedContent?.en?.name ?? "--"}
            </p>
          </div>
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Marital Status</p>
            <p className="text-sm text-right font-semibold w-fit">
              {personal?.maritalStatus?.localizedContent?.en?.name ?? "Single"}
            </p>
          </div>
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Date of Birth</p>
            <p className="text-sm text-right font-semibold w-fit">
              {personal?.dateOfBirth ?? "--"}
            </p>
          </div>
          <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
            <p className="text-sm">Religion</p>
            <p className="text-sm text-right font-semibold w-fit">
              {personal?.religion?.localizedContent?.en?.name ?? "--"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="min-w-[250px] p-5">
        <p className="text-lg font-semibold text-[#073954]">
          Birth Information
        </p>
        <div className="py-5 gap-2 min-w-fit flex flex-col justify-center">
          <div className="flex justify-between border-b">
            <p className="text-sm">Country</p>
            <p className="text-sm font-semibold w-fit text-right">
              {personal?.nationality?.localizedContent?.en?.name ?? "--"}
            </p>
          </div>
          <div className="flex justify-between border-b">
            <p className="text-sm">Region</p>
            <p className="text-sm font-semibold w-fit text-right">
              {person?.currentAddress?.region?.localizedContent?.en?.name ??
                "--"}
            </p>
          </div>
          <div className="flex justify-between border-b">
            <p className="text-sm">Zone</p>
            <p className="text-sm font-semibold w-fit text-right">
              {person?.currentAddress?.zone?.localizedContent?.en?.name ?? "--"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Woreda</p>
            <p className="text-sm font-semibold w-fit text-right">
              {person?.currentAddress?.woreda?.localizedContent?.en?.name ??
                "--"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const BridalInformation = ({ data }: { data: any }) => {
  return (
    <div>
      <p className="text-xl font-semibold border-b pb-7 text-[#073954]">
      Groom & Bridal Information
      </p>
      <InformationComponent person={data.husband} type="Groom" />
      <InformationComponent person={data.wife} type="Bride" />
    </div>
  );
};

export default BridalInformation;
