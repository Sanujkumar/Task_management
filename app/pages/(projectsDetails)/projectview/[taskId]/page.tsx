"use client"
import { Url } from "@/lib/config";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function projectview(){
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);
    const params = useParams();
    const taskId = params.taskId;

    const projectData = async () => {
        try{
        const res = await axios.get(`${Url}/api/function/task/${taskId}`,{withCredentials: true});
        setData(res.data);
        setLoading(false);
        }catch(error){
            console.log(error);
            toast.error("somethinge went wrong");
        }
    }

    useEffect(() => {
        projectData();
    },[]);

    return (
        <div>
            hi there is view details section!
        </div>
    )
}