import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QuranHomePage(){
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
                        {new Array(114).fill(0).map((item, index) => (
                            <div key={index} className='w-full md:basis-1/2 lg:basis-1/3 p-1'>
                                <div className=" surah-card rounded justify-between items-center border flex border-gray-300 p-5 space-x-10">
                                    <div className='flex items-center'>
                                        <p className="relative h-[40px]  flex justify-center items-center rounded-2 w-[40px] me-5">
                                            <p className='absolute z-10 surah-number text-[22px]'>২</p>
                                            <div className="flex items-center h-full w-full absolute bg-gray-100 rotate-45 surah-number-box"></div>
                                        </p>
                                        <div>
                                            <p className="text-[16px]">আল-ফাতিহা</p>
                                            <p className="text-gray-500 surah-bangla-name text-[14px]">সূচনা</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className='text-16'>سُورَةُ النَّاسِ</p>
                                        <p className='text-14 text-gray-500 surah-ayath text-[14px]'>৭ আয়াত</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="para">Change your password here.</TabsContent>
                <TabsContent value="revelation_order">Make changes to your account here.</TabsContent>
            </div>
        </Tabs>

    </>
}