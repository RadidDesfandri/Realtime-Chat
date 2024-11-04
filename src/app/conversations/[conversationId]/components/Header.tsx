"use client";

import Avatar from "@/app/component/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    user: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.user.length} members`;
    }

    return "Active";
  }, []);

  return (
    <div className="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href={"/conversations"}
          className="block cursor-pointer text-main transition hover:text-mainDark lg:hidden"
        >
          <HiChevronLeft size={30} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div className="font-medium">
            {conversation.name || otherUser.name}
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>

      <HiEllipsisHorizontal
        size={30}
        onClick={() => {}}
        className="cursor-pointer text-main transition hover:text-main"
      />
    </div>
  );
};

export default Header;
