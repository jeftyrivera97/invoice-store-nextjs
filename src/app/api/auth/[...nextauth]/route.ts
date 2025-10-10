import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authLogin } from "@/hooks";
import type { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials) {
          return null; // ← Cambiar throw por return null
        }

        const { email, password } = credentials;
        
        try {
          const user = await authLogin({ email, password });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role ?? undefined,
            roleId: user.roleId ?? undefined,
          } as any;
        } catch (error) {
          console.error("Auth login error:", error);
          return null; // ← Retornar null si falla la autenticación
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).role = (user as any).role;
        (token as any).roleId = (user as any).roleId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token as any).id as string;
        (session.user as any).role = (token as any).role ?? null;
        (session.user as any).roleId = (token as any).roleId ?? null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Crear el handler correctamente
const handler = NextAuth(authOptions);

// ✅ Exportar SOLO los handlers para App Router
export { handler as GET, handler as POST };
