'use client';

import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {InputGroup, InputGroupInput} from "@/components/ui/input-group";
import {useForm} from "@tanstack/react-form";
import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";
import {FormEventHandler} from "react";
import {z} from "zod";
import {createCollection} from "@/features/collections/server/actions";

const schema = z.object({
    name: z.string().min(1, {error: 'Name is required'}),
});

export function CreateCollectionForm(
    {
        onCreate,
    }: {
        onCreate?: () => void;
    }
) {
    const form = useForm({
        defaultValues: {
            name: '',
        },
        validators: {
            onSubmit: schema,
        },
        onSubmit: async ({value: {name}}) => {
            await createCollection({name});

            if (onCreate) {
                onCreate();
            }
        },
    });

    const submit: FormEventHandler = e => {
        if (form.state.isSubmitting) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        void form.handleSubmit();
    }

    return (
        <form className='space-y-4' onSubmit={submit}>
            <form.Field name='name'>
                {field => (
                    <Field className='gap-1'>
                        <FieldLabel>
                            Collection name
                        </FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                autoFocus={true}
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}
                            />
                        </InputGroup>
                        {field.state.meta.errors.length > 0 && field.state.meta.errors.map((e, i) => (
                            <FieldError key={i}>
                                {e?.message}
                            </FieldError>
                        ))}
                    </Field>
                )}
            </form.Field>
            <div className='flex justify-end'>
                <form.Subscribe
                    selector={state => !state.canSubmit || state.isValidating || state.isSubmitting}
                >
                    {disabled => (
                        <Button
                            type='submit'
                            disabled={disabled}
                        >
                            Save collection <ArrowRightIcon />
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}