"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { initializeForm } from "@/features/birth-service/store/birthSlice";
import DynamicForm from "@/common/components/dynamic-form/DynamicFrom";
import BirthCorrectionPreview from "@/features/birth-service/components/BirthCorrectionPreview";
import HeroSection from "@/common/components/common/HeroSection";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { FileText, Upload, Eye } from "lucide-react";
import { birthCorrectionFormConfig } from "@/features/birth-service/components/birth-correction-form-config";
import DynamicFormRendering from "@/common/components/dynamic-form/DynamicFormRendering";

interface BirthCorrectionProps {
  data: any | null;
  loading?: boolean;
  error?: string;
}

export default function BirthCorrection({
  data,
  loading,
  error,
}: BirthCorrectionProps) {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>(["step-0"]); // Only first accordion open
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.birthSlice);
  const params = useParams();

  // Initialize form with correction config
  useEffect(() => {
    dispatch(initializeForm({ config: birthCorrectionFormConfig }));
  }, [dispatch]);

  const handleFormSubmit = (values: any) => {
    console.log("Correction form submitted:", values);
    // Handle form submission logic here
    // This would typically send the correction request to the backend
  };

  const handlePreviewClick = () => {
    setShowFullPreview(!showFullPreview);
  };

  const handleAccordionStateChange = (value: string[]) => {
    // Only allow one accordion to be open at a time
    if (value.length > 1) {
      // If more than one is selected, keep only the last one
      setExpandedItems([value[value.length - 1]]);
    } else {
      setExpandedItems(value);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Mock data for demonstration - in real app, this would come from API
  const mockBirthData = {
    // Basic Information
    childFirstName: "Yohannes",
    childMiddleName: "Tesfaye",
    childLastName: "Kebede",
    gender: "Male",
    birthDate: "2025-08-20",
    phoneNumber: "+251911234567",

    // Birth Information
    birthType: "SINGLE",
    childWeight: 3.3,
    childHeight: 40.5,
    placeOfBirthType: "HEALTH_FACILITY",
    facilityName: "Addis Ababa General Hospital",
    attendantName: "Dr. Alem",
    attendantQualification: "Pediatrician",
    countryOfBirth: "Ethiopia",
    region: "Addis Ababa",
    zoneSubcity: "Bole",
    woreda: "Bole",
    kebele: "Kebele 01",

    // Parent Information
    fatherFirstName: "Tesfaye",
    fatherLastName: "Kebede",
    motherFirstName: "Alemitu",
    motherLastName: "Kebede",
    fatherNationality: "73ab3776-30c1-4176-9506-c3fcb0e3d5de",
    motherNationality: "73ab3776-30c1-4176-9506-c3fcb0e3d5de",

    // Identification & Personal Details
    passportNo: "ET1234567",
    fin: "FIN123456789",
    driversLicenseNo: "DL987654321",
    maritalStatus: "SINGLE",
    educationLevel: "BACHELORS",
    occupationType: "STUDENT",
    workPlaceName: "Addis Ababa University",
  };

  // Merge form values with mock data for preview
  const previewData = { ...mockBirthData, ...formValues };

  // Create initial values for the form with mock data
  const initialFormValues = {
    ...mockBirthData,
  };

  return (
    <>
      <HeroSection
        redirectTo="/civil-registration/birth"
        title="Birth Certificate Correction"
        description="Request corrections to your birth certificate information"
        action={
          <div className="flex space-x-3">
            <Button className="bg-[#073954]" onClick={handlePreviewClick}>
              <Eye className="mr-2 h-4 w-4" />
              {showFullPreview ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleFormSubmit}
            >
              <FileText className="mr-2 h-4 w-4" />
              Request Update
            </Button>
          </div>
        }
      />

      <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
        {/* Form Section */}
        <div className="w-full md:w-2/3">
          <Card className="p-6">
            <DynamicFormRendering
              config={birthCorrectionFormConfig}
              handleSubmit={handleFormSubmit}
              initialValues={initialFormValues}
              formStyle="grid grid-cols-6 md:grid-cols-12 gap-x-[40px] gap-y-4"
              onAccordionStateChange={handleAccordionStateChange}
              expandedItems={expandedItems}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex-1 flex flex-col gap-5">
          {/* Attachments Card */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-[#073954] mb-4">
              Supporting Documents
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
                    onChange={handleFileUpload}
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
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
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
                  Required Documents:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Court letter (for name/age changes)</li>
                  <li>• Valid ID document</li>
                  <li>• Original birth certificate</li>
                  <li>• Police report (if lost)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Payment Information */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold text-[#073954] mb-4">
              Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Correction Fee</span>
                <span className="text-sm font-semibold">250 Br</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Processing Fee</span>
                <span className="text-sm font-semibold">50 Br</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-lg font-bold text-[#073954]">
                    300 Br
                  </span>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => {
                  console.log("Continue to payment");
                  // Handle payment navigation here
                }}
              >
                Continue Payment
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#073954]">
                  Birth Certificate Preview
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowFullPreview(false)}
                >
                  Close
                </Button>
              </div>
              <BirthCorrectionPreview formValues={previewData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
