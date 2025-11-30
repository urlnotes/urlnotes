'use client';

import {WorkspaceHeader} from "@/components/app/page";
import {LinksGrid} from "@/features/links/components/links-grid";

export default function LinksPage() {
    return (
        <div className='space-y-4'>
            <WorkspaceHeader>
                Links
            </WorkspaceHeader>

            <LinksGrid />
        </div>
    );
}