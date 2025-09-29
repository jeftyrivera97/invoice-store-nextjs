'use client';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onChecking, onLogin, onErrorLogin } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";

export const useAuthRedirect = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Inicia el estado de verificación
        dispatch(onChecking());

        // Realiza la solicitud para obtener la sesión
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session?.user) {
          // Si hay un usuario en la sesión, realiza el dispatch del login
          dispatch(onLogin(session.user));
        } else {
          // Si no hay usuario, redirige al login
          router.push("/login");
        }
      } catch (error) {

        dispatch(onErrorLogin("Error verificando sesión"));
        console.error("Error verificando sesión:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, dispatch]);
};