"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import axios from "axios";
import { Url } from "@/lib/config";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";

interface DataType {
    id: number,
    receiverId: number,
    sender: {
        id: Number,
        name: string,
        image: string
    }
}
export default function FriendReq() {
    const [datas, setDatas] = useState<DataType[]>([]);
    const [receiverId,setreceiverId] = useState();

    const getData = async () => {
        const res = await axios.get(`${Url}/api/function/friendReq`, { withCredentials: true });
        setDatas(res.data.data);
        console.log(res.data);
    }

    useEffect(() => {
        getData();
    }, []);

    // const handleAccept = async () => {
    //     try{
    //         const res = await axios.delete(`${Url}/api/function/`)
    //     }   
    // }

    return (
        <div className="max-h-80 w-auto  p-4 flex flex-col overflow-y-scroll">
            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {datas.map((data) => (
                    <div className="" key={data.id} >
                        <Card className="flex flex-row items-center pl-2 w-60">
                            <CardTitle className="flex flex-col items-center">
                                <Avatar className="w-12 h-12 border-2 border-black">
                                    {data.sender.image ? (
                                        <AvatarImage src={data.sender.image} alt={data.sender.name} />
                                    ) : (
                                        <AvatarFallback>{data.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    )}
                                </Avatar>
                                <CardDescription>
                                    <p className="text-black">{data.sender.name}</p>
                                </CardDescription>
                            </CardTitle>

                            <CardFooter>
                                <Button size="sm" className="bg-white border p-2 border-green-400 text-green-500 hover:bg-gray-700">Accept</Button>
                            </CardFooter>
                        </Card>
   
                    </div>
                ))}
            </div>
        </div>
    )
}