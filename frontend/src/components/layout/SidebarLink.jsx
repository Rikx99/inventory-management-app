// src/components/layout/SidebarLink.jsx

import { NavLink, useLocation } from "react-router-dom";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function SidebarLink({ to, icon: Icon, label }) {
  const location = useLocation();
  const isHome = to === '/dashboard';
  const isActive = isHome
    ? location.pathname === '/dashboard'
    : location.pathname.startsWith(to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={`
          my-1 px-3 py-2 rounded-2xl flex items-center gap-2
          transition-colors duration-200 ease-out
          ${isActive 
            ? "bg-blue-500 text-white dark:bg-blue-700" 
            : "hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-sm hover:scale-[1.02]"
          }
        `}
      >
        <NavLink to={to} end={isHome} className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="text-sm font-medium">{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
