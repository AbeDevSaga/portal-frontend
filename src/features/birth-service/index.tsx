"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
// import { birthFormConfig } from "./birth-form-fields";
// import { hcBirthFormConfig as birthFormConfig } from "./components/birth-hc-form-fields";
import {birthRegistrationFormConfig} from "./components//birth-registration-fields";
import { useEffect, useState } from "react";
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

export default function BirthNew() {
    const formValues = useSelector((state: RootState) => state.birthSlice);
    const { allFields, groupMap } = generateFieldGrouping(birthRegistrationFormConfig);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    useEffect(() => {
        const initialExpanded = birthRegistrationFormConfig.steps
            .map((step, index) =>
                step.defaultExpanded ? `step-${index}` : null
            )
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [birthRegistrationFormConfig.steps]);
    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };

    const handleCreateBirth = (value: any) => {
        const result = processFormSubmission(value, birthRegistrationFormConfig);
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
