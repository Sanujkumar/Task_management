// "use client"

// import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Url } from "@/lib/config"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import toast from "react-hot-toast"
// import { useSession } from "next-auth/react"

// interface dataTypes {
//     id: number,
//     name: string,
//     image: string
// }

// export default function InboxProfile() {
//     const [datas, setDatas] = useState<dataTypes[]>([]);
//     const [loading, setLoading] = useState(false);
//     const {data:session,status} = useSession();
//     const [receiverId, setReceiverId] = useState<number | null>(null);

//     const getData = async () => {
//         try {
//             const res = await axios.get(`${Url}/api/function/messageProfile`, { withCredentials: true });
//             setDatas(res.data.data);
//             console.log("data", res.data.data);   
//             setLoading(true);
//         } catch (err) {
//             console.log(err);
//             toast.error(`${err}`);
//         }

//     }

//     useEffect(() => {
//         getData();
//     }, [])

//     // if (loading) {
//     //     return <div>Loading.......</div>
//     // }

//     const userId = session?.user.id;


//    const name = "U";

//     return (
//         <div className="h-screen w-full ">
//             <div className="h-full w-full bg-white  flex outline-2">
//                 <div className="inbox profile w-1/2 h-auto p-5 ">
//                     <div className="w-auto h-full bg-white outline-2 text-black p-2 space-y-4">
//                         <div>
//                             <Input placeholder="search" className="rounded-4xl border p-2 border-gray-500" />
//                         </div>
//                         <div className=" outline-2 rounded-md">
//                             <div className="space-y-2 max-h-[570px] overflow-hidden hover:overflow-y-auto p-2">
//                                 <div className="space-y-2">
//                                     {datas.map((data) => (
//                                         <div key={data.id}>
//                                             <div onClick={() => setReceiverId(data.id)} className="flex space-x-2 text-center">
//                                                 <Avatar className="w-18 h-18 sm:w-26 sm:h-26 border-2 border-black">
//                                                     {data?.image ? (
//                                                         <AvatarImage src={data.image} alt={data.name} />
//                                                     ) : (
//                                                         <AvatarFallback>{data.name.charAt(0).toUpperCase()}</AvatarFallback>
//                                                     )}
//                                                 </Avatar>  
//                                                 <p>{data.name}</p> 
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="inbox w-1/2 text-black outline-2 m-5">
//                     {open && (
//                         <Chatsection/>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }



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

interface selectUserType{
    name: string | "",
    image: string,
}

export default function InboxProfile() {
    const [datas, setDatas] = useState<dataTypes[]>([]);
    const [receiverId, setReceiverId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectUser,setSelectUser] = useState<selectUserType>();
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
                    </div>
                </div>


                <div className="inbox w-1/2 h-auto p-2 outline-2 ">
                    {receiverId && userId && selectUser && (
                        <Chatsection userId={userId} receiverId={receiverId} user={selectUser} />
                    )}
                </div>
            </div>
        </div>
    )
}
