"use client"
import CreateTask from "../../../../components/TaskCreateForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { Url } from "../../../../lib/config";
import toast from "react-hot-toast";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function updateTask() {
    const [loader,setLoader] = useState(false);
    const params = useParams();
    const taskId = params?.taskId;

    console.log("fTaskId", taskId);

    const EditTask = async (taskData: any) => {
        setLoader(true);
        console.log("sending Tasks", taskData)
        await axios.put(`${Url}/api/function/task/updateTask/${taskId}`, taskData, { withCredentials: true })
        setLoader(false);
        toast.success("your task updated successful");  
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <CreateTask topTitle="EditTask" buttonName="Update" onSubmit={EditTask} loader={loader}/>
            </div>
        </div>
    )
    
}          