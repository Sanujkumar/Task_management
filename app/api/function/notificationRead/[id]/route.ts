

import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";
   

const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;

export async function PATCH(req:NextRequest,context: { params: Promise<{ id: string }> }) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "user have not login"
        }, {status:400});
    }

    const { id } = await context.params;  
    const notificationId = Number(id);
    console.log("noti",notificationId);

    try {
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