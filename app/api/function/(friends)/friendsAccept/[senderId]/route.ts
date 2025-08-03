import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

// freinds accepted end point 
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ senderId: string }> }
) {
  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const receiverId = Number(token.id);
  const {senderId} = await context.params;

  try {
    // people delete from in your requested db
   const res =  await prisma.friendReq.deleteMany({
      where: {
        senderId: Number(senderId),
        receiverId,
      },
    });
    console.log('res',res);  

    // people added in your acceptedFriend db
    await prisma.acceptFriend.createMany({
      data: [
        { userId: receiverId, friendId: Number(senderId) },
        { userId: Number(senderId), friendId: receiverId },
      ],
    });     

    return NextResponse.json({ message: "Friend request accepted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
  