"use client";

import clsx from "clsx";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import Avatar from "@/app/component/Avatar";
import { format } from "date-fns";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessages = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessages) {
      return false;
    }

    const seenArray = lastMessages.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessages, userEmail]);

  const lastMessagesText = useMemo(() => {
    if (lastMessages?.image) {
      return "Sent a image";
    }

    if (lastMessages?.body) {
      return lastMessages.body;
    }

    return "Started a conversation";
  }, [lastMessages]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `relative flex w-full cursor-pointer items-center space-x-3 rounded-lg p-3 transition hover:bg-neutral-100`,
        selected ? "bg-neutral-100" : "bg-white",
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-dark">
              {data.name || otherUser.name}
            </p>
            {lastMessages?.createdAt && (
              <p className="text-xs font-light text-gray-400">
                {format(new Date(lastMessages.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-xs`,
              hasSeen ? "text-gray-500" : "font-medium text-dark",
            )}
          >
            {lastMessagesText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
