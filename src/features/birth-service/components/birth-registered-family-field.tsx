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
          groupOrder: 3,
          gridCols: 6,
          defaultValue: null,
          inputSearchConfig: {
            isExternal: true,
            baseUrl: "https://crrsa-api.risertechservices.com/api/v1",
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
            additionalParams: {},
            transformResponse: (data: any) => {
              // console.log("resident data: ", data)
              if (!data || !data.content || !Array.isArray(data.content)) {
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
          },
        },
        {
          type: "lookup",
          key: "childId",
          label: "Child Name",
          placeholder: "Select a child",
          description:
            "Children linked to the selected parent will be listed here.",
          required: true,
          group: "Child Details",
          gridCols: 6,
          isHide: (dependentValues: any) => {
            return !dependentValues?.familyResidentId;
          },
          getDependentValue: (formValues: any) => ({
            familyResidentId: formValues.familyResidentId?.value,
          }),
          getDependentKey: (dependentValues: any) => {
            const key =
              dependentValues?.familyResidentId?.gender?.toLowerCase() ===
              "male"
                ? "fatherResidentId"
                : "motherResidentId";
            return key; // only show if male
          },
          validators: [
            {
              type: "required",
              message: "Child Selection is required",
            },
          ],
          groupOrder: 1,
          clearable: false,
          searchable: true,
          lookupConfig: {
            isExternal: true,
            baseUrl: "https://crvs-birth.itsidx.com/api/v1",
            apiEndpoint: "/birth-registrations/residents",
            method: "GET",
            searchKey: "",
            valueKey: "id",
            labelKey: "name",
            debounceMs: 300,
            minSearchLength: 0,
            cacheResults: true,
            getDependentValue: (formValues: any) => ({
              familyResidentId: formValues.familyResidentId?.value,
            }),
            transformResponse: (response, locale: "en" | "am" = "en") => {
              // console.log("response data from child type lookup", response);

              return response.data.map((res: any) => {
                // Find localization by language, fallback to first
                const localization =
                  res.localizations?.find(
                    (loc: any) => loc.languageCode === locale
                  ) ?? res.localizations?.[0];

                return {
                  id: res.id,
                  value: res.id,
                  name:
                    localization?.childFirstName ?? res.registrationFormNumber,
                  label:
                    localization?.childFirstName ?? res.registrationFormNumber,
                  isDisabled: false,
                  ...res,
                  ...localization,
                };
              });
            },
          },
        },
        {
          type: "input",
          key: "childFather",
          label: "Father's Name",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 12,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            // pick birthDate directly from the selected child lookup
            if (dependentValues?.childId) {
              return dependentValues.childId.fatherId || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            childId: formValues.childId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.childId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.childId;
          },
        },
        {
          type: "input",
          key: "childMother",
          label: "Mother's Name",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 13,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            // pick birthDate directly from the selected child lookup
            if (dependentValues?.childId) {
              return dependentValues.childId.motherId || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            childId: formValues.childId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.childId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.childId;
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
          groupOrder: 13,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            // pick birthDate directly from the selected child lookup
            if (dependentValues?.childId) {
              return dependentValues.childId.gender || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            childId: formValues.childId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.childId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.childId;
          },
        },
        {
          type: "input",
          key: "childDateOfBirth",
          label: "Child's Date of Birth",
          placeholder: "",
          description: "",
          validators: [],
          required: false,
          group: "Child Details",
          groupOrder: 13,
          gridCols: 6,
          defaultValue: (dependentValues: any) => {
            // pick birthDate directly from the selected child lookup
            if (dependentValues?.childId) {
              return dependentValues.childId.birthDate || "";
            }
            return "";
          },
          getDependentValue: (formValues: any) => ({
            childId: formValues.childId,
          }),
          isDisabled: (dependentValues: any) => {
            return dependentValues?.childId;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.childId;
          },
        },
      ],
    },
  ],
};
