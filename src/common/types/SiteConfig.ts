import { ReactNode } from "react";

export type SiteConfig = {
  name: string;
  author: string;
  description: string;
};

export type ChildrenProps = {
  children: ReactNode;
};
