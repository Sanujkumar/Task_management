
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import { getToken } from "next-auth/jwt";
import { uploadBase64 } from "../../../../lib/cloudinary";
import { userDetailInfoSchema } from "../../../../lib/zod";  

const prisma = new PrismaClient();

const secret = process.env.AUTH_SECRET;

export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({
            messsage: "user not login"
        }, { status: 400 })
    }
    const body = await req.json();
    const { skills, about, pdfBase64, experience, linkedinUrl, githubUrl, highestDegree } = body;

    let resumeUrl: string | null = null;
    if (pdfBase64) {
        const pdfUrl = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
        resumeUrl = pdfUrl.secure_url
    }


    const zodValidation = userDetailInfoSchema.safeParse({ skills, about, pdfBase64, experience, linkedinUrl, githubUrl, highestDegree,resumeUrl });

    if (!zodValidation.success) {  
        return NextResponse.json({
            message: "validation failed",
            errors: zodValidation.error.flatten().fieldErrors,
        }, { status: 400 });
    }
    const userId = token.id;
           

    try {
        await prisma.userDetailInfo.create({
            data: {
                skills,
                about,
                resume: resumeUrl,
                experience,
                linkedinUrl,   
                githubUrl,
                highestDegree,
                userId: Number(userId)
            }
        });

        return NextResponse.json(
            {
                message: "Successfully updated user information",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        NextResponse.json({
            message: "internal server err"
        }, { status: 200 });
    }

}

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret });

    if (!token || !token.id) {
        return NextResponse.json({
            messsage: "user not login"
        }, { status: 400 })
    }

    const userId = Number(token.id);
    console.log("userId", userId);

    try {
        const userData = await prisma.userDetailInfo.findUnique({
            where: { userId: userId }
        });

        return NextResponse.json({
            data: userData
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            messsage: "internal server error"
        }, { status: 500 })
    }
}

type UpdateDataTypes = {
    skills?: string,
    about?: string,
    experience?: string;
    linkedinUrl?: string;  
    githubUrl?: string;
    highestDegree?: string;
    resume?: string;
}

export async function PUT(req: NextRequest) {
    const token = await getToken({ req, secret });
    if (!token || !token.id) {
        return NextResponse.json({
            messsage: "user not login"
        }, { status: 400 })
    }
    const userId = Number(token.id);

    const body = await req.json();

    const data: UpdateDataTypes = {}
    const { skills, about, pdfBase64, experience, linkedinUrl, githubUrl, highestDegree } = body;

    if (skills !== "undefined") data.skills = skills;
    if (about !== "undefined") data.about = about;
    if (experience !== "undefined") data.experience = experience;
    if (linkedinUrl !== "undefined") data.linkedinUrl = linkedinUrl;
    if (githubUrl !== "undefined") data.githubUrl = githubUrl;
    if (highestDegree !== "undefined") data.highestDegree = highestDegree;



    if (pdfBase64) {
        const pdfUrl = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
        data.resume = pdfUrl.secure_url
    }


    const zodValidation = userDetailInfoSchema.safeParse(data);
    
    if (!zodValidation.success) {  
        return NextResponse.json({
            message: "validation failed",
            errors: zodValidation.error.flatten().fieldErrors,
        }, { status: 400 });
    }  

    try {
        await prisma.userDetailInfo.update({
            where: { userId },
            data
        });

        return NextResponse.json({
            message: "update successfully"
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            messsage: "internal server error"
        }, { status: 500 })
    }
}

  

