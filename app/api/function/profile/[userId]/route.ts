import { getToken } from "next-auth/jwt";
import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();  

const secret = process.env.AUTH_SECRET;

// find Profile details in upper part
export  async function GET(req:NextRequest,context: { params: Promise<{ userId: string }> }) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "user have not login"
        },{status: 400})
    }
    const {userId} = await context.params;
    
    try{
    const data = await prisma.user.findUnique({
        where: { id: Number(userId) }
    });

    return NextResponse.json({
        data
    },{status: 201})

    }
    catch(error){
       return NextResponse.json({
            message: "internal server error"
        },{status:500});  
    }

}