

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../app/generated/prisma";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

const secret = process.env.AUTH_SECRET;

export async function GET(req:NextRequest){
    const token = await getToken({req,secret});
    if(!token || !token.id){
        return NextResponse.json({
            message: "user not login"
        },{status:400});  
    }
    try{  
        const data = await prisma.user.findMany({
            select: {  
                id: true,  
                name: true,
                image: true  
            }  
        })
        return NextResponse.json({
            data
        });
    }catch(err){
        return NextResponse.json({
            message: "internal server err"
        },{status:500})
    }
}   

