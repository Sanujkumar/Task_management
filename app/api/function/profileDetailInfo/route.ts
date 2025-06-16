
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import { getToken } from "next-auth/jwt";
import { uploadBase64 } from "../../../../lib/cloudinary";

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
    const { pdfBase64, experience, linkdinUrl, githubUrl, highestDegree } = body;

    let resumeUrl: string | null = null;  
    if(pdfBase64){
        const pdfUrl = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
        resumeUrl = pdfUrl.secure_url
    }

    const userId = token.id;


    try {
        await prisma.userDetailInfo.create({
            data: {
                resume: resumeUrl,
                experience,
                linkdinUrl,
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
    console.log("userId",userId);

    try {
        const userData = await prisma.userDetailInfo.findUnique({
            where: { userId: userId }    
        });

        return NextResponse.json({
            data:userData  
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            messsage: "internal server error"
        }, { status: 500 })
    }
}
  
type UpdateDataTypes = {
    resume?: string;
    experience?: string;
    linkdinUrl?: string;
    githubUrl?: string;
    highestDegree?: string;
    resumeUrl?: string;
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
    const { pdfBase64, experience, linkdinUrl, githubUrl, highestDegree } = body;
    
    if (experience !== "undefined") data.experience = experience;
    if (linkdinUrl !== "undefined") data.linkdinUrl = linkdinUrl;
    if (githubUrl !== "undefined") data.githubUrl = githubUrl;
    if (highestDegree !== "undefined") data.highestDegree = highestDegree;
 
    if(pdfBase64){
        const pdfUrl = await uploadBase64(pdfBase64, "tasks/docs", "raw", "pdf");
        data.resumeUrl = pdfUrl.secure_url
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
    


