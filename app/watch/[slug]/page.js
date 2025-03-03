"use client";
import {
  LuClock,
  LuCalendar,
  LuShare2,
  LuSave,
  LuMessageSquare,
  LuFlag,
} from "react-icons/lu";

import { Button } from "@/components/ui/button";
import SmallThumbnail from "../../../components/small-thumbnail";
import CommentItem from "../../../components/comment-item";
import Player from "../../../components/player";
import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import requestData from "../../../lib/api";
import Drawer from "@/components/ui/drawer";
import {formatNumber, relativeTimeFormat} from "../../../lib/utils";
import {WatchPageSkeleton} from "../../../components/skeleton/watch-page-skeleton";
import {LikeButton} from "../../../components/watch/like-button";
import {DislikeButton} from "../../../components/watch/dislike-button";
import {CommentAction} from "../../../components/watch/comment-action";
import {CommentProtoType, RelatedVideoProtoType, VideoInfoProtoType} from "../../../lib/data-prototype";
import {SaveButton} from "../../../components/watch/save-button";

export default function Page(props) {
  const loadMoreRelatedTokenRef = useRef(null);
  const loadMoreCommentTokenRef = useRef(null);
  const isFetchingRef = useRef(false);
  const isFetchingCommentRef = useRef(false);
  const videoIdRef = useRef(null);
  const videoProviderRef = useRef(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState({
    loading: true,
    error: null,
    data: [],
  });

  const [comments, setComments] = useState({
    loading: true,
    error: null,
    data: [],
  });

  const [state, setState] = useState({
    videoPlay: false,
  });

  const loadVideo = useCallback(async () => {
    isFetchingRef.current = true
    const response = await requestData("/video/" + props.params.slug);
    isFetchingRef.current = false;
    const figure = response?.figure;

    // Set Video Info State Data
    setVideoInfo(() => VideoInfoProtoType(figure));

    //Set Video Id And Video Provider Ref For Playing
    videoIdRef.current = figure.video_id;
    videoProviderRef.current = figure.provider;


    //Set Related Video State Data
    const related_videos_list = figure?.related_videos.data ?? [];
    setRelatedVideos(prevState => ({
      ...prevState,
      data: related_videos_list.map(video => RelatedVideoProtoType(video)),
    }));


    // Set Comment State Data
    const comment_list = figure?.comments.data ?? [];
    setComments(prevState => ({
      ...prevState,
      data: comment_list.map(comment => CommentProtoType(comment)),
    }));

    //Set Next Load Related Video And Comment Token In Ref Value
    loadMoreRelatedTokenRef.current = figure?.related_videos.token ?? null;
    loadMoreCommentTokenRef.current = figure?.comments.token ?? null;
  }, [props.params.slug])

  async function loadRelatedVideos(token) {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const response = await requestData("/video/" + token + "/more-related");

      let related_videos_list = response?.figure?.data ?? [];
      related_videos_list = related_videos_list.map(video => RelatedVideoProtoType(video));

      // Save Token For Next Load
      loadMoreRelatedTokenRef.current = response?.figure.token;

      //Merge Related Video With Set Related Video State
      setRelatedVideos((prevState) => ({
        ...prevState,
        data: [...prevState.data, ...related_videos_list],
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

      let comments = response?.figure.data ?? []
      comments = comments.map(comment => CommentProtoType(comment));

      // Save Next Load Comment Token
      loadMoreCommentTokenRef.current = response?.figure.token;

      // Save More Comment In Set Comment State
      setComments((prevState) => ({
        loading: false,
        data: [
            ...prevState.data,
          ...comments
        ],
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
  }, [handleScroll, loadVideo]);

  // console.log(state);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  const memoizedPlayer = useMemo(() => (
      <Player video_id={videoIdRef.current} provider={videoProviderRef.current} setState={setState} />
  ), [videoIdRef.current, videoProviderRef.current]);

  return (!videoInfo ?
        <WatchPageSkeleton/>
    :
    <>
      <div className="md:flex">
        <div className="basis-8/12 space-y-3 md:pe-3">
          <div
            className={!state.videoPlay ? 'player md:h-[450px] h-[200px]': 'player'}
            style={{
              backgroundImage: !state.videoPlay
                ? `url(${videoInfo?.thumbnail})`
                : "",
              backgroundSize: "cover",
            }}
          >
            {memoizedPlayer}
          </div>
          <h1 className="text-lg font-semibold">{videoInfo?.title}</h1>
          <div className="flex space-x-4">
            <div className="watch-count flex items-center text-gray-600 text-sm">
              <LuClock className="me-1" />
              {formatNumber(videoInfo?.watch_count + 1)} বার ভিডিওটি দেখা হয়েছে
            </div>
            <div className="watch-count flex items-center text-gray-600 text-sm">
              <LuCalendar className="me-1" />
              {relativeTimeFormat(videoInfo.published_at)}
            </div>
          </div>

          <div className="grid md:grid-cols-6 lg:grid-8 grid-cols-3 gap-2">

            <LikeButton videoInfo={videoInfo} setVideoInfo={setVideoInfo}/>

            <DislikeButton videoInfo={videoInfo} setVideoInfo={setVideoInfo}/>

            <Button
              variant="secondary"
              className="flex items-center justify-center"
            >
              <LuShare2 className="me-1" />
              শেয়ার
            </Button>

            <SaveButton videoInfo={videoInfo}/>

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
                <span>{formatNumber(videoInfo?.comments_count)} টি মতামত</span>
              </p>
              <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
                {/* Mobile Comment Content */}
                <h2 className="text-lg font-semibold">আপনার মতামত দিন</h2>
                <textarea
                  placeholder="আপনার মতামত..."
                  className="w-full border p-2 mt-3"
                ></textarea>
                <Button variant=""  disabled className="mt-2 w-full">
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
              <span>{formatNumber(videoInfo?.comments_count)} টি মতামতঃ</span>
            </h2>

            <CommentAction videoInfo={videoInfo} setComments={setComments} setVideoInfo={setVideoInfo}/>

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




