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
          type: "select",
          key: "birthType",
          label: "Birth Type",
          placeholder: "Select birth type",
          // className:
          //   "px-4 h-14 mt-0.5 mb-10 border-neutral-300 placeholder:text-xl text-xl",
          // labelClassName: "text-lg text-neutral-500", // Example of custom label styling
          validators: [{ type: "required", message: "" }],
          required: true,
          group: "None-Resident Registration",
          groupOrder: 2,
          gridCols: 6, // Left column
          options: [
            { label: "Single", value: "single" },
            { label: "Twin", value: "twin" },
            { label: "Triplet", value: "triplet" },
            { label: "Other", value: "other" },
          ],
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
          type: "input",
          key: "fatherFullName",
          label: "Father's Full Name",
          placeholder: "Enter Father's Full Name",
          description: "",
          validators: [
            { type: "required", message: "Father's full name is required" },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 12,
          gridCols: 6,
        },
        {
          type: "input",
          key: "motherFullName",
          label: "Mother's Full Name",
          placeholder: "Enter Mother's Full Name",
          description: "",
          validators: [
            { type: "required", message: "Mother's full name is required" },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 13,
          gridCols: 6,
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

        {
          type: "array", // new type for dynamic children
          key: "children",
          label: "Children Details",
          className: "grid grid-cols-6 md:grid-cols-12 gap-4",
          getDependentValue: (formValues: any) => ({
            birthType: formValues.birthType,
          }),
          isRequired: (dependentValues: any) => {
            // Only required when the field is visible
            return dependentValues?.birthType;
          },
          isHide: (dependentValues: any) => {
            return !dependentValues?.birthType;
          },
          getLength: (birthType: string) => {
            switch (birthType) {
              case "single":
                return 1;
              case "twin":
                return 2;
              case "triplet":
                return 3;
              default:
                return 1;
            }
          },
          fields: [
            {
              type: "input",
              key: "firstName",
              label: "Child's First Name",
              placeholder: "Enter child's first name.",
              description: "",
              gridCols: 6,
              validators: [
                { type: "required", message: "Child's First name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 1,
            },
            {
              type: "select",
              key: "gender",
              label: "Gender",
              placeholder: "Select Child's Gender",
              validators: [{ type: "required", message: "" }],
              required: true,
              group: "None-Resident Registration",
              groupOrder: 2,
              gridCols: 6,
              options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ],
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
          ],
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
