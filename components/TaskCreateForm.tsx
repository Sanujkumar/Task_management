"use client"
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Url } from "../lib/config";

export default function TaskCreate({topTitle,buttonName,onSubmit,task}:any) {
    const {data: session,status} = useSession();  
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLInputElement>(null);
    const StatusRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    useEffect(() => {
        if(status === "unauthenticated"){
            alert("you are not logged in!");
            router.push(`${Url}/auth/login`);  
        }
    });  

    const handleSubmit = async () => {

        const taskData = {
            title: titleRef.current?.value || " ",
            description: descriptionRef.current?.value || "",
            date: dateRef.current?.value || "",
            priority: priorityRef.current?.value || "",
            status: StatusRef.current?.checked || false,
        }
        // const res = await axios.post("http://localhost:3000/api/task", taskData, {
        //     withCredentials: true
        // });


        // if (res.status === 201) {
        //     router.push("/pages/allTasks");
        // }

        try {
            await onSubmit(taskData); 
            router.push(`${Url}/pages/allTasks`);
        } catch (error) {
            console.error("Submit failed:", error);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
            <div className=" w-3/4 h-150  flex justify-center items-center">
                <div className="bg-white text-center rounded-4xl h-full w-3/4 p-4">
                    <div>
                        {/* <p className="text-3xl"><span className="text-yellow-600">Task</span><span className="text-yellow-500">Create</span></p> */}
                        <p>{topTitle}</p>
                    </div>
                    <div className="">
                        <div className="pr-2 pl-2">
                            <Label htmlFor="Title" className="text-md">Title</Label>
                            <Input ref={titleRef} className=" bg-white mb-2" type="text" placeholder="Tittle" />
                        </div>
                        <div className="pr-2 pl-2">
                            <Label htmlFor="Description" className="text-md">Description</Label>
                            <Input ref={descriptionRef} className=" bg-white mb-2" type="text" placeholder="Description" />
                        </div>
                        <div className="pr-2 pl-2">
                            <Label htmlFor="Date" className="text-md">Date</Label>
                            <Input ref={dateRef} className=" bg-white mb-2" type="date" placeholder="Description" />
                        </div>

                        <div className="pr-2 pl-2">
                            <Label htmlFor="Priority" className="text-md">Priority</Label>
                            <Input ref={priorityRef} className=" bg-white mb-2" type="text" placeholder="Priority" />
                        </div>
                        <div className="pr-2 pl-2">
                            <Label htmlFor="In-details" className="text-md">In-details</Label>
                            <Input ref={priorityRef} className=" bg-white mb-2" type="text" placeholder="details description" />
                        </div>
                        <div className="pr-2 pl-2">
                            <Label htmlFor="Price" className="text-md">Price</Label>
                            <Input ref={priorityRef} className=" bg-white mb-2" type="text" placeholder="price" />
                        </div>
                        <div className="pr-2 pl-2">
                            <Label htmlFor="Priority" className="text-md">Mention skills</Label>
                            <Input ref={priorityRef} className=" bg-white mb-2" type="text" placeholder="here mention skills" />
                        </div>
                        <div className="pr-2 pl-2 flex items-center ">
                            <Label htmlFor="Status" className="text-md" >Status</Label>
                            <Input ref={StatusRef} className="h-4 w-6" type="checkbox" placeholder="Status" />
                        </div>
                        <div className=" mt-4  flex justify-end">
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-gray-300"
                                onClick={handleSubmit}
                            >{buttonName}</Button>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}