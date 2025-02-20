"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube"; // YouTube plugin

export function VideoJsYoutube({videoId}){
    const videoRef = useRef(null);

    useEffect(() => {
        // ভিডিও প্লেয়ার ইনিশিয়ালাইজ করুন
        const player = videojs(videoRef.current, {
            techOrder: ["youtube"], // YouTube প্লাগইন ব্যবহার করবে
            controls: true,
            autoplay: false,
            responsive: true,
            fluid: true, // ভিডিও সাইজ অটো অ্যাডজাস্ট করবে
            sources: [
                {
                    type: "video/youtube",
                    src: `https://www.youtube.com/watch?v=${videoId}`,
                },
            ],
            youtube: {
                modestbranding: 1, // ইউটিউব লোগো হাইড
                rel: 0, // ভিডিও শেষে রিলেটেড ভিডিও বন্ধ
                showinfo: 0, // ভিডিওর ইনফো হাইড করবে
                noCookie: true, // Use the no-cookie version
                controls: 0, // Disable YouTube controls
                fs: 0, // Disable fullscreen button
                cc_load_policy: 0, // Show captions automatically (if available)
                cc_lang_pref: "en", // Prefer English captions
                iv_load_policy: 3, // Disable annotations
            },
        });


        return () => {
            player.dispose(); // Unmount হলে destroy করবে
        };
    }, [videoId]); // যখন ভিডিও ID পরিবর্তন হবে, তখন নতুন ভিডিও লোড হবে

    return (
        <div className="video-container">
            <video ref={videoRef} className="video-js vjs-default-skin"></video>
        </div>
    );
}