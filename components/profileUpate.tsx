


"use client"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Url } from "../lib/config"
import { useSession } from "next-auth/react"

type Props = {
  userId: string | string[];
} & React.ComponentProps<"div">;

export default function ProfileUpdateForm({ className, userId, ...props }: Props) {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const skiilsRef = useRef<HTMLInputElement | null>(null);
    const aboutRef = useRef<HTMLInputElement | null>(null);  

    const {data:session,update} = useSession();

    const handleSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const phone = phoneRef.current?.value;
        const skills = skiilsRef.current?.value;
        const about = aboutRef.current?.value;

        try {
            const res = await axios.put(`${Url}/api/function/profileEdit/${userId}`, {
                name,
                phone,   
                skills,
                about
            },{withCredentials:true});  
   
            if (res.status === 200) {
                alert("Profile updated successfully!");  
                router.push(`${Url}/pages/profile/profileShow/${userId}`);
            } else {
                alert("something went wrong");
            }
        } catch (error) {
            console.log("something went wrong", error);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden ">
                <CardContent className="grid p-0 ">
                    <form onSubmit={handleSubmitSignup} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6 ">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Update profile</h1>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name"  ref={nameRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel"  ref={phoneRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skills">Skills</Label>
                                <Input id="skills"  ref={skiilsRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skills">About</Label>
                                <Input id="skills"  ref={aboutRef} />
                            </div>
                            <Button type="submit" className="w-full">Update</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )  
}

   