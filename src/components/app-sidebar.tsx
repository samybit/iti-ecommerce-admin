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
import { LayoutBottomIcon, PieChartIcon, ShoppingBag01Icon, Tag01Icon } from "@hugeicons/core-free-icons";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  navLogo: {
    logo: <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} />,
    name: "E-Commerce Admin",
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
      icon: <HugeiconsIcon icon={ShoppingBag01Icon} size={18} strokeWidth={2} />,
      items: [
        { title: "List Products", url: "/products" },
        { title: "Add Product", url: "/products/add" },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <HugeiconsIcon icon={Tag01Icon} size={18} strokeWidth={2} />,
      items: [
        { title: "List Categories", url: "/categories" },
        { title: "Add Category", url: "/categories/add" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "/avatar.png",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo navLogo={data.navLogo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
