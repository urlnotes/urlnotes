'use client';

import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";
import {Collapsible, CollapsibleContent} from "@/components/ui/collapsible";
import {type Dispatch, FormEventHandler, type SetStateAction, useCallback, useEffect, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {ArrowRightIcon, CheckIcon, GlobeIcon, ImageIcon, PlusIcon, XIcon} from "lucide-react";
import {getLinkMeta, createLink, urlExists, urlIsReachable} from "@/features/links/server/actions";
import {z} from "zod";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {Spinner} from "@/components/ui/spinner";
import {Skeleton} from "@/components/ui/skeleton";
import {Input} from "@/components/ui/input";
import {getHostFromUrl} from "@/features/links/utils/get-host";
import {Button} from "@/components/ui/button";
import {DialogClose} from "@/components/ui/dialog";
import {Favicon} from "@/features/links/components/link-favicon";
import {LinkImageCard} from "@/features/links/components/image-card";
import {useQueryClient} from "@tanstack/react-query";
import {collection} from "@/lib/db/schema";
import {
    Tags,
    TagsContent,
    TagsEmpty, TagsGroup,
    TagsInput, TagsItem,
    TagsList,
    TagsTrigger,
    TagsValue
} from "@/components/ui/shadcn-io/tags";
import {useUserCollections} from "@/features/collections/hooks/use-user-collections";
import {Alert} from "@/components/ui/alert";
import {
    CreateCollectionDialogProvider,
    useCreateCollectionDialog
} from "@/features/collections/providers/create-collection-dialog-provider";

function UrlInputIcon(
    {
        loading,
        editable,
        url,
    }: {
        loading: boolean;
        editable: boolean;
        url: string;
    }
) {
    if (loading) {
        return <Spinner/>
    }

    if (editable) {
        return <GlobeIcon/>
    }

    return <Favicon url={url}/>
}

function UrlInput(
    {
        onChange,
    }: {
        onChange: (url: string) => void;
    }
) {
    const schema = z.object({
        url: z.url({error: 'Invalid URL'}),
    });

    const [editable, setEditable] = useState(true);

    const form = useForm({
        defaultValues: {
            url: '',
        },
        validators: {
            onSubmitAsync: async ({value}) => {
                const parsed = schema.safeParse(value);

                if (!parsed.success) {
                    return {
                        fields: z.flattenError(parsed.error).fieldErrors,
                    };
                }

                if (await urlExists(value.url)) {
                    return {
                        fields: {
                            url: ['URL already added']
                        }
                    };
                }

                if (!await urlIsReachable(value.url)) {
                    return {
                        fields: {
                            url: ['URL is unreachable'],
                        }
                    };
                }
            },
        },
        onSubmit: async ({value: {url}}) => {
            setEditable(false);

            if (onChange) {
                onChange(url);
            }

        }
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
    }

    const reset = () => {
        form.reset();
        setEditable(true);

        if (onChange) {
            onChange('');
        }
    }

    return (
        <form onSubmit={submit}>
            <form.Field name='url'>
                {field => (
                    <Field className='gap-1'>
                        <InputGroup>
                            <InputGroupAddon align='inline-start'>
                                <form.Subscribe
                                    selector={state => state.isValidating || state.isSubmitting}
                                >
                                    {loading => (
                                        <UrlInputIcon loading={loading} editable={editable} url={field.state.value}/>
                                    )}
                                </form.Subscribe>
                            </InputGroupAddon>
                            <InputGroupInput
                                placeholder='https://example.com'
                                value={field.state.value}
                                onChange={e => field.handleChange(e.target.value)}
                                disabled={form.state.isValidating || !editable}
                                className='disabled:text-primary disabled:opacity-100'
                            />
                            <InputGroupAddon align='inline-end'>
                                {editable && field.state.value.length > 0 && (
                                    <form.Subscribe
                                        selector={state => state.isValidating || state.isSubmitting}
                                    >
                                        {loading => (
                                            <InputGroupButton
                                                type='submit'
                                                size='icon-sm'
                                                variant='ghost'
                                                className='-mr-1 cursor-pointer'
                                                disabled={loading}
                                            >
                                                <ArrowRightIcon/>
                                            </InputGroupButton>
                                        )}
                                    </form.Subscribe>
                                )}
                                {!editable && (
                                    <InputGroupButton
                                        type='button'
                                        size='icon-sm'
                                        variant='ghost'
                                        className='-mr-1 cursor-pointer'
                                        onClick={reset}
                                    >
                                        <XIcon/>
                                    </InputGroupButton>
                                )}
                            </InputGroupAddon>
                        </InputGroup>
                        {field.state.meta.errors.length === 0 && editable && (
                            <FieldDescription>
                                Paste URL you want to save here
                            </FieldDescription>
                        )}
                        {field.state.meta.errors.length > 0 && field.state.meta.errors.map((e, index) => (
                            <FieldError key={index}>
                                {e}
                            </FieldError>
                        ))}
                    </Field>
                )}
            </form.Field>
        </form>
    );
}

function CollectionsInputList(
    {
        selected,
        onSelect,
    }: {
        selected: (typeof collection.$inferSelect)[];
        onSelect: (c: typeof collection.$inferSelect) => void;
    }
) {
    const {isLoading, data: collections, error} = useUserCollections();

    const isSelected = (item: typeof collection.$inferSelect) => {
        return selected.filter(i => i.id === item.id).length > 0;
    };

    if (isLoading) {
        return (
            <div className='py-5 flex items-center justify-center'>
                <Spinner/>
            </div>
        );
    }

    if (!collections || error) {
        return (
            <Alert variant='destructive'>
                Error occurred while loading collections. Please try again later.
            </Alert>
        );
    }

    return collections.map(item => (
        <TagsItem
            key={item.id}
            value={item.id}
            className='justify-start'
            onSelect={() => onSelect(item)}
            disabled={isSelected(item)}
        >
            {item.name}
            {isSelected(item) && (
                <CheckIcon className='ml-auto' />
            )}
        </TagsItem>
    ));
}

function CollectionsInput(
    {
        value,
        onChange
    }: {
        value: (typeof collection.$inferSelect)[],
        onChange: Dispatch<SetStateAction<(typeof collection.$inferSelect)[]>>;
    }
) {
    const {setOpen: setCreateCollectionDialogOpen} = useCreateCollectionDialog();
    const [open, setOpen] = useState(false);

    const handleRemove = (removed: typeof collection.$inferSelect) => {
        if (!value.includes(removed)) {
            return;
        }

        onChange(prev =>
                prev.filter((v) => v.id !== removed.id)
        );
    };

    return (
        <Tags open={open} onOpenChange={setOpen}>
            <TagsTrigger
                placeholder='Select collections...'
                className='p-1'
            >
                {value.map(item => (
                    <TagsValue
                        key={item.id}
                        onRemove={() => handleRemove(item)}
                    >
                        {item.name}
                    </TagsValue>
                ))}
            </TagsTrigger>
            <TagsContent side='top'>
                <TagsInput
                    placeholder='Search collections...'
                />
                <TagsList>
                    <TagsEmpty/>
                    <TagsGroup>
                        <TagsItem
                            className='justify-start'
                            onSelect={() => {
                                setCreateCollectionDialogOpen(true);
                            }}
                        >
                            <PlusIcon/> Create collection
                        </TagsItem>
                        <CollectionsInputList
                            selected={value}
                            onSelect={c => onChange([... value, c])}
                        />
                    </TagsGroup>
                </TagsList>
            </TagsContent>
        </Tags>
    );
}

export function CreateLinkForm(
    {
        onSave,
    }: {
        onSave?: () => void;
    }
) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [collections, setCollections] = useState<(typeof collection.$inferSelect)[]>([]);
    const [saving, setSaving] = useState(false);

    const loadUrlMetadata = useCallback(async () => {
        if (url === '') {
            return;
        }

        setLoading(true);
        const metadata = await getLinkMeta(url);

        if (!metadata.success) {
            setLoading(false);
            return;
        }

        console.log(metadata);

        setImageUrl(metadata.image || null);
        setTitle(metadata.title || url);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        setTimeout(loadUrlMetadata);
    }, [loadUrlMetadata, url]);

    const save: FormEventHandler = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (loading || saving) {
            return;
        }

        setSaving(true);
        try {
            await createLink({
                url,
                title,
                imageUrl,
                collections: collections.map(c => c.id),
            });
            await queryClient.invalidateQueries({queryKey: ['links']});

            if (onSave) {
                onSave();
            }

        } catch (err) {
            console.error(err);
            setSaving(false);
        }
    }

    return (
        <CreateCollectionDialogProvider>
            <div className='space-y-4'>
                <UrlInput onChange={setUrl}/>

                <form onSubmit={save}>
                    <Collapsible open={!!url}>
                        <CollapsibleContent className='CollapsibleContent -m-1 p-1'>
                            {url && (
                                <div className='space-y-4'>
                                    <LinkImageCard
                                        loading={loading}
                                        host={getHostFromUrl(url)}
                                        title={title}
                                        url={url}
                                        imageUrl={imageUrl}
                                    />
                                    <div>
                                        <Field className='gap-1'>
                                            <FieldLabel htmlFor='title'>
                                                Link name
                                            </FieldLabel>
                                            {loading && (
                                                <Skeleton className='w-full h-9'/>
                                            )}
                                            {!loading && (
                                                <Input
                                                    id='title'
                                                    value={title}
                                                    autoFocus={true}
                                                    onChange={e => setTitle(e.target.value)}
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <Field className='gap-1'>
                                        <FieldLabel>Collections</FieldLabel>
                                        {loading && (
                                            <Skeleton className='w-full h-9'/>
                                        )}
                                        {!loading && (
                                            <CollectionsInput
                                                value={collections}
                                                onChange={setCollections}
                                            />
                                        )}
                                    </Field>
                                    <div className='flex gap-2 justify-end'>
                                        <DialogClose asChild>
                                            <Button variant='ghost'>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button
                                            disabled={loading || saving}
                                            className='cursor-pointer'
                                        >
                                            {!saving && (
                                                <>
                                                    Save link <ArrowRightIcon/>
                                                </>
                                            )}
                                            {saving && (
                                                <>
                                                    <Spinner/> Saving...
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CollapsibleContent>
                    </Collapsible>
                </form>
            </div>
        </CreateCollectionDialogProvider>
    );
}
