"use client";
import { Card } from "@/common/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
    DynamicForm,
    FormWithSidePreview,
} from "@/common/components/dynamic-form";
import { generateFieldGrouping } from "@/common/utils/dynamic-form/fieldGrouping";
import { processFormSubmission } from "@/common/utils/formSubmissionUtils";
import { formConfig } from "./components/marraige-form-fields";

import { useEffect, useState } from "react";
import HeroSection from "@/common/components/common/HeroSection";
import { useSubmitFormMutation } from "./api/marriageApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/ui/button";
import { showError, showSuccess } from "@/common/components/common/CustomToast";
const handleConvertDate = (date: string) => {
    const dateOnly = date.split("T")[0];
    return dateOnly;
};
export default function MarriageNew() {
    const router = useRouter();

    const formValues = useSelector((state: RootState) => state.birthSlice);
    const { allFields, groupMap } = generateFieldGrouping(formConfig);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    useEffect(() => {
        const initialExpanded = formConfig.steps
            .map((step, index) =>
                step.defaultExpanded ? `step-${index}` : null
            )
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [formConfig.steps]);
    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };
    const mapDataModel = (value: any) => {
        const files = [
            // value.groomSpecialApproval && {
            //     type: "GROOM_SPECIAL_APPROVAL",
            //     file: value.groomSpecialApproval,
            // },
            value.groomBirthCertificate && {
                type: "BIRTH_NOTICE",
                file: value.groomBirthCertificate,
            },
            value.groomPhoto && {
                type: "ID_PROOF",
                file: value.groomPhoto,
            },
            // value.brideSpecialApproval && {
            //     type: "BRIDE_SPECIAL_APPROVAL",
            //     file: value.brideSpecialApproval,
            // },
            // value.bridePhoto && {
            //     type: "BRIDE_PHOTO",
            //     file: value.bridePhoto,
            // },
        ].filter(Boolean);
        const body = {
            wifeId: value.brideResidentId?.id,
            husbandId: value.groomResidentId?.id,
            // supportingDoc: "string",
            registryOfficeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // ✅ Changed registryOfficeCode → registryOfficeId
            husbandWetnessOne: value.groomWitnessFirstResidentId?.id,
            husbandWetnessTwo: value.groomWitnessSecondResidentId?.id,
            wifeWetnessOne: value.brideWitnessFirstResidentId?.id,
            wifeWetnessTwo: value.brideWitnessSecondResidentId?.id,
            // groomSpecialApproval: value.groomSpecialApproval || null,
            BIRTH_NOTICE: value.groomBirthCertificate || null,
            ID_PROOF: value.groomPhoto || null,
            // brideSpecialApproval: value.brideSpecialApproval || null,
            // bridePhoto: value.bridePhoto || null,
            files,
            marriageLocalization: [
                {
                    languageCode: "en",
                    marriageDate: handleConvertDate(value.dateOfMarriage),
                    marriageType: "NATIONAL",
                    reason: "string",
                },
            ],
            vitalEventsRequest: {
                requesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                eventType: "MARRIAGE",
                status: "NEW",
                oldRequesterId: null, // ✅ Added to match original request
                localisation: [
                    {
                        languageCode: "en",
                        submissionDate: handleConvertDate(value.dateOfMarriage),
                    },
                ],
            },
        };
        return body;
    };

    const handleCreateMarriage = (value: any) => {
        const result = processFormSubmission(value, formConfig);

        if (result.success) {
            const bodyMapped = mapDataModel(value);
            // Form is ready for submission
            console.log("Form is ready! API Payload:", bodyMapped);
            // console.log(
            //     "Cleans form values for display:",
            //     result.cleanFormValues
            // );

            // Here you can make your API call
            submitMarriageRegistration(bodyMapped, result.data);
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

    const submitMarriageRegistration = async (
        apiPayload: any,
        submissionData: any
    ) => {
        try {
            const response = await submitForm({
                data: apiPayload,
                files: apiPayload.files,
            }).unwrap();
            // const response2 = await new Promise((resolve) =>
            //     setTimeout(resolve, 1000)
            // );
            if (response) {
                showSuccess("Marriage registration submitted successfully!");
                // data.
                router.push(
                    `/application/marriage/detail/${response.registration_form_number}`
                );
            } else {
                showError("Failed to create Marriage registration");
            }
        } catch (error) {
            console.error("Error creating birth registration:", error);
            showError(
                "An error occurred while creating the birth registration"
            );
        }

        showError("Error submitting Marriage registration. Please try again.");
    };

    const formContent = (
        <Card className='p-5'>
            <DynamicForm
                config={formConfig}
                handleSubmit={(value) => handleCreateMarriage(value)}
                initialValues={formValues}
                formStyle='grid grid-cols-2 gap-5'
                onAccordionStateChange={handleAccordionStateChange}
                showPreview={false}
            />
        </Card>
    );

    return (
        <>
            {/* <HeroSection
                title='New Marriage Registration'
                description='This is the place to register Marriage.'
                action={<></>}
            /> */}

            <FormWithSidePreview
                formContent={formContent}
                formValues={formValues}
                groupMap={groupMap}
                allFields={allFields}
                previewTitle='Marriage Registrations'
                layout='2-1'
                config={formConfig}
                expandedSections={expandedSections}
                onAccordionStateChange={handleAccordionStateChange}
            />
        </>
    );
}
