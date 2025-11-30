'use client';

import {
    Sidebar, SidebarGroup, SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from "@/components/ui/sidebar";
import {ReactNode} from "react";
import Link from "next/link";
import {ArrowLeftIcon, LinkIcon, SettingsIcon, WandSparkles} from "lucide-react";
import {usePathname} from "next/navigation";
import {WorkspacePage} from "@/components/app/page";

function SettingsLink(
    {
        children,
        href,
    }: {
        children: ReactNode;
        href: string;
    }
) {
    const path = usePathname();
    const active = path === href;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={active}>
                <Link href={href}>
                    {children}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export default function PreferencesLayout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href='/app'>
                                    <ArrowLeftIcon/> Back to app
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Preferences
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SettingsLink href='/app/preferences'>
                            <SettingsIcon/> General
                        </SettingsLink>
                        <SettingsLink href='/app/preferences/links'>
                            <LinkIcon/> Links
                        </SettingsLink>
                        <SettingsLink href='/app/preferences/ai'>
                            <WandSparkles/> AI
                        </SettingsLink>
                    </SidebarMenu>
                </SidebarGroup>
            </Sidebar>
            <WorkspacePage className='flex-1'>
                {children}
            </WorkspacePage>
        </SidebarProvider>
    );
}