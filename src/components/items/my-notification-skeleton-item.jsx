import { Skeleton } from "@/components/ui/skeleton"

const MyNotification_SkeletonItem = () => {
    return ( 
        <div className="flex items-center w-full p-4 mb-1 shadow-md border dark:bg-[#1D232A] rounded-md">
            <Skeleton className="size-14 rounded-full" />
            <div className="pl-3 space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-1">
                    <Skeleton className="h-3 w-96" />
                    <Skeleton className="h-3 w-3/4" />
                </div>
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
     );
}
 
export default MyNotification_SkeletonItem;