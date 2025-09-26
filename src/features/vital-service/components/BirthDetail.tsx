"use client";
import { Check, Copy, Eye, Info, Loader } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import { mockBirthResponse } from "@/common/utils/constants/mock/birth";
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
          <div className="px-5 text-center py-2 rounded-sm bg-gray-400/50">
            SUBMITTED
          </div>
        </div>
      );
    if (status === "UNDER_REVIEW")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 text-center py-2 rounded-sm bg-orange-400/50">
            UNDER_REVIEW
          </div>
        </div>
      );
    if (status === "APPROVED")
      return (
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 text-center py-2 rounded-sm bg-green-400/50">
            APPROVED
          </div>
          <Button
            className="bg-[#073954]"
            onClick={() => setShowCertificateDialog(true)}
            disabled={loading}
          >
            View Certificate
          </Button>
        </div>
      );
    if (status === "REJECTED")
      return (
        <div className="px-5 text-center py-2 rounded-sm bg-red-400/50">
          REJECTED
        </div>
      );
    return null;
  };

  // Format date to display only the date part
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return dateString.split(" ")[0];
  };

  // Format time to display only the time part
  const formatTime = (dateString: string) => {
    if (!dateString) return "-";
    const timePart = dateString.split(" ")[1];
    return timePart ? timePart.substring(0, 5) : "-";
  };

  // Inline Info Sections (instead of external components)
  /** BASIC INFO */
  const renderBasicInfo = () => {
    const d = data?.personal_info;
    if (!d) return null;

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Profile */}
          <div className="flex flex-col space-y-2 items-center w-full md:w-1/3">
            <div className="relative w-full max-w-[250px] aspect-square rounded-full overflow-hidden">
              <Image
                src={child_image || "/images/groom.svg"}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="text-sm text-[#073954] font-medium">
              {d.first_name} {d.last_name}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col max-w-[250px] md:w-2/3 gap-3">
            <span className="font-semibold">Basic Information</span>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Application Number</p>
              <p className="text-sm font-semibold">
                {d.registration_form_number}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold">{d.phone_number || "-"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="text-sm font-semibold">{d.nationality_name}</p>
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
        <span className="text-left font-semibold">Application</span>
        <div className="flex flex-col md:flex-row w-full">
          <div className="gap-2 max-w-[250px] flex flex-col justify-center w-full">
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Service</p>
              <p className="text-sm text-right font-semibold w-fit">Birth</p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Service Type</p>
              <p className="text-sm text-right font-semibold w-fit">New</p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Status</p>
              <p className="text-sm text-right font-semibold w-fit">
                {d.registrationStatus || "-"}
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
        <span className="text-left font-semibold">Birth Information</span>
        <div className="gap-2 min-w-[250px] flex flex-col justify-center w-full">
          <div className="flex justify-between space-x-5 border-b pb-2">
            <p className="text-sm text-gray-600">Country of Birth</p>
            <p className="text-sm font-semibold">{d.nationalityName || "-"}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Region</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Zone/Subcity</p>
            <p className="text-sm font-semibold">
              {/* Using father's current zone as placeholder */}
              {d.fatherId?.currentAddress?.zone?.localizedContent?.en?.name ||
                "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Woreda</p>
            <p className="text-sm font-semibold">
              {/* Using father's current woreda as placeholder */}
              {d.fatherId?.currentAddress?.woreda?.localizedContent?.en?.name ||
                "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Kebele</p>
            <p className="text-sm font-semibold">
              {d.fatherId?.currentAddress?.kebele || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Specific Location</p>
            <p className="text-sm font-semibold">
              {d.placeOfBirth?.facilityName || "-"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Birth Date</p>
            <p className="text-sm font-semibold">
              {formatDate(d.birthDate) || "-"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLegalInfo = () => {
    const d = data;
    if (!d) return null;
    // const child = d.localizations[0];

    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold">Legal Information</span>
        <div className="gap-2 min-w-[250px] flex flex-col justify-center w-full">
          <div className="flex justify-between space-x-5 border-b pb-2">
            <p className="text-sm text-gray-600">Digital Registration No</p>
            <p className="text-sm font-semibold">
              {d.registrationFormNumber || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Passport No</p>
            <p className="text-sm font-semibold">
              {/* Not in JSON */}
              "-"
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">FIN</p>
            <p className="text-sm font-semibold">
              {/* Not in JSON */}
              "-"
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Drivers License No</p>
            <p className="text-sm font-semibold">
              {/* Not in JSON */}
              "-"
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Marital Status</p>
            <p className="text-sm font-semibold">
              {/* Not in JSON */}
              "-"
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderLineSeparator = () => {
    return (
      <div className="w-full py-4">
        <div className="w-full h-[2px] bg-gray-200 rounded"></div>
      </div>
    );
  };

  const renderEducationInfo = () => {
    const d = data;
    if (!d) return null;

    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold">
          Education and Work Information
        </span>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full min-w-[250px] gap-2 flex flex-col justify-center">
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Education Level</p>
              <p className="text-sm text-right font-semibold w-fit">
                {/* Not in JSON */}
                "-"
              </p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Occupation Type</p>
              <p className="text-sm text-right font-semibold w-fit">
                {/* Not in JSON */}
                "-"
              </p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Work Place Name</p>
              <p className="text-sm text-right font-semibold w-fit">
                {/* Not in JSON */}
                "-"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /** ATTACHMENTS */
  const renderAttachments = () => {
    const attachments = data?.personal_info?.attachments || [];
    if (!attachments.length) return null;

    return (
      <div className="flex flex-col gap-3">
        <span className="font-semibold">Attachments</span>
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

      <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
        {loading ? (
          <Card className="flex-1 flex items-center justify-center min-h-[350px] h-fit">
            <Loader className="animate-spin" />
          </Card>
        ) : null}

        {/* Information Section */}
        {data ? (
          <Card className="w-full md:w-2/3 flex flex-col p-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 h-fit">
              <div className="w-full md:col-span-3 h-fit">
                {renderBasicInfo()}
              </div>
              <div className="w-full md:col-span-2 h-fit">
                {renderApplicationInfo()}
              </div>
            </div>
            {renderLineSeparator()}
            <div className="flex flex-col md:flex-row item-center justify-between gap-5 h-fit">
              <div className="h-fit flex-1">{renderBirthInfo()}</div>
              <div className="h-fit flex-1">{renderLegalInfo()}</div>
            </div>
            {renderLineSeparator()}
            <div className="flex flex-col md:flex-row item-center justify-between gap-5 h-fit">
              <div className="h-fit flex-1">{renderEducationInfo()}</div>
              <div className="h-fit flex-1">{renderAttachments()}</div>
            </div>
          </Card>
        ) : null}

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex-1 flex flex-col md:flex-row xl:flex-col gap-5">
          {/* {showTimer ? (
            <Card
              className="p-5"
              style={{
                background: "linear-gradient(to right, #2A7299, #0c4A6B)",
                color: "white",
              }}
            >
              <p className="font-semibold">Payment information</p>
              <div className="p-5 flex">
                <div className="w-full space-y-3 border-r">
                  <Button className="flex gap-2 items-center" variant="ghost">
                    <p>payment slip</p>
                    <Eye />
                  </Button>
                  <Button
                    className="flex gap-2 items-center bg-white/20"
                    onClick={() => handleCopy("1211112321321")}
                  >
                    <p>1211112321321</p>
                    {!copied ? <Copy size={20} /> : <Check size={20} />}
                  </Button>
                </div>
                <div className="min-w-fit flex flex-col items-center px-3">
                  <AlarmClock />
                  <p className="text-[#FEC95B] text-5xl font-semibold mt-2">
                    19:24:51
                  </p>
                  <p className="text-sm">Payment time countdown</p>
                </div>
              </div>
            </Card>
          ) : null} */}
          <Card className="p-5 space-y-2">
            <p className="text-lg font-semibold text-[#073954]">
              Requirements and Actions
            </p>
            <div className="space-y-3">
              {requestTransaction.map((item) => (
                <Card
                  key={item.title}
                  className="p-3 space-y-3 bg-[#E8EEFD] border border-[#204D66] text-[#073954]"
                >
                  <p className="font-semibold mb-3">{item.title}</p>
                  {item.details.map((d) => (
                    <div key={d} className="flex gap-2 items-center">
                      <Check size={24} />
                      <p>{d}</p>
                    </div>
                  ))}
                  <div className="rounded-sm px-5 flex items-center gap-2 bg-[#FFF6E0] py-2">
                    <Info fill="orange" color="white" />
                    <p>You are asked to pay {item.paymentAmount} Br</p>
                  </div>
                  <Button className="bg-[#073954]">{item.buttonTitle}</Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Certificate Dialog */}
      <CertificateDialog
        open={showCertificateDialog}
        handleCancel={setShowCertificateDialog}
        certificateData={data}
      />
    </>
  );
}
