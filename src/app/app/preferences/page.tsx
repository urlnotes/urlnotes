'use client';

import {WorkspaceHeader} from "@/components/app/page";
import {Settings, SettingsStack} from "@/components/app/settings/settings";
import SettingsHeader from "@/components/app/settings/header";
import SettingsContent from "@/components/app/settings/content";
import SettingsContentWrapper from "@/components/app/settings/content-wrapper";
import SettingsTitle from "@/components/app/settings/title";
import SettingsDescription from "@/components/app/settings/description";
import {SettingsThemeToggle} from "@/features/settings/components/theme-toggle";
import {SettingsLanguageToggle} from "@/features/settings/components/language-toggle";

export default function PreferencesPage() {
    return (
        <>
            <WorkspaceHeader>
                General
            </WorkspaceHeader>
            <SettingsStack>
                <Settings>
                    <SettingsHeader>
                        <SettingsTitle>
                            Appearance
                        </SettingsTitle>
                        <SettingsDescription>
                            Appearance of the application
                        </SettingsDescription>
                    </SettingsHeader>
                    <SettingsContentWrapper>
                        <SettingsContent className='flex flex-col gap-4'>
                            <div>
                                <SettingsTitle>
                                    Theme
                                </SettingsTitle>
                                <SettingsDescription>
                                    Select theme of the application
                                </SettingsDescription>
                            </div>
                            <SettingsThemeToggle />
                        </SettingsContent>
                        <SettingsContent className='flex flex-col gap-4'>
                            <div>
                                <SettingsTitle>
                                    Language
                                </SettingsTitle>
                                <SettingsDescription>
                                    What language are you speaking?
                                </SettingsDescription>
                            </div>
                            <SettingsLanguageToggle />
                        </SettingsContent>
                    </SettingsContentWrapper>
                </Settings>
            </SettingsStack>
        </>
    );
}