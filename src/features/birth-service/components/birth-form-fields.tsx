import { FormConfig } from "@/common/types/formType";

export const birthFormConfig: FormConfig = {
    stepperData: [],
    stepperPosition: "",
    grouping: {
        defaultGroup: "Child Details",
        groups: [
            { name: "Child Details", label: "Child's Information", order: 1 },
            { name: "Father Details", label: "Father's Information", order: 2 },
            { name: "Mother Details", label: "Mother's Information", order: 3 },
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
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "",
                    description:
                        "Enter your legal first name as it appears on official documents",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 1,
                },
                {
                    type: "input",
                    key: "fatherName",
                    label: "Father Name",
                    placeholder: "",
                    description:
                        "Enter your legal father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Father name is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 2,
                },
                {
                    type: "input",
                    key: "grandFatherName",
                    label: "Grand Father Name",
                    placeholder: "",
                    description:
                        "Enter your legal grand father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Grand Father name is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 3,
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
                    groupOrder: 4,
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
                    groupOrder: 5,
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
                    groupOrder: 7,
                },
                {
                    type: "checkbox",
                    key: "isNewBorn",
                    label: "Is new born?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 7,
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
                    groupOrder: 8,
                    getDependentValue: (formValues: any) => ({
                        isNewBorn: formValues.isNewBorn,
                    }),
                    isRequired: (dependentValues: any) => {
                        return dependentValues?.isNewBorn === true;
                    },
                    isHide: (dependentValues: any) => {
                        return dependentValues?.isNewBorn !== true;
                    },
                },
                {
                    type: "lookup",
                    key: "countryOfBirth",
                    label: "Country of Birth",
                    placeholder: "Search for a country...",
                    description: "Select the country where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Country of birth is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 9,
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
                    key: "region",
                    label: "Birth Place Region",
                    placeholder: "Search for a region...",
                    description: "Select the region where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Region of birth is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 10,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "label",
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
                    type: "lookup",
                    key: "zone",
                    label: "City/Sub City/Zone",
                    placeholder: "Search for a zone...",
                    description: "Select the zone where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Zone of birth is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 11,
                    clearable: false,
                    disabled: true,
                    getDependentValue: (formValues: any) => formValues.region,
                    isDisabled: (dependentValue: any) => !dependentValue,
                    getPlaceholder: (dependentValue: any) =>
                        dependentValue
                            ? "Search for a zone..."
                            : "Please select a region first",
                    getDescription: (dependentValue: any) =>
                        dependentValue
                            ? "Select the zone where the person was born"
                            : "Zone selection is disabled until a region is selected",
                    lookupConfig: {
                        apiEndpoint: "/reference-data/zones",
                        method: "GET",
                        valueKey: "id",
                        labelKey: "label",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        transformRequest: (
                            request: any,
                            dependentValue: any
                        ) => {
                            if (dependentValue) {
                                const modifiedUrl = `${request.url}?regionId=${
                                    dependentValue.id || dependentValue
                                }`;
                                return {
                                    url: modifiedUrl,
                                    params: request.params || request,
                                };
                            }
                            return request;
                        },
                        transformResponse: (response, locale = "en") => {
                            return response.content.map((res: any) => ({
                                id: res.id,
                                value: res.id,
                                label:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                            }));
                        },
                    },
                },
                {
                    type: "lookup",
                    key: "woreda",
                    label: "Birth Place Woreda",
                    placeholder: "Search for a woreda...",
                    description: "Select the woreda where the person was born",
                    validators: [
                        {
                            type: "required",
                            message: "Woreda of birth is required",
                        },
                    ],
                    required: false, // Changed to false as per your config, but validator says required
                    group: "Child Details",
                    groupOrder: 12,
                    clearable: false,
                    disabled: true, // Added disabled property
                    getDependentValue: (formValues: any) => formValues.zone,
                    isDisabled: (dependentValue: any) => !dependentValue,
                    getPlaceholder: (dependentValue: any) =>
                        dependentValue
                            ? "Search for a woreda..."
                            : "Please select a zone first",
                    getDescription: (dependentValue: any) =>
                        dependentValue
                            ? "Select the woreda where the person was born"
                            : "Woreda selection is disabled until a zone is selected",
                    lookupConfig: {
                        apiEndpoint: "/reference-data/woredas",
                        method: "GET",
                        valueKey: "id", // Changed to "id" for consistency
                        labelKey: "label",
                        searchKey: "name",
                        debounceMs: 300,
                        minSearchLength: 0,
                        cacheResults: true,
                        transformRequest: (
                            request: any,
                            dependentValue: any
                        ) => {
                            console.log("transformRequest called with:", {
                                request,
                                dependentValue,
                            });
                            if (dependentValue) {
                                const modifiedUrl = `${request.url}?zoneId=${
                                    dependentValue.id || dependentValue
                                }`;
                                console.log("Modified URL:", modifiedUrl);
                                return {
                                    url: modifiedUrl,
                                    params: request.params || request,
                                };
                            }
                            return request;
                        },
                        transformResponse: (
                            response,
                            locale: "en" | "am" = "en"
                        ) => {
                            console.log("response data", response);
                            return response.content.map((res: any) => ({
                                id: res.id,
                                value: res.id, // Changed to use id for consistency
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
                    type: "checkbox",
                    key: "isBornInHealthCenter",
                    label: "Is born in Health Center?",
                    description: "",
                    required: false,
                    group: "Child Details",
                    groupOrder: 13,
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
        {
            title: "Father Details",
            group: "Father Details",
            tabular: true,
            defaultExpanded: false,
            groupOrder: 2,
            fields: [
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
                    group: "Father Details",
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
                    key: "fatherFullName",
                    label: "Father's Full Name",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: false,
                    group: "Father Details",
                    groupOrder: 2,
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
                    // getPlaceholder: (dependentValues: any) => {
                    //     if (!dependentValues?.fatherResidentId) {
                    //         return "Please select a resident ID first";
                    //     }
                    //     if (typeof dependentValues.fatherResidentId === 'object') {
                    //         const fullName = dependentValues.fatherResidentId.fullName || 'Unknown';
                    //         return `Selected resident: ${fullName}`;
                    //     }
                    //     return "Father's full name will be populated automatically";
                    // },
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.fatherResidentId;
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
                    group: "Father Details",
                    groupOrder: 3,
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
                    // getPlaceholder: (dependentValues: any) => {
                    //     if (!dependentValues?.fatherResidentId) {
                    //         return "Please select a resident ID first";
                    //     }
                    //     if (typeof dependentValues.fatherResidentId === 'object') {
                    //         const dateOfBirth = dependentValues.fatherResidentId.dateOfBirth || 'Unknown';
                    //         return `Selected resident: ${dateOfBirth}`;
                    //     }
                    //     return "Father's date of birth will be populated automatically";
                    // },
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.fatherResidentId;
                    },
                },
                // {
                //     type: "lookup",
                //     key: "countryOfBirthFather",
                //     label: "Country of Birth",
                //     placeholder: "Search for a country...",
                //     description: "Select the country where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Country of birth is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 7,
                //     clearable: false,
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
                //             value: "ET",
                //             label: "Ethiopia",
                //             id: 1,
                //             name: "Ethiopia",
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
                // {
                //     type: "lookup",
                //     key: "regionFather",
                //     label: "Birth Place Region",
                //     placeholder: "Search for a region...",
                //     description: "Select the region where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Region of birth is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 8,
                //     clearable: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/regions",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                // {
                //     type: "lookup",
                //     key: "zoneFather",
                //     label: "City/Sub City/Zone",
                //     placeholder: "Search for a zone...",
                //     description: "Select the zone where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Zone of birth is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 9,
                //     clearable: false,
                //     disabled: true,
                //     getDependentValue: (formValues: any) => formValues.regionFather,
                //     isDisabled: (dependentValue: any) => !dependentValue,
                //     getPlaceholder: (dependentValue: any) =>
                //         dependentValue ? "Search for a zone..." : "Please select a region first",
                //     getDescription: (dependentValue: any) =>
                //         dependentValue ? "Select the zone where the father was born" : "Zone selection is disabled until a region is selected",
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/zones",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
                //         transformRequest: (request: any, dependentValue: any) => {
                //             console.log("zoneFather transformRequest called with:", { request, dependentValue });
                //             if (dependentValue) {
                //                 const modifiedUrl = `${request.url}?regionId=${dependentValue.value || dependentValue}`;
                //                 console.log("zoneFather Modified URL:", modifiedUrl);
                //                 return {
                //                     url: modifiedUrl,
                //                     params: request.params || request
                //                 };
                //             }
                //             return request;
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
                // {
                //     type: "lookup",
                //     key: "woredaFather",
                //     label: "Birth Place Woreda",
                //     placeholder: "Search for a woreda...",
                //     description: "Select the woreda where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Woreda of birth is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 10,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/regions",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                // {
                //     type: "lookup",
                //     key: "maritalStatusFather",
                //     label: "Marital Status",
                //     placeholder: "Search for a marital status...",
                //     description:
                //         "Select the martial status where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Marital Status of father is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 11,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         isExternal: false,
                //         apiEndpoint: "maritalStatuses",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
                //     },
                // },
                {
                    type: "input",
                    key: "fatherMaritalStatus",
                    label: "Father's marital status",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Father Details",
                    groupOrder: 4,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.fatherResidentId &&
                            typeof dependentValues.fatherResidentId === "object"
                        ) {
                            return (
                                dependentValues.fatherResidentId
                                    .maritalStatus || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        fatherResidentId: formValues.fatherResidentId,
                    }),
                    // getDescription: (dependentValues: any) => {
                    //     if (!dependentValues?.fatherResidentId) {
                    //         return "Please select a resident ID first";
                    //     }
                    //     if (typeof dependentValues.fatherResidentId === 'object') {
                    //         const maritalStatus = dependentValues.fatherResidentId.maritalStatus || 'Unknown';
                    //         return `Selected resident: ${maritalStatus}`;
                    //     }
                    //     return "Father's marital status will be populated automatically";
                    // },
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.fatherResidentId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.fatherResidentId;
                    },
                },
                // {
                //     type: "lookup",
                //     key: "currentResidenceFather",
                //     label: "Current Residence Place",
                //     placeholder: "Search for a current residence place...",
                //     description:
                //         "Select the current residence place where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message:
                //                 "current residence place of father is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 12,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/regions",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                // {
                //     type: "lookup",
                //     key: "religionFather",
                //     label: "Religion",
                //     placeholder: "Search for a religion...",
                //     description:
                //         "Select the religion where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "religion of father is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 13,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/religions",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                // {
                //     type: "lookup",
                //     key: "educationLevelsFather",
                //     label: "Education Status",
                //     placeholder: "Search for a education levels...",
                //     description:
                //         "Select the education levels where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Education Levels of father is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 14,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/education-levels",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                // {
                //     type: "lookup",
                //     key: "occupationsFather",
                //     label: "Job Type",
                //     placeholder: "Search for a job type...",
                //     description:
                //         "Select the job type where the father was born",
                //     validators: [
                //         {
                //             type: "required",
                //             message: "Job type of father is required",
                //         },
                //     ],
                //     required: true,
                //     group: "Father Details",
                //     groupOrder: 15,
                //     clearable: false,
                //     searchable: true,
                //     multiple: false,
                //     lookupConfig: {
                //         apiEndpoint: "/reference-data/occupation-types",
                //         method: "GET",
                //         valueKey: "id",
                //         labelKey: "name",
                //         searchKey: "name",
                //         debounceMs: 300,
                //         minSearchLength: 0,
                //         cacheResults: true,
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
                    key: "fatherPhoneNumber",
                    label: "Father's phone number",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Father Details",
                    groupOrder: 4,
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
                        return !dependentValues?.fatherResidentId;
                    },
                },
            ],
        },
        {
            title: "Mother Details",
            group: "Mother Details",
            tabular: true,
            defaultExpanded: false,
            groupOrder: 3,
            fields: [
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
                    group: "Mother Details",
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
                    key: "motherFullName",
                    label: "Mother's Full Name",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: false,
                    group: "Mother Details",
                    groupOrder: 2,
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
                        return !dependentValues?.motherResidentId;
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
                    group: "Mother Details",
                    groupOrder: 3,
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
                        return !dependentValues?.motherResidentId;
                    },
                },
                {
                    type: "input",
                    key: "motherMaritalStatus",
                    label: "Mother's marital status",
                    placeholder: "",
                    description: "",
                    validators: [
                        { type: "required", message: "Date is required" },
                    ],
                    required: false,
                    group: "Mother Details",
                    groupOrder: 4,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.motherResidentId &&
                            typeof dependentValues.motherResidentId === "object"
                        ) {
                            return (
                                dependentValues.motherResidentId
                                    .maritalStatus || ""
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
                        return !dependentValues?.motherResidentId;
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
                    group: "Mother Details",
                    groupOrder: 4,
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
                        return !dependentValues?.motherResidentId;
                    },
                },
            ],
        },
    ],
};
