import { FormConfig } from "@/common/types/formType";

export const formConfig: FormConfig = {
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
    {
      title: "Payment Information",
      group: "Payment Information",
      groupOrder: 2,
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
