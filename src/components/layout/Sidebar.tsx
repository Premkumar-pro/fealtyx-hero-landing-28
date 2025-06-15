
import React from "react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { ListCheck, List, Timer } from "lucide-react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menu = [
  { label: "Tasks", to: "/dashboard/tasks", icon: ListCheck },
  { label: "Create Task", to: "/dashboard/create", icon: List },
  { label: "Time Tracker", to: "/dashboard/timer", icon: Timer },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { isMobile, open, setOpen } = useSidebar();

  // Animate: slide in if open, slide out if closed - handle overlay for mobile.
  const sidebarClass = [
    "fixed md:static top-0 left-0 z-50 h-full bg-sidebar text-sidebar-foreground transition-transform duration-300",
    open ? "translate-x-0" : "-translate-x-full",
    "w-64",
    "md:relative md:w-64 md:translate-x-0 md:block",
    isMobile && !open ? "hidden" : "",
    isMobile ? "shadow-lg" : "border-r",
  ].join(" ");

  // Overlay for mobile when sidebar is open
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar itself */}
      <nav className={sidebarClass} aria-label="Sidebar">
        <div className="flex flex-col h-full">
          {/* Close button only on mobile or when open */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
            <span className="font-semibold text-lg">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="md:hidden"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarGroup>
              {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {menu.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname.startsWith(item.to)}
                      >
                        <Link to={item.to}>
                          <item.icon className="mr-2" />
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </nav>
    </>
  );
}
