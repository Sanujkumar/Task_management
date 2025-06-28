import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";


const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;


export async function POST(req: NextRequest, context: { params: Promise <{ receiverId: string }> }) {
  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  const senderId = Number(token.id);
  console.log("senderId",senderId);
  const {receiverId} = await context.params;
  console.log("receiverId",receiverId);   

  try {
    await prisma.friendReq.create({
      data: {
        senderId,
        receiverId: Number(receiverId),
      },
    });
    return NextResponse.json({ message: "Friend request sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending friend request" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, context: { params: Promise <{ receiverId: string }> }) {
  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  const senderId = Number(token.id);
  console.log("senderId",senderId);  
  const {receiverId} = await context.params;  
  console.log('receiverId',receiverId);    

  try {
    await prisma.friendReq.deleteMany({
      where: {
        senderId,
        receiverId: Number(receiverId),
      },  
    });
    return NextResponse.json({ message: "Friend request cancelled" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error cancelling friend request" }, { status: 500 });
  }  
}
