import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId: string;
}

export async function POST(
  req: Request,
  context: { params: Promise<IParams> },
) {
  const { conversationId } = await context.params;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        user: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessages = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessages],
    });

    if (lastMessage.seenIds.includes(currentUser.id)) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId,
      "messages:update",
      updatedMessages,
    );

    return NextResponse.json(updatedMessages);
  } catch (error) {
    console.error(error, "ERROR_SEEN");
    return new NextResponse("Internal error", { status: 500 });
  }
}
