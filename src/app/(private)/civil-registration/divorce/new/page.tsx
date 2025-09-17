"use client";
import React, { useState } from "react";
import DivorceLivePreview from "../../../components/DivorceLivePreview";
import { Button } from "@/common/components/ui/button";
import { Card } from "@/common/components/ui/card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  attachementsSchema,
  exHusbandSchema,
  exWifeSchema,
} from "@/common/utils/validations/formSchemas";
import HeroSection from "@/common/components/common/HeroSection";
import { Stepper } from "@/common/components/common/stepper";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";
import StepperDivorceForm from "@/app/(private)/components/StepperDivorceForm";
import { Eye, FileText, Image as ImageIcon, X } from "lucide-react";
const exHusbandInitialValues = {
  exHusbandResidentNumber: "",
  divorceDate: "",
  exHusbandFullName: "",
  exHusbandNationality: "",
  exHusbandDOB: "",
  exHusbandAddress: "",
  previousMarriageCertificateNo: "",
  courtOrder: null,
};

const exWifeInitialValues = {
  exWifeResidentNumber: "",
  exWifeFullName: "",
  exWifeNationality: "",
  exWifeDOB: "",
  exWifeAddress: "",
  previousMarriageCertificateNoWife: "",
  courtOrderWife: null,
};
const attachementInitialValues = {
  courtOrder: null,
  otherAttachement: null,
};
const steps = [
  { label: "Ex Husband Info", content: "Ex Husband" },
  { label: "Ex Wife Info", content: "Ex Wife" },
  { label: "Attachments", content: "Attachments" },
];

type PersonInfoData = {
  id: string;
  name: string;
  dob: string;
};

