import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@/app/generated/prisma";
import { NextRequest, NextResponse } from "next/server";


const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

export async function GET(req:NextRequest) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "user not login"
        },{status:400});
    }
    const userId = token.id
    console.log(userId);  
    try{
        const data = await prisma.friendReq.findMany({
            where: {
                receiverId: userId
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }  
        });
        return NextResponse.json({
            data
        },{status:200});
    }catch(err){
        return NextResponse.json({
            message: "internal server err"
        },{status:500});
    }
}  