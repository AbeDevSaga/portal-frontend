import { FormConfig } from "@/common/types/formType";

export const formConfig: FormConfig = {
  title: "Register New Birth",
  description: "This is the new birth registration section",
  stepperData: [
    {
      label: "Step 1",
      content: "General Information",
    },
    {
      label: "Step 2",
      content: "Payment Information",
    },
  ],
  stepperPosition: "",
  grouping: [
    {
      defaultGroup: "Child Details",
      groups: [
        {
          name: "Child Details",
          label: "Child Details",
          order: 1,
        },
        {
          name: "Payment Information",
          label: "Payment Information",
          order: 2,
        },
      ],
    },
  ],
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
          label: "Child's First Name",
          placeholder: "Enter child's first name.",
          description: "",
          validators: [
            { type: "required", message: "Child's First name is required" },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 1,
          gridCols: 6,
        },
        {
          type: "radio",
          key: "gender",
          label: "Gender",
          description: "",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
          placeholder: "",
          validators: [{ type: "required", message: "Gender is required" }],
          required: true,
          group: "Child Details",
          groupOrder: 2,
          gridCols: 6,
        },
        {
          type: "lookup",
          key: "nationality",
          label: "Place / Country of Birth",
          placeholder: "Select Place / Country of Birth",
          description: "",
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
          key: "childDateOfBirth",
          label: "Date of Birth",
          placeholder: "DD/MM/YY",
          description: "",
          validators: [
            { type: "required", message: "Date of birth is required" },
            {
              type: "maxDate",
              value: new Date().toISOString().split("T")[0],
              message: "Date cannot be in the future",
            },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 4,
          gridCols: 6,
        },
        {
          type: "number",
          key: "birthTimeWeight",
          label: "Birth Time Weight",
          placeholder: "Enter Birth Time Weight",
          description: "",
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
          groupOrder: 5,
          gridCols: 6,
        },
        {
          type: "number",
          key: "birthTimeHeight",
          label: "Birth Time Height",
          placeholder: "Ensert Birth Time Height",
          description: "",
          validators: [
            {
              type: "required",
              message: "Birth time hight is required",
            },
            {
              type: "min",
              value: 0,
              message: "Must be above 0",
            },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 6,
          gridCols: 6,
        },
        {
          type: "checkbox",
          key: "isBornInHealthCenter",
          label: "Is born in Health Center?",
          description: "",
          required: false,
          group: "Child Details",
          groupOrder: 7,
          gridCols: 6,
        },
        {
          type: "input",
          key: "healthCenterName",
          label: "Health Center Name",
          placeholder: "Enter Health Center Name",
          description: "",
          validators: [
            {
              type: "required",
              message: "Health center name is required",
            },
          ],
          required: false, // Set to false, will be dynamically required
          group: "Child Details",
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
          group: "Child Details",
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
          group: "Child Details",
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
          key: "fatherResidentId",
          label: "Father's resident ID",
          placeholder: "Enter Father's resident ID",
          description: "",
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
          key: "fatherFullName",
          label: "Father's Full Name",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
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
              return dependentValues.fatherResidentId.dateOfBirth || "";
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
              return dependentValues.fatherResidentId.mobileNumber || "";
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
          type: "inputSearch",
          key: "motherResidentId",
          label: "Mother's resident ID",
          placeholder: "Enter Mother's resident ID",
          description: "",
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
              return dependentValues.motherResidentId.mobileNumber || "";
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
          group: "Child Details",
          groupOrder: 19,
          type: "input",
          key: "birthAttendantName",
          label: "Birth Attendant Full Name",
          placeholder: "Enter Birth Attendant Full Name.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Birth attendant full name is required",
            },
          ],
          required: true,
          gridCols: 6,
        },
        {
          group: "Child Details",
          groupOrder: 20,
          type: "input",
          key: "birthAttendantQualification",
          label: "Birth Attendant Qualification",
          placeholder: "Enter birth attendant qualification.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Birth attendant qualification is required",
            },
          ],
          required: true,
          gridCols: 6,
        },
      ],
    },
    {
      title: "Payment Information",
      group: "Payment Information",
      groupOrder: 2,
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
          description: "Enter the Unique number of the registration office",
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
  ],
};
