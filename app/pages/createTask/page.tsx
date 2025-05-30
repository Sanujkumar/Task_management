"use client"
import CreateTask from "@/components/TaskCreateForm";
import axios from "axios";

export default function CreateTaskPage() {

    const handleCreate = async (taskData: any) => {
        await axios.post("http://localhost:3000/api/function/task", taskData, { withCredentials: true });
    };

    return (

        <CreateTask topTitle="CreateTask" buttonName="Create" onSubmit={handleCreate} />
    )
}    