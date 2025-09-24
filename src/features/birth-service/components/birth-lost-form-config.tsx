import { FormConfig } from "@/common/types/formType";

export const birthLostFormConfig: FormConfig = {
  title: "Birth Certificate Lost",
  description: "Lost information on your birth certificate",
  stepperData: [
    {
      label: "Step 1",
      content: "Detail Information",
    },
    {
      label: "Step 2",
      content: "Payment Information",
    },
  ],
  stepperPosition: "",
  grouping: [
    {
      group: "General Information",
      defaultGroup: "Correction Details",
      groups: [
        {
          name: "Correction Details",
          label: "Correction Details",
          order: 1,
        },
      ],
    },
    {
      group: "Payment Information",
      defaultGroup: "Lost Details",
      groups: [
        {
          name: "Payment Information",
          label: "Payment Information",
          order: 1,
        },
      ],
    },
  ],
  steps: [
    {
      title: "Basic Information",
      group: "Basic Information",
      groupOrder: 1,
      tabular: true,
      defaultExpanded: true,
      fields: [
        {
          type: "detail",
          key: "birthDeatil",
          label: "Child's First Name",
          placeholder: "Enter child's first name",
          validators: [
            { type: "required", message: "Child's first name is required" },
          ],
          required: true,
          group: "Basic Information",
          groupOrder: 1,
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
