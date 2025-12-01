'use client';

import {link as linkModel} from "@/lib/db/schema";
import {LinkImageCard} from "@/features/links/components/image-card";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {EllipsisIcon} from "lucide-react";
import Link from "next/link";
import {MouseEventHandler, useState} from "react";
import {deleteLink} from "@/features/links/server/actions";
import {
    LinkSheet,
    LinkSheetContent,
    LinkSheetTrigger,
    LongPressSheetTrigger
} from "@/features/links/components/link-sheet";

export function LinkCard(
    {
        link,
        onDelete,
    }: {
        link: typeof linkModel.$inferSelect,
        onDelete: () => void,
    }
) {
    const [deleting, setDeleting] = useState(false);

    const deleteAction: MouseEventHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (deleting) return;

        setDeleting(true);

        try {
            await deleteLink(link.id);

            if (onDelete) {
                onDelete();
            }

        } catch (error) {
            console.error(error);
            setDeleting(false);
        }

    };

    return (
        <LinkSheet>
            <div className='relative group'>
                <LongPressSheetTrigger>
                    {attrs => (
                        <Link
                            key={link.id}
                            href={link.url}
                            target='_blank'
                            className='h-full relative z-0 bg-background border p-1 rounded-xl flex flex-col gap-1 hover:border-muted-foreground transition-colors'
                            {...attrs}
                        >
                            <LinkImageCard
                                loading={false}
                                host={link.host}
                                title={link.title}
                                url={link.url}
                                imageUrl={link.imageUrl}
                            />
                            <div
                                className='line-clamp-2 text-sm px-2 py-1 opacity-70 group-hover:opacity-100'
                            >
                                {link.title}
                            </div>
                        </Link>
                    )}
                </LongPressSheetTrigger>
                <Tooltip>
                    <LinkSheetTrigger>
                        <TooltipTrigger asChild>
                            <Button
                                className='cursor-pointer z-1 absolute top-0 right-0 mt-2 mr-2 hidden md:group-hover:flex'
                                variant='default'
                                size='icon-sm'
                            >
                                <EllipsisIcon/>
                            </Button>
                        </TooltipTrigger>
                    </LinkSheetTrigger>
                    <TooltipContent side='bottom' className='z-1'>
                        More
                    </TooltipContent>
                </Tooltip>
            </div>
            <LinkSheetContent link={link} />
        </LinkSheet>
    );
}