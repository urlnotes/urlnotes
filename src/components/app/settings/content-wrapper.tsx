import {ReactNode} from "react";

export default function SettingsContentWrapper({children}: {children?: ReactNode}) {
    return <div className='border border-neutral-400/60 dark:border-neutral-700 rounded-lg bg-white dark:bg-white/3 shadow-xs divide-y divide-neutral-400/60 dark:divide-neutral-700'>
        {children}
    </div>
}