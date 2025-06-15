
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ListCheck, List, Timer } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Tasks", to: "/dashboard/tasks", icon: ListCheck },
  { label: "Create Task", to: "/dashboard/create", icon: List },
  { label: "Time Tracker", to: "/dashboard/timer", icon: Timer },
];

export function DashboardSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.to)}>
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
    </Sidebar>
  );
}
