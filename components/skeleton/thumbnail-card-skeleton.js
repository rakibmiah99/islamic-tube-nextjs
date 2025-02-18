import { Skeleton } from "@/components/ui/skeleton"
import {Button} from "../ui/button";
import {Loader2} from "lucide-react";

export function ThumbnailCardSkeleton() {
    return <>
        {
            new Array(12).fill(0).map((_, i) => (
                <div key={i} className='basis-4/4 md:basis-2/4 w-full lg:basis-1/3 xl:basis-1/4 '>
                    <div className="p-2">
                        <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[168px] w-full rounded"/>
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-full"/>
                                <div className='flex justify-between items-center'>
                                    <Skeleton className="h-3 w-[47%]"/>
                                    <Skeleton className="h-3 w-[47%]"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }

        <div className="flex justify-center items-center w-full py-7">
            <Button variant={'ghost'} disabled>
                <Loader2 className="animate-spin" />
                Please wait
            </Button>
        </div>

    </>
}