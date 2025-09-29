// components/auth/AuthStatus.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onLogin, onLogout } from "@/store/auth/authSlice";
import { useSession } from "next-auth/react";

export default function AuthStatus() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      const user = {
        ...session.user,
        id: Number(session.user.id), // Asegúrate que sea número si lo necesitas como tal
      };
      dispatch(onLogin(user));
    } else {
      dispatch(onLogout());
    }
  }, [session, status, dispatch]);

  return null;
}


