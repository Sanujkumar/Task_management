import { Skeleton } from "../components/ui/skeleton"

export default function ProfileSkeleton() {
  return (
    <div className="flex  justify-center items-center space-x-4 pt-40 ">
      <Skeleton className="h-20 w-20 sm:h-30 sm:w-30 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[300px] " />
        <Skeleton className="h-6 w-[250px] " />
      </div>
    </div>   
  )
}
     