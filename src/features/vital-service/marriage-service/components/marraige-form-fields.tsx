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
  title: "New Marriage",
  description: "This is the new marriage registration section",
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
    //   label: "Step 4",
    //   content: "Witness Information",
    // },
    {
      label: "Step 5",
      content: "Honor Information",
    },
    {
      label: "Step 6",
      content: "Payment Information",
    },
  ],
  stepperPosition: "",
  grouping: [
    {
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
        // {
        //   name: "Witnesses Information",
        //   label: "Witnesses Information",
        //   order: 4,
        // },
        {
          name: "Payment Information",
          label: "Payment Information",
          order: 6,
        },
      ],
    },
  ],
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
          gridCols: 6,
          validators: [
            {
              type: "required",
              message: "Marriage type is required",
            },
          ],
          required: true,
          group: "General Information",
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.id,
                value: res.id,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
              message: "Date cannot be in the future for this marriage type",
              // Adding a conditional property to make this validator conditional
              condition: (formValues: any) => {
                const marriageType = formValues?.marriageType;

                const typeName = marriageType?.name || marriageType?.label;
                const shouldRestrictFutureDate = typeName !== "National";

                return shouldRestrictFutureDate;
              },
            },
          ],
          required: true,
          group: "General Information",
          groupOrder: 2,
        },
      ],
    },
    {
      title: "Groom's Information",
      group: "Groom's Information",
      groupOrder: 1,
      tabular: true,
      defaultExpanded: false,
      fields: [
        {
          type: "inputSearch",
          key: "groomResidentId",
          label: "Grooms's resident ID",
          placeholder: "Enter at least 3 characters to search...",
          description: "",
          validators: [
            {
              type: "required",
              message: "Resident ID is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 1,
          gridCols: 6,
          defaultValue: null,
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
          description: "",
          validators: [],
          required: false,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.groomResidentId &&
              typeof dependentValues.groomResidentId === "object"
            ) {
              return dependentValues.groomResidentId.fullName || "";
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
          description: "",
          required: false,
          gridCols: 6,
          group: "Groom's Information",
          groupOrder: 2,
        },
        {
          type: "input",
          key: "groomNationality",
          label: "Groom's Nationality",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          gridCols: 6,
          group: "Groom's Information",
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
              return dependentValues.groomResidentId.nationality || "";
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
          description: "",
          gridCols: 6,
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
          groupOrder: 2,
          clearable: false,
          searchable: true,
        },

        {
          type: "input",
          key: "groomDateOfBirth",
          label: "Groom's Date of Birth",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.groomResidentId &&
              typeof dependentValues.groomResidentId === "object"
            ) {
              return dependentValues.groomResidentId.dateOfBirth || "";
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
          key: "groomSpecialApproval",
          label: "Approval Document",
          placeholder: " Upload Special Approval Document",
          gridCols: 6,
          description: "",
          validators: [
            {
              type: "required",
              message: "Special Approval Document is required",
            },
          ],
          isRequired: (dependentValue) => {
            const checkIfValidBirthDate = isValidBirthday(
              dependentValue.groomDateOfBirth
            );
            return !checkIfValidBirthDate;
          },
          // required:  (dependentValues: any) => {
          //     // Make required if birth type is twin
          //     return dependentValues?.birthType === 'twin';
          // },
          group: "Groom's Information",
          groupOrder: 2,
          getDependentValue: (formValues: any) => ({
            groomResidentId: formValues.groomDateOfBirth,
          }),
          isDisabled: (dependentValues: any) => {
            return isValidBirthday(dependentValues.groomDateOfBirth);
          },
          isHide: (dependentValues: any) => {
            const checkIfValidBirthDate = isValidBirthday(
              dependentValues.groomDateOfBirth
            );
            return checkIfValidBirthDate;
          },
        },
        {
          type: "lookup",
          key: "groomPlaceOfBirth",
          label: "Groom's Place of Birth",
          placeholder: "Search for Place of Birth.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Place of Birth is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Current Residence is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Religion is required",
            },
          ],
          gridCols: 6,
          required: true,
          group: "Groom's Information",
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
                typeof dependentValues.groomResidentId === "object"
              ) {
                console.log(
                  "dependentValues.groomResidentId.nationality",
                  dependentValues.groomResidentId.nationality
                );
                return dependentValues.groomResidentId.nationality || "";
              }
              return "";
            },
            getDependentValue: (formValues: any) => ({
              groomResidentId: formValues.groomResidentId,
            }),
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [],
          required: false,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.groomResidentId &&
              typeof dependentValues.groomResidentId === "object"
            ) {
              return dependentValues.groomResidentId.maritalStatus || "";
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
        //     groupOrder: 2,
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
        {
          type: "fileUpload",
          key: "groomPhoto",
          label: "Groom's Photo",
          placeholder: "Upload the Grooms 3*4 Photo",
          gridCols: 6,
          description: "",
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
          groupOrder: 2,
          isDisabled: (dependentValues: any) => {
            return dependentValues?.groomPhoto;
          },
        },
        {
          type: "lookup",
          key: "groomEducationlStatus",
          label: "Groom's Education Level",
          placeholder: "Select Your Education Level.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Education Level is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          clearable: false,
          searchable: true,
          gridCols: 6,

          lookupConfig: {
            apiEndpoint: "/reference-data/education-levels",
            method: "GET",
            valueKey: "id",
            labelKey: "name",
            searchKey: "name",
            debounceMs: 300,
            minSearchLength: 0,
            cacheResults: true,
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Job Type is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "lookup",
          key: "groomEconomicStatus",
          label: "Groom's Economic Status",
          placeholder: "Select Economic Status.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Economic Status is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [],
          required: false,
          gridCols: 6,
          group: "Groom's Information",
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
              if (!data || !data.content || !Array.isArray(data.content)) {
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
          label: "Groom's Witness Full Name",
          placeholder: "Enter Groom's First Witness Full Name",
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's first Witness ID is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.groomWitnessFirstResidentId &&
              typeof dependentValues.groomWitnessFirstResidentId === "object"
            ) {
              return dependentValues.groomWitnessFirstResidentId.fullName || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            groomWitnessFirstResidentId: formValues.groomWitnessFirstResidentId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.groomWitnessFirstResidentId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.groomWitnessFirstResidentId;
          },
        },
        {
          type: "inputSearch",
          key: "groomWitnessSecondResidentId",
          label: "Groom's Witness resident ID",
          placeholder: "Enter Groom's Witness Resident ID",
          description: "",
          validators: [
            {
              type: "required",
              message: "Groom's Second Witness ID is required",
            },
          ],
          required: true,
          group: "Groom's Information",
          groupOrder: 1,
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
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.groomWitnessSecondResidentId &&
              typeof dependentValues.groomWitnessSecondResidentId === "object"
            ) {
              return (
                dependentValues.groomWitnessSecondResidentId.fullName || ""
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
      ],
    },

    {
      title: "Bride's Information",
      group: "Bride's Information",
      groupOrder: 3,
      tabular: false,
      defaultExpanded: false,
      fields: [
        {
          type: "inputSearch",
          key: "brideResidentId",
          label: "Brides's resident ID",
          placeholder: "Enter Brides's resident ID",
          description: "",
          validators: [
            {
              type: "required",
              message: "Resident ID is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 1,
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
          placeholder: "Enter Bride's Full Name",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride Full name is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideResidentId &&
              typeof dependentValues.brideResidentId === "object"
            ) {
              return dependentValues.brideResidentId.fullName || "";
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
          key: "brideNationality",
          label: "Bride's Nationality",
          placeholder: "Enter Bride's Nationality",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride Nationality is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideResidentId &&
              typeof dependentValues.brideResidentId === "object"
            ) {
              return dependentValues.brideResidentId.nationality || "";
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
          description: "",
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
          gridCols: 6,
          group: "Bride's Information",
          groupOrder: 3,
          clearable: false,
          searchable: true,
        },
        {
          type: "input",
          key: "brideDateOfBirth",
          label: "Bride's Date of Birth",
          placeholder: "Enter Bride's Date of Birth",
          description: "",
          validators: [
            {
              type: "required",
              message: "Birth Date is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideResidentId &&
              typeof dependentValues.brideResidentId === "object"
            ) {
              return dependentValues.brideResidentId.dateOfBirth || "";
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
          key: "brideSpecialApproval",
          label: "Bride's Special Approval Document",
          placeholder: "Upload Special Approval Document",
          description: "",
          validators: [
            {
              type: "required",
              message: "Special Approval Document is required",
            },
          ],
          isRequired: (dependentValue) => {
            const checkIfValidBirthDate = isValidBirthday(
              dependentValue.brideDateOfBirth
            );
            console.log("is valid date", checkIfValidBirthDate);
            return !checkIfValidBirthDate;
          },
          // required:  (dependentValues: any) => {
          //     // Make required if birth type is twin
          //     return dependentValues?.birthType === 'twin';
          // },
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          getDependentValue: (formValues: any) => ({
            brideResidentId: formValues.brideDateOfBirth,
          }),
          isDisabled: (dependentValues: any) => {
            return isValidBirthday(dependentValues.brideDateOfBirth);
          },
          isHide: (dependentValues: any) => {
            const checkIfValidBirthDate = isValidBirthday(
              dependentValues.brideDateOfBirth
            );
            return checkIfValidBirthDate;
          },
        },
        {
          type: "lookup",
          key: "bridePlaceOfBirth",
          label: "Bride's Place of Birth",
          placeholder: "Search for Place of Birth.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Place of Birth is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 3,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
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
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride's Current Residence is required",
            },
          ],
          required: true,
          gridCols: 6,
          group: "Bride's Information",
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "lookup",
          key: "brideReligion",
          label: "Bride's Religion",
          placeholder: "Select Religion.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride's Religion is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 3,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "input",
          key: "earlierMaritalStatusBride",
          label: "Earlier Marital Status",
          placeholder: "Earlier Marital Status",
          description: "",
          validators: [],
          required: false,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideResidentId &&
              typeof dependentValues.brideResidentId === "object"
            ) {
              return dependentValues.brideResidentId.maritalStatus || "";
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
          key: "bridePhoto",
          label: "Bride's Photo",
          placeholder: "Upload the Brides 3*4 Photo",
          description: "",
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
          groupOrder: 2,
          gridCols: 6,
          isDisabled: (dependentValues: any) => {
            return dependentValues?.bridePhoto;
          },
        },
        {
          type: "lookup",
          key: "brideEducationlStatus",
          label: "Bride's Education Level",
          placeholder: "Search for Education Level.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride's Education Level is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 3,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "lookup",
          key: "brideJobType",
          label: "Bride's Job Type",
          placeholder: "Select Job Type.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride's Job Type is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 3,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "lookup",
          key: "brideEconomicStatus",
          label: "Bride's Economic Status",
          placeholder: "Select Economic Status.",
          description: "",
          validators: [
            {
              type: "required",
              message: "Bride's Economic Status is required",
            },
          ],
          required: true,
          group: "Bride's Information",
          groupOrder: 3,
          gridCols: 6,
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
            transformResponse: (response, locale: "en" | "am" = "en") => {
              console.log("response data", response);
              return response.content.map((res: any) => ({
                id: res.code,
                value: res.code,
                name: res.localizedContent?.[locale]?.name ?? res.code,
                label: res.localizedContent?.[locale]?.name ?? res.code,
                isDisabled: false,
              }));
            },
          },
        },
        {
          type: "inputSearch",
          key: "brideWitnessFirstResidentId",
          label: "Bride's Witness resident ID",
          placeholder: "Enter Witness Resident ID",
          description: "",
          validators: [],
          required: false,
          group: "Bride's Information",
          groupOrder: 1,
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
          label: "Bride's Witness Full Name",
          placeholder: "Enter Bride's First Witness Full Name",
          description: "",
          validators: [],
          required: false,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideWitnessFirstResidentId &&
              typeof dependentValues.brideWitnessFirstResidentId === "object"
            ) {
              return dependentValues.brideWitnessFirstResidentId.fullName || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            brideWitnessFirstResidentId: formValues.brideWitnessFirstResidentId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.brideWitnessFirstResidentId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.brideWitnessFirstResidentId;
          },
        },
        {
          type: "inputSearch",
          key: "brideWitnessSecondResidentId",
          label: "Bride's Witness resident ID",
          placeholder: "Enter Bride's Witness Resident ID",
          description: "",
          validators: [],
          required: false,
          group: "Bride's Information",
          groupOrder: 1,
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
          label: "Bride's Witness Full Name",
          placeholder: "Enter Bride's Witness Full Name",
          description: "",
          validators: [],
          required: false,
          group: "Bride's Information",
          groupOrder: 2,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            if (
              dependentValues?.brideWitnessSecondResidentId &&
              typeof dependentValues.brideWitnessSecondResidentId === "object"
            ) {
              return (
                dependentValues.brideWitnessSecondResidentId.fullName || ""
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
      ],
    },
    // {
    //   title: "Witnesses Information",
    //   group: "Witnesses Information",
    //   groupOrder: 4,
    //   tabular: false,
    //   defaultExpanded: false,
    //   fields: [
    //     {
    //       type: "input",
    //       key: "honorRecordNumber",
    //       label: "Marriage Honor Record Number",
    //       placeholder: "",
    //       description: "Enter the Marriage Honor Record Number",
    //       validators: [
    //         {
    //           type: "required",
    //           message: "Marriage Honor Record Number is required",
    //         },
    //       ],
    //       required: true,
    //       group: "Honor Information",
    //       groupOrder: 4,
    //     },
    //     {
    //       type: "input",
    //       key: "uniqueRegistrationOfficeNumber",
    //       label: "Registration Office Number",
    //       placeholder: "",
    //       description: "Enter the Unique number of the registration office",
    //       validators: [
    //         {
    //           type: "required",
    //           message: "Registration Office Number is required",
    //         },
    //       ],
    //       required: true,
    //       group: "Honor Information",
    //       groupOrder: 4,
    //     },
    //     {
    //       type: "input",
    //       key: "uniqueMarriageCertificateNumber",
    //       label: "Marriage Certificate Number",
    //       placeholder: "",
    //       description: "Enter the Unique Marraige Certificate Number",
    //       validators: [
    //         {
    //           type: "required",
    //           message: "Marriage Certificate Number is required",
    //         },
    //       ],
    //       required: true,
    //       group: "Honor Information",
    //       groupOrder: 4,
    //     },
    //   ],
    // },
    {
      title: "Honor Information",
      group: "Honor Information",
      groupOrder: 5,
      tabular: true,
      defaultExpanded: true,
      fields: [
        {
          type: "input",
          key: "honorRecordNumber",
          label: "Marriage Honor Record Number",
          placeholder: "Enter Marriage Honor Record Number",
          description: "",
          validators: [
            {
              type: "required",
              message: "Marriage Honor Record Number is required",
            },
          ],
          required: true,
          group: "Honor Information",
          groupOrder: 4,
          gridCols: 6,
        },
        {
          type: "input",
          key: "uniqueRegistrationOfficeNumber",
          label: "Registration Office Number",
          placeholder: "Enter Registration Office Number",
          description: "",
          validators: [
            {
              type: "required",
              message: "Registration Office Number is required",
            },
          ],
          required: true,
          gridCols: 6,
          group: "Honor Information",
          groupOrder: 4,
        },
        {
          type: "input",
          key: "uniqueMarriageCertificateNumber",
          label: "Marriage Certificate Number",
          placeholder: "Enter Marriage Certificate Number",
          description: "",
          validators: [
            {
              type: "required",
              message: "Marriage Certificate Number is required",
            },
          ],
          required: true,
          group: "Honor Information",
          groupOrder: 4,
          gridCols: 6,
        },
      ],
    },
    {
      title: "Payment Information",
      group: "Payment Information",
      groupOrder: 1,
      tabular: false,
      defaultExpanded: true,
      fields: [
        {
          type: "payment",
          key: "paymentOption",
          label: "Payment Option",
          description: "Choose your payment method.",
          required: true,
          options: [
            {
              id: "telebirr",
              label: "Telebirr Transfer",
              value: "telebirr",
              data: {
                image: "/images/telebirr.png",
                price: "200 ETB",
                serviceType: "New Birth",
                class: "bg-white",
              },
            },
            {
              id: "cbe",
              label: "CBE Transfer",
              value: "cbe",
              data: {
                image: "/images/cbebirr.png",
                price: "200 ETB",
                serviceType: "New Birth",
                class: "bg-[#730b7d]",
              },
            },
            {
              id: "mpesa",
              label: "Mpesa Transfer",
              value: "mpesa",
              data: {
                image: "/images/mpesa.png",
                price: "200 ETB",
                serviceType: "New Birth",
                class: "bg-[#09ed2c]",
              },
            },
          ],
          gridCols: 12,
        },
      ],
    },
  ],
};
