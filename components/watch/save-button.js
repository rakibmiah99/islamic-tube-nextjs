import {useContext, useState} from "react";
import requestData from "../../lib/api";
import {Loader2} from "lucide-react";
import {LuSave} from "react-icons/lu";
import {toast} from "sonner";
import {Button} from "../ui/button";
import AppContext from "../../context/AppContext";
import {UnauthenticatedModal} from "../auth/unauthenticated-modal";
import {AuthProvider} from "../../providers/auth-provider";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog";
import {Checkbox} from "../ui/checkbox";
import {PlayListPrototype} from "../../lib/data-prototype";
export function SaveButton({videoInfo}){
    const [loading, setLoading] = useState(false);
    const [playList, setPlayList] = useState([]);
    const {user} = useContext(AppContext);

    const getPlayList = async () => {
        if (!user){
            return;
        }

        const result = await requestData('/user/playlist', {
            method: "GET",
            params: {
                video_id: videoInfo.id,
            }
        })
        if (result){
            const data = result.figure;
            const binding_data_with_prototype = data.map((item) => PlayListPrototype(item));
            setPlayList(() => (binding_data_with_prototype))
        }


    }


    const handleSaveHandle = async (checked, playlist) => {

        setPlayList((prevState) => (prevState.map((item) => {
            if(item.id === playlist.id){
                item.video_in_list = !item.video_in_list
            }

            return item;
        })))

        //add or remove in playlist
        const result = await requestData(`/user/playlist/add-video`, {
            method: "POST",
            data: {
                'video_id': videoInfo.id,
                'playlist_id': playlist.id
            }
        })



        if(result){
            toast.success(result.message)
            getPlayList()
        }
    }


    if (!user){
        return <UnauthenticatedModal
            trigger={
            <Button variant={'secondary'}>
                <LuSave className="me-1" />
                সংরক্ষন
            </Button>
        }
            content={<AuthProvider variant={'modal'}/>}
        />
    }


    return <>

        <Dialog>
            <DialogTrigger>
                <Button
                    disabled={loading}
                    onClick={getPlayList}
                    variant={'secondary'}
                    className="flex items-center w-full justify-center"
                >
                    <LuSave className="me-1" /> সংরক্ষন
                </Button>
            </DialogTrigger>
            <DialogContent className={'w-auto'}>
                <DialogHeader>
                    <DialogTitle className={'me-10 text-sm'}>ভিডিও সংরক্ষণ করুন</DialogTitle>
                    <DialogDescription>
                        {playList.map((item, index) => {
                            const id = item.name.split(" ").join("-")
                            return (
                                <div key={index} className="items-top flex mt-3 space-x-2">
                                    <Checkbox checked={item.video_in_list} onCheckedChange={(checked) => handleSaveHandle(checked, item)} id={id}/>
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor={id}
                                            className="text-sm font-medium text-black"
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
}

