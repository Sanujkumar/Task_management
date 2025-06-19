"use client"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Url } from "../lib/config"
import toast from "react-hot-toast"
import Image from "next/image"
import { userSchema } from "../lib/zod";

export default function Signup({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validateField = (field: string, value: any) => {
        const singleFieldSchema = userSchema.shape[field as keyof typeof userSchema.shape];
        if (!singleFieldSchema) return;
        const result = singleFieldSchema.safeParse(value);

        setFormErrors((prev) => {
            const updated = { ...prev };
            if (!result.success) {
                updated[field] = result.error.errors[0].message;
            } else {
                delete updated[field];
            }
            return updated;
        });  
    };


    

    const handleSubmitSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const phone = phoneRef.current?.value;
        const name = nameRef.current?.value;


    const result = userSchema.safeParse({email,password,phone,name});

    if (!result.success) {
        const errorMap: Record<string, string> = {};
        const errors: any = result.error.format();
        for (const key in errors) {
            if (errors[key]?._errors?.[0]) {
                errorMap[key] = errors[key]._errors[0];
            }
        }
        setFormErrors(errorMap);
        toast.error("Validation failed!");
        return;
    } else {
        setFormErrors({});
    }  



        if (!email || !password || !phone || !name) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post(`${Url}/api/register`, {
                email,
                password,
                phone,
                name
            });

            if (res.status == 201) {
                toast.success("your are successfully signup");
                router.push(`${Url}/auth/login`);
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error) {
            toast.error(`${error}`)
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
                                    ref={emailRef}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateField("email", e.target.value)
                                    }}
                                     className={`border p-2  ${formErrors.email ? "border-red-500" : "border-gray-500"}`}
    
                                />
                                <p className="text-sm text-gray-500">
                                    {email.length || 0}/50 characters
                                </p>
                                {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    ref={passwordRef}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validateField("password", e.target.value)
                                    }}
                                     className={`border p-2  ${formErrors.password ? "border-red-500" : "border-gray-500"}`}
    
                                />
                                <p className="text-sm text-gray-500">
                                    {password.length || 0} / 4
                                </p>
                                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
                            </div>  
                            <div className="grid gap-2">
                                <Label htmlFor="email">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"  
                                    required
                                    ref={phoneRef}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        validateField("phone", e.target.value)
                                    }}
                                     className={`border p-2  ${formErrors.phone ? "border-red-500" : "border-gray-500"}`}
    
                                />
                                <p className="text-sm text-gray-500">
                                    {phone.length || 0} / 10
                                </p>
                                {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                            </div>  
                            <div className="grid gap-2">
                                <Label htmlFor="email">name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="name"
                                    required
                                    ref={nameRef}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        validateField("name", e.target.value)
                                    }}
                                     className={`border p-2  ${formErrors.name ? "border-red-500" : "border-gray-500"}`}
    
                                />
                                <p className="text-sm text-gray-500">
                                    {name.length || 0} / 30
                                </p>     
                                {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                            </div>  
                            <Button type="submit" className="w-full">
                                Signup
                            </Button>

                            <div className="text-center text-sm">
                                Do you have already an account?{" "}
                                <a href="/auth/login" className="underline underline-offset-4">
                                    Login
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            src="/images/leftsinup-image.png"
                            alt="Image"
                            fill
                            className="absolute inset-0 object-cover dark:brightness-[0.5] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
