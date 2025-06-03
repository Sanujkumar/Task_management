import { Skeleton } from "../components/ui/skeleton"
export default function allTasksSkelaton(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 space-y-6 p-10">
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         <Skeleton className="h-[150px] w-[250px] rounded-xl" />
         
    </div>
    )
}

