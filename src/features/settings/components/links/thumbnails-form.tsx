'use client';

import SettingsTitle from "@/components/app/settings/title";
import SettingsDescription from "@/components/app/settings/description";
import {Switch} from "@/components/ui/switch";
import {useForm} from "@tanstack/react-form";
import {Collapsible, CollapsibleContent} from "@/components/ui/collapsible";
import {Input} from "@/components/ui/input";
import {Field, FieldDescription} from "@/components/ui/field";
import Link from "next/link";
import {useUser} from "@/features/auth/providers/user-provider";
import {Button} from "@/components/ui/button";
import {updateThumIoID} from "@/features/settings/server/actions/thumio";

export function SettingsThumbnailsForm() {
    const user = useUser();

    const form = useForm({
        defaultValues: {
            enabled: !!user.thumio_id,
            id: user.thumio_id ?? '',
        },
        onSubmit: ({value}) => {
            const val = value.enabled ? value.id : null;
            updateThumIoID(val);
            // user.thumio_id = val;
        },
    });

    return (
        <div>
            <div className='flex gap-1'>
                <div className="flex-1">
                    <SettingsTitle>
                        thum.io
                    </SettingsTitle>
                    <SettingsDescription>
                        Get thumbnail from {" "}
                        <Link
                            target='_blank'
                            href='https://thum.io'
                            className='text-primary underline'
                        >
                            thum.io
                        </Link>
                    </SettingsDescription>
                </div>
                <div>
                    <form.Field name='enabled'>
                        {field => (
                            <Switch
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                            />
                        )}
                    </form.Field>
                </div>
            </div>
            <form.Subscribe
                selector={state => state.values.enabled}
            >
                {enabled => (
                    <Collapsible open={enabled}>
                        <CollapsibleContent className='CollapsibleContent'>
                            <div className='pt-4'>
                                <Field>
                                    <Input className='max-w-[10rem]' />
                                    <FieldDescription>
                                        Paste thum.io Key ID here
                                    </FieldDescription>
                                </Field>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            </form.Subscribe>
            <form.Subscribe
                selector={state => state.isDefaultValue}
            >
                {isDefault => (
                    <Collapsible open={!isDefault}>
                        <CollapsibleContent className='CollapsibleContent'>
                            <div className='pt-2 flex justify-end'>
                                <Button>
                                    Save
                                </Button>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )}
            </form.Subscribe>
        </div>
    );
}