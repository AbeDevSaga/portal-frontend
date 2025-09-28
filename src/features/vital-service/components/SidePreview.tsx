"use client";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { FileText, Upload } from "lucide-react";
import React, { useState } from "react";
import { requestTypeData } from "@/common/utils/constants/requestTypeData";
import PaymentSelector from "@/common/components/common/PaymentSelector";
import { Input } from "@/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";

interface SidePreviewProps {
  userData?: any;
  requestType: string;
  attachments: File[];
  fileUploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
}
const correctionOptions = [
  { value: "spelling", label: "Spelling Correction" },
  { value: "date", label: "Date Correction" },
  { value: "name", label: "Complete Name Correction" },
];
const paymentOptions = [
  {
    id: "telebirr",
    label: "Telebirr Transfer",
    value: "telebirr",
    data: {
      image: "/images/telebirr.png",
      price: "200 ETB",
      serviceType: "New Birth",
      class: "bg-white",
    },
  },
  {
    id: "cbe",
    label: "CBE Transfer",
    value: "cbe",
    data: {
      image: "/images/cbebirr.png",
      price: "200 ETB",
      serviceType: "New Birth",
      class: "bg-[#730b7d]",
    },
  },
  {
    id: "mpesa",
    label: "Mpesa Transfer",
    value: "mpesa",
    data: {
      image: "/images/mpesa.png",
      price: "200 ETB",
      serviceType: "New Birth",
      class: "bg-[#09ed2c]",
    },
  },
];

function SidePreview({
  userData,
  requestType,
  attachments,
  fileUploadHandler,
  removeAttachment,
}: SidePreviewProps) {
  console.log("userData in side preview: ", userData);
  const [paidOption, setPaidOption] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [correctionType, setCorrectionType] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

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

  // fallback mock data if missing
  const personalInfo = userData?.personal_info || {
    first_name: "Chaltu",
    last_name: "Beriso",
    date_of_birth: "1990-01-01T00:00:00.0",
  };

  // Render correction-specific input fields
  const renderCorrectionFields = () => {
    switch (correctionType) {
      case "spelling":
        return (
          <div className="space-y-3 mt-3">
            <Input
              placeholder="Old Spelling"
              value={personalInfo.first_name}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
            <Input
              placeholder="Correct Spelling"
              value={formData.newSpelling || ""}
              onChange={(e) =>
                setFormData({ ...formData, newSpelling: e.target.value })
              }
            />
          </div>
        );
      case "date":
        return (
          <div className="space-y-3 mt-3">
            <Input
              type="date"
              value={personalInfo.date_of_birth?.slice(0, 10) || ""}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
            <Input
              type="date"
              value={formData.newDate || ""}
              onChange={(e) =>
                setFormData({ ...formData, newDate: e.target.value })
              }
            />
          </div>
        );
      case "name":
        return (
          <div className="space-y-3 mt-3">
            <Input
              placeholder="Old Full Name"
              value={`${personalInfo.first_name} ${personalInfo.last_name}`}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
            <Input
              placeholder="New Full Name"
              value={formData.newName || ""}
              onChange={(e) =>
                setFormData({ ...formData, newName: e.target.value })
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:w-1/3 flex-1 flex flex-col gap-5">
      {/* Correction Section (only if correction request) */}
      {requestType === "correction" && (
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-[#073954] mb-4">
            Correction Type
          </h3>
          <Select onValueChange={(val) => setCorrectionType(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select correction type" />
            </SelectTrigger>
            <SelectContent>
              {correctionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {renderCorrectionFields()}
        </Card>
      )}

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
        </div>
        <Button
          className={`w-full mt-4 ${
            attachments.length === 0 || paidOption
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={attachments.length === 0 || paidOption}
          onClick={() => {
            if (attachments.length > 0 && !paidOption) {
              setShowPaymentModal(true);
            }
          }}
        >
          {paidOption ? `Paid with ${paidOption.label}` : "Continue to payment"}
        </Button>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Card className="relative p-5 w-11/12 max-w-3xl">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-[#073954] mb-4">
              Payment
            </h3>
            <PaymentSelector
              options={paymentOptions}
              onPaid={(option) => {
                setPaidOption(option);
                setShowPaymentModal(false);
              }}
            />
          </Card>
        </div>
      )}

      {/* Conditional Buttons */}

      {paidOption && attachments.length > 0 && (
        <Card className="px-6 border-none">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => alert("Request submitted successfully!")}
          >
            Submit Request
          </Button>
        </Card>
      )}
    </div>
  );
}

export default SidePreview;
