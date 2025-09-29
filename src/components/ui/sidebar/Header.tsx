import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { IconInnerShadowTop } from "@tabler/icons-react";

export const Header = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <a href="/">
              <IconInnerShadowTop className="!size-5" />
              <span className="text-base font-semibold">Souvenir Facturacion</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
