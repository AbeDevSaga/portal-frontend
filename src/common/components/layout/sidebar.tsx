"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/common/hooks/useAuth";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { sidebarRoutes } from "@/common/utils/constants/sidebarRoutes";
import { IconRenderer } from "@/common/utils/constants/iconRenderer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getIconColor } from "@/common/utils/constants/iconColors";

interface SidebarChildRoute {
  icon: string;
  label: string;
  route: string;
  children?: SidebarChildRoute[];
}

interface SidebarSection {
  title: string;
  childRoutes: SidebarChildRoute[];
}

const Sidebar = () => {
  const { user } = useAuth();
  const t = useTranslations();
  const currentPath = usePathname();
  const [expandedRoutes, setExpandedRoutes] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  const username = user?.username || user?.firstName || "User";

  // Initialize default expanded routes on first load
  useEffect(() => {
    if (!isInitialized && sidebarRoutes.length > 0) {
      const defaultSection = sidebarRoutes.find(
        (section) => section.title === "Dashboard"
      );
      if (defaultSection && defaultSection.childRoutes.length > 0) {
        const firstRoute = defaultSection.childRoutes[0];
        setExpandedRoutes(new Set([firstRoute.label]));
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const isRouteActive = (route: string) => {
    const currentPathLower = currentPath.toLowerCase();
    const routeLower = route.toLowerCase();

    if (currentPathLower === routeLower) return true;
    if (currentPathLower.startsWith(routeLower + "/")) return true;

    return false;
  };

  const isSectionActive = (childRoutes: SidebarChildRoute[]) => {
    return childRoutes.some((child) => isRouteActive(child.route));
  };

  // Toggle section expansion
  const toggleRoute = (routeLabel: string) => {
    const newExpanded = new Set(expandedRoutes);
    if (newExpanded.has(routeLabel)) {
      newExpanded.delete(routeLabel);
    } else {
      newExpanded.add(routeLabel);
    }
    setExpandedRoutes(newExpanded);
  };

  const shouldExpandRoute = (route: SidebarChildRoute) => {
    return (
      isRouteActive(route.route) ||
      route.children?.some((child) => isRouteActive(child.route))
    );
  };

  return (
    <Card className="py-8 px-5 space-y-8 w-fit h-fit hidden 2xl:block">
      <div className="text-[#073954] space-y-5">
        {sidebarRoutes.map((section: SidebarSection) => (
          <div key={section.title} className="space-y-1">
            <p className="mb-4 text-[#073954]/30 font-semibold">
              {section.title}
            </p>
            {section.childRoutes.map((child: SidebarChildRoute) => {
              const isActive = isRouteActive(child.route);
              const hasChildren = child.children && child.children.length > 0;
              const isChildActive =
                hasChildren &&
                child.children!.some((subChild) =>
                  isRouteActive(subChild.route)
                );

              const isManuallyExpanded = expandedRoutes.has(child.label);
              const hasActiveRoute = shouldExpandRoute(child);
              const isDefaultRoute =
                section.title === "Dashboard" && !isInitialized;

              const isExpanded =
                isManuallyExpanded || hasActiveRoute || isDefaultRoute;

              return (
                <div key={child.label} className="space-y-1">
                  {/* Main route button */}
                  <Button
                    asChild
                    className={`duration-200 ease-in-out flex items-center gap-3 justify-start border-none text-lg font-semibold shadow-none w-full ${
                      isActive || isChildActive
                        ? "bg-[#073954] text-white"
                        : "text-[#073954] hover:text-[#073954] hover:bg-[#073954]/10 bg-transparent"
                    }`}
                  >
                    <Link href={child.route}>
                      <IconRenderer
                        icon={child.icon}
                        alt={child.label}
                        className={
                          isActive || isChildActive ? "text-white" : ""
                        }
                        color={
                          isActive || isChildActive
                            ? getIconColor("active")
                            : getIconColor("default")
                        }
                      />
                      <span className="flex-1 text-left">{child.label}</span>
                      {hasChildren && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleRoute(child.label);
                          }}
                          className="ml-auto p-1 hover:bg-white/20 rounded"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </Link>
                  </Button>

                  {/* Nested children */}
                  {hasChildren && isExpanded && (
                    <div className="ml-6 space-y-1">
                      {child.children!.map((subChild) => {
                        const isSubActive = isRouteActive(subChild.route);
                        return (
                          <Button
                            asChild
                            key={subChild.label}
                            className={`duration-200 ease-in-out flex items-center gap-3 justify-start border-none shadow-none font-bold w-full text-lg ${
                              isSubActive
                                ? "bg-[#073954]/80 text-white"
                                : "text-[#073954]/70 hover:text-[#073954] hover:bg-[#073954]/10 bg-transparent"
                            }`}
                          >
                            <Link href={subChild.route}>
                              <IconRenderer
                                icon={subChild.icon}
                                alt={subChild.label}
                                className={isSubActive ? "text-white" : ""}
                                color={
                                  isSubActive
                                    ? getIconColor("active")
                                    : getIconColor("default")
                                }
                              />
                              {subChild.label}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Sidebar;
