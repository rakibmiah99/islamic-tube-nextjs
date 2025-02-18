import {AspectRatio} from "../ui/aspect-ratio";
import {Skeleton} from "../ui/skeleton";

export function SmallThumbnailSkeleton(props){
    return <>
        <div  className={props.className}>
            <div className='flex'>
                <div className="basis-5/12">
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton className='h-full w-full'/>
                    </AspectRatio>
                </div>

                <div className="basis-7/12 px-2 space-y-3">
                    <Skeleton className='h-7 w-full'/>
                    <Skeleton className={'h-5'}></Skeleton>
                    <div className="flex space-x-2 justify-between">
                        <Skeleton className="h-4 w-[47%]"/>
                        <Skeleton className="h-4 w-[47%]"/>
                    </div>
                </div>
            </div>
        </div>
    </>
}