import {ComponentProps} from "react";
import {cn} from "@/lib/utils";
import {SidebarTrigger} from "@/components/ui/sidebar";

export function WorkspacePage(
    {
        className,
        children,
        ... props
    }: ComponentProps<'div'>
) {
    return (
        <div className={cn('py-2 px-4 md:py-4 md:px-6', className)} {...props}>
            {children}
        </div>
    );
}

export function WorkspaceHeader(
    {
        label,
        className,
        children,
        ... props
    }: ComponentProps<'h1'> & {label?: string}
) {
    return (
        <div>
            {label && (
                <div className='text-sm text-muted-foreground'>{label}</div>
            )}
            <h1 className={cn('flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-bold mt-1 mb-4 md:mb-6', className)} {...props}>
                <SidebarTrigger className='md:hidden' />
                {children}
            </h1>
        </div>
    );
}