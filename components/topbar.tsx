"use client"

import { Sheet, SheetTrigger, SheetContent } from "../components/ui/sheet"
import { Button } from "../components/ui/button"
import Link from "next/link"
import Dark from "../components/ui/dark";
import { IoIosNotifications } from "react-icons/io";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import TaskSection from "./taskSection";  
import { MdTask } from "react-icons/md";
import { Url } from "../lib/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Topbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
 
  const handleSignOut = async () => {
    toast.success("Signed out successfully"); 
    await signOut({ callbackUrl: "/" });      
  };
    
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 ">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-12 w-12" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">

          <Link href={Url} className="mr-6  p-4 lg:flex" prefetch={false}>
           <MdTask size={30}/>
            <span className="sr-only">Task management</span>
          </Link>

          <div className=" grid gap-2 py-6 px-4">
            <Link href={Url} className="text-bold underline-offset-4 hover:underline " prefetch={false}>
              Home
            </Link>
            <Link href={`${Url}/pages/AllProjects`} className="text-bold underline-offset-4 hover:underline" prefetch={false}>
            Projects
          </Link>
            {status === "unauthenticated" && (<>
              <Link href={`${Url}/auth/register`} className="flex text-bold underline-offset-4 hover:underline" prefetch={false}>
                Signup
              </Link>
              <Link href={`${Url}/auth/login`} className="text-bold underline-offset-4 hover:underline" prefetch={false}>
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
                onClick={handleSignOut}
              >signOut</Button>

               <Link href={`${Url}/pages/profile/profileShow/${session.user.id}`} className="text-bold underline-offset-4 hover:underline" prefetch={false}>
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
            <div onClick={() => router.push("/pages/inbox")} className="">
              <svg width="50px" height="60px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#98d97d" transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.624"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#41e6af" stroke-width="0.792" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>  
            <div className="mt-2">
            <Link
              href={`${Url}/pages/notification`}>    
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
          href={Url}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link href={`${Url}/pages/AllProjects`} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Projects
          </Link>
        {status === "unauthenticated" && (<>
          <Link href={`${Url}/auth/register`} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Signup
          </Link>
          <Link href={`${Url}/auth/login`} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
            Login
          </Link>
          
        </>
        )}

        {status === "authenticated" && (<>
          <Button
            variant="outline"
            size="sm"
            className="w-18"
            onClick={handleSignOut}
          >signOut</Button>

           <Link href={`${Url}/pages/profile/profileShow/${session.user.id}`} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
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
         <div onClick={() => router.push("/pages/inbox")} className="">
              <svg width="50px" height="60px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#98d97d" transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.624"></g><g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#41e6af" stroke-width="0.792" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>   
        <Link
          href={`${Url}/pages/notification`}>  
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


