"use client"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';





export default function Signup({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
  
    const handleSubmitSignup = async (e:React.FormEvent) => {
         e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const phone = phoneRef.current?.value;    
        const name = nameRef.current?.value;

        
        if (!email || !password || !phone || !name) {
            alert("Please fill all fields");
            return;  
        }
        try {
            const res = await axios.post("https://task-management-vkvv.onrender.com/api/register", {
                email,
                password,
                phone,    
                name
            });  
      
            if (res.status == 201) {
                router.push("https://task-management-vkvv.onrender.com/auth/login");
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.log("something went wrong", error);
        }
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmitSignup} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create to your Task management account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    ref={emailRef}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"  
                                    required
                                    ref={phoneRef}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="name"
                                    required
                                    ref={nameRef}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Signup
                            </Button>

                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
