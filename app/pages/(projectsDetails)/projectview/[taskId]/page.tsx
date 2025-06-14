"use client"
import { Url } from "@/lib/config";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AllTasksSkelaton from "../../../../../skeltons/alltaskSkelaton";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProjectVDSkeleton from "../../../../../skeltons/projectVDSkeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface dataTypes {
    id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
    inDetails: string;
    price: number,
    skills: string,
    status: boolean;
    userId: number;
    videoUrl: string;
    pdfUrl: string;
    assigneeId?: number;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        image?: string;
    }
}

export default function projectview() {
    const [data, setData] = useState<dataTypes>();
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    const router = useRouter();
    const params = useParams();
    const taskId = params.taskId;

    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("your are not login");
            router.push(`${Url}`);
        }
    }, []);



    const projectData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/task/taskviewdetail/${taskId}`, { withCredentials: true });
            const taskDetails = res.data.data;
            setData(taskDetails);
            console.log("data", res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("somethinge went wrong");
        }
    }

    useEffect(() => {
        projectData();
    }, []);

    if (loading || !data) {
        return (
            <div><ProjectVDSkeleton /></div>
        )
    }


    const name = data?.user.name
    const firstLetter = name.charAt(0).toUpperCase();
    const image = data.user.image;
    console.log("user Image",image);  
    console.log("pdfUrlLAst",data.pdfUrl);  

    // const image = "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20598.jpg?semt=ais_hybrid&w=740"



 const sampleUrl = "https://res.cloudinary.com/dl9on566k/raw/upload/v1749826377/tasks/docs/filename-1749826376814"




    return (
        <div className="bg-white w-full h-screen">
            <div className="h-full w-full ">
                <div className="outline-1 p-5 m-5 space-y-4 w-auto h-auto ">
                    <CardContent className="rounded-3xl h-auto  space-y-4 bg-white hover:bg-gray-100 outline-1 p-4">
                        <div className="flex gap-6  ">
                            <span className="">
                                <Avatar className="w-18 h-18 sm:w-26 sm:h-26 border-2 border-black">
                                    {image ? (
                                        <AvatarImage src={image} alt={image} />     
                                    ) : (  
                                        <AvatarFallback>{firstLetter}</AvatarFallback>
                                    )}
                                </Avatar>
                            </span>

                            <CardTitle className="text-center pt-6">{data.title}</CardTitle>
                        </div>
                        <CardDescription>{data.description}</CardDescription>
                        <div className="space-y-4">
                            <p className="">aboutTasks: {data.inDetails}</p>
                            <p>requirement Skills: {data.skills}</p>
                            <p>priority: {data.priority}</p>
                            <p className={`text-sm font-semibold mt-2 ${data.status ? "text-green-600" : "text-red-600"}`}>
                                Status: {data.status ? "Completed" : "Pending"}
                            </p>
                            <p>completedDate: {new Date(data.date).toLocaleDateString()}</p>
                            <div className="flex-block md:flex  space-x-7">
                                {data.videoUrl && (
                                    <div className="mt-4">
                                        <p className="font-semibold">See video:</p>
                                        <video
                                            src={data.videoUrl}
                                            controls
                                            width="350px"
                                            height="200px"
                                            className="rounded-2xl ouline-1"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}

                                {data.pdfUrl && (
                                    <div className="mt-4 ">
                                        <p className="font-semibold">PDF Preview:</p>
                                        <iframe
                                            // src={`https://docs.google.com/gview?url=${data.pdfUrl}&embedded=true`}
                                            src={`https://docs.google.com/gview?url=${data.pdfUrl}&embedded=true`}
                                            width="250px"
                                            height="200px"
                                            className="rounded-xl border-2 border-gray-400 shadow-lg"
                                        ></iframe>  

                                        <p className="text-sm text-gray-600 mt-1">
                                            Or{" "}
                                            <a
                                                href={data.pdfUrl}  
                                                download
                                                className="text-gray-400 hover:text-blue-600 underline"
                                            >
                                                Click here to download

                                            </a>.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </CardContent>


                    <CardContent className=" rounded-4xl h-auto p-4 bg-white hover:bg-gray-100 outline-1">
                        <CardTitle>contact details</CardTitle>
                        <div className="flex flex-col space-y-2 mt-2">
                            <span>name: {data.user.name}</span>
                            <span>email: {data.user.email}</span>
                            <span>Mo: {data.user.phone}</span>
                        </div>
                    </CardContent>

                    <div className="outline-1 p-2 relative h-40 ">
                        <h1>Chat</h1>
                        <Input placeholder="type here" className="rounded-4xl"/>
                        <Button className="absolute right-4">send</Button>
                    </div>

                </div>
            </div>           
        </div>
    )
}


