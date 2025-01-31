'use client'

import ThumbnailCard from "@/components/thumbnail-card";
import {useEffect, useState, useRef, useCallback} from "react";
import requestData from "@/lib/api";
import Link from "next/link";


export default function Home() {

    const [videos, setVideos] = useState({
        loading: false,
        data: [],
    });

    const nextOffsetRef = useRef(0);
    const isFetching = useRef(false);

    async function loadVideos(offset = 0){

        if (isFetching.current) return;
        isFetching.current = true;

        try {
            const response_data = await requestData('/videos', {
                params: {
                    offset: offset
                }
            })


            nextOffsetRef.current = response_data.figure.query.next_offset;

            setVideos((prevVideos) => ({
                loading: false,
                data: [...prevVideos.data, ...response_data.figure.data],
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
                  <Link key={index} href={'/watch/'+item.slug} className='basis-4/4 md:basis-2/4 lg:basis-1/3 xl:basis-1/4 '>
                      <ThumbnailCard data={item} className=' p-2 mb-2 border-0 shadow-none border-b rounded-md' />
                  </Link>
              );
          })}
      </div>
  </>
}
