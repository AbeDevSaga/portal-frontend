"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FormConfig } from "@/common/types/formType";
import { DynamicForm } from "@/common/components/dynamic-form";
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { processFormSubmission } from "@/common/utils/formSubmissionUtils";
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

// FormConfig for User Registration (without userType selection)
const userSignupConfig: FormConfig = {
  title: "User Registration",
  description: "Create your personal account",
  showTitle: false,
  stepperData: [
    { label: "Step 1", content: "Account Setup" },
    { label: "Step 2", content: "Complete" },
  ],
  stepperPosition: "top",
  grouping: [
    {
      defaultGroup: "User Registration",
      groups: [
        {
          name: "User Registration",
          label: "User Registration",
          order: 1,
        },
      ],
    },
  ],
  steps: [
    {
      title: "Account Setup",
      group: "User Registration",
      groupOrder: 1,
      tabular: false,
      defaultExpanded: true,
      fields: [
        {
          type: "input",
          key: "fullName",
          label: "Full Name",
          placeholder: "Enter your full name",
          className:
            "px-4 h-14 mt-0.5 mb-10 border-neutral-300 placeholder:text-xl text-xl", // Example of custom field styling
          labelClassName: "text-lg text-neutral-500", // Example of custom label styling
          validators: [
            { type: "required", message: "" },
            { type: "min", value: 2, message: "Must be at least 2 characters" },
          ],
          required: true,
          group: "User Registration",
          groupOrder: 1,
          gridCols: 6, // Left column
        },
        {
          type: "password",
          key: "password",
          label: "Password",
          placeholder: "Enter your password",
          className:
            "px-4 h-14 mb-10 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [
            { type: "required", message: "" },
            {
              type: "min",
              value: 8,
              message: "Password must be at least 8 characters",
            },
          ],
          required: true,
          group: "User Registration",
          groupOrder: 1,
          gridCols: 6, // Right column
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          placeholder: "Enter your email",
          className:
            "px-4 py-1 h-14 mb-10 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [
            { type: "required", message: "" },
            { type: "email", message: "Please enter a valid email address" },
          ],
          required: true,
          group: "User Registration",
          groupOrder: 1,
          gridCols: 6, // Left column, second row
        },
      ],
    },
    {
      title: "Complete Registration",
      group: "User Registration",
      groupOrder: 2,
      tabular: false,
      defaultExpanded: true,
      fields: [],
    },
  ],
};

// FormConfig for Agent Registration
const agentSignupConfig: FormConfig = {
  title: "Agent Registration",
  description: "Create your organization account",
  showTitle: false,
  stepperData: [
    { label: "Step 1", content: "Organization Info" },
    { label: "Step 2", content: "Account Setup" },
    { label: "Step 3", content: "Complete" },
  ],
  stepperPosition: "top",
  grouping: [
    {
      defaultGroup: "Agent Registration",
      groups: [
        {
          name: "Agent Registration",
          label: "Agent Registration",
          order: 1,
        },
      ],
    },
  ],
  steps: [
    {
      title: "Organization Information",
      group: "Agent Registration",
      groupOrder: 1,
      tabular: false,
      defaultExpanded: true,
      fields: [
        {
          type: "input",
          key: "orgName",
          label: "Organization Name",
          placeholder: "Enter organization name",
          className: "h-14 mb-7 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [{ type: "required", message: "" }],
          required: true,
          group: "Agent Registration",
          groupOrder: 1,
          gridCols: 6, // Left column
        },
        {
          type: "select",
          key: "orgType",
          label: "Organization Type",
          placeholder: "Select organization type",
          className: "h-14 mb-8 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [{ type: "required", message: "" }],
          required: true,
          group: "Agent Registration",
          groupOrder: 1,
          gridCols: 6, // Right column
          options: [
            { label: "Court", value: "court" },
            { label: "Hospital", value: "hospital" },
            { label: "Government Office", value: "government-office" },
          ],
        },

        {
          type: "textarea",
          key: "description",
          label: "Detail Description",
          placeholder: "Enter detailed description",
          className: "py-3 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          description: "Provide detailed information about your organization",
          validators: [
            { type: "required", message: "" },
            {
              type: "min",
              value: 10,
              message: "Description must be at least 10 characters",
            },
          ],
          required: true,
          group: "Agent Registration",
          groupOrder: 1,
          gridCols: 12, // Full width
        },
        {
          type: "fileUpload",
          key: "attachment",
          label: "Attachment",
          placeholder: "Choose File",
          // className: "mb-10",
          labelClassName: "text-lg text-neutral-500",
          className: "py-3 border-neutral-300 placeholder:text-xl text-xl",
          description: "Upload required documents",
          validators: [{ type: "required", message: "" }],
          required: true,
          group: "Agent Registration",
          groupOrder: 1,
          gridCols: 6, // Full width
          allowedTypes: [".pdf", ".doc", ".docx", ".jpg", ".png"],
          showPreview: true, // Add this flag to enable preview
        },
      ],
    },
    {
      title: "Account Setup",
      group: "Agent Registration",
      groupOrder: 2,
      tabular: false,
      defaultExpanded: true,
      fields: [
        {
          type: "email",
          key: "email",
          label: "Email",
          placeholder: "Enter your email",
          className:
            "px-4 h-14 mb-10 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [
            { type: "required", message: "" },
            { type: "email", message: "Please enter a valid email address" },
          ],
          required: true,
          group: "Agent Registration",
          groupOrder: 2,
          gridCols: 6, // Left column
        },
        {
          type: "password",
          key: "password",
          label: "Password",
          placeholder: "Enter your password",
          className:
            "px-4 h-14 mb-10 border-neutral-300 placeholder:text-xl text-xl",
          labelClassName: "text-lg text-neutral-500",
          validators: [
            { type: "required", message: "" },
            {
              type: "min",
              value: 8,
              message: "Password must be at least 8 characters",
            },
          ],
          required: true,
          group: "Agent Registration",
          groupOrder: 2,
          gridCols: 6, // Right column
        },
      ],
    },
    {
      title: "Complete Registration",
      group: "Agent Registration",
      groupOrder: 3,
      tabular: false,
      defaultExpanded: true,
      fields: [],
    },
  ],
};

