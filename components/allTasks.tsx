"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "inspector/promises";
import AllTasksSkelaton from "@/skeltons/alltaskSkelaton";
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

  useEffect(() =>{
    if(status==="unauthenticated"){
      alert("your are not login");
      router.push("/auth/login");  
    }
  },[]);  

  const AllTasShowkData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/task", {
        withCredentials: true,
      });
      setData(res.data.tasks || res.data);
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
    router.push(`http://localhost:3000/pages/updateTask/${taskId}`);  
  }

  const DeleteTask = async (taskId: number) => {
    try {
      const res = await axios.post("http://localhost:3000/api/task/delete", { id: taskId }, {
        withCredentials: true,
      });  
      if (res.status === 200) {
        alert("Deleted successfully");
        AllTasShowkData();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading){
    return(
    <AllTasksSkelaton/>
    )
  }  

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {datas.map((task) => (
          <div
            key={task.id}
            className="p-4"  
          >
            <Card className="overflow-hidden w-80 h-50">
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
    </div>
  );
}
