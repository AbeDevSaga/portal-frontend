export interface SidebarChildRoute {
  icon: string;
  label: string;
  route: string;
  children?: SidebarChildRoute[]; // Optional nested routes
}

export interface SidebarSection {
  title: string;
  childRoutes: SidebarChildRoute[];
}

export interface SidebarConfig {
  defaultSection: string;
  sections: SidebarSection[];
}
