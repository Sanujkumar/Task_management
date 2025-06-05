import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();  

export  async function GET(req:NextRequest,context: { params: Promise<{ userId: string }> }) {
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