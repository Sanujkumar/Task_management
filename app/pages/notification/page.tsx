"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotificationSkeleton from "../../../skeltons/notificationSkeleton";
import { Url } from "../../../lib/config";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { map } from "zod";


interface DataTypes {
  id: number,
  message: string,
  read: boolean,
  length: number,
  userId: number,
  sender: {
    id: number,
    name: string,
    image: string,
  }
}

export default function Notification() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [datas, setDatas] = useState<DataTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("your are not login");
      router.push(`${Url}`);
    }
  }, []);

  const notificationData = async () => {
    try {
      const res = await axios.get(`${Url}/api/function/notification`, {
        withCredentials: true,
      });
      setDatas(res.data.notification);
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

  if (loading) return <div><NotificationSkeleton /></div>;

  const messageRead = async (id: number,userId:number) => {
    try {
      await axios.patch(`${Url}/api/function/notificationRead/${id}/${userId}`, {}, { withCredentials: true });    
       
      setDatas((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );

    } catch (err) {
      console.log(err);
    }   
  }   
  return (
    <div className="bg-gray-100 min-h-screen p-4 ">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {datas.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <div className=" space-y-4">
          {datas.map((data) => (
            <div onClick={() => messageRead(data.id,data.userId)} key={data.id} className={`flex pl-4 cursor-pointer 
      ${data.read ? "bg-white" : "bg-blue-100"} 
      `}>
              <div className="flex items-center space-x-2">
                <div className=" p-2">
                  <div className=" flex justify-center">
                    <Avatar className="w-14 h-14 border-2 border-green-500 ">
                      {data.sender.image ? (
                        <AvatarImage src={data.sender.image} alt={data.sender.name} />
                      ) : (
                        <AvatarFallback>{data.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-black text-sm font-semibold">{data.sender.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-black text-md font-thin">{data.message}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
