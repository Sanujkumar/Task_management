"use client"

import CreateTask from "@/components/TaskCreateForm";
import axios from "axios";

export default function updateTask(taskData:any){

    const EditTask = async () =>{
        await axios.put("http://localhost:3000/api/task",taskData , {withCredentials: true})
    }
    return(
        <CreateTask topTitle="EditTask" buttonName = "Update" onSubmit={EditTask}/>    
    )  
}  