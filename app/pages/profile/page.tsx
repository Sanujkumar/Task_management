"use client"

import { SessionProvider, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    return (
        <div className="bg-yellow-200 h-screen w-full flex items-center justify-center">
            <div className="flex flex-col space-y-4 bg-slate-400 h-1/2 w-2/3">
                <div className="flex flex-row p-10">
                    <div className="">
                        <span className="">your profile</span>
                        <Avatar className="w-26 h-26">
                            {user?.image ? (
                                <AvatarImage
                                    src={user?.image}
                                    alt={name}
                                />
                            ) : (<AvatarFallback>{firstLetter}</AvatarFallback>)}

                        </Avatar>
                        <h1 className="text-xl font-semibold">{name}</h1>
                    </div>
                    <div>
                        <span>email</span>
                        <p className="text-sm text-gray-700">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
