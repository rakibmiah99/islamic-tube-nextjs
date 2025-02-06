import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";

const options = {
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
};

export default function Player({ video_id, provider, ...rest }) {
  const video_id_1 = video_id ?? "";
  const provider_1 = provider ?? "youtube";
  const [playType, setPlayType] = useState("poster");
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: video_id_1,
        provider: provider_1,
      },
    ],
  };

  const changeState = () => {
    // return console.log("poster", videoSrc);
    rest.setState((prev) => ({ ...prev, videoPlay: !prev.videoPlay }));
    if (playType === "poster") {
      setPlayType(provider);
    } else {
      setPlayType("poster");
    }
  };
  return (
    <>
      {playType === "poster" ? (
        <div
          onClick={changeState}
          className="relative flex justify-center items-center bg-[#00000000] /*backdrop-blur-sm*/ w-full h-full"
        >
          <button className="absolute bg-blue-400 p-4 rounded-full">
            <FaPlay className="text-[40px] ps-2  text-white" />
          </button>
        </div>
      ) : (
        <Plyr source={videoSrc} options={options} />
      )}
    </>
  );
}
