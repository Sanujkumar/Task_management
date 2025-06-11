import { Skeleton } from "../components/ui/skeleton"

export default function ProfileSkeleton() {
  return (
    <div className="space-x-2 ">
      <div>
        <div>
          <Skeleton className="h-60 w-auto m-10 rounded-4xl" />
        </div>
        <div>
          <Skeleton className="h-60 w-auto rounded-4xl m-10"/>
        </div>
      </div>
    </div>
  )
}
