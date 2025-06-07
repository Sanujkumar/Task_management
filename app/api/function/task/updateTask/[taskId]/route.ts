
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

  type taskUpdatedDataTypes = {
  title?: string,
  description?: string,
  date?: Date,
  inDetails?: string,
  price?: number,
  skills?: string,
  priority?: string,
  status?: boolean,
};

  try {
    const { taskId } = await context.params; 
    const body = await req.json();
    const taskUpdatedData:taskUpdatedDataTypes  = {};
    const { title, description, date,inDetails,price,skills, priority, status } = body;

    if (title !== "undefined" && title !== "") taskUpdatedData.title = title;
if (description !== "undefined" && description !== "") taskUpdatedData.description = description;
if (date !== "undefined" && date !== "") taskUpdatedData.date = date;
if (inDetails !== "undefined" && inDetails !== "") taskUpdatedData.inDetails = inDetails;
if (price !== "undefined" && price !== "") taskUpdatedData.price = Number(price);  
if (skills !== "undefined" && skills !== "") taskUpdatedData.skills = skills;
if (priority !== "undefined" && priority !== "") taskUpdatedData.priority = priority;
if (status !== "undefined" && status !== "") taskUpdatedData.status = status;
  
    await prisma.task.update({
      where: { id: Number(taskId) },    
      data: taskUpdatedData      
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
   