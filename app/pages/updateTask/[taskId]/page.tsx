"use client"
import CreateTask from "../../../../components/TaskCreateForm";
import axios from "axios";
import { useParams } from "next/navigation";
import { Url } from "../../../../lib/config";

export default function updateTask() {  
    const params = useParams();
    const taskId = params?.taskId;  
    console.log("fTaskId",taskId);  

        const EditTask = async (taskData:any) => {
            console.log("sending Tasks",taskData)
            await axios.put(`${Url}/api/function/task/updateTask/${taskId}`, taskData, { withCredentials: true })
        }

        return (
        <CreateTask topTitle="EditTask" buttonName="Update" onSubmit={EditTask} />
    )     
    
      
}        