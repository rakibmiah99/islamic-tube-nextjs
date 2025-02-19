'use client'
import {AuthProvider} from "../../providers/auth-provider";
import AppContext from "../../context/AppContext";
import {useContext, useState} from "react";
import requestData from "../../lib/api";
import {deleteToken, setToken} from "../../lib/server-utils";
import {Button} from "../../components/ui/button";
import {Loader2} from "lucide-react";
import {Label} from "../../components/ui/label"
import {Input} from "../../components/ui/input"
import {useToast} from "../../hooks/use-toast";

export default function Page(){
    const {user, setUser} = useContext(AppContext);
    const bg_image = 'https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-luxury-ramadan-ramazan-with-ramadhan-lantern-ornamental-islamic-background-banner-jumma-vector-png-image_6627060.png'
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [userFormData, setUserFormData] = useState({
        email: 'usawayn@example.com',
        image: '',
    })

    const handleInput = (e) => {
        let {name, value} = e.target;

        setUserFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }


    const handleLogin = async () => {
        if (!credential.email){
            toast({
                variant: "destructive",
                title: "দুঃখিত আপনার ইমেইল এর তধ্য প্রদান করেন নি।",
            })
            return;
        }

        if (!credential.password){
            toast({
                variant: "destructive",
                title: "দুঃখিত আপনার পাসওয়ার্ড এর তধ্য প্রদান করেন নি।",
            })
            return;
        }

        setLoading(true)
        const response = await requestData('/user/login', {
            method: 'post',
            data: {
                email: userFormData.email,
                image: userFormData.image
            }
        })
        setLoading(false)

        if (response){
            const data = response.figure;
            setToken(data.token)
            setUser(() => data)
            toast({
                description: response.message
            })
        }
    }

    function handleLogout(){
        deleteToken()
        setUser(() => {})
    }


    return <>
        <AuthProvider>

            <div
                style={{backgroundImage: `url('${bg_image}')`}}
                className="flex bg-no-repeat bg-cover flex-col  items-center mt-12 lg:mt-0 lg:h-full w-full"
            >
                <div style={{background: 'rgba(255,255,255, 0.9)'}} className="shadow-lg h-full flex px-3 pb-3 flex-col">
                    <div className={'space-y-3'}>
                        <div className={'header flex justify-between items-center px-2 shadow-sm py-3'}>
                            <h3 className={'text-[1.5rem] capitalize font-bold'}>Your account</h3>
                            <div>
                                <div>
                                    <Button onClick={handleLogout} variant={'outline'}>লগ আউট করুন</Button>
                                </div>
                            </div>
                        </div>

                        <p className={''}>
                            আপনার দ্বীনকে পরবর্তী স্তরে নিয়ে যেতে সম্পূর্ণ হালাল সামগ্রী সহ বিশ্বের প্রথম ইসলামিক
                            সোশ্যাল মিডিয়া
                            প্ল্যাটফর্ম উপভোগ করুন। এখানে এই অ্যাপে আপনি দৈনিক সালাত অনুস্মারক বৈশিষ্ট্য সেট করতে পারেন
                            আপনাকে কখনই
                            আপনার সালাত মিস করতে দেবে না।
                        </p>


                        <div className={'flex'}>
                            <div className={'basis-full lg:basis-1/2'}>
                                <div className='flex flex-col space-y-5'>

                                    <div className="w-full flex space-y-2 flex-col">
                                        <Label htmlFor="name">নাম</Label>
                                        <Input
                                            onChange={handleInput}
                                            value={user?.name}
                                            disabled={false}
                                            type="text"
                                            name='name'
                                            id="name"
                                            required/>
                                    </div>


                                    <div className="w-full flex space-y-2 flex-col">
                                        <Label htmlFor="email">ই-মেইল</Label>
                                        <Input
                                            value={user?.email}
                                            disabled={true}
                                            type="email"
                                            name='email'
                                            id="email"
                                            placeholder="example@mail.com" required/>
                                    </div>

                                    <div className="w-full flex space-y-2 flex-col">
                                        <Label htmlFor="image">ইমেজ</Label>
                                        <Input
                                            onChange={handleInput}
                                            className='w-full'
                                            type="file"
                                            name='image'
                                            id="image"
                                        />
                                    </div>

                                    <div>
                                        <Button disabled={loading} onClick={handleLogin}
                                                className=" flex items-center">
                                            {loading ?
                                                <>
                                                    <Loader2 className="animate-spin"/>
                                                    Please wait
                                                </>
                                                :
                                                <>তথ্য আপডেট করুন</>
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </AuthProvider>
    </>
}