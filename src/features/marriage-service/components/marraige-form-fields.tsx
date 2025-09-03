import { FormConfig } from "@/common/types/formType";

function isValidBirthday(birthdayStr: string) {
    // Parse input into a Date
    const birthday = new Date(birthdayStr);

    // Check if it's a valid date
    if (isNaN(birthday.getTime())) {
        return false; // Invalid date format
    }

    // Get today's date
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    const dayDiff = today.getDate() - birthday.getDate();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age >= 18;
}
export const formConfig: FormConfig = {
    stepperData: [
        {
            label: "Step 1",
            content: "General Information",
        },
        {
            label: "Step 2",
            content: "Groom's Information",
        },
        {
            label: "Step 3",
            content: "Bride's Information",
        },
        // {
        //     label: "Step 5",
        //     content: "Groom Witness Information",
        // },
        // {
        //     label: "Step 6",
        //     content: "Bride Witness Information",
        // },
    ],
    stepperPosition: "",
    grouping: {
        defaultGroup: "General Information",
        groups: [
            {
                name: "General Information",
                label: "General Information",
                order: 1,
            },
            {
                name: "Groom's Information",
                label: "Groom's Information",
                order: 2,
            },
            {
                name: "Bride's Information",
                label: "Bride's Information",
                order: 3,
            },
        ],
    },
    steps: [
        {
            title: "General Information",
            group: "General Information",
            groupOrder: 1,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "lookup",
                    key: "marriageType",
                    label: "Type of Marriage",
                    placeholder: "Search for marriage type.",
                    description: "Select the marriage type",
                    validators: [
                        {
                            type: "required",
                            message: "Marriage type is required",
                        },
                    ],
                    required: true,
                    group: "General Information",
                    gridCols: 6,
                    groupOrder: 1,
                    clearable: false,
                    searchable: true,
                    lookupConfig: {
                        isExternal: true,
                        apiEndpoint: "/reference-data/marriage-types",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        transformResponse: (
                            response,
                            locale: "en" | "am" = "en"
                        ) => {
                            console.log("response data", response);
                            return response.content.map((res: any) => ({
                                id: res.id,
                                value: res.id,
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
                },
                {
                    type: "date",
                    key: "dateOfMarriage",
                    label: "Date of Marriage",
                    placeholder: "",
                    gridCols: 6,
                    description:
                        "Select your marriage date. Future dates are allowed for National marriage type only.",
                    getDependentValue: (formValues: any) => ({
                        marriageType: formValues.marriageType,
                    }),
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: "dynamic", // Will be calculated at validation time
                            message:
                                "Date cannot be in the future for this marriage type",
                            // Adding a conditional property to make this validator conditional
                            condition: (formValues: any) => {
                                const marriageType = formValues?.marriageType;

                                const typeName =
                                    marriageType?.name || marriageType?.label;
                                const shouldRestrictFutureDate =
                                    typeName !== "National";

                                return shouldRestrictFutureDate;
                            },
                        },
                    ],
                    required: true,
                    group: "General Information",
                    groupOrder: 1,
                },
            ],
        },
        {
            title: "Groom's Information",
            group: "Groom's Information",
            groupOrder: 2,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "groomResidentId",
                    label: "Grooms's resident ID",
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
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "groomFullName",
                    label: "Groom's Full Name",
                    placeholder: "",
                    description:
                        "Groom legal Full Name as it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomResidentId &&
                            typeof dependentValues.groomResidentId === "object"
                        ) {
                            return (
                                dependentValues.groomResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomResidentId: formValues.groomResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomResidentId;
                    },
                },
                {
                    type: "fileUpload",
                    key: "groomBirthCertificate",
                    label: "Groom's Birth Certificate",
                    placeholder: "",
                    description: "Upload the Groom's Birth Certificate",
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                },
                {
                    type: "input",
                    key: "groomNationality",
                    label: "Groom's Nationality",
                    placeholder: "",
                    description:
                        "Groom Nationality it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomResidentId &&
                            typeof dependentValues.groomResidentId === "object"
                        ) {
                            console.log(
                                "dependentValues.groomResidentId.nationality",
                                dependentValues.groomResidentId.nationality
                            );
                            return (
                                dependentValues.groomResidentId.nationality ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomResidentId: formValues.groomResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomResidentId;
                    },
                },
                {
                    type: "input",
                    key: "groomNationalId",
                    label: "Groom's National ID",
                    placeholder: "Insert Groom's National Id.",
                    description: "Insert Groom's National Id",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's National Id is required",
                        },
                        {
                            type: "pattern",
                            message: "Groom's National Id is not valid",
                            value: "^\\d{16}$",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,
                },

                {
                    type: "input",
                    key: "groomDateOfBirth",
                    label: "Groom's Date of Birth",
                    placeholder: "",
                    description: "Birth Date it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomResidentId &&
                            typeof dependentValues.groomResidentId === "object"
                        ) {
                            return (
                                dependentValues.groomResidentId.dateOfBirth ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomResidentId: formValues.groomResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomResidentId;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "groomSpecialApproval",
                //     label: "Groom's Special Approval Document",
                //     placeholder: "",
                //     description: "Upload the Grooms Special Approval Document",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Special Approval Document is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         const checkIfValidBirthDate = isValidBirthday(
                //             dependentValue.groomDateOfBirth
                //         );
                //         console.log(
                //             isValidBirthday(dependentValue.groomDateOfBirth)
                //         );
                //         return checkIfValidBirthDate;
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Groom's Information",
                //     gridCols: 6,
                //     groupOrder: 2,
                //     getDependentValue: (formValues: any) => ({
                //         groomResidentId: formValues.groomDateOfBirth,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return isValidBirthday(
                //             dependentValues.groomDateOfBirth
                //         );
                //     },
                //     isHide: (dependentValues: any) => {
                //         const checkIfValidBirthDate = isValidBirthday(
                //             dependentValues.groomDateOfBirth
                //         );
                //         return !checkIfValidBirthDate;
                //     },
                // },
                {
                    type: "lookup",
                    key: "groomPlaceOfBirth",
                    label: "Groom's Place of Birth",
                    placeholder: "Search for Place of Birth.",
                    description: "Select the Groom's Place of Birth",
                    validators: [
                        {
                            type: "required",
                            message: "Place of Birth is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,
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
                            id: 1,
                            label: "Ethiopia",
                            value: "ET",
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
                },
                {
                    type: "lookup",
                    key: "groomCurrentResidence",
                    label: "Groom's Current Residence",
                    placeholder: "Search for Current Residence.",
                    description: "Select the Groom's Current Residence",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Current Residence is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,

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
                            id: 1,
                            label: "Ethiopia",
                            value: "ET",
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
                },
                {
                    type: "lookup",
                    key: "groomReligion",
                    label: "Groom's Religion",
                    placeholder: "Search for Religion.",
                    description: "Select the Groom's Religion",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Religion is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/religions",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        defaultValue: (dependentValues: any) => {
                            if (
                                dependentValues?.groomResidentId &&
                                typeof dependentValues.groomResidentId ===
                                    "object"
                            ) {
                                console.log(
                                    "dependentValues.groomResidentId.nationality",
                                    dependentValues.groomResidentId.nationality
                                );
                                return (
                                    dependentValues.groomResidentId
                                        .nationality || ""
                                );
                            }
                            return "";
                        },
                        getDependentValue: (formValues: any) => ({
                            groomResidentId: formValues.groomResidentId,
                        }),
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
                },
                {
                    type: "input",
                    key: "earlierMaritalStatusGroom",
                    label: "Earlier Marital Status",
                    placeholder: "",
                    description:
                        "Earlier Marital Status it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomResidentId &&
                            typeof dependentValues.groomResidentId === "object"
                        ) {
                            return (
                                dependentValues.groomResidentId.maritalStatus ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomResidentId: formValues.groomResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomResidentId;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "groomDivorceCertificate",
                //     label: "Groom's Divorce Certificate",
                //     placeholder: "",
                //     description: "Upload the Grooms Divorce Certificate",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Divorce Certificate is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         return (
                //             dependentValue.earlierMaritalStatusGroom ===
                //                 "MARRIED" ||
                //             dependentValue.earlierMaritalStatusGroom ===
                //                 "DIVORCED"
                //         );
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Groom's Information",

                //     getDependentValue: (formValues: any) => ({
                //         groomResidentId: formValues.earlierMaritalStatusGroom,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return dependentValues?.earlierMaritalStatusGroom;
                //     },
                //     isHide: (dependentValues: any) => {
                //         return (
                //             dependentValues.earlierMaritalStatusGroom !==
                //                 "MARRIED" &&
                //             dependentValues.earlierMaritalStatusGroom !==
                //                 "DIVORCED"
                //         );
                //     },
                // },
                // {
                //     type: "fileUpload",
                //     key: "groomWidowCertificate",
                //     label: "Groom's Widow Certificate",
                //     placeholder: "",
                //     description: "Upload the Grooms Widow Certificate",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Widow Certificate is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         return (
                //             dependentValue.earlierMaritalStatusGroom === "WIDOW"
                //         );
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Groom's Information",

                //     getDependentValue: (formValues: any) => ({
                //         groomResidentId: formValues.earlierMaritalStatusGroom,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return dependentValues?.earlierMaritalStatusGroom;
                //     },
                //     isHide: (dependentValues: any) => {
                //         return (
                //             dependentValues.earlierMaritalStatusGroom !==
                //             "WIDOW"
                //         );
                //     },
                // },
                {
                    type: "fileUpload",
                    key: "groomPhoto",
                    label: "Groom's Photo",
                    placeholder: "",
                    description: "Upload the Grooms 3*4 Photo",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Photo is required",
                        },
                    ],
                    required: true,
                    // required:  (dependentValues: any) => {
                    //     // Make required if birth type is twin
                    //     return dependentValues?.birthType === 'twin';
                    // },
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomPhoto;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "residentIdGroom",
                //     label: "Groom's Resident ID",
                //     placeholder: "",
                //     description: "Upload the Grooms Resident ID",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Groom's Resident ID is required",
                //         },
                //     ],
                //     required: true,
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Groom's Information",

                // },
                {
                    type: "lookup",
                    key: "groomEducationlStatus",
                    label: "Groom's Education Level",
                    placeholder: "Search for Education Level.",
                    description: "Select the Groom's Education Level",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Education Level is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/education-levels",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "lookup",
                    key: "groomJobType",
                    label: "Groom's Job Type",
                    placeholder: "Search for Job Type.",
                    description: "Select the Groom's Job Type",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Job Type is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/occupation-types",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "lookup",
                    key: "groomEconomicStatus",
                    label: "Groom's Economic Status",
                    placeholder: "Search for Economic Status.",
                    description: "Select the Groom's Economic Status",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Economic Status is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/occupation-types",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "inputSearch",
                    key: "groomWitnessFirstResidentId",
                    label: "Groom's First Witness resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "groomWitnessFirstFullName",
                    label: "Groom's First Witness Full Name",
                    placeholder: "",
                    description:
                        "Groom's First Witness Full Name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's first Witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomWitnessFirstResidentId &&
                            typeof dependentValues.groomWitnessFirstResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.groomWitnessFirstResidentId
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomWitnessFirstResidentId:
                            formValues.groomWitnessFirstResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomWitnessFirstResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomWitnessFirstResidentId;
                    },
                },
                {
                    type: "fileUpload",
                    key: "groomFirstWitnessId",
                    label: "Groom's First Witness ID",
                    placeholder: "",
                    description: "Witness's proof of identity (ID, Passport)",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's First witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                },
                {
                    type: "inputSearch",
                    key: "groomWitnessSecondResidentId",
                    label: "Groom's Second Witness resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Second Witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "groomWitnessSecondFullName",
                    label: "Groom's Second Witness Full Name",
                    placeholder: "",
                    description:
                        "Groom's Second Witness Full Name as it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Groom's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.groomWitnessSecondResidentId &&
                            typeof dependentValues.groomWitnessSecondResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.groomWitnessSecondResidentId
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        groomWitnessSecondResidentId:
                            formValues.groomWitnessSecondResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomWitnessSecondResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.groomWitnessSecondResidentId;
                    },
                },

                {
                    type: "fileUpload",
                    key: "groomSecondWitnessId",
                    label: "Groom's Second Witness ID",
                    placeholder: "",
                    description: "Witness's proof of identity (ID, Passport)",
                    validators: [
                        {
                            type: "required",
                            message: "Groom's Second witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Groom's Information",

                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.groomPhoto;
                    },
                },
            ],
        },

        {
            title: "Bride's Information",
            group: "Bride's Information",
            groupOrder: 3,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "brideResidentId",
                    label: "Brides's resident ID",
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
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "brideFullName",
                    label: "Bride's Full Name",
                    placeholder: "",
                    description:
                        "Bride legal Full Name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Bride Full name is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideResidentId &&
                            typeof dependentValues.brideResidentId === "object"
                        ) {
                            return (
                                dependentValues.brideResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideResidentId: formValues.brideResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideResidentId;
                    },
                },
                {
                    type: "fileUpload",
                    key: "brideBirthCertificate",
                    label: "Bride's Birth Certificate",
                    placeholder: "",
                    description: "Upload the Bride's Birth Certificate",
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                },
                {
                    type: "input",
                    key: "brideNationality",
                    label: "Bride's Nationality",
                    placeholder: "",
                    description:
                        "Bride Nationality it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Bride Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideResidentId &&
                            typeof dependentValues.brideResidentId === "object"
                        ) {
                            return (
                                dependentValues.brideResidentId.nationality ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideResidentId: formValues.brideResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideResidentId;
                    },
                },
                {
                    type: "input",
                    key: "brideNationalId",
                    label: "Bride's National ID",
                    placeholder: "Insert Bride's National Id.",
                    description: "Insert Bride's National Id",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's National Id is required",
                        },
                        {
                            type: "pattern",
                            message: "Bride's National Id is not valid",
                            value: "^\\d{16}$",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,
                },
                {
                    type: "input",
                    key: "brideDateOfBirth",
                    label: "Bride's Date of Birth",
                    placeholder: "",
                    description: "Birth Date it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Birth Date is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideResidentId &&
                            typeof dependentValues.brideResidentId === "object"
                        ) {
                            return (
                                dependentValues.brideResidentId.dateOfBirth ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideResidentId: formValues.brideResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideResidentId;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "brideSpecialApproval",
                //     label: "Bride's Special Approval Document",
                //     placeholder: "",
                //     description: "Upload the Brides Special Approval Document",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Special Approval Document is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         const checkIfValidBirthDate = isValidBirthday(
                //             dependentValue.brideDateOfBirth
                //         );
                //         console.log("is valid date", checkIfValidBirthDate);
                //         return checkIfValidBirthDate;
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Bride's Information",
                //     gridCols: 6,
                //     groupOrder: 2,
                //     getDependentValue: (formValues: any) => ({
                //         brideResidentId: formValues.brideDateOfBirth,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return isValidBirthday(
                //             dependentValues.brideDateOfBirth
                //         );
                //     },
                //     isHide: (dependentValues: any) => {
                //         const checkIfValidBirthDate = isValidBirthday(
                //             dependentValues.brideDateOfBirth
                //         );
                //         return !checkIfValidBirthDate;
                //     },
                // },
                {
                    type: "lookup",
                    key: "bridePlaceOfBirth",
                    label: "Bride's Place of Birth",
                    placeholder: "Search for Place of Birth.",
                    description: "Select the Bride's Place of Birth",
                    validators: [
                        {
                            type: "required",
                            message: "Place of Birth is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

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
                            id: 1,
                            label: "Ethiopia",
                            value: "ET",
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
                },
                {
                    type: "lookup",
                    key: "brideCurrentResidence",
                    label: "Bride's Current Residence",
                    placeholder: "Search for Current Residence.",
                    description: "Select the Bride's Current Residence",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Current Residence is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

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
                            id: 1,
                            label: "Ethiopia",
                            value: "ET",
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
                },
                {
                    type: "lookup",
                    key: "brideReligion",
                    label: "Bride's Religion",
                    placeholder: "Search for Religion.",
                    description: "Select the Bride's Religion",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Religion is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/religions",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "input",
                    key: "earlierMaritalStatusBride",
                    label: "Earlier Marital Status",
                    placeholder: "",
                    description:
                        "Earlier Marital Status it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideResidentId &&
                            typeof dependentValues.brideResidentId === "object"
                        ) {
                            return (
                                dependentValues.brideResidentId.maritalStatus ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideResidentId: formValues.brideResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideResidentId;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "brideDivorceCertificate",
                //     label: "Bride's Divorce Certificate",
                //     placeholder: "",
                //     description: "Upload the Brides Divorce Certificate",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Divorce Certificate is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         return (
                //             dependentValue.earlierMaritalStatusBride ===
                //                 "MARRIED" ||
                //             dependentValue.earlierMaritalStatusBride ===
                //                 "DIVORCED"
                //         );
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Bride's Information",

                //     getDependentValue: (formValues: any) => ({
                //         brideResidentId: formValues.earlierMaritalStatusBride,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return dependentValues?.earlierMaritalStatusBride;
                //     },
                //     isHide: (dependentValues: any) => {
                //         return (
                //             dependentValues.earlierMaritalStatusBride !==
                //                 "MARRIED" &&
                //             dependentValues.earlierMaritalStatusBride !==
                //                 "DIVORCED"
                //         );
                //     },
                // },
                // {
                //     type: "fileUpload",
                //     key: "brideWidowCertificate",
                //     label: "Bride's Widow Certificate",
                //     placeholder: "",
                //     description: "Upload the Brides Widow Certificate",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Widow Certificate is required",
                //         },
                //     ],
                //     isRequired: (dependentValue) => {
                //         return (
                //             dependentValue.earlierMaritalStatusBride === "WIDOW"
                //         );
                //     },
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Bride's Information",

                //     getDependentValue: (formValues: any) => ({
                //         brideResidentId: formValues.earlierMaritalStatusBride,
                //     }),
                //     isDisabled: (dependentValues: any) => {
                //         return dependentValues?.earlierMaritalStatusBride;
                //     },
                //     isHide: (dependentValues: any) => {
                //         return (
                //             dependentValues.earlierMaritalStatusBride !==
                //             "WIDOW"
                //         );
                //     },
                // },
                {
                    type: "fileUpload",
                    key: "bridePhoto",
                    label: "Bride's Photo",
                    placeholder: "",
                    description: "Upload the Brides 3*4 Photo",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Photo is required",
                        },
                    ],
                    required: true,
                    // required:  (dependentValues: any) => {
                    //     // Make required if birth type is twin
                    //     return dependentValues?.birthType === 'twin';
                    // },
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.bridePhoto;
                    },
                },
                // {
                //     type: "fileUpload",
                //     key: "residentIdBride",
                //     label: "Bride's Resident ID",
                //     placeholder: "",
                //     description: "Upload the Bride's Resident ID",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Bride's Resident ID is required",
                //         },
                //     ],
                //     required: true,
                //     // required:  (dependentValues: any) => {
                //     //     // Make required if birth type is twin
                //     //     return dependentValues?.birthType === 'twin';
                //     // },
                //     group: "Bride's Information",

                // },
                {
                    type: "lookup",
                    key: "brideEducationlStatus",
                    label: "Bride's Education Level",
                    placeholder: "Search for Education Level.",
                    description: "Select the Bride's Education Level",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Education Level is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/education-levels",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "lookup",
                    key: "brideJobType",
                    label: "Bride's Job Type",
                    placeholder: "Search for Job Type.",
                    description: "Select the Bride's Job Type",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Job Type is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/occupation-types",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "lookup",
                    key: "brideEconomicStatus",
                    label: "Bride's Economic Status",
                    placeholder: "Search for Economic Status.",
                    description: "Select the Bride's Economic Status",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Economic Status is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        apiEndpoint: "/reference-data/occupation-types",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
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
                },
                {
                    type: "inputSearch",
                    key: "brideWitnessFirstResidentId",
                    label: "Bride's First Witness resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [],
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "brideWitnessFirstFullName",
                    label: "Bride's First Witness Full Name",
                    placeholder: "",
                    description:
                        "Bride's First Witness Full Name as it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideWitnessFirstResidentId &&
                            typeof dependentValues.brideWitnessFirstResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.brideWitnessFirstResidentId
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideWitnessFirstResidentId:
                            formValues.brideWitnessFirstResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideWitnessFirstResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideWitnessFirstResidentId;
                    },
                },
                {
                    type: "fileUpload",
                    key: "brideSecondWitnessId",
                    label: "Bride's Second Witness ID",
                    placeholder: "",
                    description: "Witness's proof of identity (ID, Passport)",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Second witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",

                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.bridePhoto;
                    },
                },
                {
                    type: "inputSearch",
                    key: "brideWitnessSecondResidentId",
                    label: "Bride's Second Witness resident ID",
                    placeholder: "Enter at least 3 characters to search...",
                    description:
                        "Search for a resident by entering their ID. The system will search as you type.",
                    validators: [],
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 1,
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
                            // console.log("Groom data", data);
                            return data.content.map((resident: any) => ({
                                id: resident.id,
                                value: resident.id,
                                label:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
                                name:
                                    resident.firstName +
                                    " " +
                                    resident.middleName +
                                    " " +
                                    resident.lastName,
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
                },
                {
                    type: "input",
                    key: "brideWitnessSecondFullName",
                    label: "Bride's Second Witness Full Name",
                    placeholder: "",
                    description:
                        "Bride's Second Witness Full Name as it appears on official documents",
                    validators: [],
                    required: false,
                    group: "Bride's Information",
                    gridCols: 6,
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.brideWitnessSecondResidentId &&
                            typeof dependentValues.brideWitnessSecondResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.brideWitnessSecondResidentId
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        brideWitnessSecondResidentId:
                            formValues.brideWitnessSecondResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.brideWitnessSecondResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.brideWitnessSecondResidentId;
                    },
                },
                {
                    type: "fileUpload",
                    key: "brideSecondWitnessId",
                    label: "Bride's Second Witness ID",
                    placeholder: "",
                    description: "Witness's proof of identity (ID, Passport)",
                    validators: [
                        {
                            type: "required",
                            message: "Bride's Second witness ID is required",
                        },
                    ],
                    required: true,
                    group: "Bride's Information",

                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.bridePhoto;
                    },
                },
            ],
        },
        // {
        //     title: "Groom Witness Information",
        //     group: "Groom Witness Information",
        //     tabular: false,
        //     defaultExpanded: true,
        //     fields: [
        //         {
        //             type: "inputSearch",
        //             key: "witnessResidentIdGroom",
        //             label: "Groom's Witness resident ID",
        //             placeholder: "Enter at least 3 characters to search...",
        //             description:
        //                 "Search for a resident by entering their ID. The system will search as you type.",
        //             validators: [
        //                 {
        //                     type: "required",
        //                     message: "Resident ID is required",
        //                 },
        //             ],
        //             required: true,
        //             group: "Groom Witness Information",

        //             inputSearchConfig: {
        //                 isExternal: true,
        //                 apiEndpoint: "/resident/residents",
        //                 method: "GET",
        //                 searchKey: "search",
        //                 valueKey: "id",
        //                 labelKey: "name",
        //                 minSearchLength: 3,
        //                 debounceMs: 300,
        //                 cacheResults: true,
        //                 placeholder: "Search for resident...",
        //                 noOptionsMessage: "No resident found",
        //                 loadingMessage: "Searching residents...",
        //                 additionalParams: {
        //                     // limit: 20,        // Uncomment and modify as needed
        //                     // offset: 0,        // Uncomment and modify as needed
        //                     // Add any other parameters your API expects
        //                 },
        //                 transformResponse: (data: any) => {
        //                     if (
        //                         !data ||
        //                         !data.content ||
        //                         !Array.isArray(data.content)
        //                     ) {
        //                         return [];
        //                     }
        //                     // console.log("Groom data", data);
        //                     return data.content.map((resident: any) => ({
        //                         id: resident.id,
        //                         value: resident.id,
        //                         label: resident.firstName || "Unknown",
        //                         name: resident.firstName || "Unknown",
        //                         firstName: resident.firstName,
        //                         middleName: resident.middleName,
        //                         lastName: resident.lastName,
        //                         fullName: [
        //                             resident.firstName,
        //                             resident.middleName,
        //                             resident.lastName,
        //                         ]
        //                             .filter(Boolean)
        //                             .join(" "),
        //                         age: resident.age,
        //                         dateOfBirth: resident.dateOfBirth,
        //                         gender: resident.gender,
        //                         maritalStatus: resident.maritalStatus,
        //                         mobileNumber: resident.mobileNumber,
        //                         nationality: resident.nationality,
        //                         ...resident,
        //                     }));
        //                 },
        //             },
        //         },
        //         {
        //             type: "input",
        //             key: "witnessFirstNameGroom",
        //             label: "Groom Witness Information",
        //             placeholder: "",
        //             description:
        //                 "Enter Witness Full name as it appears on official documents",
        //             validators: [
        //                 {
        //                     type: "required",
        //                     message: "Earlier Marital Status is required",
        //                 },
        //             ],
        //             required: true,
        //             group: "Groom Witness Information",

        //             defaultValue: (dependentValues: any) => {
        //                 if (
        //                     dependentValues?.witnessResidentIdGroom &&
        //                     typeof dependentValues.witnessResidentIdGroom ===
        //                         "object"
        //                 ) {
        //                     return (
        //                         dependentValues.witnessResidentIdGroom
        //                             .fullName || ""
        //                     );
        //                 }
        //                 return "";
        //             },
        //             getDependentValue: (formValues: any) => ({
        //                 witnessResidentIdGroom:
        //                     formValues.witnessResidentIdGroom,
        //             }),
        //             isDisabled: (dependentValues: any) => {
        //                 return dependentValues?.witnessResidentIdGroom;
        //             },
        //             isHide: (dependentValues: any) => {
        //                 return !dependentValues?.witnessResidentIdGroom;
        //             },
        //         },
        //         {
        //             type: "digitalSignature",
        //             key: "parentSignatureGroom",
        //             label: "Witness Signature",
        //             description:
        //                 "Please sign below to confirm the information provided is accurate and complete",
        //             required: true,
        //             group: "Account Details",

        //             validators: [
        //                 {
        //                     type: "required",
        //                     message:
        //                         "Signature is required to proceed with registration",
        //                 },
        //             ],
        //             digitalSignatureConfig: {
        //                 canvasWidth: 450,
        //                 canvasHeight: 200,
        //                 penColor: "#1f2937", // Dark gray for better visibility
        //                 penWidth: 3,
        //                 backgroundColor: "#ffffff",
        //                 showClearButton: true,
        //                 showSaveButton: true,
        //                 placeholder: "Click and drag to sign here",
        //                 validationMessage:
        //                     "Please provide your signature to continue",
        //             },
        //         },
        //     ],
        // },
        // {
        //     title: "Bride Witness Information",
        //     group: "Bride Witness Information",

        //     tabular: false,
        //     defaultExpanded: true,
        //     fields: [
        //         {
        //             type: "inputSearch",
        //             key: "witnessResidentIdBride",
        //             label: "Bride's Witness resident ID",
        //             placeholder: "Enter at least 3 characters to search...",
        //             description:
        //                 "Search for a resident by entering their ID. The system will search as you type.",
        //             validators: [
        //                 {
        //                     type: "required",
        //                     message: "Resident ID is required",
        //                 },
        //             ],
        //             required: true,
        //             group: "Bride Witness Information",

        //             inputSearchConfig: {
        //                 isExternal: true,
        //                 apiEndpoint: "/resident/residents",
        //                 method: "GET",
        //                 searchKey: "search",
        //                 valueKey: "id",
        //                 labelKey: "name",
        //                 minSearchLength: 3,
        //                 debounceMs: 300,
        //                 cacheResults: true,
        //                 placeholder: "Search for resident...",
        //                 noOptionsMessage: "No resident found",
        //                 loadingMessage: "Searching residents...",
        //                 additionalParams: {
        //                     // limit: 20,        // Uncomment and modify as needed
        //                     // offset: 0,        // Uncomment and modify as needed
        //                     // Add any other parameters your API expects
        //                 },
        //                 transformResponse: (data: any) => {
        //                     if (
        //                         !data ||
        //                         !data.content ||
        //                         !Array.isArray(data.content)
        //                     ) {
        //                         return [];
        //                     }
        //                     // console.log("Groom data", data);
        //                     return data.content.map((resident: any) => ({
        //                         id: resident.id,
        //                         value: resident.id,
        //                         label: resident.firstName || "Unknown",
        //                         name: resident.firstName || "Unknown",
        //                         firstName: resident.firstName,
        //                         middleName: resident.middleName,
        //                         lastName: resident.lastName,
        //                         fullName: [
        //                             resident.firstName,
        //                             resident.middleName,
        //                             resident.lastName,
        //                         ]
        //                             .filter(Boolean)
        //                             .join(" "),
        //                         age: resident.age,
        //                         dateOfBirth: resident.dateOfBirth,
        //                         gender: resident.gender,
        //                         maritalStatus: resident.maritalStatus,
        //                         mobileNumber: resident.mobileNumber,
        //                         nationality: resident.nationality,
        //                         ...resident,
        //                     }));
        //                 },
        //             },
        //         },
        //         {
        //             type: "input",
        //             key: "witnessFirstNameBride",
        //             label: "Groom Witness Information",
        //             placeholder: "",
        //             description:
        //                 "Enter Witness Full name as it appears on official documents",
        //             validators: [
        //                 {
        //                     type: "required",
        //                     message: "Earlier Marital Status is required",
        //                 },
        //             ],
        //             required: true,
        //             group: "Bride Witness Information",

        //             defaultValue: (dependentValues: any) => {
        //                 if (
        //                     dependentValues?.witnessResidentIdBride &&
        //                     typeof dependentValues.witnessResidentIdBride ===
        //                         "object"
        //                 ) {
        //                     return (
        //                         dependentValues.witnessResidentIdBride
        //                             .fullName || ""
        //                     );
        //                 }
        //                 return "";
        //             },
        //             getDependentValue: (formValues: any) => ({
        //                 witnessResidentIdBride:
        //                     formValues.witnessResidentIdBride,
        //             }),
        //             isDisabled: (dependentValues: any) => {
        //                 return dependentValues?.witnessResidentIdBride;
        //             },
        //             isHide: (dependentValues: any) => {
        //                 return !dependentValues?.witnessResidentIdBride;
        //             },
        //         },

        //         {
        //             type: "digitalSignature",
        //             key: "parentSignatureBride",
        //             label: "Witness Signature",
        //             description:
        //                 "Please sign below to confirm the information provided is accurate and complete",
        //             required: true,
        //             group: "Account Details",

        //             validators: [
        //                 {
        //                     type: "required",
        //                     message:
        //                         "Signature is required to proceed with registration",
        //                 },
        //             ],
        //             digitalSignatureConfig: {
        //                 canvasWidth: 450,
        //                 canvasHeight: 200,
        //                 penColor: "#1f2937", // Dark gray for better visibility
        //                 penWidth: 3,
        //                 backgroundColor: "#ffffff",
        //                 showClearButton: true,
        //                 showSaveButton: true,
        //                 placeholder: "Click and drag to sign here",
        //                 validationMessage:
        //                     "Please provide your signature to continue",
        //             },
        // Dynamic behavior based on country selection
        // getDependentValue: (formValues: any) => {
        //     return {
        //         countryOfBirth: formValues.countryOfBirth,
        //         regionOfBirth: formValues.regionOfBirth,
        //     };
        // },
        // // Make signature required for all countries
        // isRequired: (dependentValues: any) => {
        //     return true; // Always required for birth registration
        // },
        // // Always show the signature field, but guide users with description
        // isHide: (dependentValues: any) => {
        //     return false; // Always visible
        // },
        // // Custom description based on country
        // getDescription: (dependentValues: any) => {
        //     if (!dependentValues?.countryOfBirth) {
        //         return "Please select a country first before signing. The signature field is available for you to use once you've made your selection.";
        //     }
        //     const countryId = typeof dependentValues.countryOfBirth === 'object'
        //         ? dependentValues.countryOfBirth.value || dependentValues.countryOfBirth.id
        //         : dependentValues.countryOfBirth;

        //     if (countryId === 'ET') {
        //         return "Ethiopian birth registration requires parent/guardian signature for verification";
        //     } else if (countryId === 'US') {
        //         return "US birth registration requires legal guardian signature for processing";
        //     }
        //     return "Please sign below to confirm the information provided is accurate and complete";
        // }
        // },
        // ],
        // },
    ],
};
