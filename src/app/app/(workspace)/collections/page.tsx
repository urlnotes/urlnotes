import {WorkspaceHeader} from "@/components/app/page";
import {CollectionsGrid} from "@/features/collections/components/collections-grid";
import {CreateCollectionDialogProvider} from "@/features/collections/providers/create-collection-dialog-provider";

export default function CollectionsPage() {
    return (
        <>
            <WorkspaceHeader>
                Collections
            </WorkspaceHeader>
            <CreateCollectionDialogProvider>
                <CollectionsGrid />
            </CreateCollectionDialogProvider>
        </>
    );
}