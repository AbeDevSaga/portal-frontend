"use client";
import HeroSection from "@/components/common/HeroSection";
import { Card } from "@/components/ui/card";
import DynamicForm from "@/components/dynamic-form/DynamicFrom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
import { generateFieldGrouping } from "@/utils/dynamic-form/fieldGrouping";
// import { birthFormConfig } from "./birth-form-fields";
import { hcBirthFormConfig as birthFormConfig } from "./birth-hc-form-fields";
import { useEffect, useState } from "react";
import { processFormSubmission } from "@/utils/formSubmissionUtils";
import { useSubmitFormMutation } from "@/redux/api/birthApi";
import { toast } from "sonner";

export default function Page() {
    const formValues = useSelector((state: RootState) => state.birthSlice);
    const { allFields, groupMap } = generateFieldGrouping(birthFormConfig);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    useEffect(() => {
        const initialExpanded = birthFormConfig.steps
            .map((step, index) =>
                step.defaultExpanded ? `step-${index}` : null
            )
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [birthFormConfig.steps]);
    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };

    const handleCreateBirth = (value: any) => {
        const result = processFormSubmission(value, birthFormConfig);
        console.log("result", result);
        if (result.success) {
            // Form is ready for submission
            console.log("Form is ready! API Payload:", result.apiPayload);
            console.log(
                "Cleans form values for display:",
                result.cleanFormValues
            );

            // Here you can make your API call
            submitBirthRegistration(result.apiPayload, result.data);
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
                config={birthFormConfig}
                handleSubmit={(value) => handleCreateBirth(value)}
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
                config={birthFormConfig}
                expandedSections={expandedSections}
                onAccordionStateChange={handleAccordionStateChange}
            />
        </>
    );
}
