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

export default function MarriageNew() {
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
        const body = {
            wifeId: value.brideResidentId?.id,
            husbandId: value.groomResidentId?.id,
            supportingDoc: "string",
            registryOfficeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // ✅ Changed registryOfficeCode → registryOfficeId
            husbandWetnessOne: value.groomWitnessFirstResidentId?.id,
            husbandWetnessTwo: value.groomWitnessSecondResidentId?.id,
            wifeWetnessOne: value.brideWitnessFirstResidentId?.id,
            wifeWetnessTwo: value.brideWitnessSecondResidentId?.id,
            marriageLocalization: [
                {
                    languageCode: "string",
                    marriageDate: "2025-08-23",
                    marriageType: "string",
                    reason: "string",
                },
            ],
            vitalEventsRequest: {
                requesterId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                eventType: "BIRTH",
                status: "NEW",
                oldRequesterId: null, // ✅ Added to match original request
                localisation: [
                    {
                        languageCode: "string",
                        submissionDate: value.dateOfMarriage,
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
            const response = await submitForm(apiPayload).unwrap();
            // const response2 = await new Promise((resolve) =>
            //     setTimeout(resolve, 1000)
            // );
            if (response) {
                toast.success("Marriage registration submitted successfully!");
            } else {
                toast.error("Failed to create Marriage registration");
            }
        } catch (error) {
            console.error("Error creating birth registration:", error);
            toast.error(
                "An error occurred while creating the birth registration"
            );
        }

        toast.error(
            "Error submitting Marriage registration. Please try again."
        );
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
            <HeroSection
                title='New Marriage Registration'
                description='This is the place to register Marriage.'
                action={<></>}
            />

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
