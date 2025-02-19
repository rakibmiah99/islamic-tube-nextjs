import {useContext, useState} from "react";
import requestData from "../../lib/api";
import {Loader2} from "lucide-react";
import {LuThumbsUp} from "react-icons/lu";
import {formatNumber} from "../../lib/utils";
import {Button} from "../ui/button";
import AppContext from "../../context/AppContext";
import {UnauthenticatedModal} from "../auth/unauthenticated-modal";
import {AuthProvider} from "../../providers/auth-provider";
export function LikeButton({videoInfo, setVideoInfo}){
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AppContext);

    const handleLike = async () => {
        if (!user){
            return;
        }


        setLoading(true)
        const result = await requestData(`/video/${videoInfo.slug}/like`, {method: "POST"});
        setLoading(false)
        if(result){
            const data = result.figure;
            setVideoInfo(prevState => ({
                ...prevState,
                like: data.like,
                dislike: data.dislike,
                likes_count: data.video_likes_count
            }))
        }


    }


    if (!user){
        return <UnauthenticatedModal
            trigger={
            <Button variant={'secondary'}>
                    <LuThumbsUp className="me-1" />
                    {formatNumber(videoInfo?.likes_count)}
            </Button>
        }
            content={<AuthProvider variant={'modal'}/>}
        />
    }


    return <>

        <Button
            disabled={loading}
            onClick={handleLike}
            variant={videoInfo?.like ? '' : 'secondary'}
            className="flex items-center justify-center"
        >
            {
                loading?
                    <>
                        <Loader2 className="animate-spin" />
                    </>
                    :
                    <>
                        <LuThumbsUp className="me-1" />
                        {formatNumber(videoInfo?.likes_count)}
                    </>
            }

        </Button>
    </>
}

