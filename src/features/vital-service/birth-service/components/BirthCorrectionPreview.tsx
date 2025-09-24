"use client";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Copy, Eye } from "lucide-react";
import Image from "next/image";
import child_image from "@/public/images/groom.svg";
import { useState } from "react";

interface BirthCorrectionPreviewProps {
  formValues: any;
  onPreviewClick?: () => void;
}

export default function BirthCorrectionPreview({ 
  formValues, 
  onPreviewClick 
}: BirthCorrectionPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Format date to display only the date part
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  };

  // Render Basic Info Section
  const renderBasicInfo = () => {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
          {/* Profile (left) */}
          <div className="flex flex-col space-y-2 items-center w-full md:w-1/3">
            <div className="w-full p-4 pl-[0] flex items-center">
              <div className="relative w-full max-w-[250px] aspect-square rounded-full overflow-hidden">
                <Image
                  src={child_image}
                  alt="Child Profile"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <div className="w-full pr-4 flex flex-col items-center -justify-center">
              <div className="text-sm text-[#073954] font-medium">
                {formValues?.childFirstName || "-"}
              </div>
              <div className="rounded-full py-1 px-4 bg-[#E8EEFD] text-[#073954] font-semibold text-sm">
                Child
              </div>
            </div>
          </div>

          {/* Info (right) */}
          <div className="flex flex-col max-w-[250px] md:w-2/3 gap-3">
            <span className="text-left font-semibold">Basic Information</span>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Application Number</p>
              <p className="text-sm font-semibold">
                RO-2025-00220250011
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-sm font-semibold">
                {formValues?.childFirstName || "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Mother Name</p>
              <p className="text-sm font-semibold">
                {formValues?.motherFirstName && formValues?.motherLastName 
                  ? `${formValues.motherFirstName} ${formValues.motherLastName}` 
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Mother Nationality</p>
              <p className="text-sm font-semibold">
                {formValues?.motherNationality || "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Father Name</p>
              <p className="text-sm font-semibold">
                {formValues?.fatherFirstName && formValues?.fatherLastName 
                  ? `${formValues.fatherFirstName} ${formValues.fatherLastName}` 
                  : "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Father Nationality</p>
              <p className="text-sm font-semibold">
                {formValues?.fatherNationality || "-"}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Sex</p>
              <p className="text-sm font-semibold">{formValues?.gender || "-"}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-semibold">-</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Nationality</p>
              <p className="text-sm font-semibold">
                {formValues?.nationality || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Application Info Section
  const renderApplicationInfo = () => {
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
              <p className="text-sm text-right font-semibold w-fit">Correction</p>
            </div>
            <div className="w-full flex justify-between gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Status</p>
              <p className="text-sm text-right font-semibold w-fit">PENDING</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Birth Info Section
  const renderBirthInfo = () => {
    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold">Birth Information</span>
        <div className="gap-2 min-w-[250px] flex flex-col justify-center w-full">
          <div className="flex justify-between space-x-5 border-b pb-2">
            <p className="text-sm text-gray-600">Country of Birth</p>
            <p className="text-sm font-semibold">{formValues?.nationality || "-"}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Region</p>
            <p className="text-sm font-semibold">
              {formValues?.facilityName || "-"}
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Zone/Subcity</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Woreda</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Kebele</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Specific Location</p>
            <p className="text-sm font-semibold">
              {formValues?.facilityName || "-"}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Birth Date</p>
            <p className="text-sm font-semibold">
              {formatDate(formValues?.birthDate) || "-"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render Legal Info Section
  const renderLegalInfo = () => {
    return (
      <div className="flex flex-col w-full gap-3">
        <span className="text-left font-semibold">Legal Information</span>
        <div className="gap-2 min-w-[250px] flex flex-col justify-center w-full">
          <div className="flex justify-between space-x-5 border-b pb-2">
            <p className="text-sm text-gray-600">Digital Registration No</p>
            <p className="text-sm font-semibold">
              RO-2025-00220250011
            </p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Passport No</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">FIN</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p className="text-sm text-gray-600">Drivers License No</p>
            <p className="text-sm font-semibold">-</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">Marital Status</p>
            <p className="text-sm font-semibold">-</p>
          </div>
        </div>
      </div>
    );
  };

  // Render Line Separator
  const renderLineSeparator = () => {
    return (
      <div className="w-full py-4">
        <div className="w-full h-[2px] bg-gray-200 rounded"></div>
      </div>
    );
  };

  // Render Education Info Section
  const renderEducationInfo = () => {
    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold">
          Education and Work Information
        </span>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full min-w-[250px] gap-2 flex flex-col justify-center">
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Education Level</p>
              <p className="text-sm text-right font-semibold w-fit">-</p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Occupation Type</p>
              <p className="text-sm text-right font-semibold w-fit">-</p>
            </div>
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Work Place Name</p>
              <p className="text-sm text-right font-semibold w-fit">-</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Attachments Section
  const renderAttachments = () => {
    return (
      <div className="w-full flex flex-col gap-3">
        <span className="text-left font-semibold">Attachments</span>
        <div className="w-full flex flex-col">
          <div className="w-full min-w-[250px] gap-2 flex flex-col justify-center">
            <div className="w-full justify-between flex gap-x-5 gap-y-2 border-b pb-2">
              <p className="text-sm">Document Icon</p>
              <p className="text-sm text-right font-semibold w-fit">
                Supporting Documents
              </p>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
            {/* Add more attachments as needed */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Information Section */}
      <Card className="w-full flex flex-col p-5">
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

    </div>
  );
}
