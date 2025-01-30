'use client'
import {
    LuClock,
    LuCalendar,
    LuThumbsUp,
    LuShare2,
    LuSave,
    LuMessageSquare,
    LuThumbsDown, LuFlag,
} from "react-icons/lu";

import { Button } from "@/components/ui/button"
import SmallThumbnail from "../../../components/small-thumbnail";
import CommentItem from "../../../components/comment-item";
import Player from "../../../components/player";
import {useState, useEffect} from "react";
import requestData from "../../../lib/api";

export default function Watch(props){

    const [videoInfo, setVideoInfo] = useState({});
    const [relatedVideos , setRelatedVideos] = useState({
        loading: true,
        next_load_offset: 0,
        data: []
    });
    useEffect(() => {
        async function loadVideo(){
            const response = await requestData('/video/'+props.params.slug);
            const figure = response.figure;
            setVideoInfo(figure);
            setRelatedVideos({
                loading: false,
                next_load_offset: figure.related_videos.next_load_offset,
                data: figure.related_videos.data
            })
        }

        loadVideo();
    }, []);


    const handlePlayError =  () => {
        alert('hello')
    }


    return <>
        {/*<h1>{JSON.stringify(route.params.slug)}</h1>*/}
        <div className="flex">
            <div className="basis-8/12 space-y-3 pe-3">
                <div className="player h-[460px]" style={{background: `url('${videoInfo?.thumbnail}')`}}>
                    <Player onError={handlePlayError} url={videoInfo?.video_url}/>
                </div>
                <h1 className="text-lg font-semibold">{videoInfo?.title}</h1>
                <div className="flex space-x-4">
                    <div className="watch-count flex items-center text-gray-600 text-sm">
                        <LuClock className='me-1'/>
                        ২৫ হাজার বার ভিডিওটি দেখা হয়েছে
                    </div>
                    <div className="watch-count flex items-center text-gray-600 text-sm">
                        <LuCalendar className='me-1'/>
                        ২ বছর আগের ভিডিও
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Button variant="secondary" className="mt-2">
                        <LuThumbsUp className='me-1'/>
                        ২.৫ হাজার
                    </Button>

                    <Button variant="secondary" className="mt-2">
                        <LuThumbsDown className='me-1'/>
                    </Button>

                    <Button variant="secondary" className="mt-2">
                        <LuShare2 className='me-1'/>
                        শেয়ার
                    </Button>

                    <Button variant="secondary" className="mt-2">
                        <LuSave className='me-1'/>
                        সংরক্ষন
                    </Button>

                    <Button variant="secondary" className="mt-2">
                        <LuFlag className='me-1'/>
                        রিপোর্ট
                    </Button>
                </div>


                <div className='description'>
                    {videoInfo?.description}
                </div>

                <div className='long-description'>
                    {videoInfo?.long_description}
                </div>


                <div className="comments-area space-y-2">
                    <h2 className='text-lg flex space-x-1 items-center font-semibold'>
                        <LuMessageSquare/>
                        <span>৩৯৪ টি মতামতঃ</span>
                    </h2>
                    <textarea placeholder="আপনার মতামত..." className="w-full  border p-2"></textarea>
                    <Button variant="" className="mt-2">
                        সাবমিট
                    </Button>

                    <hr/>

                    <div className="all-comments-area">
                        <ul className="comments-list mt-5 space-y-5">
                            {new Array(25).fill(0).map((item, index) => (
                                <CommentItem key={index}/>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <div className="basis-4/12">
                {relatedVideos.data.map((item, index) => (
                    <SmallThumbnail data={item} key={index} className='basis-4/12 mb-3 block'/>
                ))}
            </div>
        </div>


        <style jsx>{`
            
        `}</style>
    </>
}