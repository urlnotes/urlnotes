import {ReactNode} from "react";
import {CardDescription} from "@/components/ui/card";

export default function SettingsDescription({children}: {children: ReactNode}) {
    return <CardDescription className='text-sm'>
        {children}
    </CardDescription>
}