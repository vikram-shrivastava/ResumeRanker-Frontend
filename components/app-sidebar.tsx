'use client'

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import {
    Home,
    Activity,
    FileText,
    Sparkles,
    MessageSquare,
    LogOut,
    User,
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function AppSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const { state } = useSidebar()
    const { logout } = useAuth()
    const mainNav = [
        { title: "Dashboard", url: "/dashboard", icon: Home },
        { title: "Get ATS Score", url: "/dashboard/ats-score", icon: Activity },
        { title: "Tailor Resume", url: "/dashboard/tailor-resume", icon: FileText },
    ]

    const aiNav = [
        { title: "AI Cover Letter", icon: Sparkles },
        { title: "Mock Interview", icon: MessageSquare },
    ]

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            {/* Header */}
            <SidebarHeader className="border-b">
                <div
                    onClick={() => router.push("/")}
                    className={`flex cursor-pointer items-center gap-2 px-2 py-1 ${state === "expanded" ? "mr-0" : "flex justify-center"}`}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white"
                    >
                        R
                    </div>
                    {
                        state == "expanded" && (
                            <span className="font-semibold text-lg">ResumeRanker</span>
                        )
                    }


                </div>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent>
                {/* Main menu */}
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNav.map((item) => (
                                <SidebarMenuItem key={item.title} className={`${state === "expanded" ? "mr-2" : "flex justify-center"}`}>
                                    <SidebarMenuButton
                                        isActive={pathname === item.url}
                                        onClick={() => router.push(item.url)}
                                        className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200
    ${pathname === item.url
                                                ? "bg-gray-900 text-white shadow-md"  // 👈 darker bg for active
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                            }`}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* AI tools */}
                <SidebarGroup>
                    <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {aiNav.map((item) => (
                                <SidebarMenuItem key={item.title} className={`${state === "expanded" ? "mr-2" : "flex justify-center"}`}>
                                    <SidebarMenuButton disabled>
                                        <item.icon />
                                        <span>{item.title}</span>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            Soon
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem className={`${state === "expanded" ? "mr-2" : "flex justify-center flex-col"}`}>
                        <SidebarMenuButton onClick={() => setOpen(!open)} className="text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                            <User />
                            <span>{user?.username ?? "User"}</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton
                            onClick={() => {logout()}}
                            className="text-red-600 hover:bg-gray-100 hover:text-red-700"
                            
                        >
                            <LogOut />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* )} */}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
