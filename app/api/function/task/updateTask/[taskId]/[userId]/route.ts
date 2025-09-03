
import { PrismaClient } from "@/app/generated/prisma";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { uploadBase64 } from "@/lib/cloudinary";
import { taskSchema } from "@/lib/zod";  

const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

// update Projects 
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ taskId: string, userId: string }> }
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
    videoUrl?: string,
    pdfUrl?: string
  };

  try {
    const { taskId,userId } = await context.params;
    const body = await req.json();

    if(Number(userId)!== Number(token.id)){
      return NextResponse.json({
        message: "user are not authorized"
      },{status:403});
    }

    const taskUpdatedData: taskUpdatedDataTypes = {};
    const { title, description, date, inDetails, price, skills, priority, status, pdfBase64, videoBase64 } = body;

    if (title !== "undefined" && title !== "") taskUpdatedData.title = title;
    if (description !== "undefined" && description !== "") taskUpdatedData.description = description;
    if (date !== "undefined" && date !== "") taskUpdatedData.date = date;
    if (inDetails !== "undefined" && inDetails !== "") taskUpdatedData.inDetails = inDetails;
    if (price !== "undefined" && price !== "") taskUpdatedData.price = Number(price);
    if (skills !== "undefined" && skills !== "") taskUpdatedData.skills = skills;
    if (priority !== "undefined" && priority !== "") taskUpdatedData.priority = priority;
    if (status !== "undefined" && status !== "") taskUpdatedData.status = status;


    if (videoBase64) {
      const videoUpload = await uploadBase64(videoBase64, "tasks/videos", "video", "mp4");
      taskUpdatedData.videoUrl = videoUpload.secure_url;
    }


    if (pdfBase64) {
      const pdfUpload = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
      taskUpdatedData.pdfUrl = pdfUpload.secure_url;
    }


    const zodValidation = taskSchema.safeParse(taskUpdatedData);

    if (!zodValidation.success) {
      return NextResponse.json({
        message: "validation failed",
        errors: zodValidation.error.flatten().fieldErrors,
      }, { status: 400 });
    }

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
  