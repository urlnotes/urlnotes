'use client';

import {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export function SettingsSidebarLink({href, children}: {href: string, children: ReactNode}) {
    const pathname = usePathname();
    const [active, setActive] = useState(pathname === href);

    useEffect(() => {
        setActive(pathname === href);
    }, [href, pathname]);

    return <Link
        href={href}
        className={
            'flex items-center gap-2 [&>svg]:size-4 [&>svg]:opacity-80 px-3 py-2 rounded-lg text-sm hover:bg-neutral-200 dark:hover:bg-white/6 transition-colors' +
            (active ? ' bg-neutral-200/70 dark:bg-white/4 font-semibold': '')
        }
    >
        {children}
    </Link>
}