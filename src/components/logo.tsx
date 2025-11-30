import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export function Logo(
    {
        className,
        ... props
    }: ComponentProps<'div'>
) {
    return (
        <div className={cn('font-mono font-semibold', className)} {... props}>
            <span className='text-brand'>url</span>notes.dev
        </div>
    );
}