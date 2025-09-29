"use client";
import React, { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import {
  getSubcityOptions,
  getWoredaOptionsBySubcity,
} from "./subcityWoredaData";

interface OrganizationForm {
  organizationName: string;
  organizationType: string;
  phoneNumber: string;
  email: string;
  subCity: string;
  woreda: string;
  description: string;
  attachment: File | null;
}

interface OrganizationRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function OrganizationRegistration({
  onBack,
  onSuccess,
}: OrganizationRegistrationProps) {
  const [organizationForm, setOrganizationForm] = useState<OrganizationForm>({
    organizationName: "",
    organizationType: "",
    phoneNumber: "",
    email: "",
    subCity: "",
    woreda: "",
    description: "",
    attachment: null,
  });

  const subcityOptions = getSubcityOptions();
  const woredaOptions = getWoredaOptionsBySubcity(organizationForm.subCity);
  // COURT, HEALTH_FACILITY, POLICE
  const organizationTypes = [
    { label: "Court", value: "COURT" },
    { label: "Health Facility", value: "HEALTH_FACILITY" },
    { label: "Police", value: "POLICE" },
  ];

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "";
    phone = phone.trim();
    if (phone.startsWith("0")) {
      return "+251" + phone.slice(1);
    } else if (phone.startsWith("+251")) {
      return phone;
    } else {
      return phone; // fallback for already formatted numbers
    }
  };

  // Simple validation functions
  const isOrganizationFormValid = () => {
    return (
      organizationForm.organizationName.trim() !== "" &&
      organizationForm.organizationType !== "" &&
      organizationForm.phoneNumber.trim() !== "" &&
      organizationForm.email.trim() !== "" &&
      organizationForm.subCity !== "" &&
      organizationForm.woreda !== "" &&
      organizationForm.description.trim() !== "" &&
      organizationForm.attachment !== null
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setOrganizationForm((prev) => ({ ...prev, attachment: file }));
  };

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOrganizationFormValid()) return;

    try {
      let attachmentId: string | null = null;

      // Upload file if exists
      if (organizationForm.attachment) {
        const formData = new FormData();
        formData.append("file", organizationForm.attachment);

        const uploadResponse = await fetch(
          "https://crrsa-api.risertechservices.com/api/v1/storage/files/public",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }

        const uploadResult = await uploadResponse.json();
        console.log("File upload response:", uploadResult);
        attachmentId = uploadResult.id;
      }

      // Prepare registration body
      const registrationBody: any = {
        organizationName: organizationForm.organizationName,
        email: organizationForm.email,
        organizationType: organizationForm.organizationType.toUpperCase(),
        phoneNumber: formatPhoneNumber(organizationForm.phoneNumber),
        structureId: "8b097e41-8adf-42e4-a0d5-b23a47d7f356",
      };

      if (attachmentId) {
        registrationBody.attachmentIds = [attachmentId];
      }

      const registrationResponse = await fetch(
        "https://crrsa-api.risertechservices.com/api/v1/informant-service/registrations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registrationBody),
        }
      );
      console.log("Registration request body:", registrationBody);

      if (!registrationResponse.ok) {
        throw new Error("Registration failed");
      }

      const registrationResult = await registrationResponse.json();
      console.log("Registration response:", registrationResult);

      onSuccess();
    } catch (error: any) {
      console.error("Error during registration:", error.message);
      alert(error.message);
    }
  };

  // Back Button Component
  const BackButton = () => {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="absolute top-1 left-0 p-2 pr-3 hover:bg-gray-100 rounded-full z-10 flex items-center gap-1 font-bold">
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <span className=" font-medium">Back</span>
      </Button>
    );
  };

  return (
    <div className="w-full max-w-3xl relative">
      <BackButton />
      <h2 className="text-3xl font-bold text-gray-900 text-center mx-auto mb-8">
        Sign Up
      </h2>

      <form
        onSubmit={handleOrganizationSubmit}
        className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Name */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Organization name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={organizationForm.organizationName}
              onChange={(e) =>
                setOrganizationForm((prev) => ({
                  ...prev,
                  organizationName: e.target.value,
                }))
              }
              className="w-full h-12 text-base"
              required
            />
          </div>

          {/* Organization Type */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Organization Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={organizationForm.organizationType}
              onValueChange={(value) =>
                setOrganizationForm((prev) => ({
                  ...prev,
                  organizationType: value,
                }))
              }>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                {organizationTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              value={organizationForm.phoneNumber}
              onChange={(e) =>
                setOrganizationForm((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="w-full h-12"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={organizationForm.email}
              onChange={(e) =>
                setOrganizationForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full h-12 text-base"
              required
            />
          </div>

          {/* Sub-City */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Sub-City <span className="text-red-500">*</span>
            </label>
            <Select
              value={organizationForm.subCity}
              onValueChange={(value) =>
                setOrganizationForm((prev) => ({
                  ...prev,
                  subCity: value,
                  woreda: "",
                }))
              }>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select sub-city" />
              </SelectTrigger>
              <SelectContent>
                {subcityOptions.map((subcity) => (
                  <SelectItem
                    className="text-base"
                    key={subcity.value}
                    value={subcity.value}>
                    {subcity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Woreda */}
          <div className="flex flex-col items-start justify-start">
            <label className="block text-base font-medium text-gray-700 mb-1">
              Woreda <span className="text-red-500">*</span>
            </label>
            <Select
              value={organizationForm.woreda}
              onValueChange={(value) =>
                setOrganizationForm((prev) => ({ ...prev, woreda: value }))
              }
              disabled={!organizationForm.subCity}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select woreda" />
              </SelectTrigger>
              <SelectContent>
                {woredaOptions.map((woreda) => (
                  <SelectItem
                    className="text-base"
                    key={woreda.value}
                    value={woreda.value}>
                    {woreda.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col items-start justify-start">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            value={organizationForm.description}
            onChange={(e) =>
              setOrganizationForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full max-h-[50px] text-[16px] placeholder:text-[16px]"
            placeholder="Enter organization description..."
            required
          />
        </div>

        {/* Attachment */}
        <div className="flex flex-col items-start justify-start min-w-full">
          <label className="block text-base font-medium text-gray-700 mb-1">
            Attachment <span className="text-red-500">*</span>
          </label>
          <div className="border-2 min-w-full flex items-center justify-center min-h-[147px] border-dashed border-gray-700/30 rounded-lg  text-center hover:border-2 hover:border-gray-400 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden h-full"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer h-full w-full my-auto">
              <Image
                src="/icons/upload-file.svg"
                alt="Upload"
                width={20}
                height={20}
                className="size-12 mx-auto"
              />
              <p className="font-medium mb-2">
                Click here to upload or drop files here
              </p>
              {organizationForm.attachment && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {organizationForm.attachment.name}
                </p>
              )}
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Allowed file type: pdf, .doc, .docx, .jpg, .png
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4 items-center justify-between">
          <Button
            type="submit"
            disabled={!isOrganizationFormValid()}
            className={`h-11 font-extrabold text-lg disabled:bg-[#073954]/60 shadow-xl w-full px-8 py-2 ${
              isOrganizationFormValid()
                ? "bg-[#073954] hover:bg-[#073954]/90 text-white shadow-[#4475F240] cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}>
            SignUp
          </Button>
        </div>
      </form>
    </div>
  );
}
