export const requestTypeData = [
  {
    type: "correction",
    attachment: {
      label: "Supporting Documents",
      requiredDoc: {
        label: "Required Documents",
        list: [
          "Court letter (for name/age changes)",
          "Valid ID document",
          "Original birth certificate",
          "Police report (if lost)",
        ],
      },
    },
    payment: {
      label: "Payment Information",
      serviceFee: 200,
      processingFee: 50,
    },
  },

  {
    type: "print",
    // attachment: {
    //   label: "Supporting Documents",
    //   requiredDoc: {
    //     label: "Required Documents",
    //     list: [
    //       "Original birth certificate",
    //       "Valid ID document",
    //     ],
    //   },
    // },
    payment: {
      label: "Payment Information",
      serviceFee: 150, // Printing service fee
      processingFee: 50,
    },
  },

  {
    type: "damaged",
    attachment: {
      label: "Supporting Documents",
      requiredDoc: {
        label: "Required Documents",
        list: [
          "Damaged birth certificate (submit old copy)",
          "Valid ID document",
        ],
      },
    },
    payment: {
      label: "Payment Information",
      serviceFee: 180, // Damaged replacement fee
      processingFee: 50,
    },
  },

  {
    type: "lost",
    attachment: {
      label: "Supporting Documents",
      requiredDoc: {
        label: "Required Documents",
        list: [
          "Police report confirming the loss",
          "Valid ID document",
          "New supporting documents if any updates are required",
        ],
      },
    },
    payment: {
      label: "Payment Information",
      serviceFee: 220, // Lost replacement fee
      processingFee: 50,
    },
  },
];
