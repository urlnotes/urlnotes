import {WorkspaceHeader} from "@/components/app/page";
import {getCollection} from "@/features/collections/server/actions";
import {notFound} from "next/navigation";
import {LinksGrid} from "@/features/links/components/links-grid";

export default async function CollectionPage(
    {
        params,
    }: {
        params: Promise<{id: string}>
    }
) {
    const {id} = await params;

    const collection = await getCollection(id);

    if (!collection) {
        notFound();
    }

    return (
        <div className='space-y-4'>
            <WorkspaceHeader label='Collections'>
                {collection.name}
            </WorkspaceHeader>
            <LinksGrid
                canAdd={false}
                collectionId={collection.id}
            />
        </div>
    );
}