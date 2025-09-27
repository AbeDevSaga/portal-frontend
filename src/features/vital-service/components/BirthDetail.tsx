"use client";
import { Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import CertificateDialog from "@/common/components/common/CertificateDialog";

interface BirthDetailProps {
  data: any | null;
  loading?: boolean;
  error?: string;
  requestType?: "lost" | "damaged" | "correction" | "print";
}

export default function BirthDetail({
  data,
  loading,
  error,
  requestType,
}: BirthDetailProps) {
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);

  const requirementsandaction = [
    {
      title: "Correction",
      details: [
        "For Name Change, the person must provide court letter",
        "For age correction if the new age is two years less than or greater than current age, court letter must be provided",
        "For Spelling correction, user consent is enough",
      ],
      buttonTitle: "Request Correction",
      paymentAmount: 250,
    },
    {
      title: "Lost",
      details: [
        "Confirmation letter from woreda police department is required",
      ],
      buttonTitle: "Request Lost Certificate",
      paymentAmount: 250,
    },
    {
      title: "Damaged",
      details: ["The Damaged certificate must be presented"],
      buttonTitle: "Request Damaged Certificate",
      paymentAmount: 250,
    },
    {
      title: "Print",
      details: [],
      buttonTitle: "Request Print Certificate",
      paymentAmount: 250,
    },
  ];

  const requestTransaction = requestType
    ? requirementsandaction.filter(
        (item) => item.title.toLowerCase() === requestType.toLowerCase()
      )
    : requirementsandaction;

  const handleRenderApplicationDecisionButtons = (status: string) => {
    if (status === "SUBMITTED")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 font-medium">
            SUBMITTED
          </div>
        </div>
      );
    if (status === "UNDER_REVIEW")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 py-2 rounded-md bg-orange-200 text-orange-700 font-medium">
            UNDER REVIEW
          </div>
        </div>
      );
    if (status === "APPROVED")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 py-2 rounded-md bg-green-200 text-green-700 font-medium">
            APPROVED
          </div>
          <Button
            className="bg-[#073954] hover:bg-[#062c3d]"
            onClick={() => setShowCertificateDialog(true)}
            disabled={loading}
          >
            View Certificate
          </Button>
        </div>
      );
    if (status === "REJECTED")
      return (
        <div className="px-5 py-2 rounded-md bg-red-200 text-red-700 font-medium">
          REJECTED
        </div>
      );
    return null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "2000-01-01";
    return dateString.split(" ")[0];
  };

  const renderBasicInfo = () => {
    const d = data?.personal_info;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col items-center w-full md:w-1/3 space-y-3">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-md border">
              <Image
                src={child_image || "/images/groom.svg"}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-base text-[#073954] font-semibold">
              {d.first_name || "MockFirst"} {d.last_name || "MockLast"}
            </div>
          </div>

          <div className="flex flex-col w-full md:w-2/3 gap-4">
            <span className="font-semibold text-[#073954] text-lg">
              Basic Information
            </span>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Application Number</p>
              <p className="text-sm font-semibold">
                {d.registration_form_number || "APP-123456"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold">
                {d.phone_number || "0912345678"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="text-sm font-semibold">
                {d.nationality_name || "Ethiopian"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicationInfo = () => {
    const d = data;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Application
        </span>
        <div className="flex flex-col md:flex-row w-full">
          <div className="gap-2 min-w-[250px] flex flex-col w-full">
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Service</p>
              <p className="text-sm font-semibold">Birth</p>
            </div>
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Service Type</p>
              <p className="text-sm font-semibold">New</p>
            </div>
            <div className="w-full flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-sm font-semibold">
                {d.registrationStatus || "APPROVED"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBirthInfo = () => {
    const d = data;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Birth Information
        </span>
        <div className="gap-2 flex flex-col w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Country of Birth</p>
            <p className="text-sm font-semibold">
              {d.nationalityName || "Ethiopia"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Region</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "Addis Ababa"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Zone/Subcity</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.zone?.localizedContent?.en?.name ||
                "Arada"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Woreda</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.woreda?.localizedContent?.en?.name ||
                "Woreda 05"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Kebele</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.kebele || "Kebele 15"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Specific Location</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "Black Lion Hospital"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Birth Date</p>
            <p className="text-sm font-semibold">
              {formatDate(d.birthDate) || "2000-01-01"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLegalInfo = () => {
    const d = data;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Legal Information
        </span>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Digital Registration No</p>
            <p className="text-sm font-semibold">
              {d.registrationFormNumber || "REG-123456"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Passport No</p>
            <p className="text-sm font-semibold">A1234567</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">FIN</p>
            <p className="text-sm font-semibold">FIN-987654</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Driver's License No</p>
            <p className="text-sm font-semibold">DL-12345</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Marital Status</p>
            <p className="text-sm font-semibold">Single</p>
          </div>
        </div>
      </div>
    );
  };

  const renderEducationInfo = () => {
    const d = data;
    if (!d) return null;

    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold text-[#073954] text-lg">
          Education and Work Information
        </span>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Education Level</p>
            <p className="text-sm font-semibold">Bachelor's Degree</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Occupation Type</p>
            <p className="text-sm font-semibold">Software Engineer</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Work Place Name</p>
            <p className="text-sm font-semibold">Tech Company</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAttachments = () => {
    const attachments = data?.personal_info?.attachments || [
      { fileName: "BirthCertificate.pdf", fileType: "PDF", url: "#" },
    ];

    return (
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-[#073954] text-lg">
          Attachments
        </span>
        {attachments.map((att: any, idx: number) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="text-sm font-semibold">{att.fileName}</p>
              <p className="text-xs text-gray-500">{att.fileType}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(att.url, "_blank")}
            >
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <HeroSection
        redirectTo="/application"
        title="Birth Detail"
        description="This is the birth detail for your lost birth certificate"
        action={
          <div className="space-y-5 space-x-5">
            {handleRenderApplicationDecisionButtons(
              data ? data?.registrationStatus : ""
            )}
          </div>
        }
      />

      <div className="w-full flex flex-wrap xl:flex-nowrap gap-6">
        {loading && (
          <Card className="flex-1 flex items-center justify-center min-h-[350px]">
            <Loader className="animate-spin text-[#073954]" />
          </Card>
        )}

        {data && (
          <Card className="w-full md:w-2/3 flex flex-col p-6 shadow-md border rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-3">{renderBasicInfo()}</div>
              <div className="md:col-span-2">{renderApplicationInfo()}</div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">{renderBirthInfo()}</div>
              <div className="flex-1">{renderLegalInfo()}</div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">{renderEducationInfo()}</div>
              <div className="flex-1">{renderAttachments()}</div>
            </div>
          </Card>
        )}

        <div className="w-full md:w-1/3 flex flex-col gap-5">
          <Card className="p-5 space-y-4 shadow-md border rounded-xl">
            <p className="text-lg font-semibold text-[#073954]">
              Requirements and Actions
            </p>
            <div className="space-y-4">
              {requestTransaction.map((item) => (
                <Card
                  key={item.title}
                  className="p-4 space-y-3 bg-[#E8EEFD] border border-[#204D66] rounded-lg"
                >
                  <p className="font-semibold text-[#073954]">{item.title}</p>
                  {item.details.map((d) => (
                    <div key={d} className="flex gap-2 items-start">
                      <Check size={18} className="text-[#073954] mt-0.5" />
                      <p className="text-sm">{d}</p>
                    </div>
                  ))}
                  <div className="rounded-md px-4 py-2 flex items-center gap-2 bg-[#FFF6E0]">
                    <Info fill="orange" color="white" />
                    <p className="text-sm">
                      You are asked to pay {item.paymentAmount} Br
                    </p>
                  </div>
                  <Button className="bg-[#073954] hover:bg-[#062c3d] w-full">
                    {item.buttonTitle}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <CertificateDialog
        open={showCertificateDialog}
        handleCancel={setShowCertificateDialog}
        certificateData={data}
      />
    </>
  );
}
