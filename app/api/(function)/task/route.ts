import { PrismaClient } from "@/app/generated/prisma"; 
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;    
const prisma = new PrismaClient();


export const POST = (async (req: NextRequest) => {
  const token = await getToken({ req, secret });
  console.log("tokenTask",token);  
  
  if(!token  || !token.id){
    return NextResponse.json({
      message: "user not authorized"  
    }, {status:400});
  }
 

  try {

    const body = await req.json();
    const { title, description, date, priority, status , assigneeId} = body;
    const userId = Number(token.id);
    console.log("userId",userId);   
    const task = await prisma.task.create({
      data: {      
        title,
        description,
        date: new Date(date),
        priority,
        status,
        userId,
        assigneeId
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
  
    return NextResponse.json({ message: "Task created", task }, {status: 201});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
});   
   

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log("tokenTask",token);  
  
  if(!token  || !token.id){
    return NextResponse.json({
      message: "user not authorized"  
    }, {status:400});
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
  
  
  export async function PUT(req: NextRequest) {
    const token = await getToken({ req, secret });
    console.log("tokenTask",token);  
  
  if(!token  || !token.id){
    return NextResponse.json({
      message: "user not authorized"  
    }, {status:400});
  }
    const userId = Number(token.id);  

    const body = await req.json();
    const { id, title, description, date, priority, status } = body;
  
  
  
    try {
      const updated = await prisma.task.updateMany({
        where: {
          id,
          userId
        },
        data: {
          title,
          description,
          date: new Date(date),   
          priority,
          status,
        },
      });
  
      return NextResponse.json({ message: "Task updated successfully" },{status:200});
    } catch (error) {
      return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
  }
  
  
  export async function DELETE(req: NextRequest) {
    const token = await getToken({ req, secret });
    console.log("tokenTask",token);  
  
  if(!token  || !token.id){
    return NextResponse.json({
      message: "user not authorized"  
    }, {status:400});
  }
    const userId = Number(token.id);  
    const body = await req.json();
    const {id} = body;
    
    const taskId = Number(id);
    
  
    try {
      const deleted = await prisma.task.deleteMany({
        where: {
          id:taskId,
          userId: userId
        },
      });

  
      return NextResponse.json({ message: "Task deleted successfully",deleted });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
  }           

     