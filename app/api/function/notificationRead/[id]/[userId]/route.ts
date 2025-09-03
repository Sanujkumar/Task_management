

import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";
   

const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;

export async function PATCH(req:NextRequest,context: { params: Promise<{ id: string , userId: string }> }) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "user have not login"
        }, {status:400});
    }

    console.log("userId",token.id);  
    const { id ,userId } = await context.params;  
    const notificationId = Number(id);
    console.log("noti",notificationId);  
    console.log("userId",userId);   
    console.log("currentUserId",token.id);  

    try {
        if(Number(token.id) !== Number(userId)){
            return NextResponse.json({
                message: "user are not authorized"
            },{status: 403});  
        }

       const res =  await prisma.notification.findFirst({
            where: {
                userId: token.id,
                id: notificationId
            }
        });  
        

        if(!res){
            return NextResponse.json({
                message: "It is not your message",
            },{status: 403});  
        }
        const notificationRead = await prisma.notification.update({
            where: {
                id : notificationId,
            },
            data: {
                read: true   
            }
        })

        return NextResponse.json({
            message: "notification update",
        },{status:200});
    }catch(error){
        return NextResponse.json({
            message: "internal server error"
        },{status: 500});
    }
}   