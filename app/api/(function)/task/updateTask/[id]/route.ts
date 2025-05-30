// import { PrismaClient } from "@/app/generated/prisma"; 
// import { NextRequest, NextResponse } from "next/server";
// import type { RouteHandlerContext } from 'next';
// import { getToken } from "next-auth/jwt";
// const secret = process.env.AUTH_SECRET;
// const prisma = new PrismaClient();

//  export async function PUT(req: NextRequest, context: RouteHandlerContext<{ id: string }>) {   
//     const token = await getToken({ req, secret });
//     console.log("tokenTask",token);  
    
//   if(!token  || !token.id){
//     return NextResponse.json({
//       message: "user not authorized"  
//     }, {status:400});
//   }
//     const  params  = await context.params;
//     const taskId = Number(params.id);
    
//     const body = await req.json();
//     const {title, description, date, priority, status } = body;
  
//     try {
//       const updated = await prisma.task.updateMany({
//         where: {
//           id: taskId,  
//         },
//         data: {
//           title,
//           description,
//           date: new Date(date),   
//           priority,
//           status,
//         },  
//       });
  
//       return NextResponse.json({ message: "Task updated successfully" },{status:200});
//     } catch (error) {
//       return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
//     }
//   }    


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@/app/generated/prisma";

const secret = process.env.AUTH_SECRET;
const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret });
  console.log("tokenTask", token);

  if (!token || !token.id) {
    return NextResponse.json(
      { message: "user not authorized" },
      { status: 400 }
    );
  }

  const taskId = Number(params.id);
  const body = await req.json();
  const { title, description, date, priority, status } = body;

  try {
    const updated = await prisma.task.updateMany({
      where: { id: taskId },
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
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
  