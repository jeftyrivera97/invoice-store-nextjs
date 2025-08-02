"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { onLogout } from "@/store/auth/authSlice";

export const LogOutSideBarItem = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(onLogout()); // limpia Redux
    signOut({ callbackUrl: "/auth" }); // cierra sesión en NextAuth
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <span>Cerrar sesión</span>
    </DropdownMenuItem>
  );
};
