import {LuLock} from "react-icons/lu";
import {Button} from "../ui/button";
import Link from 'next/link'
import {BG_IMAGE} from "../../lib/utils";
export function Login({variant}){
    let ui = null;

    if(variant === "modal") {
        ui = modalUi()
    } else {
        ui = defaultUi()
    }

    return <div style={{backgroundImage: `url(${BG_IMAGE})`}} className="login h-full bg-cover bg-no-repeat flex justify-center items-center">
            <div className={'w-full h-full'} style={{background: 'rgba(255,255,255, 0.7)'}}>
                {ui}
            </div>
        </div>;
}


function modalUi() {
    return <div className="login-area p-3 flex flex-col items-center justify-center">
        <LuLock className='text-[50px] my-3'/>
        <h2 className='text-[20px] text-center font-semibold'>আপনি এই মূহুর্তে সাইন আউট অবস্থায় আছেন</h2>
        <h3 className='text-[16px] mt-2 text-center'>এই ফিচারটি কার্যকর করতে আপনাকে লগ ইন করতে হবে</h3>
        <Link href='/auth/login'>
            <Button className='mt-3 text-[14px]'>লগ ইন</Button>
        </Link>
    </div>
}

function defaultUi() {
    return <div className="login-area p-3 flex flex-col items-center justify-center">
        <LuLock className='text-[150px] my-3'/>
        <h2 className='text-[36px] text-center font-semibold'>আপনি এই মূহুর্তে সাইন আউট অবস্থায় আছেন</h2>
        <h3 className='text-[20px] text-center'>এই ফিচারটি কার্যকর করতে আপনাকে লগ ইন করতে হবে</h3>
        <Link href='/auth/login'>
            <Button className='mt-3 text-[18px]'>লগ ইন</Button>
        </Link>
    </div>
}