import { FormConfig } from "@/common/types/formType";

export const formConfig: FormConfig = {
<<<<<<< HEAD
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
=======
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
                        baseUrl: `${process.env.NEXT_PUBLIC_IDX_BACKEND1}`, // Custom base URL - overrides environment variable
                        apiEndpoint: "hosital-notifications",
                        method: "GET",
                        searchKey: "search",
                        searchFormat: "query", // Query parameter format: /resident/residents?search="term"
                        valueKey: "id",
                        labelKey: "name",
                        minSearchLength: 3,
                        debounceMs: 300,
                        cacheResults: true,
                        placeholder: "Search for hospital notification ID...",
                        noOptionsMessage: "No hospital notification ID found",
                        loadingMessage: "Searching hospital notification ID...",
                        additionalParams: {
                        },
                        transformResponse: (data: any) => {
                            console.log("Raw API Response:", data);
                            
                            // Check if the response has the expected structure
                            if (
                                !data ||
                                !data.data ||
                                !Array.isArray(data.data)
                            ) {
                                console.log("Invalid data structure or no data found");
                                return [];
                            }
                            
                            console.log("Hospital Notifications Data:", data.data);
                            
                            return data.data.map((notification: any) => {
                                // Get the English localization (or first available)
                                const localization = notification.localizations?.find((loc: any) => loc.languageCode === 'en') 
                                    || notification.localizations?.[0];
                                
                                console.log("Selected localization:", localization);
                                
                                return {
                                    id: notification.id,
                                    value: notification.id,
                                    label: notification.hospitalNotificationId,
                                    name: notification.hospitalNotificationId,
                                    childFirstName: localization?.childFirstName || '',
                                    childFatherName: localization?.childFatherName || '',
                                    childGrandFatherName: localization?.childGrandFatherName || '',
                                    gender: localization?.gender || '',
                                    birthWeight: localization?.birthWeight || '',
                                    birthHeight: localization?.birthHeight || '',
                                    birthDate: localization?.birthDate || '',
                                    attendantName: localization?.attendantName || '',
                                    attendantQualification: localization?.attendantQualification || '',
                                    typeOfBirth: localization?.typeOfBirth || '',
                                    placeOfBirth: localization?.placeOfBirth || null,
                                };
                            });
                        },
                    }
                },
                {
                    type: "input",
                    key: "childFirstName",
                    label: "Child's First Name",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .childFirstName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "childFatherName",
                    label: "Child's Father Name",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .childGrandFatherName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "childGrandFatherName",
                    label: "Child's Grandfather Name",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .childGrandFatherName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "gender",
                    label: "Child's Gender",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .gender || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "birthWeight",
                    label: "Child's Birth Weight(in KG)",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .birthWeight || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "birthHeight",
                    label: "Child's Birth Height(in CM)",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .birthHeight || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "birthDate",
                    label: "Child's Birth Date",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .birthDate || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "attendantName",
                    label: "Child's Attendant Name",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .attendantName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "input",
                    key: "attendantQualification",
                    label: "Child's Attendant Qualification",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.hospitalNotificationId &&
                            typeof dependentValues.hospitalNotificationId ===
                                "object"
                        ) {
                            return (
                                dependentValues.hospitalNotificationId
                                    .attendantQualification || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        hospitalNotificationId:
                            formValues.hospitalNotificationId,
                    }),
                    isDisabled: (dependentValues: any) => {
                        return dependentValues?.hospitalNotificationId;
                    },
                    isHide: (dependentValues: any) => {
                        return !dependentValues?.hospitalNotificationId;
                    },
                },
                {
                    type: "lookup",
                    key: "nationality",
                    label: "Child's Nationality",
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
                    groupOrder: 3,
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
                        transformResponse: (
                            response,
                            locale: "en" | "am" = "en"
                        ) => {
                            console.log("response data", response);
                            
                            if (!response?.content) {
                                return [];
                            }

                            const transformedData = response.content.map((res: any) => ({
                                id: res.id,
                                value: res.id,
                                name:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                label:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                isDisabled: false,
                                code: res.code,
                            }));

                            return transformedData;
                        },
                    },
                },
                {
                    type: "lookup",
                    key: "bloodType",
                    label: "Child's Blood Type",
                    placeholder: "Search for a blood type...",
                    description:
                        "Select the blood type of the new born child",
                    validators: [
                        {
                            type: "required",
                            message: "Blood Type is required",
                        },
                    ],
                    required: true,
                    group: "Child Details",
                    groupOrder: 3,
                    gridCols: 6,
                    clearable: false,
                    lookupConfig: {
                        apiEndpoint: "/reference-data/blood-types",
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
                            
                            if (!response?.content) {
                                return [];
                            }

                            const transformedData = response.content.map((res: any) => ({
                                id: res.id,
                                value: res.id,
                                name:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                label:
                                    res.localizedContent?.[locale]?.name ??
                                    res.code,
                                isDisabled: false,
                                code: res.code,
                            }));

                            return transformedData;
                        },
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
                    groupOrder: 11,
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
                                label: resident.firstName + " " +
                                    resident.middleName+ " " +
                                    resident.lastName,
                                name: resident.firstName + " " +
                                    resident.middleName+ " " +
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
                    key: "fatherFullName",
                    label: "Father's Full Name",
                    placeholder: "",
                    description: "The Registered father's full name.",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 12,
                    gridCols: 6,
                    defaultValue: (dependentValues: any) => {
                        if (
                            dependentValues?.fatherResidentId &&
                            typeof dependentValues.fatherResidentId ===
                                "object"
                        ) {
                            return (
                                dependentValues.fatherResidentId
                                    .fullName || ""
                            );
                        }
                        return "";
                    },
                    getDependentValue: (formValues: any) => ({
                        fatherResidentId:
                            formValues.fatherResidentId,
                    }),
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
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 13,
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
                        return !dependentValues?.fatherResidentId
                    },
                },
                {
                    type: "input",
                    key: "fatherPhoneNumber",
                    label: "Father's phone number",
                    placeholder: "",
                    description: "",
                    validators: [],
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
                        return !dependentValues?.fatherResidentId
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
                    groupOrder: 15,
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
                                label: resident.firstName + " " +
                                    resident.middleName+ " " +
                                    resident.lastName,
                                name: resident.firstName + " " +
                                    resident.middleName+ " " +
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
                    key: "motherFullName",
                    label: "Mother's Full Name",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 16,
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
                        return !dependentValues?.motherResidentId
                    },
                },
                {
                    type: "input",
                    key: "motherDateOfBirth",
                    label: "Mother's Date of Birth",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 17,
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
                        return !dependentValues?.motherResidentId
                    },
                },
                {
                    type: "input",
                    key: "motherPhoneNumber",
                    label: "Mother's phone number",
                    placeholder: "",
                    description: "",
                    validators: [],
                    required: false,
                    group: "Child Details",
                    groupOrder: 18,
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
                        return !dependentValues?.motherResidentId
                    },
                },
            ],
        },
