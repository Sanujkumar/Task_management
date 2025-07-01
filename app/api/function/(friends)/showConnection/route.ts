import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";


const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json({ message: "user not login" }, { status: 400 });
    }

    const userId = token.id;
    console.log(userId);  

    const allFriends = await prisma.acceptFriend.findMany({
        where: {
            userId: userId
        }  
    });

    const friendIds = allFriends.map(f => f.friendId);

    const data = await prisma.user.findMany({
        where: {
            id: {
                not: userId,
                notIn: friendIds  
            },   

        },
        select: {   
            id: true,
            name: true,
            image: true,
            UserDetailInfo: {
                select: {
                    about: true,   
                },
            },  
        },
    });


    return NextResponse.json({
        data
    })

}