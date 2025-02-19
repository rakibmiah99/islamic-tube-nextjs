import {useContext, useRef, useState} from "react";
import {useToast} from "../../hooks/use-toast";
import requestData from "../../lib/api";
import {Loader2} from "lucide-react";
import {Button} from "../ui/button";
import AppContext from "../../context/AppContext";
import {UnauthenticatedModal} from "../auth/unauthenticated-modal";
import {AuthProvider} from "../../providers/auth-provider";
export function CommentAction({videoInfo, setComments, setVideoInfo}){
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AppContext);

    const inputRef = useRef();
    const {toast} = useToast();

    const submitComment = async () => {
        if (!comment){
            toast({
                variant: "destructive",
                title: "দয়া করে আপনার মতামতটি লিখুন"
            })
            inputRef.current.focus()
            return ;
        }

        setLoading(true)
        const result = await requestData(`/video/${videoInfo.slug}/comment`, {
            method: "POST",
            data: {
                body: comment
            }
        });

        setLoading(false)

        if (result){
            const data = result.figure;
            toast({
                title: result.message
            })
            inputRef.current.value = ""

            //update comments in state
            setComments((prevState) => ({
                ...prevState,
                data: [data.comment, ...prevState.data]
            }))

            //update videoInfo state
            setVideoInfo(prevState => ({
                ...prevState,
                comments_count: data.total_comment
            }))
        }
    }

    const handleInput = (e) => {
        let {value} = e.target;
        setComment(() => value);
    }


    return <>
        <textarea
            ref={inputRef}
            onChange={handleInput}
            placeholder="আপনার মতামত..."
            className="w-full  border p-2"
        ></textarea>
        {
            !user ? <UnAuthenticate/> :

                <Button onClick={submitComment} variant="" className="mt-2 min-w-20">
                    {
                        loading?
                            <>
                                <Loader2 className="animate-spin" />
                            </>
                            :
                            <>সাবমিট</>
                    }

                </Button>

        }
    </>
}

function UnAuthenticate(){
    return <UnauthenticatedModal
        trigger={
            <Button className={'mt-2 min-w-20'}>
                সাবমিট
            </Button>
        }
        content={<AuthProvider variant={'modal'}/>}
    />

}