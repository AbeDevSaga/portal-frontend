"use client";
import React, { useState } from "react";
import DivorceLivePreview from "../../../components/DivorceLivePreview";
import { Button } from "@/common/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { 
  exHusbandSchema,
  exWifeSchema
} from "@/common/utils/validations/formSchemas";
import HeroSection from "@/common/components/common/HeroSection";
import { Stepper } from "@/common/components/common/stepper";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/common/components/ui/accordion";
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

const steps = [
  { label: "Ex Husband Info", content: "Ex Husband" },
  { label: "Ex Wife Info", content: "Ex Wife" },
];

export default function DivorceNewPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((s) => Math.min(s + 1, 2));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleExHusbandSubmit = (values: any) => {
    console.log('Ex Husband Form Submitted:', values);
    alert("Ex Husband Form submitted! " + JSON.stringify(values, null, 2));
  };

  const handleExWifeSubmit = (values: any) => {
    console.log('Ex Wife Form Submitted:', values);
    alert("Ex Wife Form submitted! " + JSON.stringify(values, null, 2));
  };


  const renderExHusbandForm = () => (
    <Formik
      initialValues={exHusbandInitialValues}
      validationSchema={exHusbandSchema}
      onSubmit={handleExHusbandSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="bg-white p-6 w-full rounded shadow mt-6 mx-auto">
          <div className="w-full">
            <span className="block font-semibold mb-2">Ex Husband Info</span>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Resident Number <span className="text-red-500">*</span></label>
                <Field name="exHusbandResidentNumber" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter 10-digit resident number" />
                <ErrorMessage name="exHusbandResidentNumber" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Divorce Date <span className="text-red-500">*</span></label>
                <Field name="divorceDate" type="date" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" />
                <ErrorMessage name="divorceDate" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <Field name="exHusbandFullName" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter full name" />
                <ErrorMessage name="exHusbandFullName" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Nationality <span className="text-red-500">*</span></label>
                <Field as="select" name="exHusbandNationality" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white">
                  <option value="">Select nationality</option>
                  <option value="Ethiopian">Ethiopian</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="exHusbandNationality" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <Field name="exHusbandDOB" type="date" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" />
                <ErrorMessage name="exHusbandDOB" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                <Field name="exHusbandAddress" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter address" />
                <ErrorMessage name="exHusbandAddress" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Previous Marriage Certificate No. <span className="text-red-500">*</span></label>
                <Field name="previousMarriageCertificateNo" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter certificate number" />
                <ErrorMessage name="previousMarriageCertificateNo" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Court Order (PDF/Image) <span className="text-red-500">*</span></label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <img 
                      src="/images/file-upload.png" 
                      alt="Upload Files" 
                      className="w-12 h-12 object-contain"
                    />
                    <p className="text-sm text-gray-600">Upload Files PDF or Images</p>
                    <input
                      name="courtOrder"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => setFieldValue("courtOrder", e.currentTarget.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <ErrorMessage name="courtOrder" component="div" className="text-base text-red-500 mt-1" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handleNext} className="btn btn-secondary px-8 py-3 text-lg">
                Next
              </Button>
              <Button type="submit" className="btn btn-primary px-8 py-3 text-lg">
                Register Ex Husband
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

  const renderExWifeForm = () => (
    <Formik
      initialValues={exWifeInitialValues}
      validationSchema={exWifeSchema}
      onSubmit={handleExWifeSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="bg-white p-6 w-full rounded shadow mt-6 mx-auto">
          <div className="w-full">
            <span className="block font-semibold mb-2">Ex Wife Info</span>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Resident Number <span className="text-red-500">*</span></label>
                <Field name="exWifeResidentNumber" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter 10-digit resident number" />
                <ErrorMessage name="exWifeResidentNumber" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <Field name="exWifeFullName" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter full name" />
                <ErrorMessage name="exWifeFullName" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Nationality <span className="text-red-500">*</span></label>
                <Field as="select" name="exWifeNationality" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white">
                  <option value="">Select nationality</option>
                  <option value="Ethiopian">Ethiopian</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="exWifeNationality" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <Field name="exWifeDOB" type="date" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" />
                <ErrorMessage name="exWifeDOB" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                <Field name="exWifeAddress" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter address" />
                <ErrorMessage name="exWifeAddress" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Previous Marriage Certificate No. <span className="text-red-500">*</span></label>
                <Field name="previousMarriageCertificateNoWife" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white" placeholder="Enter certificate number" />
                <ErrorMessage name="previousMarriageCertificateNoWife" component="div" className="text-base text-red-500 mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">Court Order (PDF/Image) <span className="text-red-500">*</span></label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <img 
                      src="/images/file-upload.png" 
                      alt="Upload Files" 
                      className="w-12 h-12 object-contain"
                    />
                    <p className="text-sm text-gray-600">Upload Files PDF or Images</p>
                    <input
                      name="courtOrderWife"
                      type="file"
                      accept=".pdf,image/*"
                      onChange={(e) => setFieldValue("courtOrderWife", e.currentTarget.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <ErrorMessage name="courtOrderWife" component="div" className="text-base text-red-500 mt-1" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handlePrev} className="btn btn-secondary px-8 py-3 text-lg">
                Previous
              </Button>
              <Button type="submit" className="btn btn-primary px-8 py-3 text-lg">
                Register Ex Wife
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
          <Stepper
            steps={steps}
            activeStep={step - 1}
            orientation="horizontal"
          />
        </div>
        {step === 1 && renderExHusbandForm()}
        {step === 2 && renderExWifeForm()}
      </div>
      <DivorceLivePreview />
    </div>
  );
}
