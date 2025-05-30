"use client"
import CreateTask from "@/components/TaskCreateForm";
import axios from "axios";
import { useParams } from "next/navigation";

export default function updateTask() {  
    const params = useParams();
    const taskId = params?.taskId;

    try {
        const EditTask = async ({taskData}:any) => {
            await axios.put(`http://localhost:3000/api/task/updateTask/${taskId}`, taskData, { withCredentials: true })
        }

        return (
        <CreateTask topTitle="EditTask" buttonName="Update" onSubmit={EditTask} />
    )   
    }catch(err){
        console.log("Failed to update task",err);  
    }
    
}        