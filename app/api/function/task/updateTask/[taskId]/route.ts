
import { PrismaClient } from "../../../../../generated/prisma"; 

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ taskId: string }> }
) {
  const token = await getToken({ req, secret });
  if (!token || !token.id) {
    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 }
    );
  }

  try {
    const { taskId } = await context.params; 
    const body = await req.json();
    const { title, description, date, priority, status } = body;

    await prisma.task.update({
      where: { id: Number(taskId) },  
      data: {
        title,
        description,
        date: new Date(date),
        priority,
        status,
      },
    });

    return NextResponse.json(
      { message: "Task updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
   