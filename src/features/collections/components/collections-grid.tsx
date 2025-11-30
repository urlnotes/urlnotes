'use client';

import {useUserCollections} from "@/features/collections/hooks/use-user-collections";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle} from "@/components/ui/empty";
import {useCreateCollectionDialog} from "@/features/collections/providers/create-collection-dialog-provider";
import {FolderIcon, PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function CollectionsGrid() {
    const {isLoading, data: collections, error} = useUserCollections();
    const {
        setOpen: setCreateCollectionDialogOpen,
    } = useCreateCollectionDialog();

    const skeletons = [...new Array(4)].map((_, i) => (
        <div key={i}>

        </div>
    ));

    if (isLoading) {
        return (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                {skeletons}
            </div>
        );
    }

    if (error || !collections) {
        return (
            <Alert variant='destructive'>
                <AlertDescription>
                    Error while fetching collections. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    if (collections.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>
                        There is no collections yet.
                    </EmptyTitle>
                    <EmptyDescription>
                        You haven&#39;t added any collections yet.
                        Get started by adding your first collection.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button
                        onClick={() => setCreateCollectionDialogOpen(true)}
                    >
                        <PlusIcon/> Add collection
                    </Button>
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
                <button
                    className='py-2 cursor-pointer border rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors hover:border-muted-foreground'
                    onClick={() => setCreateCollectionDialogOpen(true)}
                >
                    <PlusIcon className='size-4'/>
                    <div className='text-sm'>Add collection</div>
                </button>

                {collections.map((collection, i) => (
                    <Link
                        href={`/app/collections/${collection.id}`} key={i}
                        className='group flex flex-col gap-1 border rounded-xl hover:border-muted-foreground px-5 py-4'
                    >
                        <div>
                            <FolderIcon className='size-4 text-muted-foreground'/>
                        </div>
                        <div className='line-clamp-2 text-sm text-muted-foreground group-hover:text-primary transition-colors'>
                            {collection.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}