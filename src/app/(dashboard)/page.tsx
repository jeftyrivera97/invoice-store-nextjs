import prisma from "../../../lib/prisma";

export default async function DashboardPage() {

   const users = await prisma.users.findMany();
   console.log(users)
  return (
    <>
      <h1>Dashboard Page</h1>
    </>
  );
}
