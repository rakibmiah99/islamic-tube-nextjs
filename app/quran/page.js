'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useEffect, useState} from "react";
import requestData from "../../lib/api";
import {formatNumber} from "../../lib/utils";
import Link from "next/link";

export default function QuranHomePage(){

    const [surahs, setSurahs] = useState([])

    useEffect(() => {
        getSurahs();
    }, []);

    const getSurahs = async () => {
        const response = await requestData('/quran/surah')
        setSurahs(response?.figure ?? [])
    }


    return <>
        <Tabs defaultValue="surah" className="rounded-0">
            <TabsList className="bg-gray-100 rounded">
                <TabsTrigger value="surah">সূরাহ</TabsTrigger>
                <TabsTrigger value="para">প্যারা</TabsTrigger>
                <TabsTrigger value="revelation_order">নাযিল ক্রমে</TabsTrigger>
            </TabsList>
            <div className="mt-7">
                <TabsContent value="surah">
                    <div className='flex flex-wrap'>
                        {surahs.map((item, index) => (
                            <Link href={'/quran/surah/'+item.number} key={index} className='w-full md:basis-1/2 lg:basis-1/3 p-1'>
                                <div className=" surah-card rounded justify-between items-center border flex border-gray-300 p-5 space-x-10">
                                    <div className='flex items-center'>
                                        <p className="relative h-[40px]  flex justify-center items-center rounded-2 w-[40px] me-5">
                                            <p className='absolute z-10 surah-number text-[18px]'>{formatNumber(item.number)}</p>
                                            <div className="flex items-center h-full w-full absolute bg-gray-100 rotate-45 surah-number-box"></div>
                                        </p>
                                        <div>
                                            <p className="text-[16px]">{item.name_in_bn}</p>
                                            <p className="text-gray-500 surah-bangla-name text-[14px]">{item.translate_in_bn}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className='text-16'>{item.name_in_ar}</p>
                                        <p className='text-14 text-gray-500 surah-ayath text-[14px]'>{formatNumber(item.number_of_ayahs)} আয়াত</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="para">Change your password here.</TabsContent>
                <TabsContent value="revelation_order">Make changes to your account here.</TabsContent>
            </div>
        </Tabs>

    </>
}