import birth from "@/public/images/sidebar/birth.svg";
import death from "@/public/images/sidebar/death.svg";
import marriage from "@/public/images/sidebar/marriage.svg";
import divorce from "@/public/images/sidebar/divorce.svg";
import adoption from "@/public/images/sidebar/adoption.svg";
import legitmation from "@/public/images/sidebar/legitimationoffather.svg";
import recognition from "@/public/images/sidebar/recognitionofchild.svg";
import id from "@/public/images/sidebar/id.svg";
import family from "@/public/images/sidebar/family.svg";
import { MessageCircleWarning } from "lucide-react";

export interface SidebarChildRoute {
  icon: string | React.ReactNode;
  label: string;
  route: string;
}

export interface SidebarSection {
  title: string;
  childRoutes: SidebarChildRoute[];
}

export const sidebarConfig: SidebarSection[] = [
  {
    title: "civil-registration",
    childRoutes: [
      {
        icon: birth.src,
        label: "Vital Registration",
        route: "/application",
      },
      {
        icon: death.src,
        label: "death",
        route: "/application/death",
      },
      {
        icon: marriage.src,
        label: "marriage",
        route: "/application/marriage",
      },
      {
        icon: divorce.src,
        label: "divorce",
        route: "/application/divorce",
      },
      {
        icon: adoption.src,
        label: "adoption",
        route: "/application/adoption",
      },
      {
        icon: legitmation.src,
        label: "legitimation",
        route: "/application/legitimation",
      },
      {
        icon: recognition.src,
        label: "recognitionofchild",
        route: "/application/recognition",
      },
    ],
  },
  {
    title: "resident-service",
    childRoutes: [
      {
        icon: family.src,
        label: "family-registration",
        route: "/application/familyregistration",
      },
      {
        icon: id.src,
        label: "residence-id",
        route: "/application/residenceid",
      },
      {
        icon: id.src,
        label: "transfer",
        route: "/application/transfer",
      },
      {
        icon: id.src,
        label: "authentication",
        route: "/application/authentication",
      },
    ],
  },
  {
    title: "complaint",
    childRoutes: [
      {
        icon: "MessageCircleWarning",
        label: "complaint",
        route: "/application/complaint",
      },
    ],
  },
];
