"use client"
import AllProject from "../../../components/allProject"
import { Suspense } from "react";
import Alltaskskeletons from "../../../skeltons/alltaskSkelaton";
export default function AllProjects() {
    return (
        <Suspense fallback={<div><Alltaskskeletons/></div>}>
            <AllProject />
        </Suspense>   
    )
}       