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
                    type: "checkbox",
                    key: "registeredInHospital",
                    label: "Registered in hospital?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 1,
                    gridCols: 12,
                    // getDependentValue: (formValues: any) => ({
                    //     isNewBorn: formValues.isNewChild,
                    // }),
                    // isDisabled: (dependentValues: any) => {
                    //     // Disable the field when it shouldn't be interactive
                    //     return dependentValues?.isNewBorn !== true;
                    // },
                },
                {
                    type: "checkbox",
                    key: "isNewChild",
                    label: "Is new child?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 2,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        registeredInHospital: formValues.registeredInHospital,
                    }),
                    isDisabled: (dependentValues: any) => {
                        // Disable the field when it shouldn't be interactive
                        return dependentValues?.registeredInHospital === true;
                    },
                },
                {
                    type: "checkbox",
                    key: "alreadyRegisteredAsFamily",
                    label: "Already registered as family member?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 3,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        registeredInHospital: formValues.registeredInHospital,
                        isNewChild: formValues.isNewChild,
                    }),
                    isDisabled: (dependentValues: any) => {
                        // Disable the field when it shouldn't be interactive
                        return dependentValues?.registeredInHospital === true && dependentValues?.isNewChild !== true;
                    },
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
                    groupOrder: 4,
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
                                label: resident.firstName || "Unknown",
                                name: resident.firstName || "Unknown",
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
                        isNewBorn: formValues.isNewChild,
                        registeredInHospital: formValues.registeredInHospital,
                    }),
                    // isRequired: (dependentValues: any) => {
                    //     return dependentValues?.isNewBorn === true;
                    // },
                    isHide: (dependentValues: any) => {
                        // Simplified logic to prevent conditional hook calls
                        // Always show the field, but control its behavior through other means
                        return dependentValues?.registeredInHospital !== true;
                    },
                    // isDisabled: (dependentValues: any) => {
                    //     // Disable the field when it shouldn't be interactive
                    //     // This prevents hook issues while maintaining the desired behavior
                    //     return dependentValues?.isNewBorn !== true && dependentValues?.registeredInHospital !== true;
                    // },
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
                    groupOrder: 5,
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
                                label: resident.firstName || "Unknown",
                                name: resident.firstName || "Unknown",
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
                        alreadyRegisteredAsFamily: formValues.alreadyRegisteredAsFamily,
                    }),
                    // isRequired: (dependentValues: any) => {
                    //     return dependentValues?.isNewBorn === true;
                    // },
                    isHide: (dependentValues: any) => {
                        // Simplified logic to prevent conditional hook calls
                        // Always show the field, but control its behavior through other means
                        return dependentValues?.alreadyRegisteredAsFamily !== true;
                    },
                    // isDisabled: (dependentValues: any) => {
                    //     // Disable the field when it shouldn't be interactive
                    //     // This prevents hook issues while maintaining the desired behavior
                    //     return dependentValues?.isNewBorn !== true && dependentValues?.registeredInHospital !== true;
                    // },
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
                    groupOrder: 6,
                    gridCols: 6,
                    getDependentValue: (formValues: any) => ({
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isNewChild: formValues.isNewChild,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewChild === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewChild !== true;
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
                        isBornInHealthCenter: formValues.isBornInHealthCenter,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter !== true;
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
                        isBornInHealthCenter: formValues.isBornInHealthCenter,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter !== true;
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
                        isBornInHealthCenter: formValues.isBornInHealthCenter,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isBornInHealthCenter !== true;
                    },
                },
            ],
        },
    ],
};