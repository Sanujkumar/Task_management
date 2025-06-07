"use client"
import CreateTask from "../../../../components/TaskCreateForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { Url } from "../../../../lib/config";
import toast from "react-hot-toast";

export default function updateTask() {
    const params = useParams();
    const taskId = params?.taskId;

    console.log("fTaskId", taskId);

    const EditTask = async (taskData: any) => {
        console.log("sending Tasks", taskData)
        await axios.put(`${Url}/api/function/task/updateTask/${taskId}`, taskData, { withCredentials: true })
        toast.success("your task updated successful");  
    }

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <CreateTask topTitle="EditTask" buttonName="Update" onSubmit={EditTask} />
            </div>
        </div>
    )


}          