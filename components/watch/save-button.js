import {useContext, useState} from "react";
import requestData from "../../lib/api";
import {LuPlus, LuSave} from "react-icons/lu";
import {toast} from "sonner";
import {Button} from "../ui/button";
import AppContext from "../../context/AppContext";
import {UnauthenticatedModal} from "../auth/unauthenticated-modal";
import {AuthProvider} from "../../providers/auth-provider";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {Checkbox} from "../ui/checkbox";
import {Input} from "../ui/input";
import {PlayListPrototype} from "../../lib/data-prototype";
import {Loader2, X} from "lucide-react";
import * as React from "react";
export function SaveButton({videoInfo}){
    // const [loading, setLoading] = useState(false);
    const [creatingPlayListLoading, setCreatingPlayListLoading] = useState(false);
    const [playList, setPlayList] = useState([]);
    const [playListName, setPlayListName] = useState("");
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);
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
            await getPlayList()
        }
    }


    const handleSavePlaylist = async () => {
        setCreatingPlayListLoading(true)
        const result = await requestData('/user/playlist/create', {
            method: "POST",
            data: {
                name: playListName
            }
        })
        setCreatingPlayListLoading(false)

        if(result){
            toast.success(result.message)
            await getPlayList()
            setSecondDialogOpen(false)
        }
    }


    if (!user){
        return <UnauthenticatedModal
            trigger={
            <Button variant='secondary'>
                <LuSave className="me-1" />
                সংরক্ষন
            </Button>
        }
            content={<AuthProvider variant={'modal'}/>}
        />
    }


    return <>
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    onClick={getPlayList}
                    variant='secondary'
                    className="flex items-center w-full justify-center"
                >
                    <LuSave className="me-1" /> সংরক্ষন
                </Button>
            </DialogTrigger>
            <DialogContent closeIcon={false} className={'w-auto'}>
                <DialogHeader >
                    <DialogTitle className={' flex justify-between items-center text-lg'}>
                       <span className={'me-10'}> ভিডিও সংরক্ষণ করুন</span>

                        <DialogClose asChild>
                            <X className="h-6 w-6 hover:cursor-pointer" />
                        </DialogClose>

                    </DialogTitle>
                    <DialogDescription> </DialogDescription>
                </DialogHeader>

                {playList.map((item, index) => {
                    const id = item.name.split(" ").join("-")
                    return (
                        <div key={index} className="flex  space-x-2">
                            <Checkbox checked={item.video_in_list} onCheckedChange={(checked) => handleSaveHandle(checked, item)} id={id}/>
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={id}
                                    className="text-md font-medium text-black"
                                >
                                    {item.name}
                                </label>
                            </div>
                        </div>
                    )
                })}


                <Button
                    onClick={() => setSecondDialogOpen(true)}
                    variant='outline'
                    className="flex items-center mt-5 px-2 py-1 w-full justify-center"
                >
                    <LuPlus className="me-1" /> নতুন তৈরি করুন
                </Button>
            </DialogContent>
        </Dialog>



        <Dialog open={secondDialogOpen} onOpenChange={setSecondDialogOpen}>
            <DialogContent className={'flex justify-center'} closeIcon={false}>
                <DialogTitle></DialogTitle>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input onChange={(e) => setPlayListName(e.target.value) } type="text" placeholder="প্লে লিস্ট এর নাম লিখুন"/>
                    <Button onClick={handleSavePlaylist} type="button">
                        {
                            creatingPlayListLoading?
                                <>
                                    <Loader2 className="animate-spin" />
                                </>
                                :
                                <> সেভ করুন</>
                        }

                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant='destructive'>
                            <X className="h-6 w-6" />
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    </>
}

