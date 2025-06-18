


"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "../../../../../skeltons/profileSkeleton";
import { Url } from "../../../../../lib/config";
import axios from "axios";
import { useEffect, useState } from "react";



import toast from "react-hot-toast";
import ProfileDetailInfo from "@/components/ProfileDetailInfo";

interface dataTypes {
    name: string;
    email: string;
    phone: number;
    skills: string;
    about: string;
    image: string;
}


export default function ProfileFunction() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dataTypes>();
    const router = useRouter();




    const user = session?.user;
    const userId = user?.id;

    const profileData = async () => {
        const res = await axios.get(`${Url}/api/function/profile/${userId}`, {
            withCredentials: true,
        });
        setData(res.data.data);
        setLoading(false);
        console.log(res.data.data);
    };



    useEffect(() => {
        if (userId) profileData();
    }, [userId]);

    const ShowAllTasks = () => {
        router.push(`${Url}/pages/allTasks`);
    };



    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        toast.error("you are not login so please login")
        return router.push("/auth/login");
    }
    console.log("name", data?.name);
    const name = data?.name || "U";
    const firstLetter = name.charAt(0).toUpperCase();


    return (
        <div className="bg-gray-100 h-screen w-full">
            <div className="h-full w-full p-4">
                <div className="bg-white h-auto w-auto outline-1 p-4 space-y-4">
                    <div className="flex flex-row p-5 gap-6 bg-white   rounded-4xl outline-1 ">
                        <div className="flex flex-col justify-center text-center">
                            <div>
                                <span className="">your profile</span>
                                <div className="">
                                    <Avatar className="w-18 h-18 sm:w-26 sm:h-26 border-2 border-black">
                                        {data?.image ? (
                                            <AvatarImage src={data.image} alt={name} />
                                        ) : (
                                            <AvatarFallback>{firstLetter}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </div>
                            </div>
                            <div>
                                <h1 className=" text-smsm:text-xl font-semibold">{name}</h1>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl ">contact details</h1>
                            <div className="flex gap-x-2 sm:flex">
                                <span>email =</span>
                                <p className="text-sm text-gray-700">{user.email}</p>
                            </div>
                            <div className="flex gap-x-2">
                                <span>phone no =</span>
                                <div>{data?.phone}</div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="pt-8">
                                    <Button onClick={ShowAllTasks}>AllTasks</Button>
                                </div>
                                <div className="pt-8">
                                    <Button
                                        onClick={() =>
                                            router.push(`${Url}/pages/profile/profileUpdateForm/${userId}`)
                                        }

                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" p-5  bg-white rounded-4xl  outline-1 ">
                        <div>
                            <ProfileDetailInfo />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

