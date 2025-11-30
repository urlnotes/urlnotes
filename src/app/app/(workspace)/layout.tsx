import {ReactNode} from "react";
import {
    SidebarProvider
} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app/sidebar";
import {WorkspacePage} from "@/components/app/page";
import {LinkCreateDialogProvider} from "@/features/links/providers/link-create-dialog-provider";
import {CreateCollectionDialogProvider} from "@/features/collections/providers/create-collection-dialog-provider";

export default async function WorkspaceLayout(
    {
        children,
    }: {
        children: ReactNode;
    }
) {
    return (
        <LinkCreateDialogProvider>
            <SidebarProvider>
                <CreateCollectionDialogProvider>
                    <AppSidebar/>
                </CreateCollectionDialogProvider>
                <WorkspacePage className='flex-1'>
                    {children}
                </WorkspacePage>
            </SidebarProvider>
        </LinkCreateDialogProvider>
    );
}