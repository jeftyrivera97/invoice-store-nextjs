// src/helpers/cajas/sesiones/validateCreateSession.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function validateCreateSesion(formData: FormData) {
  // Obtener sesión del usuario autenticado
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?error=Debe iniciar sesión");
  }

  const cajaId = formData.get("caja") as string;
  const saldoInicial = formData.get("saldo_inicial") as string;

  if (!cajaId) {
    redirect("/cajas/sesiones/new?error=Debe seleccionar una caja");
  }
  
  if (parseFloat(saldoInicial) <= 0) {
    redirect("/cajas/sesiones/new?error=El saldo inicial debe ser mayor que cero");
  }

  // Verificar si ya tiene sesión abierta
  const sesionExistente = await prisma.cajas_sesiones.findFirst({
    where: {
      id_usuario: Number(session.user.id),
      id_estado_sesion: 1, // Sesión abierta
    },
  });

  if (sesionExistente) {
    redirect("/cajas/sesiones/new?error=Este usuario ya tiene una sesion abierta.");
  }

  return {
    session,
    cajaId: Number(cajaId),
    saldoInicial: parseFloat(saldoInicial),
  };
}