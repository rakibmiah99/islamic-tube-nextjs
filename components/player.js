import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

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

  poster: "http://admin.programmingwithrakib.com/files/675834a784299.png",
};

export default function Player(props) {
  const video_id = props.video_id ?? "";
  const provider = props.provider ?? "youtube";
  const [playType, setPlayType] = useState("poster");
  const videoSrc = {
    type: "video",
    sources: [
      {
        src: video_id,
        provider: provider,
      },
    ],
  };

  const changeState = () => {
    return console.log("poster", props.video_id, props.provider);
    if (playType === "poster") {
      setPlayType(provider);
    } else {
      setPlayType("poster");
    }
  };
  return (
    <>
      <div
        onClick={changeState}
        className="relative bg-[#000000c9] backdrop-blur-sm w-full h-full"
      >
        <button className="absolute top-1/2 left-1/2">
          <FaRegCirclePlay className="text-5xl text-white animate-pulse" />
        </button>
      </div>

      {playType === "poster" ? (
        <></>
      ) : (
        <Plyr key={Math.random()} source={videoSrc} options={options} />
        // <video src=""></video>
      )}
    </>
  );
}
