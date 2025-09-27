"use client";
import React from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import resident from "@/common/utils/constants/mock/resident-mock";
import PersonalInformation from "./PersonalInformation";

const requestHistory = resident[0].requestHistory;
// generate color for the left border of the request history
// for based on the status
const requestHistoryColor: Record<string, string> = {
  Pending: "#F59E0B",
  Authorized: "#10B981",
  Issued: "#3B82F6",
  Rejected: "#EF4444",
};
const certificates = resident[0].personal_info.attachments;

const personalInformation = {
  image: resident[0].personal_info.profile_picture,
  id: resident[0].personal_info.national_id,
  nationality: resident[0].personal_info.nationality_name,
  nationalIDNumber: resident[0].personal_info.national_id,
  dateOfBirth: resident[0].personal_info.date_of_birth,
  gender: resident[0].personal_info.gender,
  currentLivingAddress: resident[0].personal_info.address.region,
  religion: resident[0].personal_info.religion,
  earlyMaritalStatus: "Divorced",
  educationalStatus: resident[0].personal_info.occupation,
  birthInfo: {
    country: resident[0].personal_info.nationality_name,
    region: resident[0].personal_info.address.region,
    zone: resident[0].personal_info.address.zone,
    woreda: resident[0].personal_info.address.woreda,
    kebele: resident[0].personal_info.address.kebele,
  },
};

const page = () => {
  return (
    <>
      <HeroSection
        redirectTo="/family-members"
        title="Family Member Detail"
        description=""
        action={
          <div className="space-x-5">
            <Button className="bg-[#073954]">Request Birth Certificate</Button>{" "}
            <Button className="bg-[#073954]">Request Death Certificate</Button>{" "}
          </div>
        }
      />

      <div className="flex w-full">
        <div className="flex flex-col w-full mr-5">
          <PersonalInformation personalInformation={personalInformation} />
          <div className="flex flex-col mt-5 px-4 py-5 border rounded-lg">
            <h1 className="text-lg font-semibold mb-5">Certificates</h1>
            <div className="flex flex-col   gap-3 p-2 rounded-md px-5">
              {certificates.map((certificate, index) => (
                <div className="flex w-full justify-between px-3 rounded-md py-4  bg-slate-50 border" key={index}>
                  <div className="flex gap-4">
                    <img
                      src="/images/file.svg"
                      alt="certificate"
                      className="w-10 h-10"
                    />
                    <div className="flex flex-col">
                      <h1 className="text-sm font-semibold">
                        {certificate.fileName}
                      </h1>
                      <p className="text-sm text-gray-500">
                        {certificate.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open(certificate.url, "_blank")}
                    className=" bg-[#073954] outline-none  text-white font-semibold min-w-36  hover:bg-[#073954] hover:text-white"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* make the bg ligth white */}
        <div className="w-full md:w-6/12 bg-white shadow-md rounded-md p-4 ">
          {/* request history */}
          <div className="w-full ">
            <p className="text-base font-semibold mb-5">Request History</p>

            {requestHistory &&
              requestHistory?.map((item, index) => (
                <div
                  style={{ borderLeftColor: requestHistoryColor[item.status as string] }}
                  className={`flex w-full mt-2 rounded-md border-l-8 cursor-pointer hover:bg-slate-50  bg-slate-100 b p-2 px-4   items-center `}
                >
                  <div className="flex  gap-2 w-full " key={index}>
                    <div className="flex flex-col gap-2">
                      <img
                        src="/images/certificate.png"
                        alt="divorce"
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <p className="text-sm font-semibold">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                   <div
                     className="flex justify-between rounded-full px-4 gap-2 text-xs py-1 text-white"
                     style={{ backgroundColor: requestHistoryColor[item.status as string] }}
                   >
                     {item.status}
                   </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
