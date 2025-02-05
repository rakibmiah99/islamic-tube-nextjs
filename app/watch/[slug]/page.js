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

  return (
    <>
      {/*<h1>{JSON.stringify(route.params.slug)}</h1>*/}
      <div className="flex">
        <div className="basis-8/12 space-y-3 pe-3">
          <div
            className="player h-[450px]"
            style={{ backgroundImage: `url('${videoInfo?.thumbnail}')`, backgroundSize:"contain" }}
          >
            <Player video_id={videoInfo?.video_id} provider={videoInfo.provider} />
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

          <div className="flex space-x-2">
            <Button variant="secondary" className="mt-2">
              <LuThumbsUp className="me-1" />
              ২.৫ হাজার
            </Button>

            <Button variant="secondary" className="mt-2">
              <LuThumbsDown className="me-1" />
            </Button>

            <Button variant="secondary" className="mt-2">
              <LuShare2 className="me-1" />
              শেয়ার
            </Button>

            <Button variant="secondary" className="mt-2">
              <LuSave className="me-1" />
              সংরক্ষন
            </Button>

            <Button variant="secondary" className="mt-2">
              <LuFlag className="me-1" />
              রিপোর্ট
            </Button>
          </div>

          <div className="description">{videoInfo?.description}</div>

          <div className="long-description">{videoInfo?.long_description}</div>

          <div className="comments-area space-y-2">
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
