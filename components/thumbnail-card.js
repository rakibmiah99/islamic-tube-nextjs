import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {IoEye} from "react-icons/io5";

export default function ThumbnailCard(props) {
    const data = props.data;
    return <>
        <Card  className={props.className}>
            <CardContent className='p-0'>
                <AspectRatio ratio={16 / 9}>
                    <Image layout='fill' src={data.thumbnail} alt="Image" className="rounded-md object-cover" />
                </AspectRatio>
                <div className='py-3 px-1 pb-1'>
                    <CardTitle className='text-md font-normal'>{data.title}</CardTitle>
                    <CardDescription className='mt-2 text-[12px] xl:text-[14px]  flex justify-between items-center'>
                        <div className=' flex items-center'>
                            <IoEye className='me-1'/>
                            ২৪.৫ হাজার বার দেখেছে
                        </div>

                        <div className=' flex items-center'>
                            <IoEye className='me-1'/>
                            ২ বছর আগের ভিডিও
                        </div>
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    </>
}