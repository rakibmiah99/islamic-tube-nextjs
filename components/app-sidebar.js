import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {IoAdd} from 'react-icons/io5'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"

const items = [
    {
        title: "হোম",
        url: "#",
        icon: Home,
    },
    {
        title: "সংক্ষিপ্ট ভিডিও",
        url: "#",
        icon: Inbox,
    },
    {
        title: "কুরআনের তফসির",
        url: "#",
        icon: Calendar,
    },
    {
        title: "জীবন বিধান",
        url: "#",
        icon: Search,
    },
    {
        title: "ওয়াচ হিস্টরি",
        url: "#",
        icon: Settings,
    },
    {
        title: "পছন্দনীয় ভিডিও",
        url: "#",
        icon: Settings,
    },
    {
        title: "প্লে লিস্ট সমূহ",
        url: "#",
        icon: Settings,
    },
    {
        title: "একাউন্ট",
        url: "#",
        icon: Settings,
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
                <h3 className="text-2xl font-black px-3">ইসলামিক টিউব</h3>
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