import prisma from "@/lib/prisma";

// ✅ Este SÍ es un helper (solo servidor)
export async function checkCajaSesionByUserId(userId: string | number) {
  if (!userId) return null;

  try {
    const sesion = await prisma.cajas_sesiones.findFirst({
      where: {
        id_usuario: BigInt(userId),
        id_estado_sesion: BigInt(1),
      },
    });

    return sesion;
  } catch (error) {
    console.error('Error checking sesion:', error);
    return null;
  }
}
