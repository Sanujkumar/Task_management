

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";
import { number } from "zod";
const prisma = new PrismaClient();

const secret = process.env.AUTH_SECRET;

// find history of message of all rooms
export async function GET(
  req: NextRequest,
  context: { params: { userId: string; receiverId: string } }
) {

  const token = await getToken({ req, secret })
  if (!token || !token.id) {
    return NextResponse.json({
      message: "user not login"
    }, { status: 400 });
  }

  console.log("curr", token.id);
  try {
    const { userId, receiverId } = await context.params;
    console.log("userId", userId, "receiverId",receiverId);
    if (Number(token.id) !== Number(userId) && Number(token.id) !== Number(receiverId)) {
      return NextResponse.json(
        { message: "user not authorized" },
        { status: 403 }
      );
    }  
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