type PersonInfoProps = {
  title: string;
  info: PersonInfoData;
};
export default function DivorceNewPage() {
  type InfoType = {
    id: string;
    name: string;
    nationality: string;
    dob: string;
    address: string;
    certificate: string;
    divorceDate: string;
    registrationDate: string;
  };
  type WifeInfoType = {
    id: string;
    name: string;
    nationality: string;
    dob: string;
    address: string;
    certificate: string;
  };

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [searchId, setSearchId] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<InfoType | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [previewFile, setPreviewFile] = useState<{url: string, fileName: string, fileType: string} | null>(null);

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, 3));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleExHusbandSubmit = (values: any) => {
    console.log("Ex Husband Form Submitted:", values);
    alert("Ex Husband Form submitted! " + JSON.stringify(values, null, 2));
  };

  const handleExWifeSubmit = (values: any) => {
    console.log("Ex Wife Form Submitted:", values);
    alert("Ex Wife Form submitted! " + JSON.stringify(values, null, 2));
  };
   const handleAttachementsSubmit = (values: any) => {
    console.log("Attachements Form Submitted:", values);
    alert("Attachements Form submitted! " + JSON.stringify(values, null, 2));
  };

  // Static info list for demo
  const staticHusbandInfo: InfoType = {
    id: "12345",
    name: "John Doe",
    nationality: "Ethiopian",
    dob: "1990-01-01",
    address: "Addis Ababa",
    certificate: "CERT-001",
    divorceDate: "2025-09-08",
    registrationDate: "2020-01-01",
  };

  const staticWifeInfo: WifeInfoType = {
    id: "67890",
    name: "Jane Smith",
    nationality: "Other",
    dob: "1985-05-05",
    address: "Adama",
    certificate: "CERT-002",
    
  };

  // Mock attachment data
  const mockAttachments = [
    {
      fileName: "court_order_001.pdf",
      fileType: "PDF",
      fileUrl: "/documents/court_order_001.pdf",
      status: "Uploaded"
    },
    {
      fileName: "marriage_certificate.jpg",
      fileType: "IMAGE",
      fileUrl: "/documents/marriage_certificate.jpg",
      status: "Uploaded"
    },
    {
      fileName: "divorce_petition.pdf",
      fileType: "PDF",
      fileUrl: "/documents/divorce_petition.pdf",
      status: "Uploaded"
    },
    {
      fileName: "witness_affidavit.pdf",
      fileType: "PDF",
      fileUrl: "/documents/witness_affidavit.pdf",
      status: "Uploaded"
    }
  ];
  

  // Fill form with selected info
  const handleSelectInfo = (info: InfoType) => {
    setSelectedInfo(info);
    setShowDetails(true);
    setShowResults(false);
  };

  // Helper functions for attachment display
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension || '')) {
      return <ImageIcon className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  const handlePreview = (url: string, fileName: string, fileType: string) => {
    setPreviewFile({ url, fileName, fileType });
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

 
    function renderExHusbandForm() {
      const exHusbandFormInitialValues = showDetails
        ? {
            exHusbandResidentNumber: staticHusbandInfo.id,
            registrationDate: staticHusbandInfo.registrationDate,
            divorceDate: staticHusbandInfo.divorceDate,
            exHusbandFullName: staticHusbandInfo.name,
            exHusbandNationality: staticHusbandInfo.nationality,
            exHusbandDOB: staticHusbandInfo.dob,
            exHusbandAddress: staticHusbandInfo.address,
            previousMarriageCertificateNo: staticHusbandInfo.certificate,
            courtOrder: null,
          }
        : exHusbandInitialValues;
      return (
        <Formik
          initialValues={exHusbandFormInitialValues}
          validationSchema={exHusbandSchema}
          onSubmit={handleExHusbandSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="bg-white p-6 w-full rounded shadow mt-6 mx-auto">
              <div className="w-full">
                <span className="block font-semibold mb-2">Ex Husband Info</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Resident Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exHusbandResidentNumber"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter 10-digit resident number"
                    />
                    <ErrorMessage
                      name="exHusbandResidentNumber"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Registration Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="registrationDate"
                      type="date"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                    <ErrorMessage
                      name="registrationDate"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Divorce Date <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="divorceDate"
                      type="date"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                    <ErrorMessage
                      name="divorceDate"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exHusbandFullName"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="exHusbandFullName"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="exHusbandNationality"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    >
                      <option value="">Select nationality</option>
                      <option value="Ethiopian">Ethiopian</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="exHusbandNationality"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exHusbandDOB"
                      type="date"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                    <ErrorMessage
                      name="exHusbandDOB"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exHusbandAddress"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter address"
                    />
                    <ErrorMessage
                      name="exHusbandAddress"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Previous Marriage Certificate No.{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="previousMarriageCertificateNo"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter certificate number"
                    />
                    <ErrorMessage
                      name="previousMarriageCertificateNo"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
                  >
                    Next
                  </Button>
                  <Button
                    type="submit"
                    className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
                  >
                    Register Ex Husband
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      );
    }

  const PersonInfo: React.FC<PersonInfoProps> = ({ title, info }) => {
    return (
      <div className="flex flex-col">
        <span className="block font-semibold mb-2 text-[#0c4a6b] text-lg">
          {title}
        </span>
        <div className="flex flex-col gap-x-8 gap-y-2">
          <div className="flex gap-3">
            <span className="text-base font-medium text-gray-900/90 block mb-1">
              Resident Number -
            </span>
            <span className="text-base text-gray-700/80 block">{info.id}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-base font-medium text-gray-900/90 block mb-1">
              Full Name -
            </span>
            <span className="text-base text-gray-700/80 block">
              {info.name}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-base font-medium text-gray-900/90 block mb-1">
              Date of Birth -
            </span>
            <span className="text-base text-gray-700/80 block">{info.dob}</span>
          </div>
        </div>
      </div>
    );
  };
 
    function renderExWifeForm() {
      const exWifeFormInitialValues = showDetails
        ? {
            exWifeResidentNumber: staticWifeInfo.id,
            exWifeFullName: staticWifeInfo.name,
            exWifeNationality: staticWifeInfo.nationality,
            exWifeDOB: staticWifeInfo.dob,
            exWifeAddress: staticWifeInfo.address,
            previousMarriageCertificateNoWife: staticWifeInfo.certificate,
            courtOrderWife: null,
          }
        : exWifeInitialValues;
      return (
        <Formik
          initialValues={exWifeFormInitialValues}
          validationSchema={exWifeSchema}
          onSubmit={handleExWifeSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="bg-white p-6 w-full rounded shadow mt-6 mx-auto">
              <div className="w-full">
                <span className="block font-semibold mb-2">Ex Wife Info</span>
                <div className="grid grid-cols-2 gap-4">
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Resident Number <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exWifeResidentNumber"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter 10-digit resident number"
                    />
                    <ErrorMessage
                      name="exWifeResidentNumber"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exWifeFullName"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter full name"
                    />
                    <ErrorMessage
                      name="exWifeFullName"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="exWifeNationality"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    >
                      <option value="">Select nationality</option>
                      <option value="Ethiopian">Ethiopian</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="exWifeNationality"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exWifeDOB"
                      type="date"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                    <ErrorMessage
                      name="exWifeDOB"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="exWifeAddress"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter address"
                    />
                    <ErrorMessage
                      name="exWifeAddress"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-700 mb-1">
                      Previous Marriage Certificate No.{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="previousMarriageCertificateNoWife"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                      placeholder="Enter certificate number"
                    />
                    <ErrorMessage
                      name="previousMarriageCertificateNoWife"
                      component="div"
                      className="text-base text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={handlePrev}
                      className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
                    >
                      Next
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
                  >
                    Register Ex Wife
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      );
    }
  
  const attachementsForm = () => (
    <Formik
      initialValues={attachementInitialValues}
      validationSchema={attachementsSchema}
      onSubmit={handleAttachementsSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="bg-white p-6 w-full rounded shadow mt-6 mx-auto">
          <div className="w-full">
            <span className="block font-semibold mb-2">Attachments</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-bold text-gray-700 mb-1">
                  Court Order <span className="text-red-500">*</span>
                </label>
                <div className="relative border p-4 rounded flex flex-col items-center w-full min-h-[200px]">
                  <img
                    src="/images/file-upload.png"
                    alt="upload"
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload Files Pdf or Images
                  </p>
                  <input
                    type="file"
                    name="courtOrder"
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "courtOrder",
                          event.currentTarget.files[0]
                        );
                      }
                    }}
                    className="border absolute inset-0 w-full opacity-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                  <ErrorMessage
                    name="courtOrder"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-bold text-gray-700 mb-1">
                  Other Attachments <span className="text-red-500">*</span>
                </label>
                <div className="relative border p-4 rounded flex flex-col items-center w-full min-h-[200px]">
                  <img
                    src="/images/file-upload.png"
                    alt="upload"
                    className="w-12 h-12 mb-2 object-contain"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload Files Pdf or Images
                  </p>
                  <input
                    type="file"
                    name="otherAttachement"
                    multiple
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        setFieldValue(
                          "otherAttachement",
                          event.currentTarget.files
                        );
                      }
                    }}
                    className="border absolute inset-0 w-full opacity-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                  />
                  <ErrorMessage
                    name="otherAttachement"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={handlePrev}
                className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="btn bg-[#0c4a6b] hover:bg-[#0c4a6b]/90 text-white px-8 py-3 text-lg"
              >
                Submit Attachments
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="flex w-full justify-between">
          <HeroSection
            title="Register New Divorce"
            description="This is a place where you can apply for a new divorce."
            action={<></>}
          />
          {selected === "registeredMarriage" && (
          <Stepper
            steps={steps}
            activeStep={step - 1}
            orientation="horizontal"
          />
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4 pt-16  px-10">
          {/* Step 1: Show only checkboxes */}
          <RadioGroup
            value={selected}
            onValueChange={(val) => {
              setSelected(val);
              setSelectedInfo(null);
              setShowResults(false);
              setSearchId("");
              setStep(1);
            }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <span className="relative">
                <input
                  type="radio"
                  id="registeredCourt"
                  name="registerType"
                  value="registeredCourt"
                  checked={selected === "registeredCourt"}
                  onChange={() => setSelected("registeredCourt")}
                  className="appearance-none flex justify-center items-center w-6 h-6 border-2 border-[#0c4a6b] rounded-md bg-white checked:bg-[#0c4a6b] checked:text-white checked:border-[#0c4a6b] focus:outline-none focus:ring-2 focus:ring-[#0c4a6b] cursor-pointer transition-all"
                />
                {selected === "registeredCourt" && (
                  <svg
                    className="absolute left-1 top-1 w-4 h-4 text-white pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <Label
                htmlFor="registeredCourt"
                className="text-[#0c4a6b] text-md font-medium"
              >
                Registered In Court?
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="relative">
                <input
                  type="radio"
                  id="registeredMarriage"
                  name="registerType"
                  value="registeredMarriage"
                  checked={selected === "registeredMarriage"}
                  onChange={() => setSelected("registeredMarriage")}
                  className="appearance-none w-6 h-6 border-2 border-[#0c4a6b] rounded-md bg-white checked:bg-[#0c4a6b] checked:text-white checked:border-[#0c4a6b] focus:outline-none focus:ring-2 focus:ring-[#0c4a6b] cursor-pointer transition-all"
                />
                {selected === "registeredMarriage" && (
                  <svg
                    className="absolute left-1 top-1 w-4 h-4 text-white pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              <Label
                htmlFor="registeredMarriage"
                className="text-[#0c4a6b] text-md font-medium"
              >
                Registered by Husband or Wife?
              </Label>
            </div>
          </RadioGroup>

          {/* Step 2: Show input field only after selection, before search */}
          {selected && selected !== "registeredMarriage" && (
            <div className="mt-2 px-5 py-5 rounded-md shadow-md">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Search with Court case number
              </label>
              <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter court case number to search"
                className="border rounded w-96 px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
              />
              <Button
                type="button"
                className="btn text-base bg-[#0c4a6b] px-6 btn-primary  py-3"
                onClick={() => setShowResults(true)}
              >
                Search
              </Button>
              </div>
            </div>
          )}
          {showResults && (
            <div className="flex border flex-col w-fit rounded-md border-[#0c4a6b] p-4 mt-4">
              {/* basic information with static data  */}
              <div className="grid grid-cols-2 px-5 py-5 gap-10">
                <PersonInfo title="Ex Husband Info" info={staticHusbandInfo} />
                <PersonInfo title="Ex Wife Info" info={staticWifeInfo} />
              </div>
              <Button
                type="button"
                className="btn text-base bg-[#0c4a6b] px-6 btn-primary  py-3 mt-2"
                onClick={() => handleSelectInfo(staticHusbandInfo)}
              >
                Select
              </Button>
            </div>
          )}

          {/* Step 3: Search results removed, forms use static dummy data directly */}
        </div>
        {/* If info selected, show filled form, else show normal form */}
        {showDetails && selected === "registeredCourt" && (
          <div className="mt-6">
            {/* Basic Info Section */}
            <div className="bg-white p-6 rounded shadow mb-6">
              <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Previous Marriage Certificate No.
                  </label>
                  <p className="text-gray-900 font-medium">{staticHusbandInfo.certificate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Date
                  </label>
                  <p className="text-gray-900 font-medium">{staticHusbandInfo.registrationDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Divorce Date
                  </label>
                  <p className="text-gray-900 font-medium">{staticHusbandInfo.divorceDate}</p>
                </div>
              </div>
            </div>

            {/* Ex Husband and Ex Wife Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Ex Husband Info */}
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Ex Husband Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticHusbandInfo.name}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticHusbandInfo.nationality}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticHusbandInfo.dob}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticHusbandInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Ex Wife Info */}
              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Ex Wife Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticWifeInfo.name}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticWifeInfo.nationality}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticWifeInfo.dob}</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-200">
                    <label className="block text font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-gray-900 text-base font-medium">{staticWifeInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 pb-2">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAttachments.map((attachment, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 text-gray-600">
                        {getFileIcon(attachment.fileName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {attachment.fileName}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {attachment.fileType?.replace(/_/g, ' ').toLowerCase()}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          {attachment.status}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(attachment.fileUrl, attachment.fileName, attachment.fileType)}
                        className="flex-shrink-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        {  selected === "registeredMarriage" && (
          <StepperDivorceForm setStep={setStep} step={step} />
        )}
      </div>
      <DivorceLivePreview />
      
      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewFile.fileName}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={closePreview}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="border rounded-lg p-4">
              {previewFile.fileType === 'IMAGE' ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.fileName}
                  className="max-w-full h-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">PDF Preview not available</p>
                  <p className="text-sm text-gray-500">{previewFile.fileName}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open(previewFile.url, '_blank')}
                  >
                    Open in New Tab
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
