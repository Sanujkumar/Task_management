"use client"

import { SessionProvider, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Profile() {
    return (
        <SessionProvider>
            <ProfileFunction />
        </SessionProvider>
    )
}

function ProfileFunction() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>User not logged in</div>;
    }

    const user = session.user;
    const name = user?.name || "U"; // fallback name
    const firstLetter = name.charAt(0).toUpperCase();
    console.log(user?.image);

    const router = useRouter();
    const ShowALlTasks = () => {
        router.push("/pages/allTasks");    
    }

    return (
        <div className="bg-gray-100 h-screen w-full flex items-center justify-center">
            <div className="h-4/5 w-full ">
                <div className="flex flex-row p-5 gap-6 bg-yellow-100 m-10 rounded-4xl ">
                    <div className=" flex flex-col justify-center text-center ">
                        <div>
                            <span className="">your profile</span>
                            <div>
                            <Avatar className="w-26 h-26">
                                {user?.image ? (
                                    <AvatarImage
                                        src={user?.image}
                                        alt={name}
                                    />
                                ) : (<AvatarFallback>{firstLetter}</AvatarFallback>)}

                            </Avatar>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{name}</h1>
                        </div>
                    </div>
                    <div >
                        <div className="flex-block gap-4 sm:flex">
                        <span>email=</span>
                        <p className="text-sm text-gray-700">{user?.email}</p>
                        </div>
                        <div className="pt-4">
                        <Button onClick={ShowALlTasks}>AllTasks</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
