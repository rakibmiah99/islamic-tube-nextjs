import {AspectRatio} from "./ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import {formatNumber} from "../lib/utils";

export default function SmallThumbnail(props){
    const data = props.data;

    return <>
        <Link href={'/watch/'+data.slug} className={props.className}>
            <div className='flex'>
                <div className="basis-5/12">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            // height="80"
                            // width="150"
                            alt={data.title}
                            layout='fill'
                            src={data?.thumbnail}
                            className="rounded-md object-cover"/>
                    </AspectRatio>
                </div>

                <div className="basis-7/12 px-2 space-y-[3px]">
                    <h1 className={'line-clamp-2'}>{data?.title}</h1>
                    <p className="text-[14px]  text-gray-500">ক্যাটাগরি নাম</p>
                    <div className="flex space-x-2">
                        <p className="text-gray-500 text-[12px]">{data.watch_count == 0 ? "দেখার অপেক্ষায়" : formatNumber(data.watch_count)+" বার দেখা হয়েছে"}</p>
                        <p className="text-gray-500 text-[12px]">-</p>
                        <p className="text-gray-500 text-[12px]">২০ দিন আগে</p>
                    </div>
                </div>
            </div>

        </Link>
    </>
}