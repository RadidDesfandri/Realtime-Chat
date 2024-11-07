import { useSession } from "next-auth/react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useMemo } from "react";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        user: User[];
      },
) => {
  const session = useSession();

  const otherUsers = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.user.filter(
      (user) => user.email !== currentUserEmail,
    );

    return otherUser[0];
  }, [session.data?.user?.email, conversation.user]);

  return otherUsers
};

export default useOtherUser;
