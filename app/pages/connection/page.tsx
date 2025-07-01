"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Url } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import FriendReq from "@/components/friendReq";

interface DataTypes {
    id: number,
    name: string,
    image: string,
    UserDetailInfo: {
        about: string,
    }
}

export default function Connection() {
    const [datas, setDatas] = useState<DataTypes[]>([]);
    const [loading, setLoading] = useState(true);
    const [friendStatus, setFriendStatus] = useState<{ [key: number]: boolean }>({});

    const getData = async () => {
        try {
            const res = await axios.get(`${Url}/api/function/showConnection`, { withCredentials: true });
            setDatas(res.data.data);
            console.log("datas", res.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
  
    useEffect(() => {
        getData();
    }, []);

     

    if (loading) {
        return <div className="text-center">Loading......</div>
    }
    return (
        <div className="h-screen w-full">
            <div className="p-5">
                    <FriendReq/>
            </div>
            <div className="w-full h-full p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-4 sm:space-x-4">
                
                {datas?.map((data) => (
                    <div className="" key={data.id}>
                        <Card className="w-[280px] h-[320px] flex flex-col justify-between overflow-hidden shadow-md">
                            <CardHeader className="flex flex-col items-center text-center space-y-2">
                                <CardTitle>
                                    <Avatar className="w-20 h-20 border-2 border-black hover:cursor-pointer">
                                        {data.image ? (
                                            <AvatarImage src={data.image} alt={data.name} />
                                        ) : (
                                            <AvatarFallback>{data.name.charAt(0).toUpperCase()}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-lg text-black">{data.name}</p>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-4 text-center">
                                <p className="line-clamp-2 text-sm text-gray-500">
                                    {data.UserDetailInfo?.about}
                                </p>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    onClick={async () => {
                                        try {
                                            if (!friendStatus[data.id]) { 
                                                await axios.post(`${Url}/api/function/connection/${data.id}`, { withCredentials: true });
                                                toast.success("Friend request sent");
                                            } else {
                                               
                                                await axios.delete(`${Url}/api/function/connection/${data.id}`, {
                                                    withCredentials: true
                                                });

                                                toast.success("Friend request cancelled");
                                            }

                                            
                                            setFriendStatus((prev) => ({
                                                ...prev,
                                                [data.id]: !prev[data.id],
                                            }));
                                        } catch (err) {
                                            console.error(err);
                                            toast.error("Something went wrong");
                                        }
                                    }}
                                    className="w-full rounded-full hover:cursor-pointer bg-white text-black border p-2 border-black hover:bg-gray-400"
                                >
                                    {friendStatus[data.id] ? "Request" : "Friends"}
                                </Button>


                            </CardFooter>
                        </Card>

                    </div>
                ))}

            </div>
        </div>

    )
}   