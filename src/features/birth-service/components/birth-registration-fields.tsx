import { FormConfig } from "@/common/types/formType";

export const birthRegistrationFormConfig: FormConfig = {
    stepperData: [],
    stepperPosition: "",
    grouping: {
        defaultGroup: "Child Details",
        groups: [
            { name: "Child Details", label: "Child's Information", order: 1 },
        ],
    },
    steps: [
        {
            title: "Child Details",
            group: "Child Details",
            groupOrder: 1,
            tabular: true,
            defaultExpanded: true,
            fields: [
                {
                    type: "radio",
                    key: "birthType",
                    label: "Birth Type",
                    description: "",
                    options: [
                        { label: "Registered in hospital?", value: "Registered in hospital" },
                        { label: "Is new child?", value: "Is new child" },
                        { label: "Already registered as family member?", value: "Already registered as family member" },
                    ],
                    placeholder: "",
                    validators: [
                        { type: "required", message: "This field is required" },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 1,
                    gridCols: 12
                },
                {
                    type: "inputSearch",
                    key: "hospitalNotificationId",
                    label: "Hospital Notification ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for hospital notification ID. The system will search as you type.",
                    validators: [
                        {
                            type: "required",
                            message: "Hospital notification ID is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 2,
                    gridCols: 6,
                    inputSearchConfig: {
                        isExternal: true,
                        apiEndpoint: "/resident/residents",
                        method: "GET",
                        searchKey: "search",
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 300,
                        cacheResults: true,
                        placeholder: "Search for resident...",
                        noOptionsMessage: "No resident found",
                        loadingMessage: "Searching residents...",
                        additionalParams: {
                        },
                        transformResponse: (data: any) => {
                            if (
                                !data ||
                                !data.content ||
                                !Array.isArray(data.content)
                            ) {
                                return [];
                            }

                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label: resident.urid || "Unknown",
                                name: resident.urid || "Unknown",
                                firstName: resident.firstName,
                                middleName: resident.middleName,
                                lastName: resident.lastName,
                                fullName: [
                                    resident.firstName,
                                    resident.middleName,
                                    resident.lastName,
                                ]
                                    .filter(Boolean)
                                    .join(" "),
                                age: resident.age,
                                dateOfBirth: resident.dateOfBirth,
                                gender: resident.gender,
                                maritalStatus: resident.maritalStatus,
                                mobileNumber: resident.mobileNumber,
                                nationality: resident.nationality,
                                ...resident,
                            }));
                        },
                    },
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Registered in hospital";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Registered in hospital";
                    },
                },
                {
                    type: "inputSearch",
                    key: "familyResidentId",
                    label: "Family resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for either father or mother's resident ID. The system will search as you type.",
                    validators: [
                        {
                            type: "required",
                            message: "Family ID is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 3,
                    gridCols: 6,
                    inputSearchConfig: {
                        isExternal: true,
                        apiEndpoint: "/resident/residents",
                        method: "GET",
                        searchKey: "search",
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 300,
                        cacheResults: true,
                        placeholder: "Search for resident...",
                        noOptionsMessage: "No resident found",
                        loadingMessage: "Searching residents...",
                        additionalParams: {
                        },
                        transformResponse: (data: any) => {
                            if (
                                !data ||
                                !data.content ||
                                !Array.isArray(data.content)
                            ) {
                                return [];
                            }

                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label: resident.urid || "Unknown",
                                name: resident.urid || "Unknown",
                                firstName: resident.firstName,
                                middleName: resident.middleName,
                                lastName: resident.lastName,
                                fullName: [
                                    resident.firstName,
                                    resident.middleName,
                                    resident.lastName,
                                ]
                                    .filter(Boolean)
                                    .join(" "),
                                age: resident.age,
                                dateOfBirth: resident.dateOfBirth,
                                gender: resident.gender,
                                maritalStatus: resident.maritalStatus,
                                mobileNumber: resident.mobileNumber,
                                nationality: resident.nationality,
                                ...resident,
                            }));
                        },
                    },
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Already registered as family member";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Already registered as family member";
                    },
                },
                {
                    type: "input",
                    key: "firstName",
                    label: "Child's First Name",
                    placeholder: "",
                    description:
                        "Enter your child's first name.",
                    validators: [
                        { type: "required", message: "Child's First name is required" },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 4,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "radio",
                    key: "gender",
                    label: "Gender",
                    description: "Select your gender",
                    options: [
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ],
                    placeholder: "",
                    validators: [
                        { type: "required", message: "Gender is required" },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 7,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "lookup",
                    key: "nationality",
                    label: "Nationality",
                    placeholder: "Search for a nationality...",
                    description:
                        "Select the nationality where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 8,
                    gridCols: 6,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/nationalities",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        defaultValue: {
                            value: "ET",
                            label: "Ethiopia",
                            id: 1,
                            name: "Ethiopia",
                        },
                        transformResponse: (
                            response,
                            locale: "en" | "am" = "en"
                        ) => {
                            console.log("response data", response);
                            return response.content.map((res: any) => ({
                                id: res.code,
                                value: res.code,
                                name:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                label:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                isDisabled: false,
                            }));
                        },
                    },
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "date",
                    key: "dateOfBirth",
                    label: "Date of Birth",
                    placeholder: "",
                    description:
                        "Select your birth date. Future dates are not acceptable.",
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: new Date().toISOString().split("T")[0],
                            message: "Date cannot be in the future",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 9,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
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
                    group: "Child Details",
                    groupOrder: 10,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "checkbox",
                    key: "isBornInHealthCenter",
                    label: "Is born in Health Center?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 13,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "healthCenterName",
                    label: "Health Center Name",
                    placeholder: "",
                    description: "Enter the name of the health center.",
                    validators: [
                        {
                            type: "required",
                            message: "Health center name is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "healthCenterType",
                    label: "Health Center Type",
                    placeholder: "",
                    description: "Enter the type of the health center.",
                    validators: [
                        {
                            type: "required",
                            message: "Health center type is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 15,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "healthCenterOwner",
                    label: "Health Center Owner",
                    placeholder: "",
                    description: "Enter the owner of the health center.",
                    validators: [
                        {
                            type: "required",
                            message: "Health center owner is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 16,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "inputSearch",
                    key: "fatherResidentId",
                    label: "Father's resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [
                        {
                            type: "required",
                            message: "Resident ID is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    inputSearchConfig: {
                        isExternal: true,
                        apiEndpoint: "/resident/residents",
                        method: "GET",
                        searchKey: "search",
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 300,
                        cacheResults: true,
                        placeholder: "Search for resident...",
                        noOptionsMessage: "No resident found",
                        loadingMessage: "Searching residents...",
                        additionalParams: {
                            // limit: 20,        // Uncomment and modify as needed
                            // offset: 0,        // Uncomment and modify as needed
                            // Add any other parameters your API expects
                        },
                        transformResponse: (data: any) => {
                            if (
                                !data ||
                                !data.content ||
                                !Array.isArray(data.content)
                            ) {
                                return [];
                            }

                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label: resident.urid || "Unknown",
                                name: resident.urid || "Unknown",
                                firstName: resident.firstName,
                                middleName: resident.middleName,
                                lastName: resident.lastName,
                                fullName: [
                                    resident.firstName,
                                    resident.middleName,
                                    resident.lastName,
                                ]
                                    .filter(Boolean)
                                    .join(" "),
                                age: resident.age,
                                dateOfBirth: resident.dateOfBirth,
                                gender: resident.gender,
                                maritalStatus: resident.maritalStatus,
                                mobileNumber: resident.mobileNumber,
                                nationality: resident.nationality,
                                ...resident,
                            }));
                        },
                    },
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "fatherFullName",
                    label: "Father's Full Name",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.fatherResidentId &&
                            typeof dependentValues.fatherResidentId === "object"
                        ) {
                            return (
                                dependentValues.fatherResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        fatherResidentId: formValues.fatherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        console.log("dependentValues father resident", dependentValues);
                        if(!dependentValues?.fatherResidentId && dependentValues?.birthType !== "Is new child") {
                            return true;
                        }
                        return false;
                    },
                },
                {
                    type: "input",
                    key: "fatherDateOfBirth",
                    label: "Father's Date of Birth",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.fatherResidentId &&
                            typeof dependentValues.fatherResidentId === "object"
                        ) {
                            return (
                                dependentValues.fatherResidentId.dateOfBirth ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        fatherResidentId: formValues.fatherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.fatherResidentId || dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "fatherPhoneNumber",
                    label: "Father's phone number",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.fatherResidentId &&
                            typeof dependentValues.fatherResidentId === "object"
                        ) {
                            return (
                                dependentValues.fatherResidentId.mobileNumber ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        fatherResidentId: formValues.fatherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.fatherResidentId || dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "inputSearch",
                    key: "motherResidentId",
                    label: "Mother's resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [
                        {
                            type: "required",
                            message: "Resident ID is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    inputSearchConfig: {
                        isExternal: true,
                        apiEndpoint: "/resident/residents",
                        method: "GET",
                        searchKey: "search",
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 300,
                        cacheResults: true,
                        placeholder: "Search for resident...",
                        noOptionsMessage: "No resident found",
                        loadingMessage: "Searching residents...",
                        additionalParams: {
                            // limit: 20,        // Uncomment and modify as needed
                            // offset: 0,        // Uncomment and modify as needed
                            // Add any other parameters your API expects
                        },
                        transformResponse: (data: any) => {
                            if (
                                !data ||
                                !data.content ||
                                !Array.isArray(data.content)
                            ) {
                                return [];
                            }

                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label: resident.urid || "Unknown",
                                name: resident.urid || "Unknown",
                                firstName: resident.firstName,
                                middleName: resident.middleName,
                                lastName: resident.lastName,
                                fullName: [
                                    resident.firstName,
                                    resident.middleName,
                                    resident.lastName,
                                ]
                                    .filter(Boolean)
                                    .join(" "),
                                age: resident.age,
                                dateOfBirth: resident.dateOfBirth,
                                gender: resident.gender,
                                maritalStatus: resident.maritalStatus,
                                mobileNumber: resident.mobileNumber,
                                nationality: resident.nationality,
                                ...resident,
                            }));
                        },
                    },
                    getDependentValue: (formValues: any) => ({
                        birthType: formValues.birthType,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.birthType === "Is new child";
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "motherFullName",
                    label: "Mother's Full Name",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.motherResidentId &&
                            typeof dependentValues.motherResidentId === "object"
                        ) {
                            return (
                                dependentValues.motherResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        motherResidentId: formValues.motherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.motherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.motherResidentId || dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "motherDateOfBirth",
                    label: "Mother's Date of Birth",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.motherResidentId &&
                            typeof dependentValues.motherResidentId === "object"
                        ) {
                            return (
                                dependentValues.motherResidentId.dateOfBirth ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        motherResidentId: formValues.motherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.motherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.motherResidentId || dependentValues?.birthType !== "Is new child";
                    },
                },
                {
                    type: "input",
                    key: "motherPhoneNumber",
                    label: "Mother's phone number",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Child Details",
                    groupOrder: 14,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.motherResidentId &&
                            typeof dependentValues.motherResidentId === "object"
                        ) {
                            return (
                                dependentValues.motherResidentId.mobileNumber ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        motherResidentId: formValues.motherResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.motherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.motherResidentId || dependentValues?.birthType !== "Is new child";
                    },
                },
            ],
        },
    ],
};