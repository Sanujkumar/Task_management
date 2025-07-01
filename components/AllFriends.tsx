
"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


import { useEffect, useState } from "react";
import axios from "axios";
import { Url } from "@/lib/config";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";


interface DataType {
    id: number;
    userId: number;
    friendId: number;
    friend: {
        id: number;
        name: string;
        image: string;
    };
}

export default function AllFriends() {
    const [datas, setDatas] = useState<DataType[]>([]);
    const [showFriends, setShowFriends] = useState(false);
    const [remove,setRemove] = useState(false);  

    const getData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/allFriends`, {
                withCredentials: true,
            });
            setDatas(res.data.data);
            console.log("datas", res.data);
        } catch (err) {
            console.error("Error fetching friends:", err);
        }
    };

    useEffect(() => {
        getData();
    }, [showFriends,remove]);  

    const handleRemove = async (friendId: number) => {
        await axios.delete(`${Url}/api/function/allFriends`, {
            data: { friendId },
            withCredentials: true
        });   
        setRemove(true);  
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-white border-2 border-green-400 text-green-500 hover:bg-gray-600 rounded-4xl " size='lg' onClick={() => setShowFriends(true)}>Friends<span className="text-blue-700">{datas.length}</span></Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your friends</SheetTitle>
                </SheetHeader>

                {showFriends && (
                    <div className="p-2 space-y-4 max-h-100  overflow-y-auto">
                        {datas?.length > 0 ? (
                            datas.map((data) => (
                                <div
                                    key={data.friend.id}
                                    className="flex items-center border-1 border-gray-600 p-4 rounded-full shadow-md justify-between hover:cursor-pointer"
                                > <div className="flex flex-rpw sm:flex-row space-x-2 ">
                                        <Avatar className="w-12 h-12 border-2 border-green-500">
                                            {data.friend.image ? (
                                                <AvatarImage src={data.friend.image} alt={data.friend.name} />
                                            ) : (
                                                <AvatarFallback>
                                                    {data.friend.name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className=" flex items-center">
                                            <p className="font-medium text-sm line-clamp-1">{data.friend.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={() => handleRemove(data.friend.id)} size="sm" className="bg-white border p-2 border-green-400 text-green-500 hover:bg-gray-600">remove</Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">
                                No friends found.
                            </p>
                        )}
                    </div>
                )}

            </SheetContent>
        </Sheet>
    )
}  
