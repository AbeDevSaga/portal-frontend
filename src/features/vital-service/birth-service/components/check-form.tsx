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
      content: "Parent Information",
    },
    {
      label: "Step 3",
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
          name: "Parent Information",
          label: "Parent Information",
          order: 2,
        },
        {
          name: "Payment Information",
          label: "Payment Information",
          order: 3,
        },
      ],
    },
  ],
  steps: [
    // Step 1: Child
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
          placeholder: "Enter child's first name",
          validators: [
            { type: "required", message: "Child's First name is required" },
          ],
          required: true,
          group: "Child Details",
          groupOrder: 1,
          gridCols: 6,
        },
        {
          type: "input",
          key: "middleName",
          label: "Child's Middle Name",
          placeholder: "Enter child's middle name",
          required: true,
          validators: [
            { type: "required", message: "Child's Middle name is required" },
          ],
          group: "Child Details",
          groupOrder: 2,
          gridCols: 6,
        },
        {
          type: "input",
          key: "lastName",
          label: "Child's Last Name",
          placeholder: "Enter child's last name",
          required: true,
          validators: [
            { type: "required", message: "Child's Last name is required" },
          ],
          group: "Child Details",
          groupOrder: 3,
          gridCols: 6,
        },
        {
          type: "radio",
          key: "gender",
          label: "Gender",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
          required: true,
          validators: [{ type: "required", message: "Gender is required" }],
          group: "Child Details",
          groupOrder: 4,
          gridCols: 6,
        },
        {
          type: "date",
          key: "birthDate",
          label: "Date of Birth",
          placeholder: "Select date of birth",
          required: true,
          validators: [
            { type: "required", message: "Date of birth is required" },
          ],
          group: "Child Details",
          groupOrder: 5,
          gridCols: 6,
        },
      ],
    },

    // Step 2: Parent
    {
      title: "Parent Information",
      group: "Parent Information",
      groupOrder: 2,
      tabular: false,
      defaultExpanded: true,
      fields: [
        // Father
        {
          type: "input",
          key: "fatherResidentId",
          label: "Father Fayida ID",
          placeholder: "Enter Fayida ID",
          actionButton: {
            label: "Fetch",
            onClick: (val: string) => {
              console.log("Fetching Father Fayida ID:", val);
            },
          },
          validators: [
            { type: "required", message: "Father Fayida ID is required" },
          ],
          required: true,
          group: "Parent Information",
          groupOrder: 1,
          gridCols: 6,
        },
        {
          type: "input",
          key: "fatherFirstName",
          label: "Father First Name",
          placeholder: "Enter first name",
          required: true,
          validators: [
            { type: "required", message: "Father first name is required" },
          ],
          group: "Parent Information",
          groupOrder: 2,
          gridCols: 6,
        },
        {
          type: "input",
          key: "fatherLastName",
          label: "Father Last Name",
          placeholder: "Enter last name",
          required: true,
          validators: [
            { type: "required", message: "Father last name is required" },
          ],
          group: "Parent Information",
          groupOrder: 3,
          gridCols: 6,
        },

        // Mother
        {
          type: "input",
          key: "motherResidentId",
          label: "Mother Fayida ID",
          placeholder: "Enter Fayida ID",
          actionButton: {
            label: "Fetch",
            onClick: (val: string) => {
              console.log("Fetching Mother Fayida ID:", val);
            },
          },
          validators: [
            { type: "required", message: "Mother Fayida ID is required" },
          ],
          required: true,
          group: "Parent Information",
          groupOrder: 4,
          gridCols: 6,
        },
        {
          type: "input",
          key: "motherFirstName",
          label: "Mother First Name",
          placeholder: "Enter first name",
          required: true,
          validators: [
            { type: "required", message: "Mother first name is required" },
          ],
          group: "Parent Information",
          groupOrder: 5,
          gridCols: 6,
        },
        {
          type: "input",
          key: "motherLastName",
          label: "Mother Last Name",
          placeholder: "Enter last name",
          required: true,
          validators: [
            { type: "required", message: "Mother last name is required" },
          ],
          group: "Parent Information",
          groupOrder: 6,
          gridCols: 6,
        },
      ],
    },

    // Step 3: Payment
    {
      title: "Payment Information",
      group: "Payment Information",
      groupOrder: 3,
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
