'use client';

import {useLinkCollections} from "@/features/links/hooks/use-link-collections";
import {link as linkModel} from "@/lib/db/schema";
import {ComponentProps, ReactNode} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {FolderIcon} from "lucide-react";
import Link, {LinkProps} from "next/link";
import {HtmlAttributes} from "csstype";

function Wrapper({children}: {children: ReactNode}) {
    return (
        <div className='flex flex-wrap gap-1'>
            {children}
        </div>
    );
}

export function LinkCollectionsBadges(
    {
        link,
        onLinkVisit,
        withIcons = true,
        asLinks = true,
    }: {
        link: typeof linkModel.$inferSelect;
        onLinkVisit?: () => void;
        withIcons?: boolean;
        asLinks?: boolean;
    }
) {
    const {isPending, data: collections, error} = useLinkCollections(link.id);

    if (isPending) {
        return (
            <Wrapper>
                {[... new Array(3)].map((_, i) => (
                    <Skeleton key={i} className='w-[4rem] h-5 rounded-full' />
                ))}
            </Wrapper>
        );
    }

    if (error) {
        return null;
    }

    return (
        <Wrapper>
            {collections.map(collection => {
                const contents: ReactNode = (
                    <>
                        {withIcons && <FolderIcon />}
                        {collection.name}
                    </>
                );

                const children = asLinks
                    ? <Link href={`/app/collections/${collection.id}`}>{contents}</Link>
                    : contents;

                return (
                    <Badge
                        key={collection.id}
                        variant='secondary'
                        onClick={onLinkVisit}
                        asChild={asLinks}
                        children={children}
                    />
                );
            })}
        </Wrapper>
    );
}