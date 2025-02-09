"use client";
import {
  LuClock,
  LuCalendar,
  LuThumbsUp,
  LuShare2,
  LuSave,
  LuMessageSquare,
  LuThumbsDown,
  LuFlag,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import SmallThumbnail from "../../../components/small-thumbnail";
import CommentItem from "../../../components/comment-item";
import Player from "../../../components/player";
import { useState, useEffect, useRef, useCallback } from "react";
import requestData from "../../../lib/api";
import Drawer from "@/components/ui/drawer";

export default function Watch(props) {
  const loadMoreRelatedTokenRef = useRef(null);
  const loadMoreCommentTokenRef = useRef(null);
  const isFetchingRef = useRef(false);
  const isFetchingCommentRef = useRef(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState({
    loading: true,
    data: [],
  });

  const [comments, setComments] = useState({
    loading: true,
    data: [],
  });

  const [state, setState] = useState({
    videoPlay: false,
  });

  async function loadVideo() {
    const response = await requestData("/video/" + props.params.slug);
    const figure = response?.figure;
    setVideoInfo(figure);
    setRelatedVideos({
      loading: false,
      data: figure?.related_videos.data ?? [],
    });

    setComments({
      loading: false,
      data: figure?.comments.data ?? [],
    });

    loadMoreRelatedTokenRef.current = figure?.related_videos.token ?? null;
    loadMoreCommentTokenRef.current = figure?.comments.token ?? null;
  }

  async function loadRelatedVideos(token) {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const response = await requestData("/video/" + token + "/more-related");
      loadMoreRelatedTokenRef.current = response?.figure.token;

      setRelatedVideos((prevState) => ({
        loading: false,
        data: [...prevState.data, ...(response?.figure.data ?? [])],
      }));
    } finally {
      isFetchingRef.current = false;
    }
  }

  async function loadMoreComments(token) {
    if (isFetchingCommentRef.current) return;
    isFetchingCommentRef.current = true;

    try {
      const response = await requestData("/video/" + token + "/more-comments");
      loadMoreCommentTokenRef.current = response?.figure.token;

      setComments((prevState) => ({
        loading: false,
        data: [...prevState.data, ...(response?.figure.data ?? [])],
      }));
    } finally {
      isFetchingCommentRef.current = false;
    }
  }

  const handleScroll = useCallback(() => {
    {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        if (loadMoreRelatedTokenRef) {
          loadRelatedVideos(loadMoreRelatedTokenRef.current);
        }

        if (loadMoreCommentTokenRef.current) {
          loadMoreComments(loadMoreCommentTokenRef.current);
        }
      }
    }
  }, []);

  useEffect(() => {
    loadVideo();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // console.log(state);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/*<h1>{JSON.stringify(route.params.slug)}</h1>*/}
      <div className="md:flex">
        <div className="basis-8/12 space-y-3 md:pe-3">
          <div
            className="player md:h-[599px] h-[196px]"
            style={{
              backgroundImage: !state.videoPlay
                ? `url(${videoInfo?.thumbnail})`
                : "",
              backgroundSize: "cover",
            }}
          >
            <Player
              video_id={videoInfo?.video_id}
              provider={videoInfo.provider}
              setState={setState}
            />
          </div>
          <h1 className="text-lg font-semibold">{videoInfo?.title}</h1>
          <div className="flex space-x-4">
            <div className="watch-count flex items-center text-gray-600 text-sm">
              <LuClock className="me-1" />
              ২৫ হাজার বার ভিডিওটি দেখা হয়েছে
            </div>
            <div className="watch-count flex items-center text-gray-600 text-sm">
              <LuCalendar className="me-1" />২ বছর আগের ভিডিও
            </div>
          </div>

          <div className="grid md:grid-cols-10 grid-cols-3 gap-2">
            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuThumbsUp className="me-1" />
              ২.৫ হাজার
            </Button>

            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuThumbsDown className="me-1" />
            </Button>

            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuShare2 className="me-1" />
              শেয়ার
            </Button>

            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuSave className="me-1" />
              সংরক্ষন
            </Button>

            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuFlag className="me-1" />
              রিপোর্ট
            </Button>
          </div>

          <div className="description">{videoInfo?.description}</div>

          <div className="long-description">{videoInfo?.long_description}</div>
          {/* phone view comment */}
          <div className="md:hidden block">
            <div className="flex items-center justify-between">
              <p
                className="mb-5 mt-0 cursor-pointer"
                onClick={toggleDrawer} // Open the drawer on click
              >
                <LuMessageSquare className="inline-block me-2" />
                <span>৩৯৪ টি মতামত</span>
              </p>
              <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                {/* Mobile Comment Content */}
                <h2 className="text-lg font-semibold">আপনার মতামত দিন</h2>
                <textarea
                  placeholder="আপনার মতামত..."
                  className="w-full border p-2 mt-3"
                ></textarea>
                <Button variant="" className="mt-2 w-full">
                  সাবমিট
                </Button>

                <div className="all-comments-area mt-4 h-96 overflow-y-scroll">
                  <ul className="comments-list space-y-5">
                    {/* Example of rendering a list of comments */}
                    {comments?.data?.map((item, index) => (
                      <CommentItem data={item} key={index} />
                    ))}
                  </ul>
                </div>
              </Drawer>
            </div>
          </div>
          {/* desktop view comment */}
          <div className="comments-area space-y-2 md:block hidden">
            <h2 className="text-lg flex space-x-1 items-center font-semibold">
              <LuMessageSquare />
              <span>৩৯৪ টি মতামতঃ</span>
            </h2>
            <textarea
              placeholder="আপনার মতামত..."
              className="w-full  border p-2"
            ></textarea>
            <Button variant="" className="mt-2">
              সাবমিট
            </Button>

            <hr />

            <div className="all-comments-area">
              <ul className="comments-list mt-5 space-y-5">
                {comments.data.map((item, index) => (
                  <CommentItem data={item} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="basis-4/12">
          {relatedVideos.data.map((item, index) => (
            <SmallThumbnail
              data={item}
              key={index}
              className="basis-4/12 mb-3 block"
            />
          ))}
        </div>
      </div>
    </>
  );
}
