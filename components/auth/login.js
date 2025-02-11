import {LuHistory} from "react-icons/lu";
import {Button} from "../ui/button";
import Link from 'next/link'
export function Login(){
    return <>
        <div className="login-area p-3 flex flex-col items-center justify-center">
            <LuHistory className='text-[150px] my-3'/>
            <h2 className='text-[36px] text-center font-semibold'>সাইন আউট করা অবস্থায় ওয়াচ হিস্ট্রি দেখা যায় না</h2>
            <h3 className='text-[20px] text-center'>আপনি যা দেখেছেন তা ট্র্যাক করতে লগ-ইন দয়াকরে করুন</h3>
            <Link href='/auth/login'>
                <Button className='mt-3 text-[18px]'>লগ ইন</Button>
            </Link>
        </div>
    </>
}