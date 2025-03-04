'use client'

import ThumbnailCard from "@/components/thumbnail-card";
import {useEffect, useState, useRef, useCallback} from "react";
import requestData from "@/lib/api";
import Link from "next/link";
import {ThumbnailCardSkeleton} from "../components/skeleton/thumbnail-card-skeleton";
import {VideosProtoType} from "../lib/data-prototype";


export default function Home() {

    const [videos, setVideos] = useState({
        loading: true,
        data: [],
    });

    const nextOffsetRef = useRef(0);
    const isFetching = useRef(false);


    async function loadVideos(offset = 0){

        if (isFetching.current) return;
        isFetching.current = true;

        try {
            setVideos((prevState) => ({
                loading: true,
                data: prevState.data
            }))

            const response_data = await requestData('/videos', {
                params: {
                    offset: offset
                }
            })
            // await new Promise(resolve => setTimeout(resolve, 2000));

            nextOffsetRef.current = response_data.figure.query.next_offset;

            let loadedVideosData = response_data.figure.data;
            console.log(loadedVideosData)
            loadedVideosData = loadedVideosData.map((item) => VideosProtoType(item));
            setVideos((prevVideos) => ({
                loading: false,
                data: [...prevVideos.data, ...loadedVideosData],
            }))
        }
        finally {
            isFetching.current = false;
        }

    }

    const handleScroll = useCallback( () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 150){
            loadVideos(nextOffsetRef.current);
        }
    }, [])

    //load data first time
    useEffect(() => {
        loadVideos();

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])


  return <>
      <div className="flex flex-wrap">
          {videos.data.map((item, index) => {
              return (
                  <Link key={index} href={'/watch/'+item.slug} className='basis-4/4 md:basis-2/4 w-full lg:basis-1/3 xl:basis-1/4 '>
                      <ThumbnailCard data={item} className=' p-2 mb-2 border-0 shadow-none border-b rounded-md' />
                  </Link>
              );
          })}

          {videos.loading ? <ThumbnailCardSkeleton/> : <></> }
      </div>
  </>
}
