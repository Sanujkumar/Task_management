
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../../../app/generated/prisma";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: Promise<{ taskId: string }> }) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json(
            { message: "User not authorized" },
            { status: 401 }
        );
    }


    try {
        const {taskId} = await context.params;  
        console.log(taskId);  
        const data = await prisma.task.findUnique({
            where: { id: Number(taskId) }
        });

        return NextResponse.json({
            data
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({
            message: "internal server error"
        }, { status: 500 });
    }
}


//sample after the hit this end point 
// {
//     "data": {
//         "id": 30,
//         "title": "hi there",
//         "description": "i am guru",
//         "date": "2025-06-06T00:00:00.000Z",
//         "priority": "secondary",
//         "inDetails": "",
//         "price": 0,
//         "skills": "",
//         "status": false,
//         "userId": 15,
//         "assigneeId": null
//     }
// }

//api is here
// http://localhost:3000/api/function/task/taskviewdetail/30