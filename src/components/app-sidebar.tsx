"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavLogo } from "@/components/common/nav-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { LayoutBottomIcon, PieChartIcon } from "@hugeicons/core-free-icons";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navLogo: {
    logo: <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} />,
    name: "Ecommerce Admin",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <HugeiconsIcon icon={PieChartIcon} size={18} strokeWidth={2} />,
      isActive: true,
    },
    {
      title: "Products",
      url: "/products",
      icon: <HugeiconsIcon icon={LayoutBottomIcon} size={18} strokeWidth={2} />,
      items: [
        { title: "List Products", url: "/products" },
        { title: "Add Product", url: "/products" },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <HugeiconsIcon icon={LayoutBottomIcon} size={18} strokeWidth={2} />,
      items: [
        { title: "List Categories", url: "/categories" },
        { title: "Add Category", url: "/categories" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo navLogo={data.navLogo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
