import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
const secret = process.env.AUTH_SECRET;

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({
            message: "user not login"
        }, { status: 400 });
    }

    const userId = token.id;
    console.log(userId);  
    try {
        const data = await prisma.acceptFriend.findMany({
            where: {
                userId  
            },
            include: {
                friend: {
                    select: { id: true, name: true, image: true }
                }
            }
        });

        const length = data.length;
        console.log("lenght", length);
        return NextResponse.json({
            data,
            length
        })
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "internal server error"
        }, { status: 500 });
    }

}