export default function SignupPage() {
  const formValues = useSelector((state: RootState) => state.birthSlice);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentConfig =
    selectedUserType === "user" ? userSignupConfig : agentSignupConfig;
  const { allFields, groupMap } = generateFieldGrouping(currentConfig);

  const handleUserTypeSelection = (type: string) => {
    setSelectedUserType(type);
    setShowForm(true);
  };

  const handleBackToSelection = () => {
    setShowForm(false);
    setSelectedUserType(null);
  };

  const handleSignup = (values: any) => {
    console.log("=== SIGNUP FORM SUBMITTED ===");
    console.log("User Type:", selectedUserType);
    console.log("Form Values:", values);
    console.log("Raw form data:", JSON.stringify(values, null, 2));

    const result = processFormSubmission(values, currentConfig);

    if (result.success) {
      console.log("✅ Signup form submitted successfully:", {
        userType: selectedUserType,
        ...values,
      });
      console.log("Processed result:", result);
      // Here you would typically make an API call to register the user
      setIsSubmitted(true);
    } else {
      console.log("❌ Form validation failed:", result.data);
      console.log("Validation errors:", result);
    }

    console.log("=== END SIGNUP SUBMISSION ===");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 px-16 py-10">
      <div className="flex bg-white shadow-2xl rounded-3xl border w-full py-10">
        {/* Left Side - Logo */}
        <div className="hidden lg:flex lg:w-1/3 items-center justify-center px-12 py-7">
          <Image
            src="/logo.jpg"
            alt="CRRSA Logo"
            width={1000}
            height={1000}
            className="max-w-[350px]"
          />
        </div>

        {/* Right Side - Form Area (60% width) */}
        <div className="w-full lg:w-2/3 flex items-center lg:border-l-2 border-gray-400 justify-center p-8">
          <div className="w-full max-w-5xl">
            {isSubmitted ? (
              // Success Message View
              <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
                  <p className="text-gray-600 mb-4 text-xl">
                    Your {selectedUserType === "user" ? "user" : "agent"}{" "}
                    account has been created successfully.
                  </p>
                  <p className=" text-gray-500 text-xl">
                    You can now log in to your account using your registered
                    credentials.
                  </p>
                </div>
                <div className="space-y-3 max-w-xl mx-auto">
                  <Link href="/login">
                    <Button className="w-full bg-slate-700 h-14 text-xl font-bold hover:bg-slate-800 text-white">
                      Go to Login
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full h-14 text-xl font-bold"
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowForm(false);
                      setSelectedUserType(null);
                    }}
                  >
                    Register Another Account
                  </Button>
                </div>
              </div>
            ) : !showForm ? (
              // User Type Selection View
              <>
                <div className="text-center mb-8 gap-2">
                  <h2 className="text-3xl font-bold">Sign Up</h2>
                  <p className="text-gray-600 text-xl">
                    Select your account type
                  </p>
                </div>

                <div className="space-y-4">
                  {/* User Card */}
                  {/* <Card
                    className="cursor-pointer hover:border-slate-900/50 hover:shadow-md transition-all duration-200 border-2"
                    onClick={() => handleUserTypeSelection("user")}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-700/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl text-black">👨‍💼</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800">
                            User
                          </h3>
                          <p className="text-gray-600 text-xl font-medium">
                            For individual citizens
                          </p>
                        </div>
                        <div className="text-gray-400">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* Agent Card */}
                  <Card
                    className="cursor-pointer hover:border-slate-900/50 hover:shadow-md transition-all duration-200 border-2"
                    onClick={() => handleUserTypeSelection("agent")}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-700/10 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏛️</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800">
                            Stakeholder
                          </h3>
                          <p className="text-gray-600 text-xl font-medium">
                            For organizations and institutions
                          </p>
                        </div>
                        <div className="text-gray-400">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center text-lg text-gray-600 mt-8">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-500 hover:text-blue-800 font-medium"
                  >
                    Log In
                  </Link>
                </div>
              </>
            ) : (
              // Form View
              <>
                <div className="space-y-4 relative items-center">
                  <div className="flex items-center absolute top-0">
                    <Button
                      variant="ghost"
                      onClick={handleBackToSelection}
                      className="p-2 mr-3"
                    >
                      <ChevronLeft />
                    </Button>
                  </div>
                  <DynamicForm
                    config={currentConfig}
                    handleSubmit={handleSignup}
                    initialValues={formValues}
                    formStyle="grid grid-cols-12 gap-4"
                    showPreview={false}
                  />
                </div>

                <div className="text-end text-lg text-gray-600 mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Log In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
