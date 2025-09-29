"use client";
import React, { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import DatePickerComponent from "@/common/components/common/DatePickerComponent";

type AuthMethod = "fayda" | "email" | null;

interface UserForm {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

interface UserRegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function UserRegistration({
  onBack,
  onSuccess,
}: UserRegistrationProps) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [userForm, setUserForm] = useState<UserForm>({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const isUserFormValid = () => {
    return (
      userForm.firstName.trim() !== "" &&
      userForm.middleName.trim() !== "" &&
      userForm.lastName.trim() !== "" &&
      userForm.phoneNumber.trim() !== "" &&
      userForm.dateOfBirth.trim() !== ""
    );
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUserFormValid()) {
      // Handle user registration
      console.log("User form:", userForm);
      console.log("Auth method:", authMethod);
      onSuccess();
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (authMethod === null) {
      // From user form back to user type selection
      onBack();
    } else {
      // From Fayda/Email step back to user form
      setAuthMethod(null);
    }
  };

  // Back Button Component
  const BackButton = () => {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={handleBack}
        className="absolute top-1 left-0 p-2 pr-3 hover:bg-gray-100 rounded-full z-10 flex items-center gap-1 font-bold">
        <ChevronLeft className="w-5 h-5 text-gray-600" />
        <span className=" font-medium">Back</span>
      </Button>
    );
  };

  // Step 1: User Registration - Method Selection
  if (authMethod === null) {
    return (
      <div className="w-full relative">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-900 text-center mx-auto mb-10">
          Sign Up
        </h2>

        <form
          onSubmit={handleUserSubmit}
          className="space-y-6">
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
              }`}>
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
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#0739541A] hover:bg-gray-300/70 border-gray-300 text-base">
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
                className="w-full h-12 flex items-center justify-center gap-2 bg-[#0739541A] hover:bg-gray-300/70 border-gray-300 text-base">
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

  // Step 2: User Registration - Complete with selected method
  if (authMethod) {
    return (
      <div className="flex relative min-h-[calc(100vh-30vh)] w-full">
        <div className="absolute top-2 left-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-1">
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
              className={`h-11 font-extrabold text-lg shadow-lg w-full px-8 py-2 bg-[#073954] hover:bg-[#073954]/90 text-white shadow-[#4475F240] cursor-pointer`}>
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
