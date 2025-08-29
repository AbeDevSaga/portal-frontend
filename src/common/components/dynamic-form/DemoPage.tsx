"use client";
import React from "react";
import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { FormConfig, FieldConfig } from "@/common/types/formType";
import DynamicForm from "./DynamicFrom";
import DynamicFormWithPreview from "./DynamicFormWithPreview";
import FormWithSidePreview from "./FormWithSidePreview";

// Demo form configurations
const noStepperConfig: FormConfig = {
    stepperData: [],
    stepperPosition: "top",
    steps: [
        {
            title: "All Fields",
            fields: [
                {
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "Enter first name",
                    validators: [{ type: "required", message: "First name is required" }],
                    required: true,
                },
                {
                    type: "input",
                    key: "lastName",
                    label: "Last Name",
                    placeholder: "Enter last name",
                    validators: [{ type: "required", message: "Last name is required" }],
                    required: true,
                },
                {
                    type: "email",
                    key: "email",
                    label: "Email",
                    placeholder: "Enter email",
                    validators: [
                        { type: "required", message: "Email is required" },
                        { type: "email", message: "Invalid email format" }
                    ],
                    required: true,
                },
                {
                    type: "inputSearch",
                    key: "userSearch",
                    label: "Search User",
                    placeholder: "Search for a user...",
                    description: "This field demonstrates the new inputSearch functionality. Type at least 3 characters to search.",
                    required: true,
                    validators: [{ type: "required", message: "User selection is required" }],
                    inputSearchConfig: {
                        isExternal: true,
                        apiEndpoint: "user/user",
                        method: "GET",
                        searchKey: "search",
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 500,
                        cacheResults: true,
                        placeholder: "Search users...",
                        noOptionsMessage: "No users found",
                        loadingMessage: "Searching...",
                        transformResponse: (data: any) => {
                            // Transform the API response to match expected format
                            return Array.isArray(data) ? data : [];
                        },
                    },
                },
            ],
        },
    ],
};

const topStepperConfig: FormConfig = {
    stepperData: [
        { label: "Personal Info", content: "Personal Info" },
        { label: "Contact Info", content: "Contact Info" },
        { label: "Review", content: "Review" },
    ],
    stepperPosition: "top",
    steps: [
        {
            title: "Personal Information",
            fields: [
                {
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "Enter first name",
                    validators: [{ type: "required", message: "First name is required" }],
                    required: true,
                },
                {
                    type: "input",
                    key: "lastName",
                    label: "Last Name",
                    placeholder: "Enter last name",
                    validators: [{ type: "required", message: "Last name is required" }],
                    required: true,
                },
            ],
        },
        {
            title: "Contact Information",
            fields: [
                {
                    type: "email",
                    key: "email",
                    label: "Email",
                    placeholder: "Enter email",
                    validators: [
                        { type: "required", message: "Email is required" },
                        { type: "email", message: "Invalid email format" }
                    ],
                    required: true,
                },
                {
                    type: "input",
                    key: "phone",
                    label: "Phone",
                    placeholder: "Enter phone number",
                    validators: [{ type: "required", message: "Phone is required" }],
                    required: true,
                },
            ],
        },
        {
            title: "Review & Submit",
            fields: [
                {
                    type: "textarea",
                    key: "notes",
                    label: "Additional Notes",
                    placeholder: "Any additional notes...",
                    validators: [],
                    required: false,
                },
            ],
        },
    ],
};

const leftStepperConfig: FormConfig = {
    stepperData: [
        { label: "Step 1", content: "Basic Info" },
        { label: "Step 2", content: "Details" },
    ],
    stepperPosition: "left",
    steps: [
        {
            title: "Basic Information",
            fields: [
                {
                    type: "input",
                    key: "name",
                    label: "Full Name",
                    placeholder: "Enter full name",
                    validators: [{ type: "required", message: "Name is required" }],
                    required: true,
                },
                {
                    type: "select",
                    key: "country",
                    label: "Country",
                    options: [
                        { label: "USA", value: "usa" },
                        { label: "Canada", value: "canada" },
                        { label: "UK", value: "uk" },
                    ],
                    placeholder: "Select country",
                    validators: [{ type: "required", message: "Country is required" }],
                    required: true,
                },
            ],
        },
        {
            title: "Additional Details",
            fields: [
                {
                    type: "textarea",
                    key: "bio",
                    label: "Biography",
                    placeholder: "Tell us about yourself...",
                    validators: [],
                    required: false,
                },
                {
                    type: "radio",
                    key: "experience",
                    label: "Experience Level",
                    options: [
                        { label: "Beginner", value: "beginner" },
                        { label: "Intermediate", value: "intermediate" },
                        { label: "Advanced", value: "advanced" },
                    ],
                    placeholder: "",
                    validators: [{ type: "required", message: "Experience level is required" }],
                    required: true,
                },
            ],
        },
    ],
};

