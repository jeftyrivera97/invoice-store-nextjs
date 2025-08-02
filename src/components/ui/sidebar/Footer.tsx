import {
  DropdownMenu,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LogOutSideBarItem } from "./LogOutSideBarItem";
import { UserDropdownItem } from "./UserDropdownItem";

export const Footer = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <UserDropdownItem />
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              {/* <DropdownMenuItem>
                <span>Cuenta</span>
              </DropdownMenuItem> */}

              <LogOutSideBarItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
