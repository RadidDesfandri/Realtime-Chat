import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unautorized", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updateConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        user: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    const lastMessages =
      updateConversation.messages[updateConversation.messages.length - 1];

    updateConversation.user.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessages],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
