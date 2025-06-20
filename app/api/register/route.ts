import { PrismaClient } from "../../generated/prisma";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { userSchema } from "../../../lib/zod";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {


  try {
    const body = await req.json();
    const { email, password, phone, name } = body;

    const zodValidation = userSchema.safeParse({ email, password, phone, name });

    if (!zodValidation.success) {
      return NextResponse.json({
        message: "validation failed",
        errors: zodValidation.error.flatten().fieldErrors, 
      }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({
        message: "email and password are required"
      }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists"
      }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);



    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        phone,
        name,
      }
    });

    return NextResponse.json({
      message: "User successfully registered"
    }, { status: 201 });

  } catch (err: any) {
    console.error("Registration Error:", err);
    return NextResponse.json({
      message: "Internal server error"
    }, { status: 500 });
  }
}
