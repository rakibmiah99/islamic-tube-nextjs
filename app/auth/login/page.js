"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";
import {Button} from "../../../components/ui/button";
import {useContext, useState} from "react";
import { useToast } from "@/hooks/use-toast"
import requestData from "../../../lib/api";
import AppContext from '../../../context/AppContext'
import {Loader2} from "lucide-react";
import {setToken} from "../../../lib/server-utils";
export default function Page(){
    const bg_image = 'https://png.pngtree.com/png-vector/20230302/ourmid/pngtree-luxury-ramadan-ramazan-with-ramadhan-lantern-ornamental-islamic-background-banner-jumma-vector-png-image_6627060.png'
    const {setUser} = useContext(AppContext)
    const {toast} = useToast()
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [credential, setCredential] = useState({
        email: 'usawayn@example.com',
        password: 'password',
        rememberMe: false
    })

    const handleInput = (e) => {
        let {name, value} = e.target;

        setCredential((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleRemember = () => {
        setChecked((prev) => !prev)
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
                email: credential.email,
                password: credential.password
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

    return <>
        <div style={{backgroundImage: `url('${bg_image}')`}} className="flex bg-no-repeat bg-cover flex-col justify-center items-center mt-12 lg:mt-0 lg:h-full w-full">
            <div style={{background: 'rgba(255,255,255, 0.9)'}} className="md:w-1/3 shadow-lg w-10/12 flex p-3 flex-col">
                <h1 className='text-[28px] font-bold'>লগ-ইন করুন</h1>
                <p className='mb-4 mt-2 text-gray-600'>অ্যাপটির মাধ্যমে ওয়াচ হিস্টরি, লাইককৃত ভিডিও দেখতে, প্লে-লিস্ট তৈরি করতে এবং একাউন্ট এর ভিবিন্ন সেটিংস পরিবর্তন করার জন্য।</p>
                <div className='flex flex-col space-y-5'>
                    <div className="w-full flex space-y-2 flex-col">
                        <Label htmlFor="email">ই-মেইল</Label>
                        <Input value={credential.email} onChange={handleInput}  type="email" name='email' id="email" placeholder="example@mail.com" required/>
                    </div>

                    <div className="w-full flex space-y-2 flex-col">
                        <Label htmlFor="password">পাসওয়ার্ড</Label>
                        <Input value={credential.password} onChange={handleInput} className='w-full' type="password" name='password' id="password" placeholder="******" required/>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className="flex items-center space-x-2">
                            <Checkbox checked={checked}  onCheckedChange={handleRemember} name='remember-me' id="terms"/>
                            <Label htmlFor="terms">পাসওয়ার্ড সংরক্ষন করুন</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link href='#' className='text-gray-700 hover:text-black'><Label>পাসওয়ার্ড ভুলে
                                গেছেন?</Label></Link>
                        </div>
                    </div>

                    <div>
                        <Button disabled={loading} onClick={handleLogin} className="w-full flex items-center">
                            {loading ?
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                                :
                                <>লগ ইন</>
                            }
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Link href='#' className='text-gray-700 hover:text-black'><Label>নতুন একাউন্ট তৈরি
                            করুন</Label></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}