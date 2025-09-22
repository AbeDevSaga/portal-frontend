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
  route?: string;
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
      const expandedSet = new Set<string>();
      
      // Find all routes that should be expanded based on current path
      sidebarRoutes.forEach((section) => {
        section.childRoutes.forEach((child) => {
          if (shouldExpandRoute(child)) {
            expandedSet.add(child.label);
          }
        });
      });
      
      // If no routes are active, expand the first dashboard route
      if (expandedSet.size === 0) {
        const defaultSection = sidebarRoutes.find(
          (section) => section.title === "Dashboard"
        );
        if (defaultSection && defaultSection.childRoutes.length > 0) {
          const firstRoute = defaultSection.childRoutes[0];
          expandedSet.add(firstRoute.label);
        }
      }
      
      setExpandedRoutes(expandedSet);
      setIsInitialized(true);
    }
  }, [isInitialized, currentPath]);

  const isRouteActive = (route?: string) => {
    if (!route) return false;
    
    const currentPathLower = currentPath.toLowerCase();
    const routeLower = route.toLowerCase();

    // Exact match
    if (currentPathLower === routeLower) return true;
    
    // Check if current path starts with the route (for nested routes)
    if (currentPathLower.startsWith(routeLower + "/")) return true;
    
    // Special handling for routes that might have additional path segments
    // e.g., /civil-registration/birth/correction should match /civil-registration/birth/correction/form
    if (routeLower !== "/" && currentPathLower.startsWith(routeLower)) {
      const nextChar = currentPathLower[routeLower.length];
      if (!nextChar || nextChar === "/") return true;
    }

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
    // Check if the route itself is active
    if (isRouteActive(route.route)) return true;
    
    // Check if any of its children are active
    if (route.children?.some((child) => isRouteActive(child.route))) return true;
    
    // Check if any nested children are active (for deeper nesting)
    if (route.children?.some((child) => 
      child.children?.some((grandChild) => isRouteActive(grandChild.route))
    )) return true;
    
    return false;
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
              
              // Determine if this route or any of its children are active
              const isRouteOrChildActive = isActive || isChildActive;

              return (
                <div key={child.label} className="space-y-1">
                  {/* Main route button */}
                  <Button
                    asChild={!!child.route}
                    className={`duration-200 ease-in-out flex items-center gap-3 justify-start border-none text-lg font-semibold shadow-none w-full ${
                      isRouteOrChildActive
                        ? "bg-[#073954] text-white"
                        : "text-[#073954] hover:text-[#073954] hover:bg-[#073954]/10 bg-transparent"
                    }`}
                    onClick={!child.route ? () => toggleRoute(child.label) : undefined}
                  >
                    {child.route ? (
                      <Link href={child.route}>
                      <IconRenderer
                        icon={child.icon}
                        alt={child.label}
                        className={
                          isRouteOrChildActive ? "text-white" : ""
                        }
                        color={
                          isRouteOrChildActive
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
                    ) : (
                      <>
                        <IconRenderer
                          icon={child.icon}
                          alt={child.label}
                          className={
                            isRouteOrChildActive ? "text-white" : ""
                          }
                          color={
                            isRouteOrChildActive
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
                      </>
                    )}
                  </Button>

                  {/* Nested children */}
                  {hasChildren && isExpanded && (
                    <div className="ml-10 gap-y-1 flex flex-col border-l-2 border-l-[#073954]/80 pl-2">
                      {child.children!.map((subChild) => {
                        const isSubActive = isRouteActive(subChild.route);
                        return (
                          <Button
                            asChild
                            key={subChild.label}
                            className={`py-1 bg-transparent hover:text-[#073954]  hover:bg-[#073954]/10 rounded-sm  duration-200 ease-in-out flex items-center  justify-start   shadow-none   w-full text-lg ${
                              isSubActive
                                ? "text-[#073954] font-semibold"
                                : "text-[#073954]/70 "
                            }`}
                          >
                            <Link href={subChild.route || "#"}>
                              
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
