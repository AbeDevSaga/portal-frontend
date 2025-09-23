import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { FileText, Upload } from "lucide-react";
import React from "react";
import { requestTypeData } from "@/app/(public)/constants/requestTypeData";

interface SidePreviewProps {
  requestType: string;
  attachments: File[];
  fileUploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
}

function SidePreview({
  requestType,
  attachments,
  fileUploadHandler,
  removeAttachment,
}: SidePreviewProps) {
  const requestConfig = requestTypeData.find((req) => req.type === requestType);

  if (!requestConfig) {
    return (
      <div className="w-full md:w-1/3 flex-1 flex flex-col gap-5">
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Invalid request type
          </h3>
        </Card>
      </div>
    );
  }

  const { attachment, payment } = requestConfig;

  return (
    <div className="w-full md:w-1/3 flex-1 flex flex-col gap-5">
      {/* Attachments Card */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-[#073954] mb-4">
          {attachment?.label}
        </h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload supporting documents
              </p>
              <input
                type="file"
                multiple
                onChange={fileUploadHandler}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#073954] hover:bg-[#073954]/90 cursor-pointer"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Attachments List */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                Uploaded Files:
              </h4>
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Requirements */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              {attachment?.requiredDoc.label}
            </h4>
            <ul className="text-xs text-blue-800 space-y-1">
              {attachment?.requiredDoc.list.map((doc, i) => (
                <li key={i}>• {doc}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-[#073954] mb-4">
          {payment.label}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Service Fee</span>
            <span className="text-sm font-semibold">
              {payment.serviceFee} Br
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Processing Fee</span>
            <span className="text-sm font-semibold">
              {payment.processingFee} Br
            </span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-lg font-bold text-[#073954]">
                {payment.serviceFee + payment.processingFee} Br
              </span>
            </div>
          </div>
          <Button
            className="w-full mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => {
              console.log("Continue to payment");
              // Handle payment navigation here
            }}
          >
            Continue Payment
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SidePreview;
