'use client';

import {createContext, ReactNode, useContext, useState} from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {LongPressFns, useLongPress} from "@uidotdev/usehooks";
import {link as linkModel} from "@/lib/db/schema";
import {LinkImageCard} from "@/features/links/components/image-card";
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon, GlobeIcon} from "lucide-react";
import Link from "next/link";

type ContextValues = {
    open: boolean;
    setOpen: (open: boolean) => void;
};
const Context = createContext<ContextValues>({
    open: false,
    setOpen: () => {},
});

const useLinkSheet = () => useContext(Context);

export function LinkSheet({children}: {children: ReactNode}) {
    const [open, setOpen] = useState(false);

    return (
        <Context.Provider value={{open, setOpen}}>
            <Sheet open={open} onOpenChange={setOpen}>
                {children}
            </Sheet>
        </Context.Provider>
    );
}

export function LongPressSheetTrigger({children}: {children: (attrs: LongPressFns) => ReactNode}) {
    const {setOpen} = useLinkSheet();

    const attrs = useLongPress((e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    }, {
        onStart: e => {
            e.preventDefault();
            e.stopPropagation();
        },
        onFinish: e => {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    return children(attrs);
}

export function LinkSheetTrigger({children}: {children: ReactNode}) {
    return (
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
    );
}

export function LinkSheetContent(
    {
        link,
    }: {
        link: typeof linkModel.$inferSelect,
    }
) {
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    Link info
                </SheetTitle>
                <SheetDescription>
                    {link.url}
                </SheetDescription>
            </SheetHeader>
            <div className='px-4 space-y-4'>
                <LinkImageCard loading={false} host={link.host} title={link.title} url={link.url} imageUrl={link.imageUrl} />
                <Button className='w-full' asChild>
                    <Link href={link.url} target='_blank'>
                        <ExternalLinkIcon />
                        Visit {link.host}
                    </Link>
                </Button>
                <div className='font-semibold'>
                    {link.title}
                </div>
            </div>
        </SheetContent>
    );
}