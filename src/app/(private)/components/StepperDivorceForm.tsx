import { Button } from "@/common/components/ui/button";
import {
  attachementsSchema,
  exHusbandSchema,
  exWifeSchema,
} from "@/common/utils/validations/formSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";

const exHusbandInitialValues = {
  exHusbandResidentNumber: "",
  divorceDate: "",
  registrationDate: "",
  exHusbandFullName: "",
  exHusbandNationality: "",
  exHusbandDOB: "",
  exHusbandAddress: "",
  previousMarriageCertificateNo: "",
};

const exWifeInitialValues = {
  exWifeResidentNumber: "",
  exWifeFullName: "",
  exWifeNationality: "",
  exWifeDOB: "",
  exWifeAddress: "",
  previousMarriageCertificateNoWife: "",
};

const attachementInitialValues = {
  courtOrder: null,
  otherAttachement: null,
};
import React from "react";
interface StepperDivorceFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}
const StepperDivorceForm = ({ setStep, step }: StepperDivorceFormProps) => {
  const handleNext = () => {
    setStep((s) => Math.min(s + 1, 4));
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
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                Next
              </Button>
              <Button
                type="submit"
                className="btn btn-primary px-8 py-3 text-lg"
              >
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
                  className="btn btn-secondary px-8 py-3 text-lg"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-secondary px-8 py-3 text-lg"
                >
                  Next
                </Button>
              </div>
              <Button
                type="submit"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Register Ex Wife
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 mb-1">
                  Court Order <span className="text-red-500">*</span>
                </label>
                <div className="relative border p-4 rounded flex flex-col items-center">
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
              <div className="flex flex-col gap-1 ">
                <label className="text-sm font-bold text-gray-700 mb-1">
                  Other Attachments <span className="text-red-500">*</span>
                </label>
                <div className="flex relative border p-4 rounded flex-col items-center">
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
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="btn btn-primary px-8 py-3 text-lg"
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
    <>
      {step === 1 && renderExHusbandForm()}
      {step === 2 && renderExWifeForm()}
      {step === 3 && attachementsForm()}
    </>
  );
};

export default StepperDivorceForm;
