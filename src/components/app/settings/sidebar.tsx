import {ReactNode} from "react";

export default function SettingsSidebar({children}: {children: ReactNode}) {
    return <div className='w-full max-w-[11rem] flex flex-col gap-1'>
        {children}
    </div>
}