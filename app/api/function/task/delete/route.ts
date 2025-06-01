import { PrismaClient } from "../../../../generated/prisma"; 

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;    
const prisma = new PrismaClient();  

export async function POST(req: NextRequest) {
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

     