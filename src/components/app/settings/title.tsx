import {CardTitle} from "@/components/ui/card";
import {ReactNode} from "react";

export default function SettingsTitle({ children }: { children: ReactNode }) {
    return <CardTitle className='text-sm'>
        {children}
    </CardTitle>
}