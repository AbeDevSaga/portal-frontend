import { BirthResponse } from "@/features/birth-service/types";

export const mockBirthResponse = {
  id: "1dbf80f6-d2ef-44f9-b9a7-9e96697c8a84",
  registrationFormNumber: "RO-2025-00220250011",
  registrationStatus: "COMPLETED",
  localizations: [
    {
      childFirstName: "Yohannes",
      languageCode: "en",
      placeOfBirth: {
        type: "HEALTH_FACILITY",
        facilityName: "Addis Ababa General Hospital",
        facilityType: "Hospital",
        facilityOwnership: "Government",
        facilityNotificationRef: "REF12345",
        locationDescription: null,
      },
      birthType: "SINGLE",
      birthDate: "2025-08-20 10:15:00.0",
      childWeight: 3.3,
      childHeight: 40.5,
      issuedDate: "2025-08-20",
      gender: "Male",
      attendantName: "Dr. Alem",
      attendantQualification: "Pediatrician",
    },
    {
      childFirstName: "ዮሃንስ",
      languageCode: "am",
      placeOfBirth: {
        type: "HEALTH_FACILITY",
        facilityName: "አዲስ አበባ ጠቅላላ ሆስፒታል",
        facilityType: "Hospital",
        facilityOwnership: "Government",
        facilityNotificationRef: "REF12345",
        locationDescription: null,
      },
      birthType: "SINGLE",
      birthDate: "2025-08-20 10:15:00.0",
      childWeight: 3.3,
      childHeight: 40.5,
      issuedDate: "2025-08-20",
      gender: "Male",
      attendantName: "ዶ/ር አለም",
      attendantQualification: "ልጆች ሐኪም",
    },
  ],
  registrationOfficeNumber: "RO-2025-002",
  hospitalNotificationId: "HN-1757962640244-edf61237",
  fatherId: {
    previousAddress: {
      kebele: "",
      houseNumber: "",
      city: null,
      region: {
        id: "2a20f5b4-22ed-4e85-b607-6c1b14b7fefc",
        code: "AA",
        createdAt: "2025-08-09T05:56:57.264389",
        localizedContent: {
          en: {
            name: "ADDIS ABABA",
            description: "Addis Abeba",
          },
          am: {
            name: "Addis Abeba",
            description: "Addis Abeba",
          },
        },
        active: false,
      },
      zone: {
        id: "8e684500-07c5-4ee8-a7da-ddbba807e908",
        code: "AA002",
        createdAt: "2025-08-09T06:15:34.939057",
        localizedContent: {
          en: {
            name: "AKAKI KALITI",
            description: "Akaki Kaliti zone in Addis Ababa region",
          },
          am: {
            name: "የአቃቂ ቃሊቲ ዞን",
            description: "በአዲስ አበባ ክልል ውስጥ ያለው የአቃቂ ቃሊቲ ዞን",
          },
        },
        active: false,
      },
      woreda: {
        id: "a25fd5c9-4c73-434b-b5ea-62390b25d756",
        code: "AKK002",
        createdAt: "2025-08-11T10:39:10.350091",
        localizedContent: {
          en: {
            name: "Woreda 2",
            description: "Woreda 2 in Akaki Kaliti zone",
          },
          am: {
            name: "ወረዳ 2",
            description: "በአካኪ ካሊቲ ዞን ውስጥ ያለው ወረዳ 2",
          },
        },
        active: false,
      },
    },
    currentAddress: {
      kebele: "54",
      houseNumber: "",
      city: null,
      region: {
        id: "2a20f5b4-22ed-4e85-b607-6c1b14b7fefc",
        code: "AA",
        createdAt: "2025-08-09T05:56:57.264389",
        localizedContent: {
          en: {
            name: "ADDIS ABABA",
            description: "Addis Abeba",
          },
          am: {
            name: "Addis Abeba",
            description: "Addis Abeba",
          },
        },
        active: false,
      },
      zone: {
        id: "1842ab75-4eef-4d30-9220-cd0de37b10f8",
        code: "AA001",
        createdAt: "2025-08-09T06:15:25.011836",
        localizedContent: {
          en: {
            name: "ADDIS KETEMA",
            description: "Addis Ketema zone in Addis Ababa region",
          },
          am: {
            name: "የአዲስ ከተማ ዞን",
            description: "በአዲስ አበባ ክልል ውስጥ ያለው የአዲስ ከተማ ዞን",
          },
        },
        active: false,
      },
      woreda: {
        id: "d1ebbc8a-d037-4431-9c30-2cb48adc7a75",
        code: "AK002",
        createdAt: "2025-08-11T10:37:45.818992",
        localizedContent: {
          en: {
            name: "Woreda 2",
            description: "Woreda 2 in Addis Ketema zone",
          },
          am: {
            name: "ወረዳ 2",
            description: "በአዲስ ከተማ ዞን ውስጥ ያለው ወረዳ 2",
          },
        },
        active: false,
      },
    },
  },
  motherId: {
    previousAddress: {
      kebele: "",
      houseNumber: "",
      city: null,
      region: {
        id: "2a20f5b4-22ed-4e85-b607-6c1b14b7fefc",
        code: "AA",
        createdAt: "2025-08-09T05:56:57.264389",
        localizedContent: {
          en: {
            name: "ADDIS ABABA",
            description: "Addis Abeba",
          },
          am: {
            name: "Addis Abeba",
            description: "Addis Abeba",
          },
        },
        active: false,
      },
      zone: {
        id: "8e684500-07c5-4ee8-a7da-ddbba807e908",
        code: "AA002",
        createdAt: "2025-08-09T06:15:34.939057",
        localizedContent: {
          en: {
            name: "AKAKI KALITI",
            description: "Akaki Kaliti zone in Addis Ababa region",
          },
          am: {
            name: "የአቃቂ ቃሊቲ ዞን",
            description: "በአዲስ አበባ ክልል ውስጥ ያለው የአቃቂ ቃሊቲ ዞን",
          },
        },
        active: false,
      },
      woreda: {
        id: "a25fd5c9-4c73-434b-b5ea-62390b25d756",
        code: "AKK002",
        createdAt: "2025-08-11T10:39:10.350091",
        localizedContent: {
          en: {
            name: "Woreda 2",
            description: "Woreda 2 in Akaki Kaliti zone",
          },
          am: {
            name: "ወረዳ 2",
            description: "በአካኪ ካሊቲ ዞን ውስጥ ያለው ወረዳ 2",
          },
        },
        active: false,
      },
    },
    currentAddress: {
      kebele: "54",
      houseNumber: "",
      city: null,
      region: {
        id: "2a20f5b4-22ed-4e85-b607-6c1b14b7fefc",
        code: "AA",
        createdAt: "2025-08-09T05:56:57.264389",
        localizedContent: {
          en: {
            name: "ADDIS ABABA",
            description: "Addis Abeba",
          },
          am: {
            name: "Addis Abeba",
            description: "Addis Abeba",
          },
        },
        active: false,
      },
      zone: {
        id: "1842ab75-4eef-4d30-9220-cd0de37b10f8",
        code: "AA001",
        createdAt: "2025-08-09T06:15:25.011836",
        localizedContent: {
          en: {
            name: "ADDIS KETEMA",
            description: "Addis Ketema zone in Addis Ababa region",
          },
          am: {
            name: "የአዲስ ከተማ ዞን",
            description: "በአዲስ አበባ ክልል ውስጥ ያለው የአዲስ ከተማ ዞን",
          },
        },
        active: false,
      },
      woreda: {
        id: "d1ebbc8a-d037-4431-9c30-2cb48adc7a75",
        code: "AK002",
        createdAt: "2025-08-11T10:37:45.818992",
        localizedContent: {
          en: {
            name: "Woreda 2",
            description: "Woreda 2 in Addis Ketema zone",
          },
          am: {
            name: "ወረዳ 2",
            description: "በአዲስ ከተማ ዞን ውስጥ ያለው ወረዳ 2",
          },
        },
        active: false,
      },
    },
  },
  bloodTypeId: "9eaf776e-210f-4857-aab6-5309e5b1ca3d",
  nationalityName: "Ethiopia",
};
