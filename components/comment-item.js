import Image from "next/image";

export default function CommentItem(props) {
    const data = props.data;
    return <>
        <li className="comments-list__item flex space-x-2">
            <Image alt='' src={'https://github.com/shadcn.png'} className='rounded-full' height={45} width={45}/>
            <div>
                <h4 className='text-sm'>{data?.user?.name}</h4>
                <p className="text-sm text-gray-500">{data?.body}</p>
            </div>
        </li>
    </>
}