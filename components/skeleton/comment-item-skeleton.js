import {Skeleton} from "../ui/skeleton";

export function CommentItemSkeleton() {
    return <>
        <li className="comments-list__item flex space-x-2">
            <Skeleton className='h-[45px] w-[45px] rounded-full'/>
            <div>
                <Skeleton className={'h-3'}/>
                <Skeleton className={'h-5'}/>
            </div>
        </li>
    </>
}