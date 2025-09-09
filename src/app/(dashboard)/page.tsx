export default async function DashboardPage() {
  //  const users = await prisma.users.findMany();
  //  console.log(users)
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-2">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <div className="bg-muted/50 h-32 rounded-xl flex items-center justify-center">
          <p className="text-sm font-medium">
          Home Page
          </p>
        </div>
      </div>
    </div>
  );
}
