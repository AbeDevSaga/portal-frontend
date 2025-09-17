"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formConfig as birthNewChildConfig } from "@/features/birth-service/components/birth-new-child-field";
import { formConfig as birthRegisteredHospitalConfig } from "@/features/birth-service/components/birth-registered-hospital-fields";
import { formConfig as birthRegisteredFamilyConfig } from "@/features/birth-service/components/birth-registered-family-field";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "sonner";
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { processFormSubmission } from "@/common/utils/formSubmissionUtils";
import { Card } from "@/common/components/ui/card";
import {
  DynamicForm,
  FormWithSidePreview,
} from "@/common/components/dynamic-form";

import HeroSection from "@/common/components/common/HeroSection";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Label } from "@/common/components/ui/label";

export default function NewBirthRegistrationPage() {
  const formValues = useSelector((state: RootState) => state.birthSlice);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const prevBirthTypeRef = useRef<string | null>(null);
  const [selected, setSelected] = React.useState<string>("");

  // Dynamically select form configuration based on selected option
  const currentFormConfig = useMemo(() => {
    switch (selected) {
      case "newChild":
        return birthNewChildConfig;
      case "registeredHospital":
        return birthRegisteredHospitalConfig;
      case "registeredFamily":
        return birthRegisteredFamilyConfig;
      default:
        return birthNewChildConfig;
    }
  }, [selected]);

  const { allFields, groupMap } = generateFieldGrouping(currentFormConfig);

  const handleChange = (value: string) => {
    setSelected(value);
  };

  // Reset expanded sections when form configuration changes
  useEffect(() => {
    const initialExpanded = currentFormConfig.steps
      .map((step, index) => (step.defaultExpanded ? `step-${index}` : null))
      .filter(Boolean) as string[];
    setExpandedSections(initialExpanded);
  }, [currentFormConfig.steps]);

  const handleAccordionStateChange = (expandedItems: string[]) => {
    setExpandedSections(expandedItems);
  };
  const mapDataModel = (value: any) => {
    console.log("Child registration value:", value);
    console.log("Current selected birth type:", selected);

    let body = {
          requesterId: "e0e2aac4-3cdc-4cba-90ff-e4e2e3f4f475",
      actionType: "NEW",
      birthType: "SINGLE", // or "TWIN" etc. – set this globally
      births: [] as any[],
    };

    if (selected === "registeredHospital") {
      body.births = [
        {
          registrationOfficeNumber: "RO-2025-002",
          registrationStatus: "SUBMITTED",
          hospitalNotificationId: value.hospitalNotificationId || null,
          childResidentId: null,
          fatherResidentId:
            value.fatherResidentId?.id ||
            "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
          motherResidentId:
            value.motherResidentId?.id ||
            "83aeec7f-cce1-43de-9f80-ca8faacc9237",
          declarantResidentId: null,
          withOld: false,
          bloodType: "123e4567-e89b-12d3-a456-426614174004",
          nationality: "73ab3776-30c1-4176-9506-c3fcb0e3d5de",
          localizations: [
            {
              childFirstName: "Abel",
              languageCode: "en",
              placeOfBirth: {
                type: "HEALTH_FACILITY",
                facilityName: "Addis Ababa Hospital",
                facilityType: "Hospital",
                facilityOwnership: "Government",
                facilityNotificationRef: "REF12345",
              },
              birthType: "SINGLE",
              birthDate: "2025-08-20T10:15:00.000Z",
              birthTime: "10:15",
              childWeight: 3.2,
              childHeight: 50.5,
              childHeadCircumference: "34.0",
              childBirthOrder: "1",
              issuedDate: "2025-08-20",
              reason: "Routine birth registration",
              gender: "Male",
              declarantRelation: "Mother",
              attendantName: "Dr. Solomon",
              attendantQualification: "Doctor",
            },
          ],
        },
      ];
    } else if (selected === "newChild") {
      body.births = [
        {
          registrationOfficeNumber: "RO-2025-002",
          hospitalNotificationId: null,
          childResidentId: null,
          fatherResidentId:
            "67758fa0-d837-4a50-a2e8-c77a15544f36",
          motherResidentId:
            "83aeec7f-cce1-43de-9f80-ca8faacc9237",
          declarantResidentId: null,
          withOld: false,
          bloodType: "123e4567-e89b-12d3-a456-426614174004",
          nationality:
            value.nationality?.id || "73ab3776-30c1-4176-9506-c3fcb0e3d5de",
          localizations: [
            {
              childFirstName: value.firstName,
              languageCode: "en",
              placeOfBirth: {
                type: "HEALTH_FACILITY",
                facilityName: "Addis Ababa Hospital",
                facilityType: "Hospital",
                facilityOwnership: "Government",
                facilityNotificationRef: "REF12345",
              },
              birthType: "SINGLE",
              birthDate: value.childDateOfBirth,
              birthTime: value.childDateOfBirth.split("T")[1] || "10:15",
              childWeight: value.birthTimeWeight,
              childHeight: value.birthTimeHeight,
              childHeadCircumference: null,
              childBirthOrder: "1",
              issuedDate: new Date().toISOString().split("T")[0],
              reason: "Normal",
              gender: value.gender,
              declarantRelation: "",
              attendantName: value.birthAttendantName,
              attendantQualification: value.birthAttendantQualification,
            },
          ],
        },
      ];
    } else if (selected === "registeredFamily") {
      body.births = [
        {
          registrationOfficeNumber: "RO-2025-002",
          hospitalNotificationId: null,
          childResidentId: null,
          fatherResidentId:
            value.fatherResidentId?.id ||
            "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
          motherResidentId:
            value.motherResidentId?.id ||
            "83aeec7f-cce1-43de-9f80-ca8faacc9237",
          declarantResidentId: null,
          withOld: false,
          bloodType: "123e4567-e89b-12d3-a456-426614174004",
          nationality:
            value.nationality?.id || "73ab3776-30c1-4176-9506-c3fcb0e3d5de",
          localizations: [
            {
              childFirstName: "Abel",
              languageCode: "en",
              placeOfBirth: {
                type: "HEALTH_FACILITY",
                facilityName: "Addis Ababa Hospital",
                facilityType: "Hospital",
                facilityOwnership: "Government",
                facilityNotificationRef: "REF12345",
              },
              birthType: "SINGLE",
              birthDate: "2025-08-20T10:15:00.000Z",
              birthTime: "10:15",
              childWeight: 3.2,
              childHeight: 50.5,
              childHeadCircumference: "34.0",
              childBirthOrder: "1",
              issuedDate: "2025-08-21",
              reason: "Normal",
              gender: "Male",
              declarantRelation: "Mother",
              attendantName: "Dr. Solomon",
              attendantQualification: "Doctor",
            },
          ],
        },
      ];
    }
    return body;
  };

  const handleCreateBirth = (value: any) => {
    const result = processFormSubmission(value, currentFormConfig);
    console.log("result", result);
    if (result.success) {
      const bodyMapped = mapDataModel(value);
      console.log("Mapped value: ", value)
      // Form is ready for submission
      // console.log("Form is ready! API Payload:", bodyMapped);
      // console.log(
      //     "Cleans form values for display:",
      //     result.cleanFormValues
      // );

      // Here you can make your API call
      submitBirthRegistration(bodyMapped);
    } else {
      // Form is not ready - validation errors are already shown
      console.log("Form is not ready:", result.data);
      console.log("Current form values for display:", result.cleanFormValues);
    }
  };

  const submitBirthRegistration = async (apiPayload: any) => {
    try {
      const response = await fetch(
        "https://crvs-birth.itsidx.com/api/v1/birth-registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // add authorization header here if needed
            // Authorization: `Bearer ${yourToken}`
          },
          body: JSON.stringify(apiPayload),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Failed to create birth registration");
      }

      const data = await response.json();
      toast.success("Birth registration created successfully");
      console.log("API Response:", data);
      alert("Birth registration submitted successfully!");
    } catch (error) {
      console.error("Error creating birth registration:", error);
      toast.error("An error occurred while creating the birth registration");
    }
  };

  const formContent = (
    <Card className="p-5">
      <div className="mb-4">
        {/* <p className="font-bold pb-2">Birth Type</p> */}
        <RadioGroup value={selected} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="newChild"
              id="newChild"
              onClick={() => handleChange("newChild")}
            />
            <Label
              htmlFor="newChild"
              className="text-[#0c4a6b] text-md font-medium"
            >
              Family Member but not registered yet
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="registeredHospital"
              id="registeredHospital"
              onClick={() => handleChange("registeredHospital")}
            />
            <Label
              htmlFor="registeredHospital"
              className="text-[#0c4a6b] text-md font-medium"
            >
              Registered in hospital
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="registeredFamily"
              id="registeredFamily"
              onClick={() => handleChange("registeredFamily")}
            />
            <Label
              htmlFor="registeredFamily"
              className="text-[#0c4a6b] text-md font-medium"
            >
              Already registered as family member
            </Label>
          </div>
        </RadioGroup>
      </div>
      {selected && (
        <DynamicForm
          key={selected}
          config={currentFormConfig}
          handleSubmit={handleCreateBirth}
          initialValues={formValues}
          formStyle="grid grid-cols-12 gap-5"
          onAccordionStateChange={handleAccordionStateChange}
          showPreview={false}
        />
      )}
    </Card>
  );

  return (
    <div>
      <HeroSection
        title="Register New Birth"
        description="This is the place to register new birth from health center."
        action={<></>}
      />

      <FormWithSidePreview
        formContent={formContent}
        formValues={formValues}
        groupMap={groupMap}
        allFields={allFields}
        previewTitle="New Birth Registrations"
        layout="2-1"
        config={currentFormConfig}
        expandedSections={expandedSections}
        onAccordionStateChange={handleAccordionStateChange}
      />
    </div>
  );
}
