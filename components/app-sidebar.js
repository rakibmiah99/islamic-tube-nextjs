import {
    Home,
    Settings,
    History,
    ThumbsUp,
    GalleryThumbnails,
    User,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"
import {TbActivity} from "react-icons/tb";
import {IoPhonePortraitOutline} from "react-icons/io5";
import {LiaQuranSolid} from "react-icons/lia";

const items = [
    {
        title: "হোম",
        url: "/",
        icon: Home,
    },
    {
        title: "সংক্ষিপ্ট ভিডিও",
        url: "#",
        icon: IoPhonePortraitOutline,
    },
    {
        title: "কুরআনের তফসির",
        url: "/quran",
        icon: LiaQuranSolid,
    },
    {
        title: "জীবন বিধান",
        url: "#",
        icon: TbActivity,
    },
    {
        title: "ওয়াচ হিস্টরি",
        url: "/watch-history",
        icon: History,
    },
    {
        title: "পছন্দনীয় ভিডিও",
        url: "/liked-video",
        icon: ThumbsUp,
    },
    {
        title: "প্লে লিস্ট সমূহ",
        url: "my-playlist",
        icon: GalleryThumbnails,
    },
    {
        title: "একাউন্ট",
        url: "account",
        icon: User,
    },
    {
        title: "সেটিংস",
        url: "#",
        icon: Settings,
    },
]


export  function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader  />
                <h3 className="text-2xl font-black mt-2 px-3">ইসলামিক টিউব</h3>
            <SidebarContent>
                <SidebarGroup />
                <hr/>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem className='px-3' key={item.title}>
                                <SidebarMenuButton asChild size={'lg'}>
                                    <a href={item.url}>
                                        <item.icon className='sidebar-icon me-1'/>
                                        <span className='text-[16px]'>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
