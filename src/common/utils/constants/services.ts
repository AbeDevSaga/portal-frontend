import birth from "@/public/images/birth.svg";
import death from "@/public/images/death.svg";
import marriage from "@/public/images/marriage.svg";
import divorce from "@/public/images/divorce.svg";
import recognition from "@/public/images/recognition.svg";
import adoption from "@/public/images/adoption.svg";
import legitimation from "@/public/images/legitimation.svg";
import vitalImage from "@/public/images/sidebar/vitalService.png";
import residentImage from "@/public/images/sidebar/residentService.png";
import docAuthentication from "@/public/images/sidebar/docAuthent.png";

export const serviceList = [
  {
    name: "Vital Service",
    icon: vitalImage.src,
    description:
      "The is the description of vital service with their services. The is the description of vital service with their services. The is the description of vital service with their services.",
    subServices: [
      {
        name: "Birth",
        icon: birth.src,
        requests: [
          { type: "New", link: "/civil-registration/birth/new" },
          { type: "Lost", link: "/civil-registration/birth/lost" },
          { type: "Damaged", link: "/civil-registration/birth/damaged" },
          { type: "Correction", link: "/civil-registration/birth/correction" },
          { type: "Print", link: "/civil-registration/birth/print" },
        ],
      },
      {
        name: "Marriage",
        icon: marriage.src,
        requests: [
          { type: "New", link: "/civil-registration/marriage/new" },
          { type: "Lost", link: "/civil-registration/marriage/lost" },
          { type: "Damaged", link: "/civil-registration/marriage/damaged" },
          {
            type: "Correction",
            link: "/civil-registration/marriage/correction",
          },
        ],
      },
      {
        name: "Divorce",
        icon: divorce.src,
        requests: [
          { type: "New", link: "/civil-registration/divorce/new" },
          { type: "Lost", link: "/civil-registration/divorce/lost" },
          { type: "Damaged", link: "/civil-registration/divorce/damaged" },
          {
            type: "Correction",
            link: "/civil-registration/divorce/correction",
          },
        ],
      },
      {
        name: "Death",
        icon: death.src,
        requests: [
          { type: "New", link: "/civil-registration/death/new" },
          { type: "Lost", link: "/civil-registration/death/lost" },
          { type: "Damaged", link: "/civil-registration/death/damaged" },
          { type: "Correction", link: "/civil-registration/death/correction" },
        ],
      },
      {
        name: "Adoption",
        icon: adoption.src,
        requests: [
          { type: "New", link: "/civil-registration/adoption/new" },
          { type: "Lost", link: "/civil-registration/adoption/lost" },
          { type: "Damaged", link: "/civil-registration/adoption/damaged" },
          {
            type: "Correction",
            link: "/civil-registration/adoption/correction",
          },
        ],
      },
      {
        name: "Legitimation of Fatherhood",
        icon: legitimation.src,
        requests: [
          { type: "New", link: "/civil-registration/fatherhood/new" },
          { type: "Lost", link: "/civil-registration/fatherhood/lost" },
          { type: "Damaged", link: "/civil-registration/fatherhood/damaged" },
          {
            type: "Correction",
            link: "/civil-registration/fatherhood/correction",
          },
        ],
      },
      {
        name: "Recognition of Child",
        icon: recognition.src,
        requests: [
          { type: "New", link: "/civil-registration/childhood/new" },
          { type: "Lost", link: "/civil-registration/childhood/lost" },
          { type: "Damaged", link: "/civil-registration/childhood/damaged" },
          {
            type: "Correction",
            link: "/civil-registration/childhood/correction",
          },
        ],
      },
    ],
  },
  {
    name: "Resident Service",
    icon: residentImage.src,
    description:
      "The is the description of resident service with their services. The is the description of resident service with their services. The is the description of resident service with their services.",
    subServices: [
      {
        name: "Family Registration",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/family_registration/new" },
          { type: "Lost", link: "/application/family_registration/lost" },
          { type: "Damaged", link: "/application/family_registration/damaged" },
          {
            type: "Correction",
            link: "/application/family_registration/correction",
          },
        ],
      },
      {
        name: "Residence id",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/residence_id/new" },
          { type: "Lost", link: "/application/residence_id/lost" },
          { type: "Damaged", link: "/application/residence_id/damaged" },
          {
            type: "Correction",
            link: "/application/residence_id/correction",
          },
        ],
      },
      {
        name: "Residence Transfer",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/residence_transfer/new" },
          { type: "Lost", link: "/application/residence_transfer/lost" },
          { type: "Damaged", link: "/application/residence_transfer/damaged" },
          {
            type: "Correction",
            link: "/application/residence_transfer/correction",
          },
        ],
      },
      {
        name: "Unmaried Certificate",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/unmaried_certificate/new" },
          { type: "Lost", link: "/application/unmaried_certificate/lost" },
          {
            type: "Damaged",
            link: "/application/unmaried_certificate/damaged",
          },
          {
            type: "Correction",
            link: "/application/unmaried_certificate/correction",
          },
        ],
      },
    ],
  },
  {
    name: "Document Authentication",
    icon: docAuthentication.src,
    description:
      "The is the description of document authentication with their services. The is the description of document authentication with their services.",
    subServices: [
      {
        name: "Citizenship",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/citizenship/new" },
          { type: "Lost", link: "/application/citizenship/lost" },
          { type: "Damaged", link: "/application/citizenship/damaged" },
          { type: "Correction", link: "/application/citizenship/correction" },
        ],
      },
      {
        name: "About being alive",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/about_being_alive/new" },
          { type: "Lost", link: "/application/about_being_alive/lost" },
          { type: "Damaged", link: "/application/about_being_alive/damaged" },
          {
            type: "Correction",
            link: "/application/about_being_alive/correction",
          },
        ],
      },
      {
        name: "Relative Relation",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/relative_relation/new" },
          { type: "Lost", link: "/application/relative_relation/lost" },
          { type: "Damaged", link: "/application/relative_relation/damaged" },
          {
            type: "Correction",
            link: "/application/relative_relation/correction",
          },
        ],
      },
      {
        name: "Unemployed",
        icon: birth.src,
        requests: [
          { type: "New", link: "/application/unemployed/new" },
          { type: "Lost", link: "/application/unemployed/lost" },
          { type: "Damaged", link: "/application/unemployed/damaged" },
          { type: "Correction", link: "/application/unemployed/correction" },
        ],
      },
    ],
  },
];
