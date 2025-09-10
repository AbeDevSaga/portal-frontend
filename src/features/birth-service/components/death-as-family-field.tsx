import { FormConfig } from "@/common/types/formType";

export const formConfig: FormConfig = {
  stepperData: [],
  stepperPosition: "",
  grouping: {
    defaultGroup: "Deceased’s Details",
    groups: [
      {
        name: "Deceased’s Details",
        label: "Deceased’s Details",
        order: 1,
      },
    ],
  },
  steps: [
    {
      title: "Deceased’s Details",
      group: "Deceased’s Details",
      groupOrder: 1,
      tabular: true,
      defaultExpanded: true,
      fields: [
        {
          type: "input",
          key: "firstName",
          label: "Deceased’s Name",
          placeholder: "",
          description: "Enter your Deceased’s full name.",
          validators: [
            { type: "required", message: "Deceased’s full name is required" },
          ],
          required: true,
          group: "Deceased’s Details",
          groupOrder: 1,
          gridCols: 6,
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
          validators: [{ type: "required", message: "Gender is required" }],
          required: true,
          group: "Deceased’s Details",
          groupOrder: 2,
          gridCols: 6,
        },
        {
          type: "lookup",
          key: "nationality",
          label: "Nationality",
          placeholder: "Search for a nationality...",
          description: "Select the nationality where the person was born",
          validators: [
            {
              type: "required",
              message: "Nationality is required",
            },
          ],
          required: true,
          group: "Deceased’s Details",
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);

              if (!response?.content) {
                return [];
              }

              const transformedData = response.content.map((res: any) => ({
                id: res.id,
                value: res.id,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
                code: res.code,
              }));

              return transformedData;
            },
            defaultValue: "73ab3776-30c1-4176-9506-c3fcb0e3d5de", // TODO: change to dynamic concept
          },
        },
        {
          type: "date",
          key: "DateofDeath",
          label: "Date of Death",
          placeholder: "",
          description:
            "Select Deceased’s date of death. Future dates are not acceptable.",
          validators: [
            { type: "required", message: "Date of death is required" },
            {
              type: "maxDate",
              value: new Date().toISOString().split("T")[0],
              message: "Date cannot be in the future",
            },
          ],
          required: true,
          group: "Deceased’s Details",
          groupOrder: 4,
          gridCols: 6,
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
          required: false, // Set to false, will be dynamically required
          group: "Deceased’s Details",
          groupOrder: 8,
          gridCols: 6,
          getDependentValue: (formValues: any) => ({
            isBornInHealthCenter: formValues.isBornInHealthCenter,
          }),
          isRequired: (dependentValues: any) => {
            // Only required when the field is visible
            return dependentValues?.isBornInHealthCenter;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.isBornInHealthCenter;
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
          required: false, // Set to false, will be dynamically required
          group: "Deceased’s Details",
          groupOrder: 9,
          gridCols: 6,
          getDependentValue: (formValues: any) => ({
            isBornInHealthCenter: formValues.isBornInHealthCenter,
          }),
          isRequired: (dependentValues: any) => {
            // Only required when the field is visible
            return dependentValues?.isBornInHealthCenter;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.isBornInHealthCenter;
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
          required: false, // Set to false, will be dynamically required
          group: "Deceased’s Details",
          groupOrder: 10,
          gridCols: 6,
          getDependentValue: (formValues: any) => ({
            isBornInHealthCenter: formValues.isBornInHealthCenter,
          }),
          isRequired: (dependentValues: any) => {
            // Only required when the field is visible
            return dependentValues?.isBornInHealthCenter;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.isBornInHealthCenter;
          },
        },

        {
          type: "inputSearch",
          key: "deceasedResidentId",
          label: "Deceased’s resident ID",
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
          group: "Deceased’s Details",
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
              if (!data || !data.content || !Array.isArray(data.content)) {
                return [];
              }

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
          key: "deceasedFullName",
          label: "Deceased’s Full Name",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Deceased’s Details",
          groupOrder: 16,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.motherResidentId &&
              typeof dependentValues.motherResidentId === "object"
            ) {
              return dependentValues.motherResidentId.fullName || "";
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
          key: "deceasedDateOfBirth",
          label: "Deceased’s Date of Birth",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Deceased’s Details",
          groupOrder: 17,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.motherResidentId &&
              typeof dependentValues.motherResidentId === "object"
            ) {
              return dependentValues.motherResidentId.dateOfBirth || "";
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
          type: "inputSearch",
          key: "requesterResidentId",
          label: "Requester's resident ID",
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
          group: "Deceased’s Details",
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
              if (!data || !data.content || !Array.isArray(data.content)) {
                return [];
              }

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
          key: "requesterFullName",
          label: "Requester's Full Name",
          placeholder: "",
          description: "The Registered requester's full name.",
          validators: [],
          required: false,
          group: "Deceased’s Details",
          groupOrder: 12,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.fatherResidentId &&
              typeof dependentValues.fatherResidentId === "object"
            ) {
              return dependentValues.fatherResidentId.fullName || "";
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
        {
          group: "Deceased’s Details",
          groupOrder: 20,
          type: "input",
          key: "requesterRelation",
          label: "Relation to Deceased",
          placeholder: "",
          description: "Enter your relation to deceased",
          validators: [
            {
              type: "required",
              message: "Requester relation to deceased is required",
            },
          ],
          required: true,
          gridCols: 6,
        },
      ],
    },
  ],
};
