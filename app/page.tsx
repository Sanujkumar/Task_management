"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Home from "@/components/allTasks";

export default function main() {

  
  return (
    <>
    <Home/>
    </>
  );
}  



   
  
