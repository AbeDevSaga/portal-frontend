"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
// import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
// import { birthFormConfig } from "./birth-form-fields";
// import { hcBirthFormConfig as birthFormConfig } from "./components/birth-hc-form-fields";
import { birthRegistrationFormConfig } from "./components//birth-registration-fields";
import { useEffect, useState, useRef } from "react";
// import { processFormSubmission } from "@/utils/formSubmissionUtils";
import { toast } from "sonner";
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { processFormSubmission } from "@/common/utils/formSubmissionUtils";
import { Card } from "@/common/components/ui/card";
import {
    DynamicForm,
    FormWithSidePreview,
} from "@/common/components/dynamic-form";

import HeroSection from "@/common/components/common/HeroSection";
import { useSubmitFormMutation } from "./api/birthApi";
import { removeFields, updateField } from "@/redux/feature/birthSlice";

export default function BirthNew() {
    const dispatch = useDispatch();
    const formValues = useSelector((state: RootState) => state.birthSlice);
    const { allFields, groupMap } = generateFieldGrouping(birthRegistrationFormConfig);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const prevBirthTypeRef = useRef<string | null>(null);
    
    useEffect(() => {
        const initialExpanded = birthRegistrationFormConfig.steps
            .map((step, index) =>
                step.defaultExpanded ? `step-${index}` : null
            )
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [birthRegistrationFormConfig.steps]);

    // Watch for birth type changes and reset dependent fields when it changes
    useEffect(() => {
        const currentBirthType = formValues.birthType;
        
        // Only reset dependent fields if birth type has actually changed and is not the initial load
        if (currentBirthType && prevBirthTypeRef.current && prevBirthTypeRef.current !== currentBirthType) {
            console.log('Birth type changed from', prevBirthTypeRef.current, 'to', currentBirthType);
            console.log('Current form values before reset:', formValues);
            console.log('Resetting dependent fields...');
            
            // Reset only the dependent fields based on birth type
            const fieldsToReset = [
                'hospitalNotificationId',
                'familyResidentId', 
                'firstName',
                'gender',
                'nationality',
                'dateOfBirth',
                'birthTimeWeight',
                'isBornInHealthCenter',
                'healthCenterName',
                'healthCenterType',
                'healthCenterOwner',
                'fatherResidentId',
                'fatherFullName',
                'fatherDateOfBirth',
                'fatherPhoneNumber',
                'motherResidentId',
                'motherFullName',
                'motherDateOfBirth',
                'motherPhoneNumber'
            ];
            
            // First remove the fields completely, then re-add them with empty values
            console.log('Removing fields completely...');
            dispatch(removeFields({ keys: fieldsToReset }));
            
            // Then re-add them with empty values after a short delay
            setTimeout(() => {
                console.log('Re-adding fields with empty values...');
                fieldsToReset.forEach(fieldKey => {
                    // Handle complex fields (resident IDs) differently
                    if (fieldKey === 'fatherResidentId' || fieldKey === 'motherResidentId' || fieldKey === 'familyResidentId') {
                        console.log('Setting complex field:', fieldKey, 'to null');
                        dispatch(updateField({ key: fieldKey, value: null }));
                    } else {
                        console.log('Setting field:', fieldKey, 'to empty string');
                        dispatch(updateField({ key: fieldKey, value: '' }));
                    }
                });
                console.log('Field reset complete');
            }, 50);
        }
        
        // Update the ref with current value
        prevBirthTypeRef.current = currentBirthType;
    }, [formValues.birthType, dispatch]);
    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };
    const mapDataModel = (value: any) => {
        console.log("chile registration value", value);
        let body = {};
        if (value.birthType === "Registered in hospital") {
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                "births": {
                    "registrationOfficeNumber": "RO-2025-002",
                    "hospitalNotificationId": "HN-1755913119386",
                    "childResidentId": null,
                    "fatherResidentId": "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    "motherResidentId": "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    "declarantResidentId": null,
                    "withOld": false,
                    "bloodType": "123e4567-e89b-12d3-a456-426614174004",
                    "nationality": "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
                    "localizations": [
                        {
                            "childFirstName": "Abel",
                            "languageCode": "en",
                            "placeOfBirth": {
                                "type": "HEALTH_FACILITY",
                                "facilityName": "Addis Ababa Hospital",
                                "facilityType": "Hospital",
                                "facilityOwnership": "Government"
                            },
                            "birthType": "Single",
                            "childBirthOrder": "1st",
                            "issuedDate": "2025-08-21",
                            "reason": "Normal",
                            "childWeight": 3.2,
                            "childHeight": 50.5,
                            "birthDate": "2025-05-20",
                            "birthTime": "10:15",
                            "gender": "Male",
                            "declarantRelation": "",
                            "attendantName": "Dr. Solomon",
                            "attendantQualification": "Doctor"
                        }
                    ]
                }

            };
        } else if (value.birthType === "Is new child") {
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                "births": {
                    "registrationOfficeNumber": "RO-2025-002",
                    "hospitalNotificationId": null,
                    "childResidentId": null,
                    "fatherResidentId": value.familyResidentId?.id,
                    "motherResidentId": value.familyResidentId?.id,
                    "declarantResidentId": null,
                    "withOld": false,
                    "bloodType": "123e4567-e89b-12d3-a456-426614174004",
                    "nationality": value.nationality.id,
                    "localizations": [
                        {
                            "childFirstName": value.firstName,
                            "languageCode": "en",
                            "placeOfBirth": {
                                "type": "HEALTH_FACILITY",
                                "facilityName": "Addis Ababa Hospital",
                                "facilityType": "Hospital",
                                "facilityOwnership": "Government"
                            },
                            "birthType": "Single",
                            "childBirthOrder": "1st",
                            "issuedDate": "2025-08-21",
                            "reason": "Normal",
                            "childWeight": value.birthTimeWeight,
                            "childHeight": 50.5,
                            "birthDate": value.dateOfBirth,
                            "birthTime": "10:15",
                            "gender": value.gender,
                            "declarantRelation": "",
                            "attendantName": "Dr. Solomon",
                            "attendantQualification": "Doctor"
                        }
                    ]
                }

            };
        } else if (value.birthType === "Already registered as family member") {
            body = {
                requesterId: "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                actionType: "NEW",
                "births": {
                    "registrationOfficeNumber": "RO-2025-002",
                    "hospitalNotificationId": "HN-1755913119386",
                    "childResidentId": null,
                    "fatherResidentId": "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    "motherResidentId": "d0a09819-4b8a-4a8f-8552-31d79e3302cb",
                    "declarantResidentId": null,
                    "withOld": false,
                    "bloodType": "123e4567-e89b-12d3-a456-426614174004",
                    "nationality": "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
                    "localizations": [
                        {
                            "childFirstName": "Abel",
                            "languageCode": "en",
                            "placeOfBirth": {
                                "type": "HEALTH_FACILITY",
                                "facilityName": "Addis Ababa Hospital",
                                "facilityType": "Hospital",
                                "facilityOwnership": "Government"
                            },
                            "birthType": "Single",
                            "childBirthOrder": "1st",
                            "issuedDate": "2025-08-21",
                            "reason": "Normal",
                            "childWeight": 3.2,
                            "childHeight": 50.5,
                            "birthDate": "2025-05-20",
                            "birthTime": "10:15",
                            "gender": "Male",
                            "declarantRelation": "",
                            "attendantName": "Dr. Solomon",
                            "attendantQualification": "Doctor"
                        }
                    ]
                }

            };
        }
        return body;
    };

    const handleCreateBirth = (value: any) => {
        const result = processFormSubmission(value, birthRegistrationFormConfig);
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
            <DynamicForm
                config={birthRegistrationFormConfig}
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
                config={birthRegistrationFormConfig}
                expandedSections={expandedSections}
                onAccordionStateChange={handleAccordionStateChange}
            />
        </div>
    );
}
