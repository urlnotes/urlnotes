'use client';

import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Badge} from "@/components/ui/badge";

export function SettingsLanguageToggle() {
    return (
        <ToggleGroup type='single' variant='outline' value='en'>
            <ToggleGroupItem value='en'>
                English
            </ToggleGroupItem>
            <ToggleGroupItem value='ru' disabled>
                Русский <span className='text-xs text-muted-foreground'>soon</span>
            </ToggleGroupItem>
        </ToggleGroup>
    );
}