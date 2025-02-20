import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
export function PlyrComponent({videoURl, videoProvider }){
    const playerRef = useRef(null);
    console.log('hello')
    useEffect(() => {
        const player = new Plyr(playerRef.current, {
            autoplay: true,
            muted: true,
            controls: [
                "play-large",
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "captions",
                "settings",
                "pip",
                "airplay",
                "fullscreen",
            ],
            settings: ["quality", "speed"],
            quality: { default: 720, options: [360, 720, 1080] },
            speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
            youtube: {
                noCookie: true, // Use the no-cookie version
                rel: 0, // No related videos
                controls: 0, // Disable YouTube controls
                fs: 0, // Disable fullscreen button
                cc_load_policy: 0, // Show captions automatically (if available)
                cc_lang_pref: "en", // Prefer English captions
                iv_load_policy: 3, // Disable annotations
            },
        });


        // ভিডিও URL সেট করা
        player.source = {
            type: "youtube",
            sources: [
                {
                    src: videoURl,
                    provider: videoProvider ?? "youtube",
                },
            ],
        };

        return () => {
            // Component unmount হলে প্লেয়ারটি ডেস্ট্রয় করুন
            player.destroy();
        };
    }, [youtubeUrl]);

    return (
        <div>
            <div ref={playerRef} />
        </div>
    );
}