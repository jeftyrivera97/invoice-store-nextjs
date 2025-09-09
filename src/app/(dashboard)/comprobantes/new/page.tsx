import { NewComprobanteComponent } from "@/components/comprobantes/NewComprobanteComponent";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ← Importar authOptions
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RestriccionComponent } from "@/components";

export default async function NewComprobantePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/auth/signin");
  }

  const userId = BigInt(session.user.id);

  const sesion = await prisma.cajas_sesiones.findFirst({
    where: {
      id_usuario: userId,
      id_estado_sesion: BigInt(1),
    },
  });

  if (!sesion) {
    return (
      <RestriccionComponent
        title="No hay Sesion de Caja activa para este usuario"
        description="Dirigase a Sesiones para administrar un nueva sesion."
        instruction="Debe activar o crear un nueva sesion."
      />
    );
  }


  return <NewComprobanteComponent />;
}
