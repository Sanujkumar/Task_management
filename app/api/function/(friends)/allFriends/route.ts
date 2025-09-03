import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;

// find your all accepted friends data
export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({
            message: "user not login"
        }, { status: 400 });
    }

    const userId = token.id;
    console.log(userId);
    try {
        // find your accepted friends
        const data = await prisma.acceptFriend.findMany({
            where: {
                userId
            },
            include: {
                friend: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        const length = data.length;
        console.log("lenght", length);
        // send response , how mandy friend you have 
        return NextResponse.json({
            data,
            length
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "internal server error"
        }, { status: 500 });
    }

}

// make unfriend
export async function DELETE(req: NextRequest) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json({
            message: "user not login"
        }, { status: 400 });
    }

    const body = await req.json();

    const currentUserId = token.id;
    const { friendId } = body;

    console.log("friendId", friendId);
    console.log("cureentUserId",currentUserId)
   

    try {
          
        const data = await prisma.acceptFriend.deleteMany({
            where: {
                OR: [
                    { userId: currentUserId, friendId: Number(friendId) },
                    { userId: Number(friendId), friendId: currentUserId },
                ],
            },
        });

        await prisma.notification.create({
            data: {
                message: "deleted you from the friend",
                senderId: Number(currentUserId),
                userId: friendId,
                read: false
            }
        });
        console.log("delterfriend", data);
        return NextResponse.json({ message: "make a unfriend" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error cancelling friend request" }, { status: 500 });
    }
}   