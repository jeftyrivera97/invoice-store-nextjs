import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";


export const authLogin = async (credentials: { email: string; password: string }) => {
 
  const { email, password } = credentials;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    id: user.id.toString(), // Convert bigint to string if needed
    name: user.name,
    email: user.email,
  };
};