const demoFields: FieldConfig[] = [
    {
        type: "input",
        key: "name",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
        validators: [{ type: "required", message: "Name is required" }],
    },
    {
        type: "inputSearch",
        key: "userSearch",
        label: "Search User",
        placeholder: "Search for a user...",
        description: "This field demonstrates the new inputSearch functionality. Type at least 3 characters to search.",
        required: true,
        validators: [{ type: "required", message: "User selection is required" }],
        inputSearchConfig: {
            apiEndpoint: "https://jsonplaceholder.typicode.com/users",
            method: "GET",
            searchKey: "q",
            valueKey: "id",
            labelKey: "name",
            minSearchLength: 3,
            debounceMs: 500,
            cacheResults: true,
            placeholder: "Search users...",
            noOptionsMessage: "No users found",
            loadingMessage: "Searching...",
            transformResponse: (data: any) => {
                // Filter results based on search query (since jsonplaceholder doesn't support search)
                return Array.isArray(data) ? data.slice(0, 5) : [];
            },
        },
    },
    {
        type: "inputSearch",
        key: "demoSearch",
        label: "Demo Search (Query Format)",
        inputSearchConfig: {
            isExternal: false,
            apiEndpoint: "demo/search",
            method: "GET",
            searchKey: "search",
            searchFormat: "query", // Query parameter format: /api/demo/search?search="term"
            valueKey: "id",
            labelKey: "name",
            minSearchLength: 2,
            debounceMs: 300,
            cacheResults: true,
            placeholder: "Search with query format...",
            noOptionsMessage: "No results found",
            loadingMessage: "Searching...",
            additionalParams: {},
            transformResponse: (data: any) => {
                if (Array.isArray(data)) {
                    return data.map((item) => ({
                        value: item.id,
                        label: item.name,
                        data: item,
                    }));
                }
                return [];
            },
        },
    },
    {
        type: "inputSearch",
        key: "demoSearchPath",
        label: "Demo Search (Path Format)",
        inputSearchConfig: {
            isExternal: false,
            apiEndpoint: "demo/search/{search}", // Path format with placeholder
            method: "GET",
            searchKey: "search",
            searchFormat: "path", // Path parameter format: /api/demo/search/search_term
            valueKey: "id",
            labelKey: "name",
            minSearchLength: 2,
            debounceMs: 300,
            cacheResults: true,
            placeholder: "Search with path format...",
            noOptionsMessage: "No results found",
            loadingMessage: "Searching...",
            additionalParams: {},
            transformResponse: (data: any) => {
                if (Array.isArray(data)) {
                    return data.map((item) => ({
                        value: item.id,
                        label: item.name,
                        data: item,
                    }));
                }
                return [];
            },
        },
    },
];

export default function DemoPage() {
    const handleSubmit = (values: any) => {
        console.log("Form submitted:", values);
        alert("Form submitted successfully! Check console for values.");
    };

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
        name: "",
        country: "",
        bio: "",
        experience: "",
        userSearch: null,
    };

    return (
        <div className="space-y-8 p-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Dynamic Form Components Demo
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    This page demonstrates the different stepper configurations and positioning options
                    available in the dynamic form components.
                </p>
            </div>

            {/* No Stepper Demo */}
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                    1. No Stepper (Single Form)
                </h2>
                <p className="text-gray-600 mb-4">
                    When <code>stepperData</code> is empty, all fields are shown at once with only a Submit button.
                </p>
                <DynamicForm
                    config={noStepperConfig}
                    handleSubmit={handleSubmit}
                    initialValues={initialValues}
                    formStyle="grid grid-cols-2 gap-4"
                />
            </Card>

            {/* Top Stepper Demo */}
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-green-600">
                    2. Top Stepper (Multi-step Form)
                </h2>
                <p className="text-gray-600 mb-4">
                    When <code>stepperData</code> has items and <code>stepperPosition</code> is &quot;top&quot;,
                    the stepper appears above the form with Next/Previous navigation.
                </p>
                <DynamicForm
                    config={topStepperConfig}
                    handleSubmit={handleSubmit}
                    initialValues={initialValues}
                    formStyle="grid grid-cols-2 gap-4"
                />
            </Card>

            {/* Left Stepper Demo */}
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-purple-600">
                    3. Left Stepper (Multi-step Form)
                </h2>
                <p className="text-gray-600 mb-4">
                    When <code>stepperPosition</code> is &quot;left&quot;, the stepper appears to the left of the form.
                    This is ideal for forms with many steps.
                </p>
                <div className="relative">
                    <DynamicForm
                        config={leftStepperConfig}
                        handleSubmit={handleSubmit}
                        initialValues={initialValues}
                        formStyle="grid grid-cols-2 gap-4 ml-64"
                    />
                </div>
            </Card>

            {/* With Preview Demo */}
            <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-orange-600">
                    4. Form with Live Preview
                </h2>
                <p className="text-gray-600 mb-4">
                    Using <code>FormWithSidePreview</code> to show a live preview alongside the form.
                </p>
                <FormWithSidePreview
                    formContent={
                        <Card className="p-4">
                            <DynamicForm
                                config={noStepperConfig}
                                handleSubmit={handleSubmit}
                                initialValues={initialValues}
                                formStyle="space-y-4"
                            />
                        </Card>
                    }
                    formValues={initialValues}
                    groupMap={{
                        firstName: "Personal Info",
                        lastName: "Personal Info",
                        email: "Contact Info",
                    }}
                    allFields={[
                        { key: "firstName", label: "First Name", type: "input" },
                        { key: "lastName", label: "Last Name", type: "input" },
                        { key: "email", label: "Email", type: "input" },
                    ]}
                    previewTitle="User Registration"
                    layout="2-1"
                />
            </Card>
        </div>
    );
}
