"use client";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import witnessImage from "@/public/images/groom.svg";

const marriageDetailOptions = [
  {
    label: "Groom's",
    value: "husbandWetness",
  },
  {
    label: "Bride's",
    value: "wifeWetness",
  },
];

const WitnessInformation = ({ data }: { data: any }) => {
  const [displayData, setDisplayData] = useState("husbandWetness");

  // filter witnesses by prefix (husbandWetnessOne, wifeWetnessTwo, etc.)
  const witnesses = data
    ? Object.keys(data)
        .filter((key) => key.startsWith(displayData))
        .map((key) => data[key])
        .filter(Boolean)
    : [];

  const ProfileCompnent = ({
    image,
    signiture,
    name,
  }: {
    name: string;
    signiture: string;
    image: string;
  }) => (
    <div className="px-5 flex flex-col items-center">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-sm overflow-clip mb-4"
      />
      <Image
        src={signiture}
        alt={"signiture" + name}
        width={80}
        height={80}
        className="rounded-sm overflow-clip mb-4"
      />
    </div>
  );

  const WitnessComponent = ({ data }: { data: any }) => {
    // pick English if available, fallback to Amharic
    const localized =
      data?.personalInfo?.localizedContent?.en ||
      data?.personalInfo?.localizedContent?.am;

    const fullName = localized
      ? `${localized.firstName || ""} ${localized.middleName || ""} ${
          localized.lastName || ""
        }`.trim()
      : "";

    return (
      <div className="flex flex-col lg:flex-row w-full py-2">
        <Card className="rounded-sm py-5 px-5 gap-2 w-full flex bg-[#F8F8F8]">
          <ProfileCompnent
            image={witnessImage.src}
            signiture={witnessImage.src}
            name="witness"
          />
          <div className="flex flex-col w-full">
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2 border-b">
              <p className="text-sm">Full Name</p>
              <p className="text-sm font-semibold w-fit">{fullName}</p>
            </div>
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2 border-b">
              <p className="text-sm">National ID Number</p>
              <p className="text-sm font-semibold w-fit">
                {data?.personalInfo?.nationalId || "—"}
              </p>
            </div>
            <div className="flex-1 w-full flex items-center justify-between gap-x-5 gap-y-2">
              <p className="text-sm">Current Living Address</p>
              <p className="text-sm font-semibold w-fit">
                {data?.currentAddress?.region?.localizedContent?.en?.name ||
                  "—"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="">
      <p className="text-xl font-semibold border-b pb-7 text-[#073954]">
        Witness Information
      </p>
      <div className="py-5">
        <Card className="space-x-2 w-fit bg-gray-200 py-2 px-5 rounded-sm flex flex-col md:flex-row">
          {marriageDetailOptions.map((component) => (
            <Button
              onClick={() => setDisplayData(component.value)}
              key={component.value}
              variant={component.value === displayData ? "default" : "bare"}
              className="px-10 py-2.5 flex items-center gap-2"
            >
              {component.label}
            </Button>
          ))}
        </Card>
      </div>

      <div className="w-full overflow-y-scroll max-h-[500px]">
        {witnesses.map((witness, index) => (
          <WitnessComponent data={witness} key={index} />
        ))}
      </div>
    </div>
  );
};

export default WitnessInformation;
