import Link from "next/link";
import {Input} from "../../../../components/ui/input";
import {Separator} from "@radix-ui/react-separator";
import {
    LuArrowDown,
    LuBook,
    LuMessageCircle,
    LuPlay
} from "react-icons/lu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Tabs, TabsList, TabsTrigger} from "@radix-ui/react-tabs";


export default function Page(){


    return <>

        <div id='surah-info' className="flex mb-2 justify-between items-center">
            <div className='py-1 flex border-l border-black'>
                <button className=' flex items-center space-x-2  px-2'>
                    <span>সূরাহ-ফাতিহা</span>
                    <LuArrowDown/>
                </button>

                <Tabs defaultValue="surah" className="rounded-0">
                    <TabsList className=" flex space-x-1 px-2 rounded">
                        <TabsTrigger value="surah">সূরাহ</TabsTrigger>
                        <Separator className='border-r' orientation='vertical'/>
                        <TabsTrigger value="para">প্যারা</TabsTrigger>
                        <Separator className='border-r' orientation='vertical'/>
                        <TabsTrigger value="revelation_order">নাযিল ক্রমে</TabsTrigger>
                    </TabsList>

                </Tabs>
            </div>

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">পাতা ২</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">জুজ ১</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>হিযব ১</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className='flex space-x-1 h-[87vh]'>
            <div className='basis-3/12 p-2 shadow-lg'>
                <div className='flex h-full'>
                    <div className='surahs basis-8/12'>
                        <div className='py-3 pe-2'>
                            <Input placeholder='সূরাহ অনুসন্ধান করুন...'/>
                        </div>
                        <div className=' h-[90%] overflow-scroll'>
                            {new Array(114).fill(0).map((_, i) => (
                                <Link className='flex hover:bg-gray-50 p-2 py-3 space-x-2 ' href='#' key={i}>
                                    <span>{i}</span>
                                    <span>সূরাহ-ফাতিহা</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className='ayahs basis-4/12'>

                        <div className='py-3 pe-2'>
                            <Input placeholder='আয়াত...'/>
                        </div>
                        <div className='h-[90%] overflow-scroll'>
                            {new Array(114).fill(0).map((_, i) => (
                                <Link className='flex hover:bg-gray-50 p-2 py-3 space-x-2 ' href='#' key={i}>
                                    <span>{i}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='basis-9/12 p-5 overflow-scroll'>
                <div>
                    {new Array(15).fill(0).map((_, i) => (
                        <>
                            <div className='flex'>
                                <div className='action-buttons basis-2/12'>
                                    <div className='flex space-y-1 flex-col text-sm'>
                                        <button className='action-btn text-start'>
                                            <span>২:২২</span>
                                        </button>
                                        <button className='action-btn'>
                                            <LuPlay/>
                                        </button>
                                        <button className='action-btn'>
                                            <LuBook/>
                                        </button>
                                        <button className='action-btn'>
                                            <LuMessageCircle/>
                                        </button>
                                    </div>
                                </div>
                                <div className='space-y-10 justify-between items-end basis-10/12'>
                                    <h1 className='text-[32px]' style={{direction: 'rtl'}}>بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِِ</h1>
                                    <h3 className='text-[20px]'>পরম করুণাময় অতি দয়ালু আল্লাহর নামে।</h3>
                                </div>
                            </div>
                            <Separator className='border my-5 border-gray-100'/>
                        </>
                    ))}
                </div>
            </div>
        </div>
    </>
}