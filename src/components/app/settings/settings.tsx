import {ReactNode} from "react";
import {Card} from "@/components/ui/card";

export function Settings({children}: {children: ReactNode}) {
    return <Card className='w-full max-w-[calc(var(--container-3xl)-var(--spacing)*12)] p-[calc(var(--spacing)/1.5)] shadow-none text-sm bg-neutral-100/70 dark:bg-white/2 block'>
        {children}
    </Card>
}
export function SettingsStack({children}: {children: ReactNode}) {
    return (
        <div className='space-y-2 md:space-y-4'>
            {children}
        </div>
    );
}