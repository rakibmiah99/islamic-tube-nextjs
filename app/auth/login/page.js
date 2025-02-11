"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";
import {Button} from "../../../components/ui/button";

export default function Page(){

    return <>
        <div className="flex flex-col justify-center items-center mt-12 lg:mt-0 lg:h-full w-full">
            <div className="md:w-1/3 w-10/12 flex flex-col">
                <h1 className='text-[28px] font-bold'>লগ-ইন করুন</h1>
                <p className='mb-4 mt-2 text-gray-600'>অ্যাপটির মাধ্যমে ওয়াচ হিস্টরি, লাইককৃত ভিডিও দেখতে, প্লে-লিস্ট তৈরি করতে এবং একাউন্ট এর ভিবিন্ন সেটিংস পরিবর্তন করার জন্য।</p>
                <div className='flex flex-col space-y-5'>
                    <div className="w-full flex space-y-2 flex-col">
                        <Label htmlFor="email">ই-মেইল</Label>
                        <Input type="email" id="email" placeholder="example@mail.com" required/>
                    </div>

                    <div className="w-full flex space-y-2 flex-col">
                        <Label htmlFor="password">পাসওয়ার্ড</Label>
                        <Input className='w-full' type="password" id="password" placeholder="******" required/>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms"/>
                            <Label htmlFor="terms">পাসওয়ার্ড সংরক্ষন করুন</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Link href='#' className='text-gray-700 hover:text-black'><Label>পাসওয়ার্ড ভুলে
                                গেছেন?</Label></Link>
                        </div>
                    </div>

                    <div>
                        <Button className="w-full flex items-center">
                            লগ ইন
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