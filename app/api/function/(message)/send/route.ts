

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../app/generated/prisma";
import { pusherServer } from "../../../../../lib/pusher-server"; //c


const prisma = new PrismaClient();

// to send message and alos recieve with use pusher
export async function POST(req: NextRequest) {
    const body = await req.json();

    const { senderId, receiverId, content } = body;
    const roomId = [senderId, receiverId].sort((a, b) => a - b).join("-");

    const message = await prisma.message.create({
        data: {
            content,
            senderId: Number(senderId),
            receiverId: Number(receiverId),
            roomId
        },
        include: { sender: true },
    });
  
    await pusherServer.trigger(`chat-${roomId}`, "new-message", message);
    console.log(message);
    return NextResponse.json({ success: true, message });
}   
  
   

  