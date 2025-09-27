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
          type: "array", // new type for dynamic children
          key: "basicInformation",
          label: "Basic Information",
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          fields: [
            {
              type: "select",
              key: "birthType",
              label: "Birth Type",
              placeholder: "Select birth type",
              // className: "md:col-span-2",
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
          ],
        },

        {
          type: "array", // new type for dynamic children
          key: "children",
          label: "Children Details",
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          validators: [
            {
              type: "button", // <-- new validator for Add button
              button: true,
              maxItems: 5, // maximum children that can be added
              message: "You cannot add more than 5 children",
              label: "Add Another Child",
            },
          ],
          getDependentValue: (formValues: any) => ({
            birthType: formValues.basicInformation?.[0]?.birthType,
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
        {
          type: "array", // new type for dynamic children
          key: "fatherInformation",
          label: "Father Information",
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
          fields: [
            {
              type: "inputSearch",
              key: "fatherResidentId",
              label: "Fayida ID No",
              placeholder: "Enter Fayida ID No",
              description: "",
              required: true,
              group: "Child Details",
              groupOrder: 12,
              className: "col-span-1",
              gridCols: 6,
              actionButton: {
                label: "Fetch",
                onClick: (val: string) => {
                  console.log("Fetching Fayida ID for Father:", val);
                },
              },
              validators: [
                { type: "required", message: "Fayida ID is required" },
              ],
            },
            {
              type: "input",
              key: "fatherFirstName",
              label: "First Name",
              placeholder: "Enter First Name",
              description: "",
              validators: [
                { type: "required", message: "First name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "fatherMiddleName",
              label: "Middle Name",
              placeholder: "Enter Middle Name",
              description: "",
              validators: [
                { type: "required", message: "Middle name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "fatherLastName",
              label: "Last Name",
              placeholder: "Enter Last Name",
              description: "",
              validators: [
                { type: "required", message: "Last name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 13,
              gridCols: 6,
            },
            {
              type: "input",
              key: "fatherFirstName_amh",
              label: "First Name (Amh)",
              placeholder: "Enter First Name (Amh)",
              description: "",
              validators: [
                { type: "required", message: "First name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "fatherMiddleName_amh",
              label: "Middle Name (Amh)",
              placeholder: "Enter Middle Name (Amh)",
              description: "",
              validators: [
                { type: "required", message: "Middle name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "fatherLastName_amh",
              label: "Last Name (Amh)",
              placeholder: "Enter Last Name (Amh)",
              description: "",
              validators: [
                { type: "required", message: "Last name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 13,
              gridCols: 6,
            },
          ],
        },

        {
          type: "array", // new type for dynamic children
          key: "motherInformation",
          label: "Mother Information",
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
          fields: [
            {
              type: "inputSearch",
              key: "motherResidentId",
              label: "Fayida ID No",
              placeholder: "Enter Fayida ID No",
              description: "",
              required: true,
              group: "Child Details",
              groupOrder: 12,
              className: "col-span-1",
              gridCols: 6,
              actionButton: {
                label: "Fetch",
                onClick: (val: string) => {
                  console.log("Fetching Fayida ID for:", val);
                },
              },
              validators: [
                { type: "required", message: "Fayida ID is required" },
              ],
            },
            {
              type: "input",
              key: "motherFirstName",
              label: "First Name",
              placeholder: "Enter First Name",
              description: "",
              validators: [
                { type: "required", message: "First name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "mothermiddleName",
              label: "Middle Name",
              placeholder: "Enter Middle Name",
              description: "",
              validators: [
                { type: "required", message: "Middle name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "motherLastName",
              label: "Last Name",
              placeholder: "Enter Last Name",
              description: "",
              validators: [
                { type: "required", message: "Last name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 13,
              gridCols: 6,
            },
            {
              type: "input",
              key: "motherFirstName_amh",
              label: "First Name (Amh)",
              placeholder: "Enter First Name",
              description: "",
              validators: [
                { type: "required", message: "First name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "mothermiddleName_amh",
              label: "Middle Name (Amh)",
              placeholder: "Enter Middle Name",
              description: "",
              validators: [
                { type: "required", message: "Middle name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 12,
              gridCols: 6,
            },
            {
              type: "input",
              key: "motherLastName_amh",
              label: "Last Name (Amh)",
              placeholder: "Enter Last Name",
              description: "",
              validators: [
                { type: "required", message: "Last name is required" },
              ],
              required: true,
              group: "Child Details",
              groupOrder: 13,
              gridCols: 6,
            },
          ],
        },

        {
          type: "array", // new type for dynamic children
          key: "birthAttendantInformation",
          label: "Birth Attendant Information",
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          fields: [
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
      ],
    },
  ],
};
