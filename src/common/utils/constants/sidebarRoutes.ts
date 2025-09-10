export const sidebarRoutes = [
  {
    title: "Dashboard",
    childRoutes: [{ icon: "birth", label: "Dashboard", route: "/application" }],
  },
  {
    title: "Civil Registration",
    childRoutes: [
      {
        icon: "birth",
        label: "Birth",
        route: "/civil-registration/birth",
      },
      {
        icon: "death",
        label: "Death",
        route: "/civil-registration/death",
      },
      {
        icon: "marriage",
        label: "Marriage",
        route: "/civil-registration/marriage",
      },
      {
        icon: "divorce",
        label: "Divorce",
        route: "/civil-registration/divorce",
      },
      {
        icon: "adoption",
        label: "Adoption",
        route: "/civil-registration/adoption",
      },
      {
        icon: "legitmation",
        label: "Legitimation Of Father",
        route: "/civil-registration/legitimation",
      },
      {
        icon: "recognition",
        label: "Recognition Of Child",
        route: "/civil-registration/recognition",
      },
    ],
  },
  {
    title: "Resident Service",
    childRoutes: [
      {
        icon: "family",
        label: "Family Registration",
        route: "/resident_service/family_registration",
      },
      {
        icon: "id",
        label: "Residence Id",
        route: "/resident_service/residence_id",
      },
      {
        icon: "id",
        label: "Transfer",
        route: "/resident_service/transfer",
      },
      {
        icon: "id",
        label: "Authentication",
        route: "/resident_service/authentication",
      },
    ],
  },
  {
    title: "Complaint",
    childRoutes: [
      {
        icon: "MessageCircleWarning",
        label: "Complaint",
        route: "/complaint/complaint",
      },
    ],
  },
];
