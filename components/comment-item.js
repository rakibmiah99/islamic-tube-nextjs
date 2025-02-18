import Image from "next/image";
import {getInitials} from "../lib/utils";

export default function CommentItem(props) {
    const data = props.data;
    const user = data.user;
    return <>
        <li className="comments-list__item flex space-x-2">
            {
                data.user?.image ?
                    <Image alt='' src={user?.image} className='rounded-full' height={45} width={45}/>
                :
                <>
                    <div className='h-[45px] w-[45px] rounded-full flex justify-center items-center bg-gray-100'>
                        {getInitials(user.name)}
                    </div>
                </>
            }
            <div>
                <h4 className='text-sm'>{user?.name}</h4>
                <p className="text-sm text-gray-500">{data?.body}</p>
            </div>
        </li>
    </>
}