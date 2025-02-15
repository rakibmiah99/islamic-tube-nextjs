'use client'
import Link from "next/link";
import {Input} from "../../../../components/ui/input";
import {Separator} from "@radix-ui/react-separator";
import {
    LuArrowDown, LuArrowUp,
    LuBook,
    LuMessageCircle,
    LuPlay
} from "react-icons/lu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Tabs, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import CustomAudioPlayer from "../../../../components/custom-audio-player";
import requestData from "../../../../lib/api";
import {formatNumber} from "../../../../lib/utils";
import {Button} from "../../../../components/ui/button";


export default function Page(props){
    const surah_number = props.params.number;
    const playButtonRef = useRef(null)
    const router = useRouter();
    const [isTopic, setTopic] = useState(true);
    const [surahs, setSurahs] = useState([])
    /* surahDetails contain two property `surah` as object and `ayahs` as array */
    const [surahDetails, setSurahDetails] = useState({})
    const [numberOfAyahs, setNumberOfAyahs] = useState([])
    const [audioUrl, setAudioUrl] = useState(null)
    const [audioTrack, setAudioTrack] = useState({
        prev_index: null,
        next_index: null,
        current_index: null,
    })

    const handeQuranTopicSidebar = () => {
        setTopic(!isTopic);
    }

    const goToAyah = (id) => {
        router.push(`#number-in-surah-${id}`);

        setTimeout(() => {
            const element = document.getElementById(`number-in-surah-${id}`);
            const container = document.getElementById("quran-read-section");

            if (element && container) {
                const elementPosition = element.offsetTop; // এলিমেন্ট কতটুকু উপরে আছে
                const containerPosition = container.offsetTop; // কন্টেইনার কতটুকু উপরে আছে

                console.log(elementPosition, containerPosition)

                // কন্টেইনারের স্ক্রল পজিশন ঠিক করে সেট করা
                container.scrollTo({
                    top: elementPosition - containerPosition + 170, // একটু উপরে রাখতে -20px
                    behavior: "smooth",
                    block: "center"
                });
            }
        }, 100);
    };

    const handlePlay = (e) => {
        const audio_url = e.target.getAttribute('audio-url');
        const number_in_surah = e.target.getAttribute('number-in-surah');
        const current_ayah_index = surahDetails.ayahs.findIndex(ayah => ayah.number_in_surah == number_in_surah) // if not found return -1
        setAudioTrackByCurrentIndex(current_ayah_index)

        setAudioUrl(audio_url)
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function setAudioTrackByCurrentIndex(index){
        const previous_ayah_index = index <= 0 ? null : index - 1;
        const next_ayah_index =  (index === -1 || index === surahDetails.ayahs.length -1 ) ? null : index + 1;
        goToAyah(index)
        setAudioTrack({
            prev_index: previous_ayah_index,
            next_index: next_ayah_index,
            current_index: index
        })
    }

    const handleClose = () => {
        setAudioUrl(null)
    }

    const handleNext = () => {
        const next_index = audioTrack.next_index
        if(next_index){
            let ayah = surahDetails.ayahs[next_index];
            setAudioUrl(ayah.audio_in_ar)
            setAudioTrackByCurrentIndex(next_index)
        }
    }

    const handlePrev = () => {
        const prev_index = audioTrack.prev_index
        if(prev_index){
            let ayah = surahDetails.ayahs[prev_index];
            setAudioUrl(ayah.audio_in_ar)
            setAudioTrackByCurrentIndex(prev_index)
        }
    }

    const handleEnd = () => {
        handleNext()
    }


    useEffect(() => {
        getSurahs();
        getSurahDetails();
    }, []);

    const getSurahs = async () => {
        const response = await requestData('/quran/surah')
        setSurahs(response?.figure ?? [])
    }

    const getSurahDetails = async () => {
        const response = await requestData('/quran/surah/'+surah_number+'/details')
        const data = response?.figure;
        setSurahDetails(data ?? {})

        const generateSurahAyaths = [];
        for(let i =1; i <= data.surah.number_of_ayahs; i++){
            generateSurahAyaths.push(i)
        }

        setNumberOfAyahs(generateSurahAyaths)

    }


    return <>
        <div>
            <div id='surah-info' className="flex pb-1 mb-2 justify-between items-center">
                <div className='py-1 flex border-black border-l-4 justify-between md:justify-start w-full md:w-auto'>
                    <button onClick={handeQuranTopicSidebar} className=' flex items-center space-x-2  px-2'>
                        <span>{surahDetails?.surah?.name_in_bn}</span>
                        {isTopic ? <LuArrowDown/> : <LuArrowUp/>}
                    </button>

                    <Tabs defaultValue="surah" className="rounded-0">
                        <TabsList className=" flex space-x-1 px-2">
                            <TabsTrigger value="surah" className='rounded text-sm py-[2px]'>সূরাহ</TabsTrigger>
                            <Separator className='border-r' orientation='vertical'/>
                            <TabsTrigger value="para" className='rounded py-[2px] text-sm'>প্যারা</TabsTrigger>
                            <Separator className='border-r' orientation='vertical'/>
                            <TabsTrigger value="revelation_order" className='rounded py-[2px] text-sm'>নাযিল ক্রমে</TabsTrigger>
                        </TabsList>

                    </Tabs>
                </div>

                <div className='hidden md:block'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">পাতা ২</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">জুজ ১</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>হিযব ১</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className='flex space-x-1 h-[86vh] md:h-[80vh]'>
                <div className={(isTopic ? 'md:basis-3/12' : 'hidden') + ' p-2 shadow-lg'}>
                    <div className='flex h-full'>
                        <div className='qurant-topic basis-8/12'>
                            <div className='py-3 pe-2'>
                                <Input placeholder='সূরাহ অনুসন্ধান করুন...'/>
                            </div>
                            <div className=' h-[90%] overflow-scroll'>
                                {surahs.map((item, i) => (
                                    <Link className={'flex hover:bg-gray-50 p-2 py-3 space-x-2 '+(item.number == surah_number ? 'bg-slate-50' : '')} href={'/quran/surah/'+item.number} key={i}>
                                        <span>{formatNumber(item.number)}</span>
                                        <span>{item.name_in_bn}</span>
                                    </Link>
                                ))}

                                <div style={{visibility: 'hidden'}} className='h-[100px]'></div>
                            </div>
                        </div>
                        <Separator className='border border-slate-100 mx-3'/>
                        <div className='quran-content basis-3/12'>
                            <div className='py-3 pe-2'>
                                <Input placeholder='আয়াত...'/>
                            </div>
                            <div className='h-[90%] overflow-scroll'>
                                {numberOfAyahs.map((item) => (
                                    <Link className='flex hover:bg-gray-50 p-2 py-3 space-x-2 ' href={'#number-in-surah-'+item} key={item}>
                                        <span>{formatNumber(item)}</span>
                                    </Link>
                                ))}


                                <div style={{visibility: 'hidden'}} className='h-[100px]'></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={(isTopic ? 'hidden md:block md:basis-9/12 p-5' : 'w-full')+' overflow-scroll'} id='quran-read-section'>
                    {audioUrl ?
                        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
                            <CustomAudioPlayer handleEnd={handleEnd} handlePrev={handlePrev} handleNext={handleNext} handleClose={handleClose} src={audioUrl}/>
                        </div>
                        :
                        <></>
                    }

                    <div>
                        {(surahDetails.ayahs ?? []).map((item, i) => (
                            <>
                            <div id={'number-in-surah-' + item.number_in_surah} key={i} className={'flex py-4 '+(surahDetails.ayahs[audioTrack.current_index]?.number_in_surah == item.number_in_surah ? 'bg-gray-100 rounded' : '')}>
                                    <div className='space-y-4 px-10 justify-between items-end w-full'>
                                        <h1 className=' md:text-[24px]'
                                            style={{direction: 'rtl'}}>{item.text_in_ar}</h1>
                                        <h3 className=' text-end'>{item.text_in_bn}</h3>
                                        <div className='action-buttons flex justify-end items-center mt-5'>
                                            <Button variant={'ghost'} onClick={handlePlay} ref={playButtonRef} number-in-surah={item.number_in_surah} audio-url={item.audio_in_ar} className='action-btn'>
                                                <LuPlay/>
                                            </Button>
                                            <button className='action-btn'>
                                                <LuBook/>
                                            </button>
                                            <button className='action-btn'>
                                                <LuMessageCircle/>
                                            </button>
                                            <button className='action-btn text-start'>
                                                <span>{formatNumber(item.surah_number) + 'ঃ' + formatNumber(item.number_in_surah)}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Separator className='border my-1 border-gray-100'/>
                            </>
                        ))}

                        <div style={{visibility: 'hidden'}} className='h-[50px]'></div>
                    </div>
                </div>
            </div>
        </div>
    </>
}