
import { Skeleton } from "../components/ui/skeleton"
export default function ProjectVDSkeleton(){
    return(
        <div className="grid grid-cols-1 space-y-4 p-10">
         <Skeleton className="h-[300px] w-auto rounded-xl" />
         <Skeleton className="h-[200px] w-auto rounded-xl" />
    </div>  
    )
}

