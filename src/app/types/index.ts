import { User, Message, Conversation } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  user: User[];
  messages: FullMessageType[];
};
