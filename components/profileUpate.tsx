


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
import toast from "react-hot-toast"

type Props = {
    userId: string | string[];
} & React.ComponentProps<"div">;

export default function ProfileUpdateForm({ className, userId, ...props }: Props) {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const skiilsRef = useRef<HTMLInputElement | null>(null);
    const aboutRef = useRef<HTMLInputElement | null>(null);
    const profielImgRef = useRef<HTMLInputElement | null>(null);

    const { data: session, update } = useSession();

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };


    const handleSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        const phone = phoneRef.current?.value;
        const skills = skiilsRef.current?.value;
        const about = aboutRef.current?.value;
        const profileImg = profielImgRef.current;

        const image = profielImgRef.current?.files?.[0];
        const imageBase64 = image ? await fileToBase64(image) : null;
        const extension = image?.name.split('.').pop();
        console.log("frontend",image,imageBase64,extension);



        try {

            const res = await axios.put(`${Url}/api/function/profileEdit/${userId}`, {
                name,
                phone,
                skills,
                about,
                imageBase64,
                extension
            }, { withCredentials: true });

            if (res.status === 200) {
                toast.success("successfuly update your profile");
                profielImgRef.current!.value = "";  
                router.push(`${Url}/pages/profile/profileShow/${userId}`);
            } else {
                toast.error("something went wrong");
            }
        } catch (error) {
            toast.error(`${error}`);
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
                                <Input id="name" ref={nameRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" ref={phoneRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="skills">Skills</Label>
                                <Input id="skills" ref={skiilsRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="about">About</Label>
                                <Input id="about" ref={aboutRef} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="profile-img">Profile Img</Label>
                                <Input id="profile-img" type="file" accept="image/*" ref={profielImgRef} />
                            </div>
                            <Button type="submit" className="w-full">Update</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

