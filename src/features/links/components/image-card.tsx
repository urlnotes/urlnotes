'use client';

import {Skeleton} from "@/components/ui/skeleton";
import {ImageIcon} from "lucide-react";
import {Favicon} from "@/features/links/components/link-favicon";

export function LinkImageCard(
    {
        loading,
        host,
        title,
        url,
        imageUrl,
    }: {
        loading: boolean;
        host: string;
        title: string;
        url: string;
        imageUrl: string|null;
    }
) {
    return (
        <div className='relative aspect-[2/1] rounded-md border overflow-hidden'>
            {loading && (
                <div className='w-full h-full relative'>
                    <Skeleton className='w-full h-full'/>
                    <div
                        className='absolute w-full h-full inset-0 flex items-center justify-center'>
                        <ImageIcon className='text-muted-foreground'/>
                    </div>
                </div>
            )}
            {!loading && (
                <>
                    <div
                        className='z-2 absolute w-full h-full inset-0 flex items-center justify-center'>
                        <div
                            className='px-3 text-sm py-1.5 rounded-md bg-background/60 backdrop-blur-sm border flex items-center gap-2'>
                            <Favicon url={url}/> {host}
                        </div>
                    </div>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={title || url}
                            className='relative aspect-[2/1] object-cover object-top'
                        />
                    )}
                </>
            )}
        </div>
    );
}