import { Roles } from "../enums/enum";

export const USER_MENU_ITEMS = [
    { name: "Your Profile", path: "#", action: "" },
    { name: "Change Password", path: "#", action: "" },
    { name: "Sign out", path: "#", action: "signOut" },
];

export const ALL_MENU_ITEMS = [
    {
        name: "Dashboard",
        key: "/officers/dashboard",
        path: "/officers/dashboard",
        children: [],
        // roles: [Roles.SUPERADMIN, Roles.ADMIN]
    }
];
