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
          };
        } catch (error) {
          console.error("Auth login error:", error);
          return null; // ← Retornar null si falla la autenticación
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
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
