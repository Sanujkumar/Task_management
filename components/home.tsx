"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {datas.map((task) => (
        <div
          key={task.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-blue-600">{task.title}</h2>
          <p className="text-gray-700 mt-1">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Date: {new Date(task.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">Priority: {task.priority}</p>
          <p
            className={`text-sm font-semibold mt-2 ${
              task.status ? "text-green-600" : "text-red-600"
            }`}
          >
            Status: {task.status ? "Completed" : "Pending"}
          </p>
        </div>
      ))}  
    </div>
  );
}
