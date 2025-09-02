import { FormConfig } from "@/common/types/formType";

export const formConfig: FormConfig = {
    stepperData: [],
    stepperPosition: "",
    grouping: {
        defaultGroup: "Child Details",
        groups: [
            {
                name: "Child Details",
                label: "Child Details",
                order: 1,
            },
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
                    defaultValue: null,
                    inputSearchConfig: {
                        isExternal: true,
                        baseUrl: `${process.env.NEXT_PUBLIC_IDX_BACKEND1}	`, // Custom base URL - overrides environment variable
                        apiEndpoint: "/hosital-notifications",
                        method: "GET",
                        searchKey: "search",
                        searchFormat: "query", // Query parameter format: /resident/residents?search="term"
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
                    }
                },
            ],
        },
    ],
};
