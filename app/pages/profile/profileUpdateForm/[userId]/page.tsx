"use client"
import ProfieUpdate from "../../../../../components/profileUpate"
import { useParams } from "next/navigation"

export default function profileUpdatForm() {
    const params = useParams();
    const userId = params.userId as string
    console.log(userId);

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <ProfieUpdate userId={userId} />
            </div>
        </div>
    )
}  

