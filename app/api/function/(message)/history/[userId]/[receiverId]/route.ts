
import { connect } from "http2";
import { PrismaClient } from "../../../../../../../app/generated/prisma"; 
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context : { params: { userId: string; receiverId: string } }
) {
  try {
    const senderId = Number(context.params.userId);       
    const receiverId = Number(context.params.receiverId);

    if (isNaN(senderId) || isNaN(receiverId)) {
      return NextResponse.json(
        { error: "Invalid userId or receiverId" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: {
        sender: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    console.log(messages);  

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
        