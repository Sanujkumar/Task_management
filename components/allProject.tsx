



"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AllTasksSkelaton from "../skeltons/alltaskSkelaton";  
import { Url } from "../lib/config";
import toast from "react-hot-toast";



interface TaskType {
    id: number;
    title: string;
    description: string;
    date: string;
    priority: string;
    price: number,
    status: boolean;
    userId: number;
    assigneeId?: number;
}


export default function Home() {
    const [datas, setData] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const tasksPerPage = 4;

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            alert("You are not logged in");
            router.push(`${Url}/auth/login`);
        }
    }, [status]);

    const AllTasShowkData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/task/showAllTasks`, {
                withCredentials: true,
            });

            const allTasks = res.data.Alltask
            setData(allTasks);
            toast.success("show all your task")
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };  

    useEffect(() => {
        AllTasShowkData();
    }, []);

    if (loading) return <AllTasksSkelaton />;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = datas.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(datas.length / tasksPerPage);
    const user = session?.user;
    const name = user?.name || "U";
    const firstLetter = name?.charAt(0).toUpperCase(); 

    const showdetails = () => {
        router.push("/pages/projectsViewDetails");
    }  

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {currentTasks.map((task) => (
                    <div key={task.id} className="pl-8 sm:p-4">
                        <Card onClick={showdetails} className="overflow-hidden w-65 h-50 sm:w-80 sm:h-50  hover:bg-gray-100 cursor-pointer ">
                            <CardContent>
                                
                                <CardTitle>{task.title}</CardTitle>
                                <CardTitle>{task.description}</CardTitle>
                                <p>Date: {new Date(task.date).toLocaleDateString()}</p>
                                <p>price: {task.price}</p>
                                <p>Priority: {task.priority}</p>
                                <p className={`text-sm font-semibold mt-2 ${task.status ? "text-green-600" : "text-red-600"}`}>
                                    Status: {task.status ? "Completed" : "Pending"}
                                </p>
                                
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <span className="px-3 py-1 border rounded">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
