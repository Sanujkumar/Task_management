

import { PrismaClient } from "../../../../../../../app/generated/prisma"; 
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context : { params: { userId: string; receiverId: string } }
) {
  try {  
    const { userId, receiverId } = await context.params;

    const senderId = parseInt(userId);
  const recId = parseInt(receiverId);
  const roomId = [Number(userId), Number(receiverId)].sort((a, b) => a - b).join("-");

    if (isNaN(senderId) || isNaN(recId)) {
      return NextResponse.json(
        { error: "Invalid userId or receiverId" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
            where: { roomId },
           orderBy: { createdAt: "asc" },
    });

    console.log(messages);  

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
        