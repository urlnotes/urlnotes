import type { Metadata } from 'next';
import {WorkspaceHeader, WorkspacePage} from "@/components/app/page";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function AppPage() {
    return (
        <>
            <WorkspaceHeader>
                Dashboard
            </WorkspaceHeader>
        </>
    );
}