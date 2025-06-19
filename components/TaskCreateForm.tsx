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
import { taskSchema } from "../lib/zod";

import { any, date, z } from "zod";
import { Textarea } from "./ui/textarea";



export default function TaskCreate({ topTitle, buttonName, onSubmit, task, className,
    ...props }: any) {



    const { data: session, status } = useSession();
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const inDetailsRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLTextAreaElement>(null);
    const priorityRef = useRef<HTMLInputElement>(null);
    const StatusRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLInputElement>(null);
    const pdfRef = useRef<HTMLInputElement>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [inDetails, setInDetails] = useState("");
    const [price, setPrice] = useState("");
    const [skills, setSkills] = useState("");

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

    const validateField = (field: string, value: any) => {
        const singleFieldSchema = taskSchema.shape[field as keyof typeof taskSchema.shape];
        if (!singleFieldSchema) return;
        const result = singleFieldSchema.safeParse(value);

        setFormErrors((prev) => {
            const updated = { ...prev };
            if (!result.success) {
                updated[field] = result.error.errors[0].message;
            } else {
                delete updated[field];
            }
            return updated;
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

        const result = taskSchema.safeParse(taskData);

        if (!result.success) {
            const errorMap: Record<string, string> = {};
            const errors: any = result.error.format();
            for (const key in errors) {
                if (errors[key]?._errors?.[0]) {
                    errorMap[key] = errors[key]._errors[0];
                }
            }
            setFormErrors(errorMap);
            toast.error("Validation failed!");
            return;
        } else {
            setFormErrors({});
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
                                <Input
                                    id="title"
                                    ref={titleRef}

                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        validateField("title", e.target.value);
                                    }}
                                    className={`border p-2 ${formErrors.title ? "border-red-500" : "border-gray-500"}`}
                                />
                                <p className="text-sm text-gray-500">
                                    {title.length || 0}/50 characters
                                </p>
                                {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">description</Label>
                                <Input
                                    id="description"
                                    type="text"
                                    ref={descriptionRef}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        validateField("description", e.target.value);
                                    }}
                                    className={`border p-2 ${formErrors.description ? "border-red-500" : "border-gray-500"}`}
                                />
                                <p className="text-sm text-gray-500">
                                    {description.length || 0}/80 characters
                                </p>
                                {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="date">date</Label>
                                <Input id="date" type="date" ref={dateRef}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        validateField("date", e.target.value);
                                    }}
                                    className={`border p-2 ${formErrors.date ? "border-red-500" : "border-gray-500"}`}
                                />
                                <p className="text-sm text-gray-500">
                                    {date.length || 0}/10 characters
                                </p>
                                {formErrors.date && <p className="text-sm text-red-500">{formErrors.date}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="indetails">In-details</Label>
                                <Textarea id="InDetails" ref={inDetailsRef}
                                    onChange={(e) => {
                                        setInDetails(e.target.value);
                                        validateField("inDetails", e.target.value);
                                    }}
                                    className={`border p-2 h-20 ${formErrors.indetails ? "border-red-500" : "border-gray-500"}`}
                                />
                                <p className="text-sm text-gray-500">
                                    {inDetails.length || 0}/300 characters
                                </p>
                                {formErrors.inDetails && <p className="text-sm text-red-500">{formErrors.inDetails}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">price</Label>
                                <Input id="price" type="number" ref={priceRef}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        validateField("price", e.target.value);  
                                    }}
                                    className={`border p-2  ${formErrors.price ? "border-red-500" : "border-gray-500"}`}
                                />  
                                {formErrors.price && <p className="text-sm text-red-500">{formErrors.price}</p>}
                            </div>
                               
                        <div className="grid gap-2">    
                            <Label htmlFor="skills">skills</Label>
                            <Textarea  ref={skillsRef} 
                            onChange={(e) => {
                                        setSkills(e.target.value);
                                        validateField("skills", e.target.value);
                                    }}
                                    className={`border p-2 ${formErrors.skills ? "border-red-500" : "border-gray-500"}`}
                                />
                                <p className="text-sm text-gray-500">
                                    {skills.length || 0}/80 characters
                                </p>
                                {formErrors.skills && <p className="text-sm text-red-500">{formErrors.skills}</p>}
                            </div>
                           
                        <div className="grid gap-2">
                            <Label htmlFor="priority">priority</Label>
                            <Input id="priority" type="text" ref={priorityRef} 
                            className="p-2 border border-gray-500"
                            />
                        </div>
                        <div className="flex space-x-2 ">
                            <span>Status</span>
                            <span className="">
                                <Input id="status" type="checkbox" className=" h-6 w-4" ref={StatusRef}

                                 />
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
        </div >
    )
}



