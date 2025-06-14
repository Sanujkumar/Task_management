"use client"

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Url } from "../lib/config";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import toast from "react-hot-toast";

export default function TaskCreate({ topTitle, buttonName, onSubmit, task, className,
    ...props }: any) {

    const { data: session, status } = useSession();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const inDetailsRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLInputElement>(null);
    const StatusRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const pdfRef = useRef<HTMLInputElement>(null);


    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("you are not logged in!");
            router.push(`${Url}/auth/login`);
        }
    }, []);

  


    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };



    const handleSubmitData = async (e: React.FormEvent) => {
        e.preventDefault();
        const video = videoRef.current?.files?.[0]; 
        const pdf = pdfRef.current?.files?.[0];     

        const videoBase64 = video ? await fileToBase64(video) : null;
        const pdfBase64 = pdf ? await fileToBase64(pdf) : null;

        console.log("video", videoBase64);
        console.log("pdfUrl", pdfBase64);
        
        const taskData = {
            title: titleRef.current?.value || " ",
            description: descriptionRef.current?.value || "",
            date: dateRef.current?.value || "",
            inDetails: inDetailsRef.current?.value || "",
            price: priceRef.current?.value || "",
            skills: skillsRef.current?.value || "",
            priority: priorityRef.current?.value || "",
            status: StatusRef.current?.checked || false,
            videoBase64,
            videoType: video?.type || "",
            pdfBase64,
            pdfType: pdf?.type || "",
        }


        try {
            await onSubmit(taskData);
            toast.success(`successfully task is ${topTitle}`);;
            router.push(`${Url}/pages/allTasks`);
        } catch (error) {
            console.error("Submit failed:", error);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden ">
                <CardContent className="grid p-0 ">
                    <form onSubmit={handleSubmitData} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6 ">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">{topTitle}</h1>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="name" type="text" ref={titleRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">description</Label>
                                <Input id="description" type="text" ref={descriptionRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">date</Label>
                                <Input id="date" type="date" ref={dateRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="indetails">In-details</Label>
                                <Input id="InDetails" type="text" className="h-20" ref={inDetailsRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">price</Label>
                                <Input id="price" type="number" ref={priceRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skills">skills</Label>
                                <Input id="skills" type="text" ref={skillsRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="priority">priority</Label>
                                <Input id="priority" type="text" ref={priorityRef} />
                            </div>
                            <div className="flex space-x-2 ">
                                <span>Status</span>
                                <span className="">
                                    <Input id="status" type="checkbox" className=" h-6 w-4" ref={StatusRef} />
                                </span>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="video">Upload Video</Label>
                                <Input id="video" type="file" accept="video/*" ref={videoRef} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="pdf">Upload PDF</Label>
                                <Input id="pdf" type="file" accept=".pdf" ref={pdfRef} />
                            </div>  

                            <Button type="submit" className="w-full">{buttonName}</Button>
                        </div>
                    </form>    
                </CardContent>
            </Card>
        </div>
    )
}



