'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {ChevronsUpDownIcon, LogOutIcon, SettingsIcon} from "lucide-react";
import {useUser} from "@/features/auth/providers/user-provider";
import {MouseEventHandler, useState} from "react";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import Link from "next/link";

function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const logout: MouseEventHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);

        try {
            await authClient.signOut();
            router.push("/");
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    return (
        <DropdownMenuItem onClick={logout}>
            {!loading && (
                <>
                    <LogOutIcon/> Logout
                </>
            )}
            {loading && (
                <>
                    <Spinner/> Signing out...
                </>
            )}
        </DropdownMenuItem>
    );
}

export function SidebarUserDropdown() {
    const user = useUser();

    return (
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size='lg'>
                        <div className='truncate'>
                            <div className='font-semibold leading-none truncate'>
                                {user.name}
                            </div>
                            <div className='text-xs text-muted-foreground truncate'>
                                {user.email}
                            </div>
                        </div>

                        <ChevronsUpDownIcon className='ml-auto'/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width)"
                >
                    <DropdownMenuItem asChild>
                        <Link href="/app/preferences">
                            <SettingsIcon/> Preferences
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <LogoutButton/>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    );
}