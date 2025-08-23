import { FormConfig } from "@/types/formType";

export const formConfig: FormConfig = {
    stepperData: [
        {
            label: "Step 1",
            content: "General Information",
        },
        {
            label: "Step 2",
            content: "Husband's Information",
        },
        {
            label: "Step 3",
            content: "Wife's Information",
        },
        {
            label: "Step 4",
            content: "Honor Information",
        },
        {
            label: "Step 5",
            content: "Husband Witness Information",
        },
        {
            label: "Step 6",
            content: "Wife Witness Information",
        },
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
                name: "Husband's Information",
                label: "Husband's Information",
                order: 2,
            },
            {
                name: "Wife's Information",
                label: "Wife's Information",
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
                    type: "date",
                    key: "dateOfMarriage",
                    label: "Date of Marriage",
                    placeholder: "",
                    description:
                        "Select your marraige date. Future dates are not acceptable.",
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: new Date().toISOString().split("T")[0],
                            message: "Date cannot be in the future",
                        },
                    ],
                    required: true,
                    group: "General Information",
                    groupOrder: 1,
                },
                {
                    type: "lookup",
                    key: "marriageType",
                    label: "Type of Marriage",
                    placeholder: "Search for marriage type.",
                    description: "Select the marriage type",
                    validators: [
                        {
                            type: "required",
                            message: "Mariage type is required",
                        },
                    ],
                    required: true,
                    group: "General Information",
                    groupOrder: 1,
                    clearable: false,
                    searchable: true,

                    lookupConfig: {
                        isExternal: false,
                        apiEndpoint: "/marriagetype",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "name",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        defaultValue: {
                            id: 3,
                            label: "Traditional",
                            name: "Traditional",
                            value: "TR",
                        },
                    },
                },
            ],
        },
        {
            title: "Husband's Information",
            group: "Husband's Information",
            groupOrder: 2,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "husbandResidentId",
                    label: "Husbands's resident ID",
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
                    group: "Husband's Information",
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
                            // console.log("husband data", data);
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
                },
                {
                    type: "input",
                    key: "husbandFullName",
                    label: "Husband's Full Name",
                    placeholder: "",
                    description:
                        "Husband legal Full Name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Husband Full name is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.husbandResidentId &&
                            typeof dependentValues.husbandResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.husbandResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        husbandResidentId: formValues.husbandResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.husbandResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.husbandResidentId;
                    },
                },
                // {
                //     type: "input",
                //     key: "husbandFatherName",
                //     label: "Husband Father's Name",
                //     placeholder: "",
                //     description:
                //         "Enter Husband's Father Name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Husband's Father name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Husband's Information",
                //     groupOrder: 2,
                // },
                // {
                //     type: "input",
                //     key: "husbandGrandFatherName",
                //     label: "Husband's GrandFather Name",
                //     placeholder: "",
                //     description:
                //         "Enter Husband's GrandFather Name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Husband's GrandFather name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Husband's Information",
                //     groupOrder: 2,
                // },
                {
                    type: "input",
                    key: "husbandNationality",
                    label: "Husband's Nationality",
                    placeholder: "",
                    description:
                        "Husband Nationality it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Husband Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.husbandResidentId &&
                            typeof dependentValues.husbandResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.husbandResidentId.nationality ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        husbandResidentId: formValues.husbandResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.husbandResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.husbandResidentId;
                    },
                },
                // {
                //     type: "lookup",
                //     key: "husbandNationality",
                //     label: "Husband's Nationality",
                //     placeholder: "Search for nationality.",
                //     description: "Select the Husband's Nationality",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Nationality is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Husband's Information",
                //     groupOrder: 2,
                //     clearable: false,
                //     searchable: true,

                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/nationalities",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
                //         defaultValue: {
                //             id: 1,
                //             label: "Ethiopia",
                //             value: "ET",
                //         },
                //         transformResponse: (
                //             response,
                //             locale: "en" | "am" = "en"
                //         ) => {
                //             console.log("response data", response);
                //             return response.content.map((res: any) => ({
                //                 id: res.code,
                //                 value: res.code,
                //                 name:
                //                     res.localizedContent?.[locale]?.name ??
                //                     res.code,
                //                 label:
                //                     res.localizedContent?.[locale]?.name ??
                //                     res.code,
                //                 isDisabled: false,
                //             }));
                //         },
                //     },
                // },
                {
                    type: "input",
                    key: "husbandNationalId",
                    label: "Husband's National ID",
                    placeholder: "Insert Husband's National Id.",
                    description: "Insert Husband's National Id",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's National Id is required",
                        },
                        {
                            type: "pattern",
                            message: "Husband's National Id is not valid",
                            value: "^\\d{16}$",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
                    groupOrder: 2,
                    clearable: false,
                    searchable: true,
                },

                {
                    type: "input",
                    key: "husbandDateOfBirth",
                    label: "Husband's Date of Birth",
                    placeholder: "",
                    description: "Birth Date it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Birth Date is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.husbandResidentId &&
                            typeof dependentValues.husbandResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.husbandResidentId.dateOfBirth ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        husbandResidentId: formValues.husbandResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.husbandResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.husbandResidentId;
                    },
                },
                // {
                //     type: "date",
                //     key: "husbandDateOfBirth",
                //     label: "Husband's Date of Birth",
                //     placeholder: "",
                //     description:
                //         "Select Husband's Birth Date. Future dates are not acceptable.",
                //     validators: [
                //         { type: "required", message: "Date is required" },
                //         {
                //             type: "maxDate",
                //             value: new Date().toISOString().split("T")[0],
                //             message: "Date cannot be in the future",
                //         },
                //     ],
                //     required: true,
                //     group: "Husband's Information",
                //     groupOrder: 2,
                // },
                {
                    type: "lookup",
                    key: "husbandPlaceOfBirth",
                    label: "Husband's Place of Birth",
                    placeholder: "Search for Place of Birth.",
                    description: "Select the Husband's Place of Birth",
                    validators: [
                        {
                            type: "required",
                            message: "Place of Birth is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
                    key: "husbandCurrentResidence",
                    label: "Husband's Current Residence",
                    placeholder: "Search for Current Residence.",
                    description: "Select the Husband's Current Residence",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's Current Residence is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
                    key: "husbandReligion",
                    label: "Husband's Religion",
                    placeholder: "Search for Religion.",
                    description: "Select the Husband's Religion",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's Religion is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
                    key: "earlierMaritalStatusHusband",
                    label: "Earlier Marital Status",
                    placeholder: "",
                    description:
                        "Earlier Marital Status it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Earlier Marital Status is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.husbandResidentId &&
                            typeof dependentValues.husbandResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.husbandResidentId
                                    .maritalStatus || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        husbandResidentId: formValues.husbandResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.husbandResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.husbandResidentId;
                    },
                },
                // {
                //     type: "radio",
                //     key: "earlierMaritalStatusHusband",
                //     label: "Earlier Marital Status",
                //     description: "Select your previous marital status",
                //     options: [
                //         { label: "Never Married", value: "never" },
                //         { label: "Divorced", value: "divorced" },
                //         { label: "Widow", value: "widow" },
                //     ],
                //     placeholder: "",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Earlier status is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Husband's Information",
                //     groupOrder: 2,
                // },
                {
                    type: "lookup",
                    key: "husbandEducationlStatus",
                    label: "Husband's Education Level",
                    placeholder: "Search for Education Level.",
                    description: "Select the Husband's Education Level",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's Education Level is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
                    key: "husbandJobType",
                    label: "Husband's Job Type",
                    placeholder: "Search for Job Type.",
                    description: "Select the Husband's Job Type",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's Job Type is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
                    key: "husbandEconomicStatus",
                    label: "Husband's Economic Status",
                    placeholder: "Search for Economic Status.",
                    description: "Select the Husband's Economic Status",
                    validators: [
                        {
                            type: "required",
                            message: "Husband's Economic Status is required",
                        },
                    ],
                    required: true,
                    group: "Husband's Information",
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
            ],
        },

        {
            title: "Wife's Information",
            group: "Wife's Information",
            groupOrder: 3,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "wifeResidentId",
                    label: "Wifes's resident ID",
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
                    group: "Wife's Information",
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
                            // console.log("husband data", data);
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
                },
                {
                    type: "input",
                    key: "wifeFullName",
                    label: "wife's Full Name",
                    placeholder: "",
                    description:
                        "wife legal Full Name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "wife Full name is required",
                        },
                    ],
                    required: true,
                    group: "wife's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.wifeResidentId &&
                            typeof dependentValues.wifeResidentId === "object"
                        ) {
                            return (
                                dependentValues.wifeResidentId.fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        wifeResidentId: formValues.wifeResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.wifeResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.wifeResidentId;
                    },
                },
                // {
                //     type: "input",
                //     key: "wifeFirstName",
                //     label: "Wife's First Name",
                //     placeholder: "",
                //     description:
                //         "Enter your legal Wife First Name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Wife first name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                // },
                // {
                //     type: "input",
                //     key: "wifeFatherName",
                //     label: "Wife Father's Name",
                //     placeholder: "",
                //     description:
                //         "Enter Wife's Father Name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Wife's Father name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                // },
                // {
                //     type: "input",
                //     key: "wifeGrandFatherName",
                //     label: "Wife's GrandFather Name",
                //     placeholder: "",
                //     description:
                //         "Enter Wife's GrandFather Name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Wife's GrandFather name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                // },
                {
                    type: "input",
                    key: "wifeNationality",
                    label: "Wife's Nationality",
                    placeholder: "",
                    description:
                        "Wife Nationality it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Wife Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.wifeResidentId &&
                            typeof dependentValues.wifeResidentId === "object"
                        ) {
                            return (
                                dependentValues.wifeResidentId.nationality || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        wifeResidentId: formValues.wifeResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.wifeResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.wifeResidentId;
                    },
                },
                // {
                //     type: "lookup",
                //     key: "wifeNationality",
                //     label: "Wife's Nationality",
                //     placeholder: "Search for nationality.",
                //     description: "Select the Wife's Nationality",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Nationality is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                //     clearable: false,
                //     searchable: true,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/nationalities",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
                //         defaultValue: {
                //             id: 1,
                //             label: "Ethiopia",
                //             value: "ET",
                //         },
                //         transformResponse: (
                //             response,
                //             locale: "en" | "am" = "en"
                //         ) => {
                //             console.log("response data", response);
                //             return response.content.map((res: any) => ({
                //                 id: res.code,
                //                 value: res.code,
                //                 name:
                //                     res.localizedContent?.[locale]?.name ??
                //                     res.code,
                //                 label:
                //                     res.localizedContent?.[locale]?.name ??
                //                     res.code,
                //                 isDisabled: false,
                //             }));
                //         },
                //     },
                // },
                {
                    type: "input",
                    key: "wifeNationalId",
                    label: "Wife's National ID",
                    placeholder: "Insert Wife's National Id.",
                    description: "Insert Wife's National Id",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's National Id is required",
                        },
                        {
                            type: "pattern",
                            message: "Wife's National Id is not valid",
                            value: "^\\d{16}$",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
                    groupOrder: 3,
                    clearable: false,
                    searchable: true,
                },
                {
                    type: "input",
                    key: "wifeDateOfBirth",
                    label: "Wife's Date of Birth",
                    placeholder: "",
                    description: "Birth Date it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Birth Date is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.wifeResidentId &&
                            typeof dependentValues.wifeResidentId === "object"
                        ) {
                            return (
                                dependentValues.wifeResidentId.dateOfBirth || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        wifeResidentId: formValues.wifeResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.wifeResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.wifeResidentId;
                    },
                },
                // {
                //     type: "date",
                //     key: "wifeDateOfBirth",
                //     label: "Wife's Date of Birth",
                //     placeholder: "",
                //     description:
                //         "Select Wife's Birth Date. Future dates are not acceptable.",
                //     validators: [
                //         { type: "required", message: "Date is required" },
                //         {
                //             type: "maxDate",
                //             value: new Date().toISOString().split("T")[0],
                //             message: "Date cannot be in the future",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                // },
                {
                    type: "lookup",
                    key: "wifePlaceOfBirth",
                    label: "Wife's Place of Birth",
                    placeholder: "Search for Place of Birth.",
                    description: "Select the Wife's Place of Birth",
                    validators: [
                        {
                            type: "required",
                            message: "Place of Birth is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
                    key: "wifeCurrentResidence",
                    label: "Wife's Current Residence",
                    placeholder: "Search for Current Residence.",
                    description: "Select the Wife's Current Residence",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's Current Residence is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
                    key: "wifeReligion",
                    label: "Wife's Religion",
                    placeholder: "Search for Religion.",
                    description: "Select the Wife's Religion",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's Religion is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
                    key: "earlierMaritalStatusWife",
                    label: "Earlier Marital Status",
                    placeholder: "",
                    description:
                        "Earlier Marital Status it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Earlier Marital Status is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.wifeResidentId &&
                            typeof dependentValues.wifeResidentId === "object"
                        ) {
                            return (
                                dependentValues.wifeResidentId.maritalStatus ||
                                ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        wifeResidentId: formValues.wifeResidentId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.wifeResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.wifeResidentId;
                    },
                },
                // {
                //     type: "radio",
                //     key: "earlierMaritalStatusWife",
                //     label: "Earlier Marital Status",
                //     description: "Select your previous marital status",
                //     options: [
                //         { label: "Never Married", value: "never" },
                //         { label: "Divorced", value: "divorced" },
                //         { label: "Widow", value: "widow" },
                //     ],
                //     placeholder: "",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Earlier status is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Wife's Information",
                //     groupOrder: 3,
                // },
                {
                    type: "lookup",
                    key: "wifeEducationlStatus",
                    label: "Wife's Education Level",
                    placeholder: "Search for Education Level.",
                    description: "Select the Wife's Education Level",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's Education Level is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
                    key: "wifeJobType",
                    label: "Wife's Job Type",
                    placeholder: "Search for Job Type.",
                    description: "Select the Wife's Job Type",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's Job Type is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
                    key: "wifeEconomicStatus",
                    label: "Wife's Economic Status",
                    placeholder: "Search for Economic Status.",
                    description: "Select the Wife's Economic Status",
                    validators: [
                        {
                            type: "required",
                            message: "Wife's Economic Status is required",
                        },
                    ],
                    required: true,
                    group: "Wife's Information",
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
            ],
        },
        {
            title: "Honor Information",
            group: "Honor Information",
            groupOrder: 4,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "input",
                    key: "honorRecordNumber",
                    label: "Marriage Honor Record Number",
                    placeholder: "",
                    description: "Enter the Marriage Honor Record Number",
                    validators: [
                        {
                            type: "required",
                            message: "Marriage Honor Record Number is required",
                        },
                    ],
                    required: true,
                    group: "Honor Information",
                    groupOrder: 4,
                },
                {
                    type: "input",
                    key: "uniqueRegistrationOfficeNumber",
                    label: "Registration Office Number",
                    placeholder: "",
                    description:
                        "Enter the Unique number of the registration office",
                    validators: [
                        {
                            type: "required",
                            message: "Registration Office Number is required",
                        },
                    ],
                    required: true,
                    group: "Honor Information",
                    groupOrder: 4,
                },
                {
                    type: "input",
                    key: "uniqueMarriageCertificateNumber",
                    label: "Marriage Certificate Number",
                    placeholder: "",
                    description: "Enter the Unique Marraige Certificate Number",
                    validators: [
                        {
                            type: "required",
                            message: "Marriage Certificate Number is required",
                        },
                    ],
                    required: true,
                    group: "Honor Information",
                    groupOrder: 4,
                },
            ],
        },
        {
            title: "Husband Witness Information",
            group: "Husband Witness Information",
            groupOrder: 5,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "witnessResidentIdHusband",
                    label: "Husband's Witness resident ID",
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
                    group: "Husband Witness Information",

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
                            // console.log("husband data", data);
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
                },
                {
                    type: "input",
                    key: "witnessFirstNameHusband",
                    label: "Husband Witness Information",
                    placeholder: "",
                    description:
                        "Enter Witness Full name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Earlier Marital Status is required",
                        },
                    ],
                    required: true,
                    group: "Husband Witness Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.witnessResidentIdHusband &&
                            typeof dependentValues.witnessResidentIdHusband ===
                                "object"
                        ) {
                            return (
                                dependentValues.witnessResidentIdHusband
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        witnessResidentIdHusband:
                            formValues.witnessResidentIdHusband,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.witnessResidentIdHusband;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.witnessResidentIdHusband;
                    },
                },
                // {
                //     type: "input",
                //     key: "witnessFirstNameHusband",
                //     label: "Witness First Name",
                //     placeholder: "",
                //     description:
                //         "Enter Witness First name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Witness First name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Witness Information",
                //     groupOrder: 5,
                // },
                // {
                //     type: "input",
                //     key: "witnessFatherNameHusband",
                //     label: "Witness Father Name",
                //     placeholder: "",
                //     description:
                //         "Enter Witness Father name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Witness Father name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Witness Information",
                //     groupOrder: 5,
                // },
                // {
                //     type: "input",
                //     key: "witnessGrandFatherNameHusband",
                //     label: "Withness Grand Father Name",
                //     placeholder: "",
                //     description:
                //         "Enter Witness Grand father name as it appears on official documents",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Witness Grand Father name is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Witness Information",
                //     groupOrder: 5,
                // },
                {
                    type: "digitalSignature",
                    key: "parentSignatureHusband",
                    label: "Witness Signature",
                    description:
                        "Please sign below to confirm the information provided is accurate and complete",
                    required: true,
                    group: "Account Details",
                    groupOrder: 6,
                    validators: [
                        {
                            type: "required",
                            message:
                                "Signature is required to proceed with registration",
                        },
                    ],
                    digitalSignatureConfig: {
                        canvasWidth: 450,
                        canvasHeight: 200,
                        penColor: "#1f2937", // Dark gray for better visibility
                        penWidth: 3,
                        backgroundColor: "#ffffff",
                        showClearButton: true,
                        showSaveButton: true,
                        placeholder: "Click and drag to sign here",
                        validationMessage:
                            "Please provide your signature to continue",
                    },
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
                },
            ],
        },
        {
            title: "Wife Witness Information",
            group: "Wife Witness Information",
            groupOrder: 6,
            tabular: false,
            defaultExpanded: true,
            fields: [
                {
                    type: "inputSearch",
                    key: "witnessResidentIdWife",
                    label: "Wife's Witness resident ID",
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
                    group: "Wife Witness Information",

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
                            // console.log("husband data", data);
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
                },
                {
                    type: "input",
                    key: "witnessFirstNameWife",
                    label: "Husband Witness Information",
                    placeholder: "",
                    description:
                        "Enter Witness Full name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Earlier Marital Status is required",
                        },
                    ],
                    required: true,
                    group: "Wife Witness Information",
                    groupOrder: 2,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.witnessResidentIdWife &&
                            typeof dependentValues.witnessResidentIdWife ===
                                "object"
                        ) {
                            return (
                                dependentValues.witnessResidentIdWife
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        witnessResidentIdWife: formValues.witnessResidentIdWife,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.witnessResidentIdWife;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.witnessResidentIdWife;
                    },
                },

                {
                    type: "digitalSignature",
                    key: "parentSignatureWife",
                    label: "Witness Signature",
                    description:
                        "Please sign below to confirm the information provided is accurate and complete",
                    required: true,
                    group: "Account Details",
                    groupOrder: 6,
                    validators: [
                        {
                            type: "required",
                            message:
                                "Signature is required to proceed with registration",
                        },
                    ],
                    digitalSignatureConfig: {
                        canvasWidth: 450,
                        canvasHeight: 200,
                        penColor: "#1f2937", // Dark gray for better visibility
                        penWidth: 3,
                        backgroundColor: "#ffffff",
                        showClearButton: true,
                        showSaveButton: true,
                        placeholder: "Click and drag to sign here",
                        validationMessage:
                            "Please provide your signature to continue",
                    },
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
                },
            ],
        },
    ],
};
