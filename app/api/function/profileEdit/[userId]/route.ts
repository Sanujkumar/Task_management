
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();


const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    const token = await getToken({req,secret});

    if(!token || !token.id){
        return NextResponse.json({
            message: "user has not authorized"
        },{status: 400});  
    }
    try {
        const { userId } = await context.params;
        const body = await req.json();
         
        const { name, phone, skills,about } = body;  
        const updateData: Record<string, any> = {};

         if (name !== undefined && name !== "") updateData.name = name;
        if (phone !== undefined && phone !== "") updateData.phone = phone;
        if (skills !== undefined && skills !== "") updateData.skills = skills;
        if(about !== undefined && about !== "") updateData.about = about;  

        if(name !== "undefined"){
            updateData
        }
       const res =  await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData
        })
        console.log(res);  
        return NextResponse.json({
            message: "Profile edit successfully"
        },{status:200});
    }catch(error){
        console.log("something went wrong");
        return NextResponse.json({
            message: "internal server eerror"
        },{ status: 500});
    }
}