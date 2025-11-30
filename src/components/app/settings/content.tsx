import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export default function SettingsContent({children, className, ...props}: ComponentProps<'div'>) {
    return <div className={cn('px-8 py-6', className)} {...props}>
        {children}
    </div>
}