import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import cloudinary, { uploadBase64 } from "../../../../lib/cloudinary";

const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();


export const POST = (async (req: NextRequest) => {
  const token = await getToken({ req, secret });
  console.log("tokenTask", token);

  if (!token || !token.id) {
    return NextResponse.json({
      message: "user not authorized"
    }, { status: 400 });
  }


  try {

    const body = await req.json();
    const {
      title,
      description,
      date,
      priority,
      inDetails,
      price,
      skills,
      status,
      assigneeId,
      videoBase64,  
      pdfBase64
      } = body;


    console.log(title, description, date, priority, inDetails, price, skills);
    const userId = Number(token.id);
   
    let videoUrl: string | null = null;
    if (videoBase64) {
      const videoUpload = await uploadBase64(videoBase64, "tasks/videos", "video", "mp4");
      videoUrl = videoUpload.secure_url;
    }
    
    
    let pdfUrl: string | null = null;
    if (pdfBase64) {
      const pdfUpload = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
      pdfUrl = pdfUpload.secure_url;
    }  

    console.log("url",videoUrl,pdfUrl);  
    console.log("userId", userId);
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date: new Date(date),
        priority,
        inDetails,
        price: Number(price),
        skills,
        status,
        userId,
        assigneeId,
        videoUrl,
        pdfUrl    
      },
    });

    if (assigneeId) {
      await prisma.notification.create({
        data: {
          message: `You have been assigned a new task: ${task.title}`,
          userId: assigneeId,
        },
      });
    }

    return NextResponse.json({ message: "Task created", task }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
});


export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log("tokenTask", token);

  if (!token || !token.id) {
    return NextResponse.json({
      message: "user not authorized"
    }, { status: 400 });
  }


  try {
    const userId = Number(token.id);

    const tasks = await prisma.task.findMany({
      where: {
        userId
      },
    });

    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}


