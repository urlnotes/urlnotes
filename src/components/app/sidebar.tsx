'use client';

import {
    Sidebar,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator, useSidebar
} from "@/components/ui/sidebar";
import {
    ChevronDown,
    FolderIcon,
    LibraryBigIcon,
    LinkIcon, PlusIcon, SearchIcon,
    TagsIcon
} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {SidebarUserDropdown} from "@/components/app/sidebar/user-dropdown";
import {Logo} from "@/components/logo";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useLinkCreateDialog} from "@/features/links/providers/link-create-dialog-provider";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {useCreateCollectionDialog} from "@/features/collections/providers/create-collection-dialog-provider";
import {useUserCollections} from "@/features/collections/hooks/use-user-collections";
import {Skeleton} from "@/components/ui/skeleton";

function CollectionsLinks() {
    const {isPending, data, error} = useUserCollections();
    const {setOpenMobile} = useSidebar();

    if (error) {
        return <></>
    }

    return (
        <Collapsible defaultOpen className='group/collapsible'>
            <SidebarGroup>
                <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                        Collections
                        <ChevronDown
                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                    </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                    <SidebarMenu>
                        {isPending && [... new Array(3)].map((_, i) => (
                            <SidebarMenuItem key={i}>
                                <Skeleton className='w-full h-6' />
                            </SidebarMenuItem>
                        ))}
                        {!isPending && data.map((collection) => (
                            <SidebarMenuItem key={collection.id}>
                                <SidebarMenuButton asChild>
                                    <Link href={`/app/collections/${collection.id}`} onClick={() => setOpenMobile(false)}>
                                        <FolderIcon/> {collection.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    );
}

export function AppSidebar() {
    const {
        setOpen: setLinkCreateDialogOpen,
    } = useLinkCreateDialog();
    const {
        setOpen: setCreateCollectionDialogOpen,
    } = useCreateCollectionDialog();

    const {setOpenMobile} = useSidebar();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className='flex-1'>
                        <SidebarMenuButton asChild>
                            <Link href='/app' onClick={() => setOpenMobile(false)}>
                                <Logo/>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarSeparator className='m-0'/>
                    <SidebarUserDropdown/>
                </SidebarMenu>
            </SidebarHeader>

            {/*<SidebarGroup>*/}
            {/*    <SidebarMenu>*/}
            {/*        <SidebarMenuItem>*/}
            {/*            <Button*/}
            {/*                variant='outline'*/}
            {/*                className='justify-start text-muted-foreground cursor-pointer w-full'*/}
            {/*            >*/}
            {/*                <SearchIcon/> Search...*/}
            {/*            </Button>*/}
            {/*        </SidebarMenuItem>*/}
            {/*    </SidebarMenu>*/}
            {/*</SidebarGroup>*/}

            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className='flex items-center gap-1'>
                            <SidebarMenuButton asChild>
                                <Link href='/app/links' onClick={() => setOpenMobile(false)}>
                                    <LinkIcon/> Links
                                </Link>
                            </SidebarMenuButton>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        size='icon-sm'
                                        onClick={() => {
                                            setLinkCreateDialogOpen(true);
                                            setOpenMobile(false);
                                        }}
                                        className='cursor-pointer'
                                    >
                                        <PlusIcon/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    New link
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <div className='flex items-center gap-1'>
                            <SidebarMenuButton asChild>
                                <Link href='/app/collections' onClick={() => setOpenMobile(false)}>
                                    <LibraryBigIcon/> Collections
                                </Link>
                            </SidebarMenuButton>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        size='icon-sm'
                                        onClick={() => {
                                            setCreateCollectionDialogOpen(true);
                                            setOpenMobile(false);
                                        }}
                                        className='cursor-pointer'
                                    >
                                        <PlusIcon/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    New collection
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            <CollectionsLinks/>
        </Sidebar>
    );
}