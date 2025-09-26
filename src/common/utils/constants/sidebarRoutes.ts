export const sidebarRoutes = [
  {
    title: "Dashboard",
    childRoutes: [{ icon: "birth", label: "Dashboard", route: "/dashboard" },
      { icon: "birth", label: "Application List", route: "/application"},
    ],
  },
  {
    title: "Civil Registration",
    childRoutes: [
      {
        icon: "birth",
        label: "Birth",
        children: [
          {
            icon: "birth",
            label: "New",
            route: "/civil-registration/birth/new",
          },
          {
            icon: "birth",
            label: "Lost",
            route: "/civil-registration/birth/lost",
          },
          {
            icon: "birth",
            label: "Damaged",
            route: "/civil-registration/birth/damaged",
          },
          {
            icon: "birth",
            label: "Correction",
            route: "/civil-registration/birth/correction",
          },
          {
            icon: "birth",
            label: "Print",
            route: "/civil-registration/birth/print",
          },
        ],
        
      },
      {
        icon: "death",
        label: "Death",
        children: [
          {
            icon: "death",
            label: "New",
            route: "/civil-registration/death/new",
          },
          {
            icon: "death",
            label: "Lost",
            route: "/civil-registration/death/lost",
          },
          {
            icon: "death",
            label: "Damaged",
            route: "/civil-registration/death/damaged",
          },
          {
            icon: "death",
            label: "Correction",
            route: "/civil-registration/death/correction",
          },
          {
            icon: "death",
            label: "Print",
            route: "/civil-registration/death/print",
          },
        ],
      },
      {
        icon: "marriage",
        label: "Marriage",
        children: [
          {
            icon: "marriage",
            label: "New",
            route: "/civil-registration/marriage/new",
          },
          {
            icon: "marriage",
            label: "Damaged",
            route: "/civil-registration/marriage/damaged",
          },
          {
            icon: "marriage",
            label: "Correction",
            route: "/civil-registration/marriage/correction",
          },
          {
            icon: "marriage",
            label: "Print",
            route: "/civil-registration/marriage/print",
          },
        ],
      },
      {
        icon: "divorce",
        label: "Divorce",
        children: [
          {
            icon: "divorce",
            label: "New",
            route: "/civil-registration/divorce/new",
          },
          {
            icon: "divorce",
            label: "Lost",
            route: "/civil-registration/divorce/lost",
          },
          
          {
            icon: "divorce",
            label: "Damaged",
            route: "/civil-registration/divorce/damaged",
          },
          
          {
            icon: "divorce",
            label: "Correction",
            route: "/civil-registration/divorce/correction",
          },
          
          {
            icon: "divorce",
            label: "Print",
            route: "/civil-registration/divorce/print",
          },
        ],
      },
      {
        icon: "adoption",
        label: "Adoption",
        children: [
          {
            icon: "adoption",
            label: "New",
            route: "/civil-registration/adoption/new",
          },
          {
            icon: "adoption",
            label: "Lost",
            route: "/civil-registration/adoption/lost",
          },
          
          {
            icon: "adoption",
            label: "Damaged",
            route: "/civil-registration/adoption/damaged",
          },
          
          {
            icon: "adoption",
            label: "Correction",
            route: "/civil-registration/adoption/correction",
          },
          
          {
            icon: "adoption",
            label: "Print",
            route: "/civil-registration/adoption/print",
          },
          
        ],
      },
      {
        icon: "legitmation",
        label: "Legitimation Of Father",
        children: [
          {
            icon: "legitmation",
            label: "New",
            route: "/civil-registration/legitimation/new",
          },
          {
            icon: "legitmation",
            label: "Lost",
            route: "/civil-registration/legitimation/lost",
          },
          {
            icon: "legitmation",
            label: "Damaged",
            route: "/civil-registration/legitimation/damaged",
          },
          {
            icon: "legitmation",
            label: "Correction",
            route: "/civil-registration/legitimation/correction",
          },
          {
            icon: "legitmation",
            label: "Print",
            route: "/civil-registration/legitimation/print",
          },
        ],
      },
      {
        icon: "recognition",
        label: "Recognition Of Child",
        children: [
          {
            icon: "recognition",
            label: "New",
            route: "/civil-registration/recognition/new",

          },
          {
            icon: "recognition",
            label: "Lost",
            route: "/civil-registration/recognition/lost",
          },
          {
            icon: "recognition",
            label: "Damaged",
            route: "/civil-registration/recognition/damaged",
          },
          {
            icon: "recognition",
            label: "Correction",
            route: "/civil-registration/recognition/correction",
          },
          {
            icon: "recognition",
            label: "Print",
            route: "/civil-registration/recognition/print",
          },
        ],
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
    title: "Family Members",
    childRoutes: [
      {
        icon: "family",
        label: "Family Members",
        route: "/family-members",
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
