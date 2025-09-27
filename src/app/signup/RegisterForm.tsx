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
import { Card, CardContent } from "@/common/components/ui/card";
import { Upload, Globe, Mail, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  getSubcityOptions,
  getWoredaOptionsBySubcity,
} from "./subcityWoredaData";
import DatePickerComponent from "@/common/components/common/DatePickerComponent";
import { error } from "console";

type UserType = "organization" | "user" | null;
type AuthMethod = "fayda" | "email" | null;

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

interface UserForm {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export default function RegisterForm() {
  const [userType, setUserType] = useState<UserType>(null);
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const [userForm, setUserForm] = useState<UserForm>({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    dateOfBirth: "",
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

  const isUserFormValid = () => {
    return (
      userForm.firstName.trim() !== "" &&
      userForm.middleName.trim() !== "" &&
      userForm.lastName.trim() !== "" &&
      userForm.phoneNumber.trim() !== "" &&
      userForm.dateOfBirth.trim() !== ""
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

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error during registration:", error.message);
      alert(error.message);
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUserFormValid()) {
      // Handle user registration
      console.log("User form:", userForm);
      console.log("Auth method:", authMethod);
      setIsSubmitted(true);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (
      userType === "organization" ||
      (userType === "user" && authMethod === null)
    ) {
      // From organization form or user form back to user type selection
      setUserType(null);
      setAuthMethod(null);
    } else if (userType === "user" && authMethod) {
      // From Fayda/Email step back to user form
      setAuthMethod(null);
    }
  };

  // Check if we should show back button
  const shouldShowBackButton = () => {
    return userType !== null && !isSubmitted;
  };

  // Back Button Component
  const BackButton = () => {
    if (!shouldShowBackButton()) return null;

    return (
      <Button
        type="button"
        variant="ghost"
        onClick={handleBack}
        className="absolute top-1 left-0 p-2 pr-3 hover:bg-gray-100 rounded-full z-10 flex items-center gap-1 font-bold"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <span className=" font-medium">Back</span>
      </Button>
    );
  };

  // Success Message
  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 border-green-700/15 border-2 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-2  text-lg">
            Your {userType === "user" ? "user" : "organization"} account has
            been created successfully.
          </p>
          <p className="text-gray-500 text-lg">
            You can now log in to your account using your registered
            credentials.
          </p>
        </div>
        <div className="space-y-3 max-w-xl mx-auto">
          <Link href="/login">
            <Button className="w-full bg-slate-700 h-12 text-xl font-bold hover:bg-slate-800 text-white">
              Go to Login
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full h-12 text-xl font-bold"
            onClick={() => {
              setIsSubmitted(false);
              setUserType(null);
              setAuthMethod(null);
              // Reset forms
              setOrganizationForm({
                organizationName: "",
                organizationType: "",
                phoneNumber: "",
                email: "",
                subCity: "",
                woreda: "",
                description: "",
                attachment: null,
              });
              setUserForm({
                firstName: "",
                lastName: "",
                middleName: "",
                phoneNumber: "",
                dateOfBirth: "",
              });
            }}
          >
            Register Another Account
          </Button>
        </div>
      </div>
    );
  }

  // Step 1: User Type Selection
  if (userType === null) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-gray-900  mx-auto">Sign Up</h2>
        <p className="text-gray-400 text-base mx-auto">
          Choose how you'd like to register
        </p>

        <div className="flex gap-8 w-full h-full items-center justify-center mt-4">
          {/* Organization Card */}
          <Card
            className="flex-1 w-full h-full max-w-[222px] max-h-[222px] aspect-square cursor-pointer shadow-lg hover:shadow-xl transition-shadow border border-[#E5E5E5]"
            onClick={() => setUserType("organization")}
          >
            <CardContent className="p-3 text-center flex flex-col items-center h-full gap-2.5 justify-center">
              <Image
                src="/icons/org.svg"
                alt="Organization"
                width={50}
                height={50}
                className="size-12"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                Organization
              </h3>
              <p className="text-gray-500 text-sm">
                Register as an organization
              </p>
            </CardContent>
          </Card>

          {/* User Card */}
          <Card
            className="flex-1 w-full h-full max-w-[222px] max-h-[222px] aspect-square cursor-pointer shadow-lg hover:shadow-xl transition-shadow border border-[#E5E5E5]"
            onClick={() => setUserType("user")}
          >
            <CardContent className="p-3 text-center flex flex-col items-center h-full gap-2.5 justify-center">
              <Image
                src="/icons/user.svg"
                alt="User"
                width={50}
                height={50}
                className="size-12"
              />
              <h3 className="text-xl font-semibold text-gray-900">User</h3>
              <p className="text-gray-500 text-sm">Register as a single user</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2: Organization Registration Form
  if (userType === "organization") {
    return (
      <div className="w-full max-w-3xl relative">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-900 text-center mx-auto mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleOrganizationSubmit} className="space-y-6">
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
                }
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
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
                }
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select sub-city" />
                </SelectTrigger>
                <SelectContent>
                  {subcityOptions.map((subcity) => (
                    <SelectItem
                      className="text-base"
                      key={subcity.value}
                      value={subcity.value}
                    >
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
                disabled={!organizationForm.subCity}
              >
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select woreda" />
                </SelectTrigger>
                <SelectContent>
                  {woredaOptions.map((woreda) => (
                    <SelectItem
                      className="text-base"
                      key={woreda.value}
                      value={woreda.value}
                    >
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
                className="cursor-pointer h-full w-full my-auto"
              >
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
              }`}
            >
              SignUp
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Step 3: User Registration - Method Selection
  if (userType === "user" && authMethod === null) {
    return (
      <div className="w-full relative">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-900 text-center mx-auto mb-10">
          Sign Up
        </h2>

        <form onSubmit={handleUserSubmit} className="space-y-6">
          {/* User Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* first Name */}
            <div className="flex flex-col items-start justify-start">
              <label className="block text-base font-medium text-gray-700 mb-1">
                First name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={userForm.firstName}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full h-12 text-base"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Middle name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={userForm.middleName}
                onChange={(e) =>
                  setUserForm((prev) => ({
                    ...prev,
                    middleName: e.target.value,
                  }))
                }
                className="w-full h-12 text-base"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Last name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={userForm.lastName}
                onChange={(e) =>
                  setUserForm((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className="w-full h-12 text-base"
                required
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 -mb-1">
                Date of birth <span className="text-red-500">*</span>
              </label>
              <DatePickerComponent
                formItem={{
                  name: "dateOfBirth",
                  required: true,
                  label: "",
                }}
                value={userForm.dateOfBirth}
                setFieldValue={(fieldName, value) =>
                  setUserForm((prev) => ({ ...prev, dateOfBirth: value }))
                }
                touched={false}
                error={undefined}
                className="w-full h-12 text-base"
              />
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              value={userForm.phoneNumber}
              onChange={(e) =>
                setUserForm((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="w-full h-12 text-base"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex gap-4 pt-4 items-center justify-between">
            <Button
              type="submit"
              disabled={!isUserFormValid()}
              className={`h-11 font-extrabold text-lg shadow-lg w-full px-8 py-2 ${
                isUserFormValid()
                  ? "bg-[#073954] hover:bg-[#073954]/90 text-white shadow-[#4475F240] cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              SignUp
            </Button>
          </div>

          {/* Sign up with section */}
          <div className="space-y-4 mt-5">
            <div className="text-center px-14">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-400" />
                </div>
                <div className="relative flex justify-center text-base">
                  <span className="px-4 bg-white text-gray-500">
                    Sign up with
                  </span>
                </div>
              </div>
            </div>

            {/* Fayda Button */}
            <div className="flex flex-col gap-4 max-w-xl mt-3 items-center justify-center mx-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAuthMethod("fayda")}
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#0739541A] hover:bg-gray-300/70 border-gray-300 text-base"
              >
                <Image
                  src="/images/fayda.svg"
                  alt="Fayda"
                  width={24}
                  height={24}
                  className="size-8"
                />
                <span className="text-gray-700 font-semibold text-base">
                  Fayda
                </span>
              </Button>

              {/* Email Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#0739541A] hover:bg-gray-300/70 border-gray-300 text-base"
              >
                <Image
                  src="/icons/mail-box.svg"
                  alt="Email"
                  width={24}
                  height={24}
                  className="size-8"
                />
                <span className="text-gray-700 font-semibold text-base">
                  Email
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Step 4: User Registration - Complete with selected method
  if (userType === "user" && authMethod) {
    return (
      <div className="flex relative min-h-[calc(100vh-30vh)] w-full">
        <div className="absolute top-2 left-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600 text-base">Back</span>
          </Button>
        </div>
        <div className="w-full h-fit my-auto max-w-lg text-center mx-auto shadow-lg border rounded-lg p-8 ">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/icons/fayda.svg"
                alt="Fayda"
                width={100}
                height={100}
                className="size-20"
              />
              <p className="text-gray-700 font-semibold text-xl">
                Enter Your ID FAN Number
              </p>
              <Input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-full h-14 text-lg text-center border-gray-800/30 "
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4 items-center justify-between">
            <Button
              type="submit"
              className={`h-11 font-extrabold text-lg shadow-lg w-full px-8 py-2 bg-[#073954] hover:bg-[#073954]/90 text-white shadow-[#4475F240] cursor-pointer`}
            >
              <Image
                src="/icons/fayda.svg"
                alt="Fayda"
                width={20}
                height={20}
                className="size-6"
              />
              <p className="text-white font-semibold text-lg ml-2">Continue</p>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
