import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../app/generated/prisma"; // assuming you're using a generated path correctly
import { getToken } from "next-auth/jwt";
const secret = process.env.AUTH_SECRET;

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
     
    const token = await getToken({req,secret});
    
        if(!token || !token.id){
            return NextResponse.json({
                message: "you are not login"
            },{status:401});  
        }


    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search");
    const price = searchParams.get("price");

    try {
        
        const filters: any = {};

        if (search) {
            filters.OR = [
                { title: { contains: search.trim(), mode: "insensitive" } },
                { description: { contains: search.trim(), mode: "insensitive" } },
            ];
        }

        if (price) {
            const numericPrice = Number(price);
            if (!isNaN(numericPrice)) {
                filters.price = {
                    gte: numericPrice,
                };
            }
        }

        const data = await prisma.task.findMany({
            ...(Object.keys(filters).length > 0 ? { where: filters } : {})
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

