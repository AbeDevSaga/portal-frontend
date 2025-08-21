"use client";
import HeroSection from "@/components/common/HeroSection";
import { Card } from "@/components/ui/card";
import DynamicForm from "@/components/dynamic-form/DynamicFrom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import FormWithSidePreview from "@/components/dynamic-form/FormWithSidePreview";
import { generateFieldGrouping } from "@/utils/dynamic-form/fieldGrouping";
import {formConfig} from './birth-form-fields'
import { useEffect, useState } from "react";

export default function Page() {
    const formValues = useSelector((state: RootState) => state.birthSlice);
    const { allFields, groupMap } = generateFieldGrouping(formConfig);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    useEffect(() => {
        const initialExpanded = formConfig.steps
            .map((step, index) => step.defaultExpanded ? `step-${index}` : null)
            .filter(Boolean) as string[];
        setExpandedSections(initialExpanded);
    }, [formConfig.steps]);
    const handleAccordionStateChange = (expandedItems: string[]) => {
        setExpandedSections(expandedItems);
    };

    const handleCreateBirth = (value: any) => {
        console.log(value);
    };

    const formContent = (
        <Card className='p-5'>
            <DynamicForm
                config={formConfig}
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
                title='New Birth Registration'
                description='This is the place to register birth.'
                action={<></>}
            />

            <FormWithSidePreview
                formContent={formContent}
                formValues={formValues}
                groupMap={groupMap}
                allFields={allFields}
                previewTitle="Birth Registrations"
                layout="2-1"
                config={formConfig}
                expandedSections={expandedSections}
                onAccordionStateChange={handleAccordionStateChange}
            />
        </>
    );
}
