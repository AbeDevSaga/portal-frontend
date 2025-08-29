import birth from "@/public/images/birth.svg";
import death from "@/public/images/death.svg";
import marriage from "@/public/images/marriage.svg";
import divorce from "@/public/images/divorce.svg";
import recognition from "@/public/images/recognition.svg";
import adoption from "@/public/images/adoption.svg";
import legitimation from "@/public/images/legitimation.svg";

export const newVitalRequestOptions = [
    {
        icon: birth.src,
        title: "Birth",
        description:
            "The Birth Certificate service allows parents or guardians to officially register the birth of a child and obtain a legal certificate issued by the CRRSA. The certificate serves as an official proof of identity, age, nationality, and family relationship of the child. ",
        link: "/application/birth/new",
    },
    {
        icon: death.src,
        title: "Death",
        description:
            "The Death Certificate service provides official registration of a person’s death and issuance of a legal certificate by the CRRSA. This certificate serves as formal proof of death and is required for inheritance, pension claims, and other legal or administrative procedures.",
        link: "/application/death/new",
    },
    {
        icon: marriage.src,
        title: "Marriage",
        description:
            "The Marriage Certificate service registers and legally recognizes the union between spouses, providing an official certificate issued by CRRSA. This certificate serves as legal proof of marriage and is often required for family-related rights, and other civil or administrative processes.",
        link: "/application/marriage/new",
    },
    {
        icon: divorce.src,
        title: "Divorce",
        description:
            "The Divorce Certificate service officially records the legal dissolution of a marriage and provides an official certificate issued by CRRSA. This certificate serves as formal proof of divorce and is required for updating civil status, property division, and other legal or administrative matters.",
        link: "/application/birth/new",
    },
    {
        icon: adoption.src,
        title: "Adoption",
        description:
            "The Adoption Certificate service registers and legally recognizes the adoption of a child, providing an official certificate issued by the CRRSA. This certificate serves as proof of the legal parent–child relationship between the adoptive parents and the child.",
        link: "/application/birth/new",
    },
    {
        icon: legitimation.src,
        title: "Legitimation of Fatherhood",
        description:
            "The Legitimation of Fatherhood service officially recognizes and records the legal relationship between a father and child through the CRRSA. This certificate serves as proof of paternity and secures the child’s legal rights, including inheritance, family name, and other benefits.",
        link: "/application/birth/new",
    },
    {
        icon: recognition.src,
        title: "Recognition of child",
        description:
            "The Legitimation of Fatherhood service officially recognizes and records the legal relationship between a father and child through the CRRSA. This certificate serves as proof of paternity and secures the child’s legal rights, including inheritance, family name, and other benefits.",
        link: "/application/birth/new",
    },
];
