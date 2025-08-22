"use client";
import HeroSection from "@/components/common/HeroSection";
import { Card } from "@/components/ui/card";
import DynamicForm from "@/components/dynamic-form/DynamicFrom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
import { generateFieldGrouping } from "@/utils/dynamic-form/fieldGrouping";
import { formConfig } from "./marraige-form-fields";
import { useEffect, useState } from "react";
import { processFormSubmission } from "@/utils/formSubmissionUtils";

export default function Page() {
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

    const handleCreateMarriage = (value: any) => {
        const result = processFormSubmission(value, formConfig);

        if (result.success) {
            // Form is ready for submission
            console.log("Form is ready! API Payload:", result.apiPayload);
            console.log(
                "Cleans form values for display:",
                result.cleanFormValues
            );

            // Here you can make your API call
            submitMarriageRegistration(result.apiPayload, result.data);
        } else {
            // Form is not ready - validation errors are already shown
            console.log("Form is not ready:", result.data);
            console.log(
                "Current form values for display:",
                result.cleanFormValues
            );
        }
    };

    const submitMarriageRegistration = async (
        apiPayload: any,
        submissionData: any
    ) => {
        try {
            console.log(
                "Submitting Marriage registration with payload:",
                apiPayload
            );

            // Here you would make your actual API call
            // Example:
            // const response = await fetch('/api/Marriage-registration', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(apiPayload)
            // });

            // For now, simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Marriage registration submitted successfully!");
            alert("Marriage registration submitted successfully!");
        } catch (error) {
            console.error("Error submitting Marriage registration:", error);
            alert("Error submitting Marriage registration. Please try again.");
        }
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
