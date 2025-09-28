import React from "react";

const PersonalInformation = ({
  personalInformation,
}: {
  personalInformation: any;
}) => {
  return (
    <div className="flex w-full border rounded-2xl">
      <div className="flex flex-col min-w-40  p-4 ">
        <img
          src={personalInformation.image}
          alt="personal information"
          className="w-40  rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col  w-full  p-4 pl-0 rounded-md">
        <div className="py-2 border-b flex justify-between">
          <p className="text-sm">Nationality</p>
          {/* ethiopia flag here */}
          <p className="text-sm font-semibold flex items-center gap-2">
            <img src="/images/ethiopia.png" alt="ethiopia" className="w-6 h-4" />
            {personalInformation.nationality}
          </p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">National ID Number</p>
          <p className="text-sm font-semibold">{personalInformation.nationalIDNumber}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Date of Birth</p>
          <p className="text-sm font-semibold">{personalInformation.dateOfBirth}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Current Living Address</p>
          <p className="text-sm font-semibold">{personalInformation.currentLivingAddress}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Religion</p>
          <p className="text-sm font-semibold">{personalInformation.religion}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Early Marital Status</p>
          <p className="text-sm font-semibold">{personalInformation.earlyMaritalStatus}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Educational Status</p>
          <p className="text-sm font-semibold">{personalInformation.educationalStatus}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Gender</p> 
          <p className="text-sm font-semibold">{personalInformation.gender}</p>
        </div>  
        <div className="flex pt-2 justify-between">
          <p className="text-sm">Marital Status</p>
          <p className="text-sm font-semibold">{personalInformation.maritalStatus}</p>
        </div>
      </div>
      <div className="flex flex-col border-l min-w-[250px] p-4 rounded-md">
        <p className="text-base font-semibold">Birth Information</p>
        <div className="py-2 border-b flex justify-between">
          <p className="text-sm">Country</p>
          <p className="text-sm font-semibold flex items-center gap-2">
            <img src="/images/ethiopia.png" alt="ethiopia" className="w-6 h-4" />
            {personalInformation.birthInfo.country}
          </p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Region</p>
          <p className="text-sm font-semibold">{personalInformation.birthInfo.region}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Zone</p>
          <p className="text-sm font-semibold">{personalInformation.birthInfo.zone}</p>
        </div>
        <div className="border-b py-2 flex justify-between">
          <p className="text-sm">Woreda</p>
          <p className="text-sm font-semibold">{personalInformation.birthInfo.woreda}</p>
        </div>
        <div className="  py-2 flex justify-between">
          <p className="text-sm">Kebele</p>
          <p className="text-sm font-semibold">{personalInformation.birthInfo.kebele}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
