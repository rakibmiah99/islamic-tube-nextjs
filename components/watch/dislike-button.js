import {useContext, useState} from "react";
import requestData from "../../lib/api";
import {Loader2} from "lucide-react";
import {LuThumbsDown} from "react-icons/lu";
import {Button} from "../ui/button";
import AppContext from "../../context/AppContext";
import {UnauthenticatedModal} from "../auth/unauthenticated-modal";
import {AuthProvider} from "../../providers/auth-provider";
export function DislikeButton({videoInfo, setVideoInfo}){
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AppContext);

    const handleDislike = async () => {
        setLoading(true)
        const result = await requestData(`/video/${videoInfo.slug}/dislike`, {method: "POST"});
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
                    <LuThumbsDown className="me-1" />
                </Button>
            }
            content={<AuthProvider variant={'modal'}/>}
        />
    }

    return <>
        <Button
            disabled={loading}
            onClick={handleDislike}
            variant={videoInfo?.dislike ? '' : 'secondary'}
            className="flex items-center justify-center"
        >
            {
                loading?
                    <>
                        <Loader2 className="animate-spin" />
                    </>
                    :
                    <>
                        <LuThumbsDown className="me-1" />
                    </>
            }

        </Button>
    </>
}
