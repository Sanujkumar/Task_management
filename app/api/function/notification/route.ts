
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
const secret = process.env.NEXTAUTH_SECRET;

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({
            message: "user not authorized"
        }, { status: 401 });
    }

    const userId = Number(token.id);
    console.log(userId);
    const notification = await prisma.notification.findMany({
        where: {
            userId
        }, orderBy: {
            CreatedAt: "desc",
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
    })

    return NextResponse.json({
        notification
    });
}