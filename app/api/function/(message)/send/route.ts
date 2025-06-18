

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../app/generated/prisma";
import { pusherServer } from "../../../../../lib/pusher-server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { senderId, receiverId, content } = body;

    const message = await prisma.message.create({
        data: {
            content,
            senderId: Number(senderId),
            receiverId: Number(receiverId)
        },
        include: { sender: true },
    });


    const channelName = `chat-${[senderId, receiverId].sort().join("-")}`;

    await pusherServer.trigger(channelName, "new-message", message);
    console.log(message);
    return NextResponse.json({ success: true, message });
}



  