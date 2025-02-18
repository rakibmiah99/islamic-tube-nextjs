import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {IoEye} from "react-icons/io5";
import {Clock, Eye} from "lucide-react";

export default function ThumbnailCard(props) {
    const data = props.data;
    return <>
        <Card  className={props.className}>
            <CardContent className='p-0'>
                <AspectRatio ratio={16 / 9}>
                    <Image layout='fill' src={data.thumbnail} alt={data.title} className="rounded-md object-cover" />
                </AspectRatio>
                <div className='py-3 px-1 pb-1'>
                    <CardTitle className='text-md font-normal line-clamp-2'>{data.title}</CardTitle>
                    <CardDescription className='mt-2 text-[14px] xl:text-[13px]  flex justify-between items-center'>
                        <div className=' flex  items-center'>
                            <Eye className='me-1 size-[14px] xl:size-[12px]'/>
                            <span title='' className='line-clamp-1'>২৪.৫ হাজার বার দেখেছে</span>
                        </div>

                        <div className=' flex  line-clamp-1 items-center'>
                            <Clock className='me-1 size-[14px] xl:size-[12px]'/>
                            <span title='' className='line-clamp-1'>২ বছর আগের ভিডিও</span>
                        </div>
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    </>
}