"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;
          const isChildActive = !!item.items?.some(
            (sub) => pathname === sub.url,
          );
          const isActive = pathname === item.url || isChildActive;
          const isOpen = openItems[item.title] ?? isActive;

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={(open) => {
                setOpenItems((prev) => ({ ...prev, [item.title]: open }));
              }}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  />
                }
              >
                {!hasSubItems ? (
                  <Link
                    href={item.url}
                    className="flex flex-1 items-center gap-2"
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    {item.icon}
                    <span>{item.title}</span>
                  </>
                )}
                {hasSubItems && (
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2}
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                )}
              </CollapsibleTrigger>

              {hasSubItems && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          isActive={pathname === subItem.url}
                          render={<Link href={subItem.url} />}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
