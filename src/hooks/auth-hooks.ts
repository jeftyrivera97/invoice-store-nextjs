import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";


export const authLogin = async (credentials: { email: string; password: string }) => {
 
  const { email, password } = credentials;

  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      role_user: {
        include: {
          roles: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  // Derivar un rol principal (si hubiera múltiples, tomamos el primero por simplicidad)
  const primaryRole = user.role_user?.[0]?.roles;

  return {
    id: user.id.toString(), // Convert bigint to string if needed
    name: user.name,
    email: user.email,
    role: primaryRole?.slug ?? null,
    roleId: primaryRole?.id ? primaryRole.id.toString() : null,
  };
};
