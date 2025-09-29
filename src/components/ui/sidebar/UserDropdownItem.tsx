'use client'
import { ChevronUp, User2 } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

import { SidebarMenuButton } from "@/components/ui/sidebar";

export const UserDropdownItem = () => {
  const username = useSelector((state: RootState) => state.auth.user?.name);

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton>
        <User2 /> {username}
        <ChevronUp className="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
};
