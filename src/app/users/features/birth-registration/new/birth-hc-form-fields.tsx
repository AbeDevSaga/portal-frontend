import { FormConfig } from "@/common/types/formType";

export const hcBirthFormConfig: FormConfig = {
    stepperData: [],
    stepperPosition: "",
    grouping: {
        defaultGroup: "Health Center Birth",
        groups: [
            { name: "Health Center Birth", label: "Health Center(HC) Birth Notification", order: 1 },
        ],
    },
    steps: [
        {
            title: "Health Center(HC) Birth Notification",
            group: "Health Center Birth",
            groupOrder: 1,
            tabular: true,
            defaultExpanded: true,
            fields: [
                {
                    group: "Health Center Birth",
                    groupOrder: 1,
                    type: "select",
                    key: "birthType",
                    label: "Birth Type",
                    options: [
                        { label: "Single", value: "single" },
                        { label: "Twin", value: "twin" },
                    ],
                    placeholder: "Select birth type",
                    validators: [{ type: "required", message: "Birth type is required" }],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 2,
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "",
                    description:
                        "Enter your child's first name",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 3,
                    type: "input",
                    key: "fatherName",
                    label: "Father Name",
                    placeholder: "",
                    description:
                        "Enter child's legal father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Father name is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 4,
                    type: "input",
                    key: "grandFatherName",
                    label: "Grand Father Name",
                    placeholder: "",
                    description:
                        "Enter child's legal grand father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Grand Father name is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 5,
                    type: "radio",
                    key: "gender",
                    label: "Gender",
                    description: "Select child's gender",
                    options: [
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ],
                    placeholder: "",
                    validators: [
                        { type: "required", message: "Gender is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 6,
                    type: "date",
                    key: "dateOfBirth",
                    label: "Date of Birth",
                    placeholder: "",
                    description:
                        "Select child's birth date. Future dates are not acceptable.",
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: new Date().toISOString().split("T")[0],
                            message: "Date cannot be in the future",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 7,
                    type: "number",
                    key: "birthTimeWeight",
                    label: "Birth Time Weight",
                    placeholder: "",
                    description:
                        "Please insert the weight of the child during the birth time.",
                    validators: [
                        {
                            type: "required",
                            message: "Birth time weight is required",
                        },
                        {
                            type: "min",
                            value: 0,
                            message: "Must be at least 1",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 8,
                    type: "input",
                    key: "fatherFirstName",
                    label: "Father's First Name",
                    placeholder: "",
                    description:
                        "Enter the child's father first name",
                    validators: [
                        { type: "required", message: "Father's first name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 9,
                    type: "input",
                    key: "fatherFatherName",
                    label: "Father's Father Name",
                    placeholder: "",
                    description:
                        "Enter the child's father Father name",
                    validators: [
                        { type: "required", message: "Father's Father name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 10,
                    type: "input",
                    key: "fatherGrandfatherName",
                    label: "Father's Grandfather Name",
                    placeholder: "",
                    description:
                        "Enter the child's father Grandfather name",
                    validators: [
                        { type: "required", message: "Father's Grandfather name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 11,
                    type: "input",
                    key: "motherFirstName",
                    label: "Mother's First Name",
                    placeholder: "",
                    description:
                        "Enter the child's mother first name",
                    validators: [
                        { type: "required", message: "Mother's first name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 12,
                    type: "input",
                    key: "motherFatherName",
                    label: "Mother's Father Name",
                    placeholder: "",
                    description:
                        "Enter the child's mother, father name",
                    validators: [
                        { type: "required", message: "Mother's father name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 13,
                    type: "input",
                    key: "motherGrandfatherName",
                    label: "Mother's Grandfather Name",
                    placeholder: "",
                    description:
                        "Enter the child's mother Grandfather name",
                    validators: [
                        { type: "required", message: "Mother's Grandfather name is required" },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 14,
                    type: "input",
                    key: "healthCenterName",
                    label: "Health Center Name",
                    placeholder: "",
                    description:
                        "Enter the health center name where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Health center name is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 15,
                    type: "input",
                    key: "healthCenterAddress",
                    label: "Health Center Address",
                    placeholder: "",
                    description:
                        "Enter the health center address where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Health center address is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 16,
                    type: "lookup",
                    key: "healthCenterOwnership",
                    label: "Health Center Ownership",
                    placeholder: "Search for a healthCenterOwnership...",
                    description:
                        "Select the health center's ownership where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Health Center's ownership is required",
                        },
                    ],
                    required: true,
                    clearable: false,
                    lookupConfig: {
                        isExternal: false,
                        apiEndpoint: "/hcOwnerships",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                    },
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 16,
                    type: "input",
                    key: "birthAttendantName",
                    label: "Birth Attendant Full Name",
                    placeholder: "",
                    description: "Enter the name of the birth attendant.",
                    validators: [
                        {
                            type: "required",
                            message: "Birth attendant full name is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 17,
                    type: "input",
                    key: "birthAttendantTitle",
                    label: "Birth Attendant Title",
                    placeholder: "",
                    description: "Enter the birth attendant title.",
                    validators: [
                        {
                            type: "required",
                            message: "Birth attendant title is required",
                        },
                    ],
                    required: true,
                },
                {
                    group: "Health Center Birth",
                    groupOrder: 18,
                    type: "digitalSignature",
                    key: "birthAttendantSignature",
                    label: "Birth Attendant's signature",
                    description:
                        "Please put the birth attendant's signature in the box below.",
                    required: true,
                    validators: [
                        {
                            type: "required",
                            message:
                                "Birth attendant's signature is required to proceed with registration",
                        },
                    ],
                    digitalSignatureConfig: {
                        canvasWidth: 450,
                        canvasHeight: 200,
                        penColor: "#1f2937",
                        penWidth: 3,
                        backgroundColor: "#ffffff",
                        showClearButton: true,
                        showSaveButton: true,
                        placeholder: "Click and drag to sign here",
                        validationMessage:
                            "Please provide your signature to continue",
                    }
                },
            ],
        },
    ],
};
