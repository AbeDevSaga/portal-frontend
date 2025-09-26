const attachments = [
  {
    type: "IMAGE",
    url: "https://data.unicef.org/wp-content/uploads/2017/12/EngBirthfinal.jpg",
    fileName: "Birth Certificate",
    fileType: "image/jpg",
  },
  {
    type: "IMAGE",
    url: "https://data.unicef.org/wp-content/uploads/2017/12/EngBirthfinal.jpg",
    fileName: "Birth Certificate",
    fileType: "image/jpg",
  },
];
const resident = [
    {
      personal_info: {
        first_name: "Yohannes",
        last_name: "Tesfaye",
        profile_picture: "https://randomuser.me/api/portraits/men/1.jpg",
        date_of_birth: "1990-08-20T10:15:00.0", // realistic birth date for 5-year-old child in 2025
        gender: "Male",
        national_id: "1dbf80f6-d2ef-44f9-b9a7-9e96697c8a84",
        phone_number: "+251911234567",
        registration_form_number: "RO-2020-00220250011",
        occupation: "Engineer",
        birth_type: "SINGLE",
        weight_kg: 3.1,
        height_cm: 49,
        relation_status: "husband",
        attachments: attachments,
        place_of_birth: {
          facility_name: "Tikur Anbessa Specialized Hospital",
          facility_type: "Hospital",
          facility_ownership: "Government",
        },
        address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02", // Addis Ketema has woredas numbered 01 to 14
          kebele: "05", // valid kebele within Addis Ketema
          house_number: "123",
        },
        blood_type_id: "9eaf776e-210f-4857-aab6-5309e5b1ca3d",
        nationality_name: "Ethiopia",
      },
      parental_info: {
        father_name: "Tesfaye Alemu",
        father_occupation: "Engineer",
        father_phone_number: "+251911234567",
        father_profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
        father_nationality_name: "Ethiopia",
        father_registration_form_number: "RO-2020-00220250011",
        father_previous_address: {
          region: "ADDIS ABABA",
          zone: "AKAKI KALITI",
          woreda: "Woreda 03",
          kebele: "07",
          house_number: "45",
        },
        current_address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02",
          kebele: "05",
          house_number: "123",
        },
      },
      mother_info: {
        first_name: "Meseret",
        last_name: "Bekele",
        occupation: "Teacher",
        phone_number: "+251911234567",
        profile_picture: "https://randomuser.me/api/portraits/women/3.jpg",
        nationality_name: "Ethiopia",
        registration_form_number: "RO-2020-00220250013",
        registration_status: "COMPLETED",
        previous_address: {
          region: "ADDIS ABABA",
          zone: "AKAKI KALITI",
          woreda: "Woreda 03",
          kebele: "07",
          house_number: "45",
        },
        current_address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02",
          kebele: "05",
          house_number: "123",
        },
        parents_marital_status: "Married",
      },
      marital_info: {
        marital_status: "Married",
        spouse_name: "Chaltu Beriso",
        date_of_marriage: "2018-10-12T14:00:00.0", // plausible marriage date
        marriage_type: "Traditional",
      },
      children_info: [
        {
          child_name: "Beckam Tesfaye",
          date_of_birth: "2010-08-20T10:15:00.0",
          age: 10,
          gender: "Male",
          birth_type: "TWIN",
          relation_status: "Son",
          weight_kg: 3.1,
          height_cm: 49,
          nationality_name: "Ethiopia",
          occupation: "Student",
          attachments: attachments,
          child_profile_picture: "https://randomuser.me/api/portraits/men/4.jpg",
          place_of_birth: {
            facility_name: "Tikur Anbessa Specialized Hospital",
            facility_type: "Hospital",
            facility_ownership: "Government",
          },
          attendant_name: "Dr. Alemu Kebede",
          attendant_qualification: "Pediatrician",
          registration_status: "COMPLETED",
          registration_form_number: "RO-2020-00220250012",
        },
        {
          child_name: "Beka Tesfaye",
          date_of_birth: "2010-08-20T10:15:00.0",
          age: 10,
          gender: "Male",
          birth_type: "TWIN",
          relation_status: "Son",
          weight_kg: 3.1,
          height_cm: 49,
          nationality_name: "Ethiopia",
          occupation: "Student",
          attachments: attachments,
          child_profile_picture: "https://randomuser.me/api/portraits/men/5.jpg",
          place_of_birth: {
            facility_name: "Tikur Anbessa Specialized Hospital",
            facility_type: "Hospital",
            facility_ownership: "Government",
          },
          attendant_name: "Dr. Alemu Kebede",
          attendant_qualification: "Pediatrician",
          registration_status: "COMPLETED",
          registration_form_number: "RO-2020-00220250013",
        },
      ],
    },
    {
      personal_info: {
        first_name: "Chaltu",
        last_name: "Beriso",
        date_of_birth: "1993-06-15T08:30:00.0", // realistic age adult
        gender: "Female",
        national_id: "2f9b80a7-a3ef-55b9-c9a7-9f96697c9b85",
        phone_number: "+251911987654",
        registration_form_number: "RO-2020-00220250014",
        occupation: "Teacher",
        birth_type: "SINGLE",
        weight_kg: 3.1,
        height_cm: 49,
        attachments: attachments,
        relation_status: "wife",
        profile_picture: "https://randomuser.me/api/portraits/women/6.jpg",
        place_of_birth: {
          facility_name: "Tikur Anbessa Specialized Hospital",
          facility_type: "Hospital",
          facility_ownership: "Government",
        },
        address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02",
          kebele: "05",
          house_number: "123",
        },
        blood_type_id: "a3b8f877-330f-4857-bb66-530ae5b1aa7d",
        nationality_name: "Ethiopia",
      },
      parental_info: {
        father_name: "Beriso Desta",
        father_occupation: "Engineer",
        father_phone_number: "+251911234567",
        father_profile_picture: "https://randomuser.me/api/portraits/men/7.jpg",
        father_nationality_name: "Ethiopia",
        father_registration_form_number: "RO-2020-00220250015",
        father_previous_address: {
          region: "ADDIS ABABA",
          zone: "AKAKI KALITI",
          woreda: "Woreda 03",
          kebele: "07",
          house_number: "45",
        },
        current_address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02",
          kebele: "05",
          house_number: "123",
        },
        mother_name: "Jitu Fikre",
        mother_occupation: "Teacher",
        mother_phone_number: "+251911234567",
        mother_profile_picture: "https://randomuser.me/api/portraits/women/8.jpg",
        mother_nationality_name: "Ethiopia",
        mother_registration_form_number: "RO-2020-00220250016",
            mother_previous_address: {
          region: "ADDIS ABABA",
          zone: "AKAKI KALITI",
          woreda: "Woreda 03",
          kebele: "07",
          house_number: "45",
        },
        current_address: {
          region: "ADDIS ABABA",
          zone: "ADDIS KETEMA",
          woreda: "Woreda 02",
          kebele: "05",
          house_number: "123",
        },
        parents_marital_status: "Married",
      },
      marital_info: {
        marital_status: "Married",
        spouse_name: "Yohannes Tesfaye",
        date_of_marriage: "2018-10-12T14:00:00.0",
        marriage_type: "Traditional",
      },
      children_info: [
        {
          child_name: "Beckam Tesfaye",
          date_of_birth: "2010-08-20T10:15:00.0",
          age: 10,
          gender: "Male",
          birth_type: "TWIN",
          relation_status: "Son",
          weight_kg: 3.1,
          height_cm: 49,
          nationality_name: "Ethiopia",
          occupation: "Student",
          attachments: attachments,
          child_profile_picture: "https://randomuser.me/api/portraits/men/9.jpg",
          place_of_birth: {
            facility_name: "Tikur Anbessa Specialized Hospital",
            facility_type: "Hospital",
            facility_ownership: "Government",
          },
          attendant_name: "Dr. Alemu Kebede",
          attendant_qualification: "Pediatrician",
          registration_status: "COMPLETED",
          registration_form_number: "RO-2020-00220250012",
        },
        {
          child_name: "Beka Tesfaye",
          date_of_birth: "2010-08-20T10:15:00.0",
          age: 10,
          gender: "Male",
          birth_type: "TWIN",
          relation_status: "Son",
          weight_kg: 3.1,
          height_cm: 49,
          nationality_name: "Ethiopia",
          occupation: "Student",
          attachments: attachments,
          child_profile_picture: "https://randomuser.me/api/portraits/men/10.jpg",
          place_of_birth: {
            facility_name: "Tikur Anbessa Specialized Hospital",
            facility_type: "Hospital",
            facility_ownership: "Government",
          },
          attendant_name: "Dr. Alemu Kebede",
          attendant_qualification: "Pediatrician",
          registration_status: "COMPLETED",
              registration_form_number: "RO-2020-00220250013",
        },
      ],
    },
    
  ];
 

export default resident;

export function getResidentByFormNumber(formNumber: string) {
  for (const res of resident) {
    // 1. Check personal info
    if (res.personal_info.registration_form_number === formNumber) {
      return res;
    }

    // 2. Check parental info (father & mother)
    if (
      res.parental_info?.father_info?.registration_form_number === formNumber
    ) {
      return res;
    }
    if (
      res.parental_info?.mother_info?.registration_form_number === formNumber
    ) {
      return res;
    }

    // 3. Check children info
    if (res.children_info?.length) {
      for (const child of res.children_info) {
        if (child.registration_form_number === formNumber) {
          // return both resident + child if you want to access child details
          return { ...res, matchedChild: child };
        }
      }
    }
  }

  return undefined;
}
