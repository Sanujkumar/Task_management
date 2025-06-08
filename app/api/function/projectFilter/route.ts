import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../app/generated/prisma"; // assuming you're using a generated path correctly

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q");
    const price = searchParams.get("price");

    try {

        const filters: any = {};

        if (q) {
            filters.OR = [
                { title: { contains: q.trim(), mode: "insensitive" } },
                { description: { contains: q.trim(), mode: "insensitive" } },
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
            where: filters
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

   