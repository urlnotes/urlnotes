'use client';

import {WorkspaceHeader} from "@/components/app/page";
import {Settings, SettingsStack} from "@/components/app/settings/settings";
import SettingsHeader from "@/components/app/settings/header";
import SettingsTitle from "@/components/app/settings/title";
import SettingsDescription from "@/components/app/settings/description";
import SettingsContentWrapper from "@/components/app/settings/content-wrapper";
import SettingsContent from "@/components/app/settings/content";
import {SettingsThumbnailsForm} from "@/features/settings/components/links/thumbnails-form";

export default function LinksSettingsPage() {
    return (
        <div className='space-y-4'>
            <WorkspaceHeader label='Settings'>
                Links
            </WorkspaceHeader>

            <SettingsStack>

                <Settings>
                    <SettingsHeader>
                        <SettingsTitle>Thumbnails</SettingsTitle>
                        <SettingsDescription>
                            Set up links preview
                        </SettingsDescription>
                    </SettingsHeader>
                    <SettingsContentWrapper>
                        <SettingsContent>
                            <SettingsThumbnailsForm />
                        </SettingsContent>
                    </SettingsContentWrapper>
                </Settings>

                <Settings>
                    <SettingsHeader>
                        <SettingsTitle>Contents</SettingsTitle>
                        <SettingsDescription>
                            Set up links content retreival
                        </SettingsDescription>
                    </SettingsHeader>
                    <SettingsContentWrapper>
                        <SettingsContent>

                        </SettingsContent>
                    </SettingsContentWrapper>
                </Settings>

            </SettingsStack>
        </div>
    );
}