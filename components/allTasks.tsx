"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

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

  const TaskData = async () => {
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
    TaskData();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <div className="">
        {datas.map((task) => (
          <div
            key={task.id}
            className=""
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

              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
