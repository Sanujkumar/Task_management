"use client"
import CreateTask from "../../../components/TaskCreateForm";
import axios from "axios";  
import { Url} from "../../../lib/config";  



export default function CreateTaskPage() {

    const handleCreate = async (taskData: any) => {
        await axios.post(`${Url}/api/function/task`, taskData, { withCredentials: true });
    };   

    return (  

        <CreateTask topTitle="CreateTask" buttonName="Create" onSubmit={handleCreate} />
    )
}    