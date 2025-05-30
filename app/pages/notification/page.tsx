"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";  
import NotificationSkeleton from "@/skeltons/notificationSkeleton";  
export default function Notification() {

  const {data:session,status} = useSession();
  const router = useRouter();  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    if(status==="unauthenticated"){
      alert("your are not login");
      router.push("/auth/login");
    }
  },[]);    

  const notificationData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notification", {
        withCredentials: true,
      });
      setData(res.data.notification);
      console.log(res.data.notification);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    notificationData();
  }, []);

  if (loading) return <div><NotificationSkeleton/></div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {data.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <div className="gap-4">
          <ul className="">
            {data.map((item: any, index: number) => (
              <li key={index} className="bg-white p-2 rounded-2xl hover:bg-gray-200 shadow">
                {item.message }
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
