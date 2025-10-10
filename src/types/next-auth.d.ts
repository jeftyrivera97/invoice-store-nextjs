// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add the `id` property
    name: string;
    email: string;
    role?: string | null;
    roleId?: string | null;
  }

  interface Session {
    user: User; // Ensure the session includes the extended `User` type
  }

  interface JWT {
    id: string; // Add the `id` property to the JWT
    role?: string | null;
    roleId?: string | null;
  }
}