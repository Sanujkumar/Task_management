

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()  
const secret = process.env.AUTH_SECRET;

// to find user for send message
export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json({
            message: "user not login"
        }, { status: 400 });
    }

    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name')!;
    console.log(name);

    const userId = token.id
    

    let whereClause = {}

    if (name!=='null') {
        whereClause = {
            name: {
            contains: name.trim(),
            mode: "insensitive" as const,
            } ,
            id: {
                not: Number(userId)
            }
        }  
    } else {
        whereClause = {
            id:{
                not: Number(userId)  
            }
        };  
    }
  

    try {
        const data = await prisma.user.findMany({
            where:  whereClause ,     
            select: {
                id: true,
                name: true,
                image: true,  
               UserDetailInfo: {
                select: {
                    skills: true,
                    about: true
                }
               }
            }
        });  

        return NextResponse.json({
            data
        });
    } catch (err) {
        return NextResponse.json({
            message: "internal server err"
        }, { status: 500 })
    }
}


    