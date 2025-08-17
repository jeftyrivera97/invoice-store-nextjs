import { useSession } from "next-auth/react";

export default function GetCurrentUserId() {
  const { data: session } = useSession();

  const id = session?.user?.id;
  

  return session?.user.id;
}
