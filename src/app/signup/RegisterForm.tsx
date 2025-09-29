"use client";
import React, { useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import OrganizationRegistration from "./OrganizationRegistration";
import UserRegistration from "./UserRegistration";

type UserType = "organization" | "user" | null;

export default function RegisterForm() {
  const [userType, setUserType] = useState<UserType>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  const handleBackToUserTypeSelection = () => {
    setUserType(null);
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
            viewBox="0 0 24 24">
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
            }}>
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
            onClick={() => setUserType("organization")}>
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
            onClick={() => setUserType("user")}>
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
      <OrganizationRegistration
        onBack={handleBackToUserTypeSelection}
        onSuccess={handleSuccess}
      />
    );
  }

  // Step 3: User Registration
  if (userType === "user") {
    return (
      <UserRegistration
        onBack={handleBackToUserTypeSelection}
        onSuccess={handleSuccess}
      />
    );
  }

  return null;
}
