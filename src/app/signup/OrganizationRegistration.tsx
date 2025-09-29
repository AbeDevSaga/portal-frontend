"use client";
import React, { useState, useCallback, useEffect } from "react";
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
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import AttachmentCard, {
  UploadedFile,
} from "@/features/vital-service/components/AttachmentCard";
import { administrativeApi, DropdownOption } from "./administrativeApi";

interface OrganizationForm {
  organizationName: string;
  organizationType: string;
  phoneNumber: string;
  email: string;
  subCity: string;
  woreda: string;
  description: string;
  attachments: UploadedFile[];
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
    attachments: [],
  });

  // Dynamic dropdown data
  const [subcities, setSubcities] = useState<DropdownOption[]>([]);
  const [woredas, setWoredas] = useState<DropdownOption[]>([]);

  // Loading states
  const [loadingSubcities, setLoadingSubcities] = useState(false);
  const [loadingWoredas, setLoadingWoredas] = useState(false);

  // Hardcoded city ID (Addis Ababa) - you can change this to the correct city ID
  const CITY_ID = "91cf3266-a2d9-46ba-ae8d-008050512d9e"; // Based on the parentId from your API data

  useEffect(() => {
    loadSubcities(CITY_ID);
  }, []);

  const loadSubcities = async (cityId: string) => {
    try {
      setLoadingSubcities(true);
      const subcityData = await administrativeApi.getSubcities(cityId);
      setSubcities(subcityData);
    } catch (error) {
      console.error("Failed to load subcities:", error);
    } finally {
      setLoadingSubcities(false);
    }
  };

  // Load woredas when subcity changes
  const loadWoredas = async (subcityId: string) => {
    try {
      setLoadingWoredas(true);
      const woredaData = await administrativeApi.getWoredas(subcityId);
      setWoredas(woredaData);
    } catch (error) {
      console.error("Failed to load woredas:", error);
    } finally {
      setLoadingWoredas(false);
    }
  };

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
      organizationForm.attachments.length > 0
    );
  };

  const handleAttachmentsChange = useCallback((files: UploadedFile[]) => {
    setOrganizationForm((prev) => ({ ...prev, attachments: files }));
  }, []);

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOrganizationFormValid()) return;

    try {
      // Get all attachment IDs (since AttachmentCard already uploads files)
      const attachment = organizationForm.attachments.map(
        (attachment) => attachment.id
      );

      // Prepare registration body
      const registrationBody: any = {
        organizationName: organizationForm.organizationName,
        email: organizationForm.email,
        organizationType: organizationForm.organizationType.toUpperCase(),
        phoneNumber: formatPhoneNumber(organizationForm.phoneNumber),
        subCity: organizationForm.subCity,
        woreda: organizationForm.woreda,
        description: organizationForm.description,
        structureId: "8b097e41-8adf-42e4-a0d5-b23a47d7f356",
      };

      if (attachment.length > 0) {
        registrationBody.attachment = attachment;
      }

      console.log("Final Registration request body:", registrationBody);

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
            <label
              htmlFor="organizationName"
              className="block text-base font-medium text-gray-700 mb-1">
              Organization name <span className="text-red-500">*</span>
            </label>
            <Input
              id="organizationName"
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
            <label
              htmlFor="organizationType"
              className="block text-base font-medium text-gray-700 mb-1">
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
            <label
              htmlFor="phoneNumber"
              className="block text-base font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="phoneNumber"
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
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
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
              onValueChange={(value) => {
                setOrganizationForm((prev) => ({
                  ...prev,
                  subCity: value,
                  woreda: "", // Clear woreda when subcity changes
                }));
                if (value) {
                  loadWoredas(value);
                } else {
                  setWoredas([]);
                }
              }}
              disabled={loadingSubcities}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue
                  placeholder={
                    loadingSubcities
                      ? "Loading subcities..."
                      : "Select sub-city"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {subcities.map((subcity) => (
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
              disabled={!organizationForm.subCity || loadingWoredas}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue
                  placeholder={
                    loadingWoredas ? "Loading woredas..." : "Select woreda"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {woredas.map((woreda) => (
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
          <label
            htmlFor="description"
            className="block text-base font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
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
          <AttachmentCard
            requestConfig={null}
            onChange={handleAttachmentsChange}
          />
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
