
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";


const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

// show all connection , which can make a friend 

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json({ message: "user not login" }, { status: 400 });
    }

    const userId = token.id;
    console.log(userId);  

    //finds your all friends 
    const allFriends = await prisma.acceptFriend.findMany({
        where: {
            userId: userId
        }  
    });

    // filter by all friends id abstract here
    const friendIds = allFriends.map(f => f.friendId);

    // which person , who have already freinds and your own id not show
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

 
    // then give final response
    return NextResponse.json({
        data
    })

}