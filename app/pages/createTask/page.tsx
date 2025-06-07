"use client"
import CreateTask from "../../../components/TaskCreateForm";
import axios from "axios";  
import { Url} from "../../../lib/config";  
import toast from "react-hot-toast";



export default function CreateTaskPage() {

    const handleSubmitData = async (taskData: any) => {
        await axios.post(`${Url}/api/function/task`, taskData, { withCredentials: true });
        toast.success("your task is created successfully");  
    };   

    return (  
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
        <CreateTask topTitle="CreateTask" buttonName="Create" onSubmit={handleSubmitData} />
        </div>
        </div>     
    )
}       