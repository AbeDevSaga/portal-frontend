import { FormConfig } from "@/types/formType";

export const formConfig: FormConfig = {
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
                    groupOrder: 6,
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
                        apiEndpoint: "/reference-data/region",
                        method: "GET",
                        valueKey: "value",
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
                        getDependentValue: (formValues: any) => ({
                            countryOfBirth: formValues.countryOfBirth,
                        }),
                        transformRequest: (
                            request: any,
                            dependentValues: any
                        ) => {
                            if (dependentValues?.countryOfBirth) {
                                // Handle both object and simple value cases
                                const countryId =
                                    typeof dependentValues.countryOfBirth ===
                                    "object"
                                        ? dependentValues.countryOfBirth
                                              .value ||
                                          dependentValues.countryOfBirth.id
                                        : dependentValues.countryOfBirth;

                                // Update the API endpoint to include the country ID
                                request.apiEndpoint = `/reference-data/region/${countryId}`;

                                return request;
                            }
                            return request;
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
                    lookupConfig: {
                        apiEndpoint: "/reference-data/zones",
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
                    required: true,
                    group: "Child Details",
                    groupOrder: 12,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "",
                    description:
                        "Enter father's first name as it appears on official documents",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 1,
                },
                {
                    type: "input",
                    key: "fatherName",
                    label: "Father Name",
                    placeholder: "",
                    description:
                        "Enter father's father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Father name is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 2,
                },
                {
                    type: "input",
                    key: "grandFatherName",
                    label: "Grand Father Name",
                    placeholder: "",
                    description:
                        "Enter father's grand father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Grand Father name is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 3,
                },
                {
                    type: "lookup",
                    key: "nationality",
                    label: "Nationality",
                    placeholder: "Search for a nationality...",
                    description: "Select the nationality of the father",
                    validators: [
                        {
                            type: "required",
                            message: "Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 4,
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
                    type: "input",
                    key: "fatherId",
                    label: "Identification Number",
                    placeholder: "",
                    description: "Enter the fathers identification number",
                    validators: [
                        {
                            type: "required",
                            message: "Identification number is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 5,
                },
                {
                    type: "date",
                    key: "dateOfBirth",
                    label: "Date of Birth",
                    placeholder: "",
                    description:
                        "Select father's birth date. Future dates are not acceptable.",
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: new Date().toISOString().split("T")[0],
                            message: "Date cannot be in the future",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 6,
                },
                {
                    type: "lookup",
                    key: "countryOfBirth",
                    label: "Country of Birth",
                    placeholder: "Search for a country...",
                    description: "Select the country where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Country of birth is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 7,
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
                    type: "lookup",
                    key: "region",
                    label: "Birth Place Region",
                    placeholder: "Search for a region...",
                    description: "Select the region where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Region of birth is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 8,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "zone",
                    label: "City/Sub City/Zone",
                    placeholder: "Search for a zone...",
                    description: "Select the zone where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Zone of birth is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 9,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/zones",
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
                    key: "woreda",
                    label: "Birth Place Woreda",
                    placeholder: "Search for a woreda...",
                    description: "Select the woreda where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Woreda of birth is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 10,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "maritalStatus",
                    label: "Marital Status",
                    placeholder: "Search for a marital status...",
                    description:
                        "Select the martial status where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Marital Status of father is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 11,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "maritalStatuses",
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
                    type: "lookup",
                    key: "currentResidence",
                    label: "Current Residence Place",
                    placeholder: "Search for a current residence place...",
                    description:
                        "Select the current residence place where the father was born",
                    validators: [
                        {
                            type: "required",
                            message:
                                "current residence place of father is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 12,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "religion",
                    label: "Religion",
                    placeholder: "Search for a religion...",
                    description:
                        "Select the religion where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "religion of father is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 13,
                    clearable: false,
                    searchable: true,
                    multiple: true,
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
                    type: "lookup",
                    key: "educationLevels",
                    label: "Education Status",
                    placeholder: "Search for a education levels...",
                    description:
                        "Select the education levels where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Education Levels of father is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 14,
                    clearable: false,
                    searchable: true,
                    multiple: true,
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
                    key: "occupations",
                    label: "Job Type",
                    placeholder: "Search for a job type...",
                    description:
                        "Select the job type where the father was born",
                    validators: [
                        {
                            type: "required",
                            message: "Job type of father is required",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 15,
                    clearable: false,
                    searchable: true,
                    multiple: false,
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
                    type: "phone",
                    key: "phone",
                    label: "Phone Number",
                    placeholder: "e.g., +251912345678 or 0912345678",
                    description:
                        "Enter father's Ethiopian phone number in any valid format",
                    validators: [
                        {
                            type: "required",
                            message: "Phone number is required",
                        },
                        {
                            type: "pattern",
                            value: "^(\\+251|251|0)?[79]\\d{8}$",
                            message:
                                "Please enter a valid Ethiopian phone number",
                        },
                    ],
                    required: true,
                    group: "Father Details",
                    groupOrder: 16,
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
                    type: "input",
                    key: "firstName",
                    label: "First Name",
                    placeholder: "",
                    description:
                        "Enter mother's first name as it appears on official documents",
                    validators: [
                        { type: "required", message: "First name is required" },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 1,
                },
                {
                    type: "input",
                    key: "fatherName",
                    label: "Father Name",
                    placeholder: "",
                    description:
                        "Enter mother's father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Father name is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 2,
                },
                {
                    type: "input",
                    key: "grandFatherName",
                    label: "Grand Father Name",
                    placeholder: "",
                    description:
                        "Enter mother's grand father name as it appears on official documents",
                    validators: [
                        {
                            type: "required",
                            message: "Grand Father name is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 3,
                },
                {
                    type: "lookup",
                    key: "nationality",
                    label: "Nationality",
                    placeholder: "Search for a nationality...",
                    description: "Select the nationality of the mother",
                    validators: [
                        {
                            type: "required",
                            message: "Nationality is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 4,
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
                    type: "input",
                    key: "motherId",
                    label: "Identification Number",
                    placeholder: "",
                    description: "Enter the mother's identification number",
                    validators: [
                        {
                            type: "required",
                            message: "Identification number is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 5,
                },
                {
                    type: "date",
                    key: "dateOfBirth",
                    label: "Date of Birth",
                    placeholder: "",
                    description:
                        "Select mother's birth date. Future dates are not acceptable.",
                    validators: [
                        { type: "required", message: "Date is required" },
                        {
                            type: "maxDate",
                            value: new Date().toISOString().split("T")[0],
                            message: "Date cannot be in the future",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 6,
                },
                {
                    type: "lookup",
                    key: "countryOfBirth",
                    label: "Country of Birth",
                    placeholder: "Search for a country...",
                    description: "Select the country where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Country of birth is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 7,
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
                    type: "lookup",
                    key: "region",
                    label: "Birth Place Region",
                    placeholder: "Search for a region...",
                    description: "Select the region where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Region of birth is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 8,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "zone",
                    label: "City/Sub City/Zone",
                    placeholder: "Search for a zone...",
                    description: "Select the zone where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Zone of birth is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 9,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/zones",
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
                    key: "woreda",
                    label: "Birth Place Woreda",
                    placeholder: "Search for a woreda...",
                    description: "Select the woreda where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Woreda of birth is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 10,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "maritalStatus",
                    label: "Marital Status",
                    placeholder: "Search for a marital status...",
                    description:
                        "Select the martial status where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Marital Status of mother is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 11,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "maritalStatuses",
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
                    type: "lookup",
                    key: "currentResidence",
                    label: "Current Residence Place",
                    placeholder: "Search for a current residence place...",
                    description:
                        "Select the current residence place where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message:
                                "current residence place of mother is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 12,
                    clearable: false,
                    searchable: true,
                    multiple: true,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/regions",
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
                    key: "religion",
                    label: "Religion",
                    placeholder: "Search for a religion...",
                    description:
                        "Select the religion where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "religion of mother is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 13,
                    clearable: false,
                    searchable: true,
                    multiple: true,
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
                    type: "lookup",
                    key: "educationLevels",
                    label: "Education Status",
                    placeholder: "Search for a education levels...",
                    description:
                        "Select the education levels where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Education Levels of mother is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 14,
                    clearable: false,
                    searchable: true,
                    multiple: true,
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
                    key: "occupations",
                    label: "Job Type",
                    placeholder: "Search for a job type...",
                    description:
                        "Select the job type where the mother was born",
                    validators: [
                        {
                            type: "required",
                            message: "Job type of mother is required",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 15,
                    clearable: false,
                    searchable: true,
                    multiple: false,
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
                    type: "phone",
                    key: "phone",
                    label: "Phone Number",
                    placeholder: "e.g., +251912345678 or 0912345678",
                    description:
                        "Enter mother's Ethiopian phone number in any valid format",
                    validators: [
                        {
                            type: "required",
                            message: "Phone number is required",
                        },
                        {
                            type: "pattern",
                            value: "^(\\+251|251|0)?[79]\\d{8}$",
                            message:
                                "Please enter a valid Ethiopian phone number",
                        },
                    ],
                    required: true,
                    group: "Mother Details",
                    groupOrder: 16,
                },
            ],
        },
    ],
};
