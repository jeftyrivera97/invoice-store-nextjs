import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add the `id` property
    name: string;
    email: string;
  }

  interface Session {
    user: User; // Ensure the session includes the extended `User` type
  }

  interface JWT {
    id: string; // Add the `id` property to the JWT
  }
}