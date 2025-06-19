"use client"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { getSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Url } from "../lib/config"
import toast from "react-hot-toast"
import Image from "next/image"
import { userSchema } from "../lib/zod";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const router = useRouter();


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const result = userSchema.safeParse({ email, password });

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

    console.log("dataf", email, password);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("res", res);
    if (res?.ok) {
      toast.success("login successfully");
      const session = await getSession();
      router.push(`${Url}`);
    }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-orange-400">Welcome back</h1>
                <p className="text-rose-300 ">
                  Login to your Task management account
                </p>
              </div>
              <div className="grid gap-3">
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
              <div className="grid gap-3">
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
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => signIn("github", { callbackUrl: "https://task-management-vkvv.onrender.com" })} variant="outline" type="button" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.58 0-.286-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.76-1.604-2.665-.3-5.466-1.334-5.466-5.932 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.522.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.654.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.628-5.476 5.922.43.372.814 1.102.814 2.222 0 1.604-.014 2.896-.014 3.293 0 .322.192.696.8.578C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Login with github</span>
                </Button>
                <Button onClick={() => signIn("google", { callbackUrl: "https://task-management-vkvv.onrender.com" })} variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>

              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
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
