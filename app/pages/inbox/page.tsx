
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Url } from "@/lib/config"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import Chatsection from "../../../components/chatSection" // adjust import path if needed

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
    const [redDot,setRedDot] = useState(true);  
    const { data: session } = useSession();

    const userId = Number(session?.user.id);

    const getData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/messageProfile`, { withCredentials: true });
            setDatas(res.data.data);
        } catch (err) {
            console.log(err);
            toast.error(`${err}`);
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
            <div className="h-full w-full bg-white flex outline-2">

                <div className="inbox profile w-1/2 h-auto p-5 ">
                    <div className="w-auto h-full bg-white outline-2 text-black p-2 space-y-4">
                        <Input placeholder="Search" className="rounded-4xl border p-2 border-gray-500" />
                        <div className="outline-2 rounded-md">
                            <div className="space-y-2 max-h-[570px] overflow-hidden hover:overflow-y-auto p-2">
                                {datas.map((data) => (
                                    <div key={data.id}>
                                        <div
                                            onClick={() => {
                                                setReceiverId(data.id);
                                                setSelectedUserId(data.id);
                                                setSelectUser(data);
                                                onfocus =(handlefocus);
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
                                            {/* {redDot && (
                                                <p className="w-10 h-10 bg-red-500 rounded-full border border-white "></p>  
                                            )}  
                                             */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className=" w-1/2 h-auto p-1 ">
                    {receiverId && userId && selectUser && (
                        <Chatsection userId={userId} receiverId={receiverId} user={selectUser} setRedDot={setRedDot} />
                    )}
                </div>
            </div>
        </div>    
    )
}
