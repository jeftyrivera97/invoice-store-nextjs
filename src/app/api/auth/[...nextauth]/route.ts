import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authLogin } from "@/hooks";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        console.log(" Entre al autorize");
        if (!credentials) {
          throw new Error("Sin Credenciales");
        }

        const { email, password } = credentials;
        const user = await authLogin({ email, password });
        console.log(" Intentando login con:", email, password);

        return {
          id: user.id.toString(), // 👈 asegúrate que sea string
          name: user.name,
          email: user.email,
        };
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
        token.id = user.id; // Add `id` to the token
      }
      console.log("Token generado en jwt callback:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Add `id` to the session's user
      }
      console.log("Sesión generada en session callback:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
