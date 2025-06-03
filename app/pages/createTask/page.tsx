"use client"
import CreateTask from "../../../components/TaskCreateForm";
import axios from "axios";  

export default function CreateTaskPage() {

    const handleCreate = async (taskData: any) => {
        await axios.post("https://task-management-vkvv.onrender.com/api/function/task", taskData, { withCredentials: true });
    };

    return (

        <CreateTask topTitle="CreateTask" buttonName="Create" onSubmit={handleCreate} />
    )
}    