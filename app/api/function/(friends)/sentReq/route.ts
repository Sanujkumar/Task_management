import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;

export async function GET(req:NextRequest){
    const token = await getToken({req,secret});
    if(!token || !token.id){
        return NextResponse.json({
            messsage: "user not login "
        }, {status:400});
    }

    const userId = token.id;
    console.log("userId",userId)
    try{
        const data = await prisma.friendReq.findMany({
            where: {senderId: userId},
            select: {
                receiverId: true
            }
        });

        return NextResponse.json({
            data
        },{status:200});  
    }catch(err){
        console.log(err);
        return NextResponse.json({
            message: "internal server err"
        });
    }
}  