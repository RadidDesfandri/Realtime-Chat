"use client";

import Avatar from "@/app/component/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

interface ProfileDrawerProps {
  data: Conversation & {
    user: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);

  const joinedUser = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const tittle = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.user.length} members`;
    }

    return "Active";
  }, [data]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveTo="translate-x-full"
              >
                {/* Items profile here start*/}
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <IoClose size={24} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="flex flex-col items-center">
                        <div className="mb-2">
                          <Avatar user={otherUser} />
                        </div>
                        <div className="font-medium">{tittle}</div>
                        {!data.isGroup && (
                          <div className="text-xs font-medium text-gray-700">
                            {otherUser.email}
                          </div>
                        )}
                        <div className="text-sm font-light text-gray-500">
                          {statusText}
                        </div>
                        <div className="my-8 flex gap-10">
                          <div
                            onClick={() => {}}
                            className="flex cursor-pointer hover:opacity-75"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                              <IoTrash />
                            </div>
                          </div>
                        </div>

                        <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                          <div className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {!data.isGroup && (
                              <>
                                <hr />
                                <div>
                                  <h2 className="text-sm font-medium text-gray-400 sm:w-40 sm:flex-shrink-0">
                                    Joined
                                  </h2>
                                  <div className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    <time dateTime={joinedUser}>
                                      {joinedUser}
                                    </time>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
                {/* Items profile here end*/}
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProfileDrawer;
