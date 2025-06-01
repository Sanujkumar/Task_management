import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "../../../../generated/prisma"; 


const prisma = new PrismaClient();

const secret = process.env.AUTH_SECRET;
export  async function GET(req:NextRequest) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "you are not login"
        },{status:401});  
    }
    try{
    const Alltask = await prisma.task.findMany();
    return NextResponse.json({Alltask},{status:200});
    }catch(err){
        return NextResponse.json({
            message: "internal server error"
        },{status:500})
    }

}