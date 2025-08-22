import { FormConfig } from "@/types/formType";

export const mapApiResponseToFormFields = (
    apiData: Record<string, any>,
    formConfig: FormConfig
) => {
    return formConfig.steps.map((step) => {
        const data = step.fields.map((field) => ({
            label: field.label,
            key: field.key,
            value: apiData[field.key] ?? null,
        }));

        return {
            title: step.group || step.title,
            data,
        };
    });
};
