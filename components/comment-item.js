import Image from "next/image";

export default function CommentItem(props) {
    return <>
        <li className="comments-list__item flex space-x-2">
            <Image src={'https://github.com/shadcn.png'} className='rounded-full' height={45} width={45}/>
            <div>
                <h4 className='text-sm'>মোঃ রাকিব মিয়া</h4>
                <p className="text-sm text-gray-500">র্ব পাকিস্তানের রাজনৈতিক স্বায়ত্তশাসন অর্জনের
                    প্রয়াস এবং পরবর্তীকালে ১৯৭১ খ্রিষ্টাব্দে </p>
            </div>
        </li>
    </>
}