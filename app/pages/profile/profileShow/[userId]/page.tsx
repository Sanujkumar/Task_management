


"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "../../../../../skeltons/profileSkeleton";
import { Url } from "../../../../../lib/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { link } from "fs";

export default function Profile() {
    return <ProfileFunction />;
}

function ProfileFunction() {
    const { data: session, status } = useSession();
    const router = useRouter();


    interface dataTypes {
        name: string;
        email: string;
        phone: number;
        skills: string;
        about: string;
    }

    const [data, setData] = useState<dataTypes>();
    const user = session?.user;
    const userId = user?.id;

    const profileData = async () => {
        const res = await axios.get(`${Url}/api/function/profile/${userId}`, {
            withCredentials: true,
        });
        setData(res.data.data);
        console.log(res.data.data);
    };



    useEffect(() => {
        if (userId) profileData();
    }, [userId]);

    const ShowAllTasks = () => {
        router.push(`${Url}/pages/allTasks`);
    };



    if (status === "loading") {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return <div>User not logged in</div>;
    }
    console.log("name", data?.name);
    const name = data?.name || "U";
    const firstLetter = name.charAt(0).toUpperCase();

    return (
        <div className="bg-gray-100 h-screen w-full pt-10">
            <div className="h-4/5 w-full ">
                <div>
                    <div className="flex flex-row p-5 gap-6 bg-white m-2 rounded-4xl ">
                        <div className="flex flex-col justify-center text-center">
                            <div>
                                <span className="">your profile</span>
                                <div>
                                    <Avatar className="w-18 h-18 sm:w-26 sm:h-26">
                                        {user?.image ? (
                                            <AvatarImage src={user.image} alt={name} />
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
                            <div className="pt-8">
                                <Button onClick={ShowAllTasks}>AllTasks</Button>
                            </div>
                        </div>
                    </div>
                    <div className=" p-8  bg-white m-2 rounded-4xl space-y-4">
                        <div>
                            <Label className="pb-2 ">your skills</Label>
                            {data?.skills ? (
                                <p className="text-md text-gray-700"> {data.skills}</p>
                            ) : (
                                <p className="text-sm text-gray-400">No skills added yet.</p>
                            )}
                        </div>
                        <div>
                            <Label className="pb-2 ">About</Label>
                            {data?.about ? (   
                                <p className="text-md text-gray-700">{data?.about}</p>
                            ):(
                                <p className="text-gray-400 text-sm">this about section </p>
                            )}
                        </div>
                        <div className="">
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
        </div>
    );
}

