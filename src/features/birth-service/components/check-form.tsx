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
