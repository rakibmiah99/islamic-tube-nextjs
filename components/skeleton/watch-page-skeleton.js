import {Skeleton} from "../ui/skeleton";
import {SmallThumbnailSkeleton} from "./small-thumbnail-skeleton";

export function WatchPageSkeleton(){
    return <>
        <div className="md:flex">
            <div className="basis-8/12 space-y-3 md:pe-3">

                <Skeleton className="player md:h-[450px] h-[200px] w-full"/>

                <Skeleton className="h-8 w-full"/>
                <div className="flex space-x-4 justify-between">
                    <Skeleton className="h-3 w-[47%]"/>
                    <Skeleton className="h-3 w-[47%]"/>
                </div>

                <div className="grid md:grid-cols-6 lg:grid-8 grid-cols-3 gap-2">
                    <Skeleton className="h-10"/>
                    <Skeleton className="h-10"/>
                    <Skeleton className="h-10"/>
                    <Skeleton className="h-10"/>
                </div>

                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-full"/>


            </div>
            <div className="basis-4/12">
                {new Array(6).fill(0).map((item, index) => (
                    <SmallThumbnailSkeleton
                        key={index}
                        className="basis-4/12 mb-3 block"
                    />
                ))}
            </div>
        </div>
    </>
}