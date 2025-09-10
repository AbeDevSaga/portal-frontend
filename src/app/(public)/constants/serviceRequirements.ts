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

export const serviceRequiremnts = [
  {
    name: "Civil Registration",
    icon: vitalImage.src,
    subService: [
      {
        name: "Birth",
        icon: "birth",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new birth and request an official birth certificate for a newborn or an unregistered person.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement birth certificate if the original has been lost or is no longer available.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a birth certificate, such as fixing errors in name, date of birth, or other details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged birth certificate and request a new valid copy to replace it.",
          },
        ],
      },
      {
        name: "Marriage",
        icon: "marriage",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new marriage and obtain an official marriage certificate.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement marriage certificate if the original has been lost or misplaced.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a marriage certificate, such as fixing spelling mistakes, name details, or dates.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged marriage certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Divorce",
        icon: "divorce",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new divorce case and obtain an official divorce certificate.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement divorce certificate if the original has been lost or cannot be found.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a divorce certificate, such as fixing errors in names, dates, or other details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged divorce certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Death",
        icon: "death",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new death and request an official death certificate for the deceased.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement death certificate if the original has been lost or is no longer available.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a death certificate, such as fixing errors in names, dates, or other recorded details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged death certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Adoption",
        icon: "adoption",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new adoption case and obtain an official adoption certificate.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement adoption certificate if the original has been lost or cannot be located.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on an adoption certificate, such as fixing errors in names, dates, or other details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged adoption certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Legitimation of Father",
        icon: "legitimation",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new legitimation of father and obtain the official certificate confirming paternity.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement legitimation of father certificate if the original has been lost or cannot be found.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a legitimation of father certificate, such as fixing errors in names, dates, or details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged legitimation of father certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Recognition of Child",
        icon: "recognition",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new recognition of child and obtain an official recognition certificate.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement recognition of child certificate if the original has been lost or is unavailable.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a recognition of child certificate, such as fixing errors in names, dates, or other recorded details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged recognition of child certificate and request a new valid copy.",
          },
        ],
      },
    ],
  },
  {
    name: "Resident Service",
    icon: residentImage.src,
    subService: [
      {
        name: "Family Registration",
        icon: "Icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Register a new family in the residence records and obtain a family registration certificate.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement family registration certificate if the original has been lost or is unavailable.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections in family registration records, such as names, dates, or household details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged family registration certificate and request a new valid copy.",
          },
        ],
      },
      {
        name: "Residence Id",
        icon: "Icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Apply for a new residence ID card as proof of residence.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement residence ID card if the original has been lost or stolen.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on a residence ID, such as fixing errors in name, address, or other details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged residence ID card and request a new valid copy.",
          },
        ],
      },
      {
        name: "Residence Transfer",
        icon: "Icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Apply for transfer of residence registration when moving to a new location.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request assistance if the residence transfer documents have been lost.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on residence transfer records, such as wrong addresses or household details.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report damaged residence transfer documents and request new valid copies.",
          },
        ],
      },
      {
        name: "Unmarried Certificate",
        icon: "Icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Request an unmarried certificate as proof of single marital status.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request a replacement unmarried certificate if the original has been lost or is unavailable.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on an unmarried certificate, such as name or personal detail errors.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged unmarried certificate and request a new valid copy.",
          },
        ],
      },
    ],
  },
  {
    name: "Document Authentication",
    icon: docAuthentication.src,
    subService: [
      {
        name: "Citizenship",
        icon: "icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Apply for authentication of a new citizenship document to verify legal citizenship status.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request authentication for a replacement citizenship document if the original is lost.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Request correction on a citizenship document authentication if there are errors in the recorded information.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged citizenship document and request re-authentication.",
          },
        ],
      },
      {
        name: "About Being Alive",
        icon: "icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Request authentication to certify that a person is alive for legal, financial, or administrative purposes.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request re-authentication if the previous 'alive' verification document is lost.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on an 'alive' verification record if any information is incorrect.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged 'alive' verification document and request a new authentication.",
          },
        ],
      },
      {
        name: "Relative Relation",
        icon: "icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Authenticate documents proving family relationships, such as parent-child or sibling relations.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request re-authentication if the original family relation document is lost.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on authenticated relative documents if names or relationships are incorrect.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report damaged relative relation documents and request re-authentication.",
          },
        ],
      },
      {
        name: "Unemployed",
        icon: "icon",
        requests: [
          {
            type: "New",
            icon: "new",
            description:
              "Request authentication of unemployment status for legal or administrative purposes.",
          },
          {
            type: "Lost",
            icon: "lost",
            description:
              "Request re-authentication if the previous unemployment verification is lost.",
          },
          {
            type: "Correction",
            icon: "correction",
            description:
              "Apply for corrections on the authenticated unemployment record if any details are wrong.",
          },
          {
            type: "Damaged",
            icon: "damaged",
            description:
              "Report a damaged unemployment authentication document and request a new verification.",
          },
        ],
      },
    ],
  },
];
