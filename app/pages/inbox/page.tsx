
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Url } from "@/lib/config"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import Chatsection from "../../../components/chatSection"
import { useRouter } from "next/navigation"


interface dataTypes {
    id: number,
    name: string,
    image: string
}

interface selectUserType {
    name: string
    image: string,
}

export default function InboxProfile() {
    const [datas, setDatas] = useState<dataTypes[]>([]);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectUser, setSelectUser] = useState<selectUserType>();
    const [redDot, setRedDot] = useState(true);
    const [hide,setHide] = useState(false);
    const { data: session, status } = useSession();

    const router = useRouter();
   
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("your are not login");
            router.push(`${Url}`);
        }     
    }, []);  
      

    const userId = Number(session?.user.id);

    const getData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/messageProfile`, { withCredentials: true });
            setDatas(res.data.data);
        } catch (err) {
            console.log(err);    
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const handlefocus = () => {
        setRedDot(false);
    }

    return (
  <div className="h-screen w-full">
    <div className="flex h-full w-full bg-white text-black">

      <div
        className={`
          inbox-profile w-full sm:w-1/2 p-5 
          ${hide ? "hidden sm:block" : "block"}
        `}
      >
        <Input placeholder="Search" className="rounded-4xl border p-2 border-gray-500 mb-4" />
        <div className="space-y-2 max-h-[570px] overflow-hidden hover:overflow-y-auto">
          {datas.map((data) => (
            <div key={data.id}>
              <div
                onClick={() => {
                  setReceiverId(data.id);
                  setSelectedUserId(data.id);
                  setSelectUser(data);
                  handlefocus();
                  setHide(true); 
                }}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors
                  ${selectedUserId === data.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
              >
                <Avatar className="w-12 h-12 border-2 border-black">
                  {data.image ? (
                    <AvatarImage src={data.image} alt={data.name} />
                  ) : (
                    <AvatarFallback>{data.name.charAt(0).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <p>{data.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div
        className={`
          chat-section w-full sm:w-1/2 h-full 
          ${hide ? "block" : "hidden sm:block"}
        `}
      >
        {receiverId && userId && selectUser && (
          <div className="h-full">
            
            <button
              className="block sm:hidden px-4 py-2 text-blue-600 hover:text-black"
              onClick={() => setHide(false)}
            >
              ← Back
            </button>
            <Chatsection
              userId={userId}
              receiverId={receiverId}
              user={selectUser}
              setRedDot={setRedDot}
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
}