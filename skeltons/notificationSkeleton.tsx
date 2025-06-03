import { Skeleton } from "../components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-4 ">
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
      <Skeleton className="h-[40px]  rounded-3xl" />
    </div>
  )
}
