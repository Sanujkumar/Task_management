"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Url } from "../lib/config";

import AllTasksSkelaton from "../skeltons/alltaskSkelaton";
import toast from "react-hot-toast";
interface TaskType {
  id: number;
  title: string;
  description: string;
  date: string;
  priority: string;
  status: boolean;
  userId: number;
  assigneeId?: number;
}

export default function Home() {
  const [datas, setData] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {data: session,status} = useSession();  
  const [currentPage,setCurrentPage] = useState<number>(1);

  const tasksPerPage = 4;
  
  useEffect(() =>{
    if(status==="unauthenticated"){
      alert("your are not login");
      router.push(`${Url}/auth/login`);  
    }
  },[]);  

  const AllTasShowkData = async () => {
    try {
      const res = await axios.get(`${Url}/api/function/task`, {
        withCredentials: true,
      });
      console.log(res.data.tasks);  
      setData(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllTasShowkData();
  }, []);

  const router = useRouter();
  const Update = (taskId:Number) => {
    router.push(`${Url}/pages/updateTask/${taskId}`);  
  }

  const DeleteTask = async (taskId: number) => {
    try {
      const res = await axios.post(`${Url}/api/function/task/delete`, { id: taskId }, {
        withCredentials: true,
      });  
      if (res.status === 200) {
        toast.success("your task is deleted succesful")
        AllTasShowkData();
      }
    } catch (error) {
      toast.error(`${error}`)
      console.error("Error deleting task:", error);
    }
  };

  if (loading){
    return(
    <AllTasksSkelaton/>
    )
  }  

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = datas.slice(indexOfFirstTask,indexOfLastTask);
  const totalPages = Math.ceil(datas.length/tasksPerPage);  

  const showdetails = () => {
        router.push("/pages/projectview");
    }

  return (   
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {currentTasks.map((task) => (
          <div
            key={task.id}
            className="pl-8 sm:p-4"    
          >   
            <Card onClick={showdetails} className="overflow-hidden w-65 h-50 sm:w-80 sm:h-50 hover:bg-gray-100 cursor-pointer">
              <CardContent className="">

                <CardTitle className="">{task.title}</CardTitle>
                <CardTitle>{task.description}</CardTitle>

                <p className="">
                  Date: {new Date(task.date).toLocaleDateString()}
                </p>
                <p className="">Priority: {task.priority}</p>
                <p
                  className={`text-sm font-semibold mt-2 ${task.status ? "text-green-600" : "text-red-600"
                    }`}
                >
                  Status: {task.status ? "Completed" : "Pending"}
                </p>
                <div className="flex gap-2 pt-2">
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => Update(task.id)}
                    >update</Button>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => DeleteTask(task.id)}
                    >Delete</Button>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                    >Assign</Button>
                  </div>
                </div>
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
