"use client"

import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet"
import { Button } from "../components/ui/button"
import Link from "next/link"
import Dark from "../components/ui/dark";
import { IoIosNotifications } from "react-icons/io";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import TaskSection from "./taskSection";  
import { MdTask } from "react-icons/md";

export default function Topbar() {


  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  );
}

function Component() {
  const { data: session, status } = useSession();
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-12 w-12" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">

          <Link href="https://task-management-vkvv.onrender.com/" className="mr-6  p-4 lg:flex" prefetch={false}>
           <MdTask size={30}/>
            <span className="sr-only">Task management</span>
          </Link>

          <div className=" grid gap-2 py-6 px-4">
            <Link href="https://task-management-vkvv.onrender.com/" className="text-bold underline-offset-4 hover:underline " prefetch={false}>
              Home
            </Link>
            <Link href="https://task-management-vkvv.onrender.com/pages/AllProjects" className="text-bold underline-offset-4 hover:underline" prefetch={false}>
            Projects
          </Link>
            {status === "unauthenticated" && (<>
              <Link href="https://task-management-vkvv.onrender.com/auth/register" className="flex text-bold underline-offset-4 hover:underline" prefetch={false}>
                Signup
              </Link>
              <Link href="https://task-management-vkvv.onrender.com/auth/login" className="text-bold underline-offset-4 hover:underline" prefetch={false}>
                Login
              </Link>
            </>
            )}

            {status === "authenticated" && (
              <>
              <Button
                variant="link"
                size="sm"
                className="w-18 pr-8"
                onClick={() => signOut()}
              >signOut</Button>

               <Link href="https://task-management-vkvv.onrender.com/pages/profile" className="text-bold underline-offset-4 hover:underline" prefetch={false}>
              Profile
            </Link>
              </>
            )}

            <div className=" ">
              <TaskSection/>
            </div>
            
  
            <div className="mt-2">
              <Dark />
            </div>
            <div className="mt-2">
            <Link
              href="https://task-management-vkvv.onrender.com/pages/notification">
               <IoIosNotifications size={36} />
            </Link>
            </div>
          </div>    
        </SheetContent>
      </Sheet>

      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <MdTask size={40}/>
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        <Link
          href="https://task-management-vkvv.onrender.com"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link href="https://task-management-vkvv.onrender.com/pages/AllProjects" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Projects
          </Link>
        {status === "unauthenticated" && (<>
          <Link href="https://task-management-vkvv.onrender.com/auth/register" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Signup
          </Link>
          <Link href="https://task-management-vkvv.onrender.com/auth/login" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Login
          </Link>
          <Link href="https://task-management-vkvv.onrender.com/pages/profile" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Profile
            </Link>
        </>
        )}

        {status === "authenticated" && (<>
          <Button
            variant="outline"
            size="sm"
            className="w-18"
            onClick={() => signOut()}
          >signOut</Button>

           <Link href="https://task-management-vkvv.onrender.com/pages/profile" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Profile
            </Link>
            </>
        )}


        <div>
         <TaskSection/>
        </div>

        <div>
          <Dark />
        </div>
        <Link
          href="https://task-management-vkvv.onrender.com/pages/notification">
           <IoIosNotifications size={36} />
        </Link>
      </nav>
    </header>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}  