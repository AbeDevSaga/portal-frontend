"use client";

import { Download, Eye, FileText, Share2, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { useRouter } from "next/navigation";

interface CertificateDialogProps {
  open: boolean;
  handleCancel: Dispatch<SetStateAction<boolean>>;
  certificateData?: any;
}

export default function CertificateDialog({
  open,
  handleCancel,
  certificateData,
}: CertificateDialogProps) {
  const handleDownload = () => {
    try {
      // Create a link element to download the mock PDF file
      const link = document.createElement("a");
      link.href = "/mock-file.pdf"; // Path to your mock PDF in public folder
      link.download = `Birth_Certificate_${
        certificateData?.registrationFormNumber || "Unknown"
      }.pdf`;
      link.target = "_blank";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Certificate download initiated!");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }
  };
  const router = useRouter();
  const handlePrint = () => {
    // Implement print functionality
    router.push("/civil-registration/birth/print/form");
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Sharing certificate...");
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="w-[90vw] h-[95vh] max-w-none p-0 gap-0 border-none [&>button]:hidden">
        {/* Header */}
        <DialogClose className="absolute right-10 top-4 text-white hidden">
          <X className="h-4 w-4" />
        </DialogClose>

        <div className="flex flex-row items-center justify-between p-6 border-b bg-[#073954] text-white">
          <DialogTitle className="text-xl font-semibold text-white">
            Birth Certificate - {certificateData?.registrationFormNumber}
          </DialogTitle>
          <div className="flex items-center gap-2">
            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="text-lg"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-lg"
              onClick={handlePrint}
            >
              <FileText className="h-4 w-4 mr-2" />
              
              Request Certificate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-lg"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-lg"
              onClick={() => handleCancel(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50 py-10">
          <div className="max-w-4xl mx-auto py-10">
            {/* Certificate Preview Card */}
            <Card className="p-8 bg-white shadow-lg py-20">
              {/* Certificate Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-[#073954] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">BC</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-[#073954] mb-2">
                  BIRTH CERTIFICATE
                </h1>
                <p className="text-lg text-gray-600">
                  Civil Registration and Vital Statistics Agency
                </p>
                <p className="text-sm text-[#e03030] font-medium mt-2">
                  DIGITAL COPY
                </p>
                <div className="w-32 h-1 bg-[#073954] mx-auto mt-4"></div>
              </div>

              {/* Certificate Body */}
              <div className="space-y-6">
                {/* Registration Number */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Registration Number
                  </p>
                  <p className="text-xl font-bold text-[#073954]">
                    {certificateData?.registrationFormNumber || "N/A"}
                  </p>
                </div>

                {/* Main Content */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Child Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#073954] mb-4">
                        Child Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Full Name:</span>
                          <span className="font-semibold">
                            {certificateData?.localizations?.[0]
                              ?.childFirstName || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender:</span>
                          <span className="font-semibold">
                            {certificateData?.localizations?.[0]?.gender ||
                              "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date of Birth:</span>
                          <span className="font-semibold">
                            {certificateData?.localizations?.[0]?.birthDate?.split(
                              " "
                            )[0] || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Place of Birth:</span>
                          <span className="font-semibold">
                            {certificateData?.localizations?.[0]?.placeOfBirth
                              ?.facilityName || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Parent Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#073954] mb-4">
                        Parent Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Father's Name:</span>
                          <span className="font-semibold">N/A</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mother's Name:</span>
                          <span className="font-semibold">N/A</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nationality:</span>
                          <span className="font-semibold">
                            {certificateData?.nationalityName || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#073954] mb-3">
                      Registration Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Registration Date:
                        </span>
                        <span className="font-semibold">
                          {certificateData?.createdAt?.split("T")[0] || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-semibold text-green-600">
                          {certificateData?.registrationStatus || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#073954] mb-3">
                      Address Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Region:</span>
                        <span className="font-semibold">N/A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Woreda:</span>
                        <span className="font-semibold">
                          {certificateData?.fatherId?.currentAddress?.woreda
                            ?.localizedContent?.en?.name || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kebele:</span>
                        <span className="font-semibold">
                          {certificateData?.fatherId?.currentAddress?.kebele ||
                            "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Footer */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-600">Issued Date:</p>
                      <p className="font-semibold">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                        <span className="text-xs text-gray-500">
                          Official Seal
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Authorized Signature
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Certificate ID:</p>
                      <p className="font-semibold text-sm">
                        {certificateData?.registrationFormNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center gap-4 p-6 border-t border-gray-300 bg-gray-50">
          {/* <Button
            onClick={handleDownload}
            className="bg-[#073954] hover:bg-[#073954]/90">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-[#073954] hover:bg-[#073954]/90">
            <FileText className="h-4 w-4 mr-2" />
            Print Certificate
          </Button>
          <Button
            onClick={handleShare}
            className="bg-[#073954] hover:bg-[#073954]/90">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
