import { FormConfig } from "@/common/types/formType";

export const generateInitialState = (config: FormConfig) => {
    const steps = config?.steps || [];

    const initialValues = steps.reduce((acc: any, step: any) => {
        step.fields.forEach((field: any) => {
            acc[field.key] = "";
        });
        return acc;
    }, {} as Record<string, any>);

    return initialValues;
};
