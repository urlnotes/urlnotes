import {ReactNode} from "react";

export default function SettingsHeader({ children }: { children: ReactNode }) {
    return <div className='px-8 py-5'>
        {children}
    </div>
}