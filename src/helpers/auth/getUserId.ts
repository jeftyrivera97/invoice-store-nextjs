import { useSession } from "next-auth/react";

export default function GetCurrentUserId() {
  const { data: session } = useSession();

  return session?.user.id;
}
