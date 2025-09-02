"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
// import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
// import { birthFormConfig } from "./birth-form-fields";
// import { hcBirthFormConfig as birthFormConfig } from "./components/birth-hc-form-fields";
// import { birthRegistrationFormConfig } from "./components//birth-registration-fields";
import { formConfig as birthNewChildConfig } from "./components/birth-new-child-field";
import { formConfig as birthRegisteredHospitalConfig } from "./components/birth-registered-hospital-fields";
import { formConfig as birthRegisteredFamilyConfig } from "./components/birth-registered-family-field";
import React, { useEffect, useState, useRef, useMemo } from "react";
// import { processFormSubmission } from "@/utils/formSubmissionUtils";
import { toast } from "sonner";
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { processFormSubmission } from "@/common/utils/formSubmissionUtils";
import { Card } from "@/common/components/ui/card";
import {
    DynamicForm,
    FormWithSidePreview,
} from "@/common/components/dynamic-form";
import { useRouter } from "next/navigation";

import HeroSection from "@/common/components/common/HeroSection";
import { useSubmitFormMutation } from "./api/birthApi";
import { removeFields, updateField } from "@/redux/feature/birthSlice";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Label } from "@/common/components/ui/label";
const handleConvertDate = (date: string) => {
    const dateOnly = date.split("T")[0];
    return dateOnly;
};
export default function BirthNew() {
    const router = useRouter();

    const formValues = useSelector((state: RootState) => state.birthSlice);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const prevBirthTypeRef = useRef<string | null>(null);
    const [selected, setSelected] = React.useState<string>("newChild");

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
        console.log("Selected:", value);
        setSelected(value);
    };

    // Reset expanded sections when form configuration changes
    useEffect(() => {
        const initialExpanded = currentFormConfig.steps
            .map((step, index) =>
                step.defaultExpanded ? `step-${index}` : null
            )
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [currentFormConfig.steps]);

    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };
    const mapDataModel = (value: any) => {
        console.log("Child registration value:", value);
        console.log("Current selected birth type:", selected);

        let body = {};

        // Use the selected radio option instead of value.birthType
        if (selected === "registeredHospital") {
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                births: {
                    registrationOfficeNumber: "RO-2025-002",
                    hospitalNotificationId:
                        value.hospitalNotificationId || "HN-1755913119386",
                    childResidentId: null,
                    fatherResidentId:
                        value.fatherResidentId?.id ||
                        "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    motherResidentId:
                        value.motherResidentId?.id ||
                        "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    declarantResidentId: null,
                    withOld: false,
                    bloodType: "123e4567-e89b-12d3-a456-426614174004",
                    nationality: "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
                    localizations: [
                        {
                            childFirstName: "Abel",
                            languageCode: "en",
                            placeOfBirth: {
                                type: "HEALTH_FACILITY",
                                facilityName: "Addis Ababa Hospital",
                                facilityType: "Hospital",
                                facilityOwnership: "Government",
                            },
                            birthType: "Single",
                            childBirthOrder: "1st",
                            issuedDate: "2025-08-21",
                            reason: "Normal",
                            childWeight: 3.2,
                            childHeight: 50.5,
                            birthDate: "2025-05-20",
                            birthTime: "10:15",
                            gender: "Male",
                            declarantRelation: "",
                            attendantName: "Dr. Solomon",
                            attendantQualification: "Doctor",
                        },
                    ],
                },
            };
        } else if (selected === "newChild") {
            console.log("this is the new child value", value);
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                births: {
                    registrationOfficeNumber: "RO-2025-002",
                    hospitalNotificationId: null,
                    childResidentId: null,
                    fatherResidentId: value.fatherResidentId?.id,
                    motherResidentId: value.motherResidentId?.id,
                    declarantResidentId: null,
                    withOld: false,
                    bloodType: "123e4567-e89b-12d3-a456-426614174004",
                    nationality:
                        value.nationality?.id ||
                        "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
                    localizations: [
                        {
                            childFirstName: value.firstName,
                            languageCode: "en",
                            placeOfBirth: {
                                type: "HEALTH_FACILITY",
                                facilityName: "Addis Ababa Hospital",
                                facilityType: "Hospital",
                                facilityOwnership: "Government",
                            },
                            birthType: "Single",
                            childBirthOrder: "1st",
                            issuedDate: "2025-08-21",
                            reason: "Normal",
                            childWeight: value.birthTimeWeight,
                            childHeight: value.birthTimeHeight,
                            birthDate: handleConvertDate(
                                value.childDateOfBirth
                            ),
                            birthTime: "10:15",
                            gender: value.gender,
                            declarantRelation: "",
                            attendantName: value.birthAttendantName,
                            attendantQualification:
                                value.birthAttendantQualification,
                        },
                    ],
                },
            };
        } else if (selected === "registeredFamily") {
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                births: {
                    registrationOfficeNumber: "RO-2025-002",
                    hospitalNotificationId: null,
                    childResidentId: null,
                    fatherResidentId:
                        value.familyResidentId?.id ||
                        "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    motherResidentId:
                        value.familyResidentId?.id ||
                        "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    declarantResidentId: null,
                    withOld: false,
                    bloodType: "123e4567-e89b-12d3-a456-426614174004",
                    nationality: "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
                    localizations: [
                        {
                            childFirstName: "Abel",
                            languageCode: "en",
                            placeOfBirth: {
                                type: "HEALTH_FACILITY",
                                facilityName: "Addis Ababa Hospital",
                                facilityType: "Hospital",
                                facilityOwnership: "Government",
                            },
                            birthType: "Single",
                            childBirthOrder: "1st",
                            issuedDate: "2025-08-21",
                            reason: "Normal",
                            childWeight: 3.2,
                            childHeight: 50.5,
                            birthDate: "2025-05-20",
                            birthTime: "10:15",
                            gender: "Male",
                            declarantRelation: "",
                            attendantName: "Dr. Solomon",
                            attendantQualification: "Doctor",
                        },
                    ],
                },
            };
        }

        console.log("Generated API payload:", body);
        return body;
    };

    const handleCreateBirth = (value: any) => {
        const result = processFormSubmission(value, currentFormConfig);
        console.log("result", result);
        if (result.success) {
            const bodyMapped = mapDataModel(value);
            // Form is ready for submission
            console.log("Form is ready! API Payload:", bodyMapped);
            // console.log(
            //     "Cleans form values for display:",
            //     result.cleanFormValues
            // );

            // Here you can make your API call
            submitBirthRegistration(bodyMapped, result.data);
        } else {
            // Form is not ready - validation errors are already shown
            console.log("Form is not ready:", result.data);
            console.log(
                "Current form values for display:",
                result.cleanFormValues
            );
        }
    };
    const [submitForm, { data, isLoading, isError }] = useSubmitFormMutation();
    const submitBirthRegistration = async (
        apiPayload: any,
        submissionData: any
    ) => {
        try {
            const response = await submitForm(apiPayload).unwrap();
            // const response2 = await new Promise((resolve) =>
            //     setTimeout(resolve, 1000)
            // );
            if (response) {
                toast.success("Birth registration created successfully");
                router.push(
                    `/application/birth/detail/${response.registration_form_number}`
                );
            } else {
                toast.error("Failed to create birth registration");
            }
        } catch (error) {
            console.error("Error creating birth registration:", error);
            toast.error(
                "An error occurred while creating the birth registration"
            );
        }

        console.log("Birth registration submitted successfully!");
        alert("Birth registration submitted successfully!");
    };

    const formContent = (
        <Card className='p-5'>
            <div className='mb-4'>
                {/* <p className="font-bold pb-2">Birth Type</p> */}
                <RadioGroup
                    value={selected}
                    onValueChange={handleChange}
                    className='space-y-3'
                >
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='newChild' id='newChild' />
                        <Label
                            htmlFor='newChild'
                            className='text-[#0c4a6b] text-md font-medium'
                        >
                            Is new child?
                        </Label>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                            value='registeredHospital'
                            id='registeredHospital'
                        />
                        <Label
                            htmlFor='registeredHospital'
                            className='text-[#0c4a6b] text-md font-medium'
                        >
                            Registered in hospital?
                        </Label>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                            value='registeredFamily'
                            id='registeredFamily'
                        />
                        <Label
                            htmlFor='registeredFamily'
                            className='text-[#0c4a6b] text-md font-medium'
                        >
                            Already registered as family member?
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <DynamicForm
                key={selected}
                config={currentFormConfig}
                handleSubmit={handleCreateBirth}
                initialValues={formValues}
                formStyle='grid grid-cols-12 gap-5'
                onAccordionStateChange={handleAccordionStateChange}
                showPreview={false}
            />
        </Card>
    );

    return (
        <div>
            <HeroSection
                title='Register New Birth'
                description='This is the place to register new birth from health center.'
                action={<></>}
            />

            <FormWithSidePreview
                formContent={formContent}
                formValues={formValues}
                groupMap={groupMap}
                allFields={allFields}
                previewTitle='New Birth Registrations'
                layout='2-1'
                config={currentFormConfig}
                expandedSections={expandedSections}
                onAccordionStateChange={handleAccordionStateChange}
            />
        </div>
    );
}
