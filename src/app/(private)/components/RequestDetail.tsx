"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { initializeForm } from "@/features/birth-service/store/birthSlice";
import BirthCorrectionPreview from "@/features/birth-service/components/BirthCorrectionPreview";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { birthCorrectionFormConfig } from "@/features/birth-service/components/birth-correction-form-config";
import DynamicFormRendering from "@/common/components/dynamic-form/DynamicFormRendering";
import SidePreview from "./SidePreview";

interface RequestDetailProps {
  data: any | null;
  loading?: boolean;
  error?: string;
}

export default function RequestDetail({
  data,
  loading,
  error,
}: RequestDetailProps) {
  const requestType = data?.requestType;
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
        <SidePreview
          requestType={requestType}
          attachments={attachments}
          fileUploadHandler={handleFileUpload}
          removeAttachment={removeAttachment}
        />
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
