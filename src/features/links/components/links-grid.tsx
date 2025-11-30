'use client';

import {useLinkCreateDialog} from "@/features/links/providers/link-create-dialog-provider";
import {useUserHosts, useUserLinks} from "@/features/links/hooks/use-user-links";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle} from "@/components/ui/empty";
import {Button} from "@/components/ui/button";
import {ChevronsUpDownIcon, FilterIcon, PlusIcon, TrashIcon, XIcon} from "lucide-react";
import Link from "next/link";
import {LinkImageCard} from "@/features/links/components/image-card";
import {Skeleton} from "@/components/ui/skeleton";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Spinner} from "@/components/ui/spinner";
import {Command, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command";
import {Favicon} from "@/features/links/components/link-favicon";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {debounce} from "@tanstack/pacer";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {LinkCard} from "@/features/links/components/link-card";

function HostsList(
    {
        host,
        onHostChange,
        collectionId,
    }: {
        host: string | null;
        onHostChange: (host: string | null) => void;
        collectionId?: string;
    }
) {
    const {isPending, data, error} = useUserHosts(collectionId);

    if (isPending) {
        return (
            <div className='py-5 flex justify-center'>
                <Spinner/>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant='destructive'>
                Error loading hosts list
            </Alert>
        );
    }

    if (!data) {
        return (
            <div className='text-muted-foreground text-sm px-4 py-2'>
                There is no hosts.
            </div>
        );
    }

    return (
        <Command value={host ?? ''}>
            <CommandInput
                placeholder='Search host...'
            />
            <CommandList>
                <CommandItem onSelect={() => onHostChange(null)}>
                    All
                </CommandItem>
                <CommandSeparator/>
                {data.map(host => (
                    <CommandItem key={host} value={host} onSelect={onHostChange}>
                        <Favicon url={host}/>
                        {host}
                    </CommandItem>
                ))}
            </CommandList>
        </Command>
    );
}

function HostSelect(
    {
        host,
        onHostChange,
        collectionId,
    }: {
        host: string | null;
        onHostChange: (host: string | null) => void;
        collectionId?: string;
    }
) {
    const [open, setOpen] = useState(false);

    const onSelect = (host: string | null) => {
        setOpen(false);
        onHostChange(host);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                >
                    {host || 'Select a host'}
                    <ChevronsUpDownIcon/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' side='bottom' className='p-0 overflow-hidden'>
                <HostsList host={host} onHostChange={onSelect} collectionId={collectionId}/>
            </PopoverContent>
        </Popover>
    );
}

function SearchInput(
    {
        search,
        onSearchChange,
    }: {
        search: string;
        onSearchChange: (search: string) => void;
    }
) {
    const [searchText, setSearchText] = useState(search);

    const debouncedChange = debounce(
        onSearchChange,
        {
            wait: 500,
            leading: false,
            trailing: true,
        }
    );

    const onChange = (value: string) => {
        setSearchText(value);

        if (!!value) {
            debouncedChange(value);
        } else {
            onSearchChange(value);
        }
    }

    return (
        <InputGroup className='max-w-xs'>
            <InputGroupInput
                placeholder='Search...'
                value={searchText}
                onChange={e => onChange(e.target.value)}
            />
            <InputGroupAddon align='inline-end'>
                {!!search && (
                    <Button
                        variant='ghost'
                        size='icon-sm'
                        className='-mr-1 cursor-pointer'
                        onClick={() => onChange('')}
                    >
                        <XIcon/>
                    </Button>
                )}
            </InputGroupAddon>
        </InputGroup>
    );
}

export function LinksGrid(
    {
        canAdd = true,
        collectionId,
    }: {
        canAdd?: boolean;
        collectionId?: string;
    }
) {
    const {
        setOpen: setLinkCreateDialogOpen,
    } = useLinkCreateDialog();

    const [host, setHost] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const {isLoading, isFetching, data, error, refetch} = useUserLinks({host, search, collectionId});

    const hasFilters = !!host || !!search;

    const skeletons = (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            {[...new Array(4)].map((_, i) => (
                <div
                    className='bg-background border p-1 rounded-xl flex flex-col gap-1'
                    key={i}
                >
                    <div className='relative'>
                        <Skeleton className='z-0 w-full aspect-[2/1] border'/>
                        <div className='absolute z-1 w-full h-full inset-0 flex items-center justify-center'>
                            <div
                                className='px-3 text-sm py-1.5 rounded-md bg-background/60 backdrop-blur-sm border flex items-center gap-2'>
                                <Skeleton className='size-4 rounded-full'/>
                                <Skeleton className='h-2 w-[4rem]'/>
                            </div>
                        </div>
                    </div>
                    <div
                        className='text-sm px-2 py-1 opacity-70 group-hover:opacity-100 space-y-1'
                    >
                        <Skeleton className='w-full h-2'/>
                        <Skeleton className='w-2/3 h-2'/>
                    </div>
                </div>
            ))}
        </div>
    );

    const clear = () => {
        setHost(null);
        setSearch('');
    }

    if (isLoading && !data) {
        return skeletons;
    }

    if (error || !data) {
        return (
            <Alert variant='destructive'>
                Error while loading links. Please try again later.
            </Alert>
        );
    }

    if (data.length === 0 && !hasFilters) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>
                        There is no links yet
                    </EmptyTitle>
                    <EmptyDescription>
                        You haven&#39;t added any links yet.
                        Get started by adding your first link.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    {canAdd && (
                        <Button
                            onClick={() => setLinkCreateDialogOpen(true)}
                        >
                            <PlusIcon/> Add link
                        </Button>
                    )}
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-2'>
                {hasFilters && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='ghost'
                                onClick={clear}
                                size='icon'
                            >
                                <XIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side='bottom'>
                            Clear filters
                        </TooltipContent>
                    </Tooltip>
                )}
                {!hasFilters && (
                    <div className='size-9 flex items-center justify-center'>
                        <FilterIcon className='size-4 text-muted-foreground' />
                    </div>
                )}
                <HostSelect host={host} onHostChange={setHost} collectionId={collectionId}/>
                <SearchInput search={search} onSearchChange={setSearch}/>
            </div>
            {hasFilters && data.length === 0 && (
                <Alert>
                    <AlertDescription>
                        Links no found.
                    </AlertDescription>
                </Alert>
            )}
            {isFetching && skeletons}
            {!isFetching && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {!hasFilters && canAdd && (
                        <button
                            className='cursor-pointer border rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary transition-colors hover:border-muted-foreground'
                            onClick={() => setLinkCreateDialogOpen(true)}
                        >
                            <div className='flex flex-col items-center'>
                                <PlusIcon className='size-4 opacity-70'/>
                                <div className='text-sm'>
                                    New link
                                </div>
                            </div>
                        </button>
                    )}
                    {!isFetching && data.map((link) => (
                        <LinkCard
                            link={link}
                            key={link.id}
                            onDelete={() => {
                                void refetch();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
