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
            <div className="flex justify-center">Loading...........</div>
        )
    }



    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         alert("your are not login");
    //         router.push(`${Url}`);
    //     }
    // }, []);

    // const user = session?.user;
    // const image = user?.image

    return (
        <div className="bg-white w-full h-screen">
            <div className="h-full w-full  pt-2">
                <div className="outline-1  p-10 m-5 space-y-4 ">
                    <CardContent className="rounded-3xl h-80 space-y-4 bg-white hover:bg-gray-100 outline-1">
                        <CardTitle className="text-center pt-4">{data.title}</CardTitle>
                        <CardDescription>{data.description}</CardDescription>
                        <div className="space-y-4">
                            <p className="">aboutTasks: {data.inDetails}</p>
                            <p>requirement Skills: {data.skills}</p>
                            <p>priority: {data.priority}</p>
                            <p className={`text-sm font-semibold mt-2 ${data.status ? "text-green-600" : "text-red-600"}`}>
                                Status: {data.status ? "Completed" : "Pending"}
                            </p>
                            <p>completedDate: {new Date(data.date).toLocaleDateString()}</p>
                        </div>
                    </CardContent>


                    <CardContent className=" rounded-4xl h-40 pt-4 bg-white hover:bg-gray-100 outline-1">
                        <CardTitle>contact details</CardTitle>
                        <div className="flex flex-col space-y-2 mt-2">
                            <span>name: {data.user.name}</span>
                            <span>email: {data.user.email}</span>
                            <span>Mo: {data.user.phone}</span>
                        </div>
                    </CardContent>

                </div>
            </div>
        </div>
    )
}