>>>>>>> gitlab1/main
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
          description: "",
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
            baseUrl: "https://crvs-birth.itsidx.com/api/v1",
            apiEndpoint: "/hosital-notifications/",
            method: "GET",
            searchKey: "",
            searchFormat: "query",
            valueKey: "id",
            labelKey: "name",
            minSearchLength: 3,
            debounceMs: 300,
            cacheResults: true,
            placeholder: "Enter your hospital notification id...",
            noOptionsMessage: "No notification id found",
            loadingMessage: "Searching notification id...",
            additionalParams: {},
            transformResponse: (data: any) => {
              console.log("hospital fetched data: ", data);

              if (!data || !data.success || !data.data) {
                console.log("Invalid data structure or empty response");
                return [];
              }

              const notification = data.data;

              // Get English localization (fallback to first available)
              const enLocalization =
                notification.localizations?.find(
                  (loc: any) => loc.languageCode === "en"
                ) || notification.localizations?.[0];

              if (!enLocalization) {
                console.log("No localization data found");
                return [];
              }

              // Create the transformed object
              const transformed = {
                id: notification.id,
                value: notification.id,
                label:
                  notification.hospitalNotificationId ||
                  "Unknown Notification ID",
                name:
                  notification.hospitalNotificationId ||
                  "Unknown Notification ID",
                hospitalNotificationId: notification.hospitalNotificationId,
                registered: notification.registered,

                // Child information from localization
                firstName: enLocalization.childFirstName || "",
                middleName: enLocalization.childFatherName || "",
                lastName: enLocalization.childGrandFatherName || "",
                fullName: [
                  enLocalization.childFirstName,
                  enLocalization.childFatherName,
                  enLocalization.childGrandFatherName,
                ]
                  .filter(Boolean)
                  .join(" "),

                // Birth details
                gender: enLocalization.gender,
                birthWeight: enLocalization.birthWeight,
                birthHeight: enLocalization.birthHeight,
                birthDate: enLocalization.birthDate,
                birthTime: enLocalization.birthTime,
                typeOfBirth: enLocalization.typeOfBirth,
                birthOrder: enLocalization.childBirthOrder,

                // Place of birth
                facilityName: enLocalization.placeOfBirth?.facilityName,
                facilityType: enLocalization.placeOfBirth?.facilityType,
                facilityOwnership:
                  enLocalization.placeOfBirth?.facilityOwnership,
                facilityNotificationRef:
                  enLocalization.placeOfBirth?.facilityNotificationRef,

                // Medical details
                attendantName: enLocalization.attendantName,
                attendantQualification: enLocalization.attendantQualification,
                headCircumference: enLocalization.childHeadCircumference,

                // Additional metadata
                issuedDate: enLocalization.issuedDate,
                reason: enLocalization.reason,

                // Keep the original data structure accessible
                localizations: notification.localizations,
                rawData: notification,
              };

              console.log("Transformed hospital data: ", transformed);

              return [transformed];
            },
          },
        },
        // Child Information Fields (auto-populated from hospital notification)
        {
          type: "input",
          key: "childFullName",
          label: "Child's Full Name",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 6,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.fullName || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "childGender",
          label: "Child's Gender",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 7,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.gender || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "childBirthDate",
          label: "Date of Birth",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 8,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.birthDate || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "childBirthWeight",
          label: "Birth Weight (kg)",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 9,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.birthWeight || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "childBirthHeight",
          label: "Birth Height (cm)",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 10,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.birthHeight || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "birthFacilityName",
          label: "Birth Place",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 11,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.facilityName || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
        {
          type: "input",
          key: "attendingProfessional",
          label: "Attending Professional",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 12,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (dependentValues?.hospitalNotificationId) {
              return dependentValues.hospitalNotificationId.attendantName || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            hospitalNotificationId: formValues.hospitalNotificationId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.hospitalNotificationId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.hospitalNotificationId;
          },
        },
      ],
    },
  ],
};
