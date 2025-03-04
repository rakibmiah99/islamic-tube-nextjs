'use client'
import {AuthProvider} from "../../providers/auth-provider";
import {useCallback, useEffect, useState} from "react";
import requestData from "../../lib/api";
import {AspectRatio} from "@radix-ui/react-aspect-ratio";
import {formatNumber} from "../../lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import {BsThreeDotsVertical} from "react-icons/bs";
import {LuPencil, LuTrash} from "react-icons/lu";
import {Dialog, DialogContent} from "../../components/ui/dialog";
import {Button} from "../../components/ui/button";

export default function Page(){

    const [playlist, setPlaylist] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const getPlaylist = useCallback(async () => {
        const result = await requestData('/user/playlist');
        if (result){
            const data = result.figure;
            setPlaylist(() => data)
        }
    }, [])

    useEffect(() => {
        getPlaylist()
    }, [getPlaylist])

    return <AuthProvider>
        <div className="py-3">
            <h1 className='text-4xl'>প্লে লিস্ট সমূহ</h1>
        </div>

        <div className="py-3 play-list-area flex">
            {playlist.map((item, index) => (
                <div key={index}  className='basis-1/5 aspect-video play-list-item'>
                    <div className='p-2  '>
                        <div className='space-y-3'>
                            <div className='rounded overflow-hidden relative'>

                                <AspectRatio ratio={16 / 9}>
                                    <img
                                        src={item.thumbnail ?? 'https://www.ungerglobal.com/en/products/static/version1734619323/frontend/Unger/default/en_US/Sunzinet_GDPR/images/youtube-cover.png'}
                                        alt=""
                                        width='100%'
                                        height='100%'
                                        className='object-contain'
                                    />
                                </AspectRatio>


                                <span
                                    className='p-1 px-2 bg-black text-white absolute right-0 bottom-0'>{formatNumber(item.total_videos)} টি ভিডিও</span>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className='text-md font-semibold'>{item.name}</p>

                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <BsThreeDotsVertical/>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className='p-0 py-1'>
                                        <DropdownMenuItem onClick={() => setOpenDeleteModal(true)} className='cursor-pointer'>
                                            <LuTrash/>
                                            <span>মুছে ফেলুন</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => setOpenDeleteModal(true)} className='cursor-pointer text-sm'>
                                            <LuPencil/>
                                            <span>নাম পরিবর্তন করুন</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                </div>
            ))}

        </div>



        <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
            <DialogContent>
                <div className='space-y-3'>
                    <h3 className='text-3xl text-black'>প্লে-লিস্টটি মুছে ফেলা</h3>
                    <p className='text-gray-500'>আপনি কি প্লে-লিস্টটি নিশ্চিত ভাবে মুছে ফেলতে চাচ্ছেন?</p>
                </div>

                <div className="p-3 space-x-3 flex justify-end">
                    <Button variant='outline'>বাতিল করুন</Button>
                    <Button variant='destructive'>মুছুন</Button>
                </div>


            </DialogContent>
        </Dialog>


        <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
            <DialogContent>

            </DialogContent>
        </Dialog>

    </AuthProvider>
}