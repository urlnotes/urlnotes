'use client';

import {useTheme} from "next-themes";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {LaptopMinimalIcon, MoonIcon, SunIcon} from "lucide-react";

export function SettingsThemeToggle() {
    const {theme, setTheme} = useTheme();

    return (
        <ToggleGroup
            type='single'
            value={theme}
            variant='outline'
            onValueChange={setTheme}
        >
            <ToggleGroupItem value='light' className='cursor-pointer'>
                <SunIcon /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value='dark' className='cursor-pointer'>
                <MoonIcon /> Dark
            </ToggleGroupItem>
            <ToggleGroupItem value='system' className='cursor-pointer'>
                <LaptopMinimalIcon /> System
            </ToggleGroupItem>
        </ToggleGroup>
    );